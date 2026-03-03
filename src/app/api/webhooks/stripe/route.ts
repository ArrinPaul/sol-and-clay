import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getAdminDb, COLLECTIONS } from '@/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';
import { sendOrderConfirmationEmail, sendAdminOrderNotification } from '@/lib/email';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

/**
 * Order status types
 */
type OrderStatus = 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';

/**
 * Order item structure
 */
interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
}

/**
 * Order document structure
 */
interface OrderDocument {
  stripeSessionId: string;
  stripePaymentIntentId: string | null;
  customerEmail: string | null;
  customerName: string | null;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  currency: string;
  status: OrderStatus;
  shippingAddress: Stripe.Address | null;
  metadata: Record<string, string>;
  createdAt: FieldValue;
  updatedAt: FieldValue;
  paidAt: FieldValue;
}

/**
 * Fulfill an order after successful payment.
 * Creates an order document in Firestore.
 */
async function fulfillOrder(session: Stripe.Checkout.Session): Promise<void> {
  const db = getAdminDb();
  
  // Retrieve the full session with line items
  const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
    expand: ['line_items', 'customer_details', 'payment_intent'],
  });

  // Extract line items
  const lineItems = fullSession.line_items?.data || [];
  const items: OrderItem[] = lineItems.map((item) => ({
    productId: item.price?.product as string || 'unknown',
    title: item.description || 'Unknown Item',
    price: (item.price?.unit_amount || 0) / 100, // Convert from cents
    quantity: item.quantity || 1,
  }));

  // Calculate totals
  const subtotal = (fullSession.amount_subtotal || 0) / 100;
  const shipping = (fullSession.shipping_cost?.amount_total || 0) / 100;
  const total = (fullSession.amount_total || 0) / 100;

  // Create order document
  const orderData: OrderDocument = {
    stripeSessionId: session.id,
    stripePaymentIntentId: typeof fullSession.payment_intent === 'string' 
      ? fullSession.payment_intent 
      : fullSession.payment_intent?.id || null,
    customerEmail: fullSession.customer_details?.email || null,
    customerName: fullSession.customer_details?.name || null,
    items,
    subtotal,
    shipping,
    total,
    currency: fullSession.currency || 'usd',
    status: 'paid',
    shippingAddress: fullSession.shipping_details?.address || null,
    metadata: session.metadata || {},
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    paidAt: FieldValue.serverTimestamp(),
  };

  // Save to Firestore
  const ordersRef = db.collection(COLLECTIONS.ORDERS);
  const docRef = await ordersRef.add(orderData);

  console.log('✅ Order created in Firestore:', docRef.id);
  console.log('   Customer:', orderData.customerEmail);
  console.log('   Total:', `$${orderData.total.toFixed(2)}`);
  console.log('   Items:', orderData.items.length);

  // Send confirmation email to customer
  if (orderData.customerEmail) {
    await sendOrderConfirmationEmail(orderData.customerEmail, docRef.id, {
      items: orderData.items,
      subtotal: orderData.subtotal,
      shipping: orderData.shipping,
      total: orderData.total,
    });
  }

  // Notify admin of new order
  await sendAdminOrderNotification(
    docRef.id,
    orderData.customerEmail || 'Guest',
    orderData.total
  );
}

/**
 * Handle expired checkout session.
 * Optionally log or track abandoned carts.
 */
async function handleExpiredSession(session: Stripe.Checkout.Session): Promise<void> {
  console.log('⏰ Checkout session expired:', session.id);
  
  // Optionally track abandoned carts for analytics
  // const db = getAdminDb();
  // await db.collection('abandonedCarts').add({
  //   sessionId: session.id,
  //   email: session.customer_details?.email,
  //   expiredAt: FieldValue.serverTimestamp(),
  // });
}

/**
 * Handle failed payment.
 * Log the failure and optionally notify the customer.
 */
async function handleFailedPayment(paymentIntent: Stripe.PaymentIntent): Promise<void> {
  console.log('❌ Payment failed:', paymentIntent.id);
  console.log('   Reason:', paymentIntent.last_payment_error?.message || 'Unknown');

  // Optionally update any pending order status
  // const db = getAdminDb();
  // const ordersRef = db.collection(COLLECTIONS.ORDERS);
  // const snapshot = await ordersRef
  //   .where('stripePaymentIntentId', '==', paymentIntent.id)
  //   .limit(1)
  //   .get();
  // 
  // if (!snapshot.empty) {
  //   await snapshot.docs[0].ref.update({
  //     status: 'cancelled',
  //     failureReason: paymentIntent.last_payment_error?.message,
  //     updatedAt: FieldValue.serverTimestamp(),
  //   });
  // }
}

/**
 * Handle refund events.
 */
async function handleRefund(charge: Stripe.Charge): Promise<void> {
  console.log('💸 Refund processed for charge:', charge.id);
  
  const db = getAdminDb();
  const ordersRef = db.collection(COLLECTIONS.ORDERS);
  
  // Find the order by payment intent
  const paymentIntentId = typeof charge.payment_intent === 'string' 
    ? charge.payment_intent 
    : charge.payment_intent?.id;
    
  if (!paymentIntentId) return;
  
  const snapshot = await ordersRef
    .where('stripePaymentIntentId', '==', paymentIntentId)
    .limit(1)
    .get();
  
  if (!snapshot.empty) {
    await snapshot.docs[0].ref.update({
      status: 'refunded',
      refundedAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
    console.log('   Order status updated to refunded');
  }
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature || !webhookSecret) {
    console.error('Missing signature or webhook secret');
    return NextResponse.json(
      { error: 'Missing signature or webhook secret' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    console.error('⚠️  Webhook signature verification failed:', errorMsg);
    return NextResponse.json(
      { error: `Webhook Error: ${errorMsg}` },
      { status: 400 }
    );
  }

  console.log('📥 Received Stripe webhook:', event.type);

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        await fulfillOrder(session);
        break;

      case 'checkout.session.expired':
        const expiredSession = event.data.object as Stripe.Checkout.Session;
        await handleExpiredSession(expiredSession);
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent;
        await handleFailedPayment(failedPayment);
        break;

      case 'charge.refunded':
        const refundedCharge = event.data.object as Stripe.Charge;
        await handleRefund(refundedCharge);
        break;

      default:
        console.log(`ℹ️  Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    console.error('Error processing webhook:', error);
    // Still return 200 to acknowledge receipt - Stripe will retry if we return error
    // Log the error for investigation but don't fail the webhook
  }

  return NextResponse.json({ received: true });
}
