import { Router } from 'express';
import type { Request, Response } from 'express';
import { db } from '../db/index.js';
import { appointments } from '../db/schema.js';
import { eq, and, desc } from 'drizzle-orm';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/appointments - List user's appointments
router.get('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId!;
    const status = req.query.status as string | undefined;

    let conditions = eq(appointments.user_id, userId);

    if (status) {
      conditions = and(conditions, eq(appointments.status, status))!;
    }

    const userAppointments = await db
      .select()
      .from(appointments)
      .where(conditions)
      .orderBy(desc(appointments.created_at));

    res.json({ appointments: userAppointments });
  } catch (error) {
    console.error('List appointments error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/appointments/slots - Get available time slots
router.get('/slots', async (req: Request, res: Response) => {
  try {
    const { date } = req.query;

    if (!date) {
      res.status(400).json({ error: 'Date is required' });
      return;
    }

    // Get already booked slots for the date
    const booked = await db
      .select({ preferred_time: appointments.preferred_time })
      .from(appointments)
      .where(
        and(
          eq(appointments.preferred_date, date as string),
          eq(appointments.status, 'confirmed')
        )
      );

    const bookedTimes = new Set(booked.map((b) => b.preferred_time));

    // Generate available slots (8 AM to 5 PM, 1-hour intervals)
    const allSlots = [
      '08:00', '09:00', '10:00', '11:00',
      '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    ];

    const availableSlots = allSlots.filter((slot) => !bookedTimes.has(slot));

    res.json({ date, available_slots: availableSlots });
  } catch (error) {
    console.error('Get slots error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/appointments - Create an appointment
router.post('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId!;
    const {
      service_type,
      description,
      property_type,
      system_brand,
      system_model,
      system_year,
      preferred_date,
      preferred_time,
      address_street,
      address_city,
      address_state,
      address_zip,
      notes,
      photos,
    } = req.body;

    if (!service_type || !preferred_date) {
      res.status(400).json({ error: 'Service type and preferred date are required' });
      return;
    }

    const [appointment] = await db
      .insert(appointments)
      .values({
        user_id: userId,
        service_type,
        description: description || null,
        property_type: property_type || null,
        system_brand: system_brand || null,
        system_model: system_model || null,
        system_year: system_year || null,
        preferred_date,
        preferred_time: preferred_time || null,
        address_street: address_street || null,
        address_city: address_city || null,
        address_state: address_state || null,
        address_zip: address_zip || null,
        notes: notes || null,
        photos: photos || null,
        status: 'pending',
      })
      .returning();

    res.status(201).json({ appointment });
  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/appointments/:id - Reschedule an appointment
router.put('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId!;
    const appointmentId = parseInt(req.params.id as string);
    const { preferred_date, preferred_time, notes } = req.body;

    // Verify ownership
    const [existing] = await db
      .select()
      .from(appointments)
      .where(and(eq(appointments.id, appointmentId), eq(appointments.user_id, userId)))
      .limit(1);

    if (!existing) {
      res.status(404).json({ error: 'Appointment not found' });
      return;
    }

    if (existing.status === 'canceled' || existing.status === 'completed') {
      res.status(400).json({ error: 'Cannot reschedule a canceled or completed appointment' });
      return;
    }

    const updateData: Record<string, unknown> = {};
    if (preferred_date) updateData.preferred_date = preferred_date;
    if (preferred_time) updateData.preferred_time = preferred_time;
    if (notes !== undefined) updateData.notes = notes;
    updateData.status = 'rescheduled';

    const [updated] = await db
      .update(appointments)
      .set(updateData)
      .where(eq(appointments.id, appointmentId))
      .returning();

    res.json({ appointment: updated });
  } catch (error) {
    console.error('Reschedule appointment error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/appointments/:id - Cancel an appointment
router.delete('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId!;
    const appointmentId = parseInt(req.params.id as string);

    // Verify ownership
    const [existing] = await db
      .select()
      .from(appointments)
      .where(and(eq(appointments.id, appointmentId), eq(appointments.user_id, userId)))
      .limit(1);

    if (!existing) {
      res.status(404).json({ error: 'Appointment not found' });
      return;
    }

    if (existing.status === 'completed') {
      res.status(400).json({ error: 'Cannot cancel a completed appointment' });
      return;
    }

    const [updated] = await db
      .update(appointments)
      .set({
        status: 'canceled',
        canceled_at: new Date(),
      })
      .where(eq(appointments.id, appointmentId))
      .returning();

    res.json({ appointment: updated });
  } catch (error) {
    console.error('Cancel appointment error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/appointments/:id/rate - Rate a completed service
router.post('/:id/rate', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId!;
    const appointmentId = parseInt(req.params.id as string);
    const { rating, rating_comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      res.status(400).json({ error: 'Rating must be between 1 and 5' });
      return;
    }

    // Verify ownership and completion
    const [existing] = await db
      .select()
      .from(appointments)
      .where(and(eq(appointments.id, appointmentId), eq(appointments.user_id, userId)))
      .limit(1);

    if (!existing) {
      res.status(404).json({ error: 'Appointment not found' });
      return;
    }

    if (existing.status !== 'completed') {
      res.status(400).json({ error: 'Can only rate completed appointments' });
      return;
    }

    const [updated] = await db
      .update(appointments)
      .set({
        rating,
        rating_comment: rating_comment || null,
      })
      .where(eq(appointments.id, appointmentId))
      .returning();

    res.json({ appointment: updated });
  } catch (error) {
    console.error('Rate appointment error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
