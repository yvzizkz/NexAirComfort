import { Router } from 'express';
import type { Request, Response } from 'express';
import Stripe from 'stripe';
import { db } from '../db/index.js';
import { members } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-11-20.acacia' as Stripe.LatestApiVersion,
});

const PLAN_PRICES: Record<string, Record<string, string>> = {
  silver: {
    monthly: process.env.STRIPE_SILVER_MONTHLY || '',
    annual: process.env.STRIPE_SILVER_ANNUAL || '',
  },
  gold: {
    monthly: process.env.STRIPE_GOLD_MONTHLY || '',
    annual: process.env.STRIPE_GOLD_ANNUAL || '',
  },
  platinum: {
    monthly: process.env.STRIPE_PLATINUM_MONTHLY || '',
    annual: process.env.STRIPE_PLATINUM_ANNUAL || '',
  },
};

// POST /api/membership/checkout - Create Stripe checkout session
router.post('/membership/checkout', async (req: Request, res: Response) => {
  try {
    const { plan, billing_cycle, name, email, phone } = req.body;

    if (!plan || !billing_cycle || !email) {
      res.status(400).json({ error: 'Plan, billing cycle, and email are required' });
      return;
    }

    const priceId = PLAN_PRICES[plan]?.[billing_cycle];
    if (!priceId) {
      res.status(400).json({ error: 'Invalid plan or billing cycle' });
      return;
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: email,
      metadata: {
        plan,
        billing_cycle,
        name: name || '',
        phone: phone || '',
      },
      success_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/membership/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/membership`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/membership/portal - Create Stripe customer portal session
router.post('/membership/portal', requireAuth, async (req: Request, res: Response) => {
  try {
    const { stripe_customer_id } = req.body;

    if (!stripe_customer_id) {
      res.status(400).json({ error: 'Stripe customer ID is required' });
      return;
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: stripe_customer_id,
      return_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/dashboard`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Portal error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/webhook/stripe - Handle Stripe webhooks (raw body)
router.post('/webhook/stripe', async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    res.status(400).json({ error: 'Missing signature or webhook secret' });
    return;
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    res.status(400).json({ error: 'Invalid signature' });
    return;
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const { plan, billing_cycle, name, phone } = session.metadata || {};

        await db.insert(members).values({
          name: name || 'Member',
          email: session.customer_email || '',
          phone: phone || null,
          plan: plan || 'silver',
          billing_cycle: billing_cycle || 'monthly',
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: session.subscription as string,
          status: 'active',
        });

        console.log(`[Stripe] New member created: ${session.customer_email}`);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        await db
          .update(members)
          .set({
            status: subscription.status === 'active' ? 'active' : 'past_due',
          })
          .where(eq(members.stripe_customer_id, customerId));

        console.log(`[Stripe] Subscription updated for customer: ${customerId}`);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        await db
          .update(members)
          .set({
            status: 'canceled',
            canceled_at: new Date(),
          })
          .where(eq(members.stripe_customer_id, customerId));

        console.log(`[Stripe] Subscription canceled for customer: ${customerId}`);
        break;
      }

      default:
        console.log(`[Stripe] Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

export default router;
