
'use server';
import 'dotenv/config';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { WithId } from '@/firebase';
import type { CartItem } from '@/lib/types';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
});

export async function createCheckoutSession(
  items: WithId<CartItem>[]
): Promise<{ sessionId: string }> {
  const headersList = await headers();
  const origin = headersList.get('origin') || 'http://localhost:9002';

  const line_items = items.map((item) => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.title,
          // You might want to add images here if you have them publicly available
          // images: [item.imageUrl],
        },
        unit_amount: Math.round(item.price * 100), // Price in cents
      },
      quantity: item.quantity,
    };
  });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
      // You can pass metadata to store the cart items and user id
      // This will be useful for fulfillment via webhooks
      // metadata: {
      //   userId: "some_user_id", // Pass the user ID here
      //   cart: JSON.stringify(items.map(item => item.id)),
      // }
    });

    if (!session.id) {
      throw new Error('Could not create Stripe session');
    }

    return { sessionId: session.id };
  } catch (error) {
    console.error('Stripe session creation error:', error);
    throw new Error('Failed to create Stripe checkout session.');
  }
}
