import { Router } from 'express';
import type { Request, Response } from 'express';
import { db } from '../db/index.js';
import { promotions } from '../db/schema.js';
import { eq, and, lte, gte, or, isNull } from 'drizzle-orm';

const router = Router();

// GET /api/promotions/active - Get currently active promotions
router.get('/active', async (_req: Request, res: Response) => {
  try {
    const now = new Date();

    const activePromotions = await db
      .select()
      .from(promotions)
      .where(
        and(
          eq(promotions.active, true),
          or(
            isNull(promotions.start_date),
            lte(promotions.start_date, now)
          ),
          or(
            isNull(promotions.end_date),
            gte(promotions.end_date, now)
          )
        )
      );

    res.json({ promotions: activePromotions });
  } catch (error) {
    console.error('Get promotions error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
