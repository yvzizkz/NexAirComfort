import { Router } from 'express';
import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { db } from '../db/index.js';
import { users, appointments, invoices, referrals, nuveDevices, serviceRecords } from '../db/schema.js';
import { eq, desc, and } from 'drizzle-orm';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/dashboard/overview - Get dashboard overview data
router.get('/dashboard/overview', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId!;

    // Fetch user info
    const [user] = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        phone: users.phone,
        profile_photo: users.profile_photo,
        language: users.language,
        role: users.role,
      })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Fetch upcoming appointments
    const upcomingAppointments = await db
      .select()
      .from(appointments)
      .where(
        and(
          eq(appointments.user_id, userId),
          eq(appointments.status, 'confirmed')
        )
      )
      .orderBy(desc(appointments.created_at))
      .limit(5);

    // Fetch recent service records
    const recentServices = await db
      .select()
      .from(serviceRecords)
      .where(eq(serviceRecords.user_id, userId))
      .orderBy(desc(serviceRecords.completed_at))
      .limit(5);

    // Fetch recent invoices
    const recentInvoices = await db
      .select()
      .from(invoices)
      .where(eq(invoices.user_id, userId))
      .orderBy(desc(invoices.created_at))
      .limit(5);

    // Fetch referral stats
    const userReferrals = await db
      .select()
      .from(referrals)
      .where(eq(referrals.referrer_id, userId));

    // Fetch Nuve devices
    const devices = await db
      .select()
      .from(nuveDevices)
      .where(eq(nuveDevices.user_id, userId));

    res.json({
      user,
      upcoming_appointments: upcomingAppointments,
      recent_services: recentServices,
      recent_invoices: recentInvoices,
      referral_stats: {
        total: userReferrals.length,
        pending: userReferrals.filter((r) => r.status === 'pending').length,
        completed: userReferrals.filter((r) => r.status === 'completed').length,
      },
      nuve_devices: devices,
    });
  } catch (error) {
    console.error('Dashboard overview error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/user/profile - Update user profile
router.put('/user/profile', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId!;
    const { name, phone, address_street, address_city, address_state, address_zip, profile_photo, language } = req.body;

    const updateData: Record<string, unknown> = { updated_at: new Date() };
    if (name !== undefined) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;
    if (address_street !== undefined) updateData.address_street = address_street;
    if (address_city !== undefined) updateData.address_city = address_city;
    if (address_state !== undefined) updateData.address_state = address_state;
    if (address_zip !== undefined) updateData.address_zip = address_zip;
    if (profile_photo !== undefined) updateData.profile_photo = profile_photo;
    if (language !== undefined) updateData.language = language;

    const [updated] = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, userId))
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        phone: users.phone,
        address_street: users.address_street,
        address_city: users.address_city,
        address_state: users.address_state,
        address_zip: users.address_zip,
        profile_photo: users.profile_photo,
        language: users.language,
      });

    res.json({ user: updated });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/user/preferences - Update user communication preferences
router.put('/user/preferences', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId!;
    const { communication_prefs, preferred_contact } = req.body;

    const updateData: Record<string, unknown> = { updated_at: new Date() };
    if (communication_prefs !== undefined) updateData.communication_prefs = communication_prefs;
    if (preferred_contact !== undefined) updateData.preferred_contact = preferred_contact;

    const [updated] = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, userId))
      .returning({
        id: users.id,
        communication_prefs: users.communication_prefs,
        preferred_contact: users.preferred_contact,
      });

    res.json({ preferences: updated });
  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/user/password - Change user password
router.put('/user/password', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId!;
    const { current_password, new_password } = req.body;

    if (!current_password || !new_password) {
      res.status(400).json({ error: 'Current password and new password are required' });
      return;
    }

    if (new_password.length < 8) {
      res.status(400).json({ error: 'New password must be at least 8 characters' });
      return;
    }

    const [user] = await db
      .select({ password_hash: users.password_hash })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user || !user.password_hash) {
      res.status(400).json({ error: 'Cannot change password for this account type' });
      return;
    }

    const valid = await bcrypt.compare(current_password, user.password_hash);
    if (!valid) {
      res.status(401).json({ error: 'Current password is incorrect' });
      return;
    }

    const password_hash = await bcrypt.hash(new_password, 12);

    await db
      .update(users)
      .set({ password_hash, updated_at: new Date() })
      .where(eq(users.id, userId));

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/user/account - Soft delete user account
router.delete('/user/account', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId!;

    await db
      .update(users)
      .set({
        deleted_at: new Date(),
        updated_at: new Date(),
      })
      .where(eq(users.id, userId));

    req.session.destroy((err) => {
      if (err) {
        console.error('Session destroy error after account deletion:', err);
      }
    });

    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
