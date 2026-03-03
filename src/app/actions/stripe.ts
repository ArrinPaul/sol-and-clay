
'use server';
import 'dotenv/config';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { auth } from '@clerk/nextjs/server';
import type { CartItem } from '@/lib/types';
import { checkRateLimit, getClientIdentifier, RateLimiters } from '@/lib/rate-limit';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
});

export async function createCheckoutSession(
  items: CartItem[]
): Promise<{ sessionId: string }> {
  const headersList = await headers();
  const origin = headersList.get('origin') || 'http://localhost:9002';
  
  // Rate limiting
  const clientId = getClientIdentifier(headersList);
  const rateLimitResult = checkRateLimit(`checkout:${clientId}`, RateLimiters.checkout);
  
  if (!rateLimitResult.allowed) {
    const waitSeconds = Math.ceil(rateLimitResult.resetInMs / 1000);
    throw new Error(`Too many checkout attempts. Please try again in ${waitSeconds} seconds.`);
  }

  // Validate items
  if (!items || items.length === 0) {
    throw new Error('Cart is empty');
  }

  // Get user ID if authenticated (for order tracking)
  const { userId } = await auth();

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
      // Pass metadata for order fulfillment
      metadata: {
        userId: userId || 'guest',
        cartItems: JSON.stringify(items.map(item => ({
          id: item.productId,
          qty: item.quantity
        }))),
      },
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
