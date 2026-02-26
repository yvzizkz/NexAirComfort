import { Router } from 'express';
import type { Request, Response } from 'express';
import { db } from '../db/index.js';
import { leads, formSubmissions } from '../db/schema.js';
import { sendToGHL } from '../lib/ghl.js';

const router = Router();

// POST /api/contact - Save contact form submission and fire GHL webhook
router.post('/contact', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, address, service_needed, preferred_date, message, source, language } = req.body;

    if (!name) {
      res.status(400).json({ error: 'Name is required' });
      return;
    }

    // Save lead to database
    const [lead] = await db
      .insert(leads)
      .values({
        name,
        email: email || null,
        phone: phone || null,
        address: address || null,
        service_needed: service_needed || null,
        preferred_date: preferred_date || null,
        message: message || null,
        source: source || 'contact_form',
        language: language || 'en',
      })
      .returning();

    // Save form submission record
    await db.insert(formSubmissions).values({
      form_type: 'contact',
      data: req.body,
      lead_id: lead.id,
    });

    // Fire GHL webhook (non-blocking)
    sendToGHL({
      type: 'contact_form',
      lead_id: lead.id,
      name,
      email,
      phone,
      address,
      service_needed,
      preferred_date,
      message,
      source: source || 'contact_form',
      language: language || 'en',
    }).catch((err) => console.error('[Contact] GHL webhook error:', err));

    res.status(201).json({ message: 'Contact form submitted successfully', lead_id: lead.id });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/leads - Lead capture (alternate endpoint)
router.post('/leads', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, address, service_needed, preferred_date, message, source, language } = req.body;

    if (!name && !email && !phone) {
      res.status(400).json({ error: 'At least one contact field is required (name, email, or phone)' });
      return;
    }

    const [lead] = await db
      .insert(leads)
      .values({
        name: name || 'Unknown',
        email: email || null,
        phone: phone || null,
        address: address || null,
        service_needed: service_needed || null,
        preferred_date: preferred_date || null,
        message: message || null,
        source: source || 'lead_capture',
        language: language || 'en',
      })
      .returning();

    // Fire GHL webhook (non-blocking)
    sendToGHL({
      type: 'lead_capture',
      lead_id: lead.id,
      name: name || 'Unknown',
      email,
      phone,
      source: source || 'lead_capture',
    }).catch((err) => console.error('[Leads] GHL webhook error:', err));

    res.status(201).json({ message: 'Lead captured successfully', lead_id: lead.id });
  } catch (error) {
    console.error('Lead capture error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
