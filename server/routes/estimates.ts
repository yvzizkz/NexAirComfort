import { Router } from 'express';
import type { Request, Response } from 'express';
import { db } from '../db/index.js';
import { estimateRequests } from '../db/schema.js';
import { eq, and, desc } from 'drizzle-orm';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// POST /api/estimates - Create an estimate request
router.post('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId!;
    const {
      service_type,
      property_type,
      property_sqft,
      property_year,
      current_system_type,
      current_system_brand,
      current_system_age,
      photos,
      budget_range,
      wants_financing,
      urgency,
      notes,
    } = req.body;

    if (!service_type) {
      res.status(400).json({ error: 'Service type is required' });
      return;
    }

    const [estimate] = await db
      .insert(estimateRequests)
      .values({
        user_id: userId,
        service_type,
        property_type: property_type || null,
        property_sqft: property_sqft || null,
        property_year: property_year || null,
        current_system_type: current_system_type || null,
        current_system_brand: current_system_brand || null,
        current_system_age: current_system_age || null,
        photos: photos || null,
        budget_range: budget_range || null,
        wants_financing: wants_financing ?? false,
        urgency: urgency || null,
        notes: notes || null,
        status: 'pending',
      })
      .returning();

    res.status(201).json({ estimate });
  } catch (error) {
    console.error('Create estimate error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/estimates - List user's estimate requests
router.get('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId!;

    const estimates = await db
      .select()
      .from(estimateRequests)
      .where(eq(estimateRequests.user_id, userId))
      .orderBy(desc(estimateRequests.created_at));

    res.json({ estimates });
  } catch (error) {
    console.error('List estimates error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/estimates/:id - Get single estimate request
router.get('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId!;
    const estimateId = parseInt(req.params.id as string);

    const [estimate] = await db
      .select()
      .from(estimateRequests)
      .where(
        and(
          eq(estimateRequests.id, estimateId),
          eq(estimateRequests.user_id, userId)
        )
      )
      .limit(1);

    if (!estimate) {
      res.status(404).json({ error: 'Estimate request not found' });
      return;
    }

    res.json({ estimate });
  } catch (error) {
    console.error('Get estimate error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
