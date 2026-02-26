import { Router } from 'express';
import type { Request, Response } from 'express';
import crypto from 'crypto';
import { db } from '../db/index.js';
import { referrals, referralCredits, users } from '../db/schema.js';
import { eq, desc } from 'drizzle-orm';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/referrals - List user's referrals
router.get('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId!;

    const userReferrals = await db
      .select()
      .from(referrals)
      .where(eq(referrals.referrer_id, userId))
      .orderBy(desc(referrals.created_at));

    res.json({ referrals: userReferrals });
  } catch (error) {
    console.error('List referrals error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/referrals/credits - List user's referral credits
router.get('/credits', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId!;

    const credits = await db
      .select()
      .from(referralCredits)
      .where(eq(referralCredits.user_id, userId))
      .orderBy(desc(referralCredits.created_at));

    // Calculate total balance
    const totalCredits = credits.reduce(
      (sum, credit) => sum + parseFloat(credit.amount),
      0
    );

    res.json({
      credits,
      total_balance: totalCredits.toFixed(2),
    });
  } catch (error) {
    console.error('List referral credits error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/referrals/share - Create or get referral link
router.post('/share', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId!;
    const { referred_name, referred_email, referred_phone } = req.body;

    // Generate unique referral code
    const referralCode = crypto.randomBytes(6).toString('hex').toUpperCase();
    const referralLink = `${process.env.CLIENT_URL || 'http://localhost:5173'}/referral/${referralCode}`;

    const [referral] = await db
      .insert(referrals)
      .values({
        referrer_id: userId,
        referral_code: referralCode,
        referral_link: referralLink,
        referred_name: referred_name || null,
        referred_email: referred_email || null,
        referred_phone: referred_phone || null,
        status: 'pending',
        reward_type: 'credit',
        reward_amount: '50.00',
      })
      .returning();

    res.status(201).json({ referral });
  } catch (error) {
    console.error('Create referral error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/referrals/:code - Public referral lookup
router.get('/:code', async (req: Request, res: Response) => {
  try {
    const code = req.params.code as string;

    const [referral] = await db
      .select({
        referral_code: referrals.referral_code,
        referral_link: referrals.referral_link,
        status: referrals.status,
        referrer_id: referrals.referrer_id,
      })
      .from(referrals)
      .where(eq(referrals.referral_code, code))
      .limit(1);

    if (!referral) {
      res.status(404).json({ error: 'Referral code not found' });
      return;
    }

    // Get referrer name for display
    const [referrer] = await db
      .select({ name: users.name })
      .from(users)
      .where(eq(users.id, referral.referrer_id))
      .limit(1);

    res.json({
      referral_code: referral.referral_code,
      referrer_name: referrer?.name || 'A NexAir Customer',
      valid: referral.status === 'pending',
    });
  } catch (error) {
    console.error('Lookup referral error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
