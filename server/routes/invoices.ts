import { Router } from 'express';
import type { Request, Response } from 'express';
import { db } from '../db/index.js';
import { invoices } from '../db/schema.js';
import { eq, and, desc } from 'drizzle-orm';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/invoices - List user's invoices
router.get('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId!;
    const status = req.query.status as string | undefined;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = (page - 1) * limit;

    let conditions = eq(invoices.user_id, userId);

    if (status) {
      conditions = and(conditions, eq(invoices.status, status))!;
    }

    const userInvoices = await db
      .select()
      .from(invoices)
      .where(conditions)
      .orderBy(desc(invoices.created_at))
      .limit(limit)
      .offset(offset);

    res.json({ invoices: userInvoices });
  } catch (error) {
    console.error('List invoices error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/invoices/:id - Get single invoice
router.get('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId!;
    const invoiceId = parseInt(req.params.id as string);

    const [invoice] = await db
      .select()
      .from(invoices)
      .where(
        and(
          eq(invoices.id, invoiceId),
          eq(invoices.user_id, userId)
        )
      )
      .limit(1);

    if (!invoice) {
      res.status(404).json({ error: 'Invoice not found' });
      return;
    }

    res.json({ invoice });
  } catch (error) {
    console.error('Get invoice error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
