import { Router } from 'express';
import type { Request, Response } from 'express';
import Anthropic from '@anthropic-ai/sdk';
import { db } from '../db/index.js';
import { chatSessions } from '../db/schema.js';
import { eq } from 'drizzle-orm';

const router = Router();

const NEXAIR_SYSTEM_PROMPT = `You are NexAir Comfort's AI assistant, helping customers with HVAC services in the Houston, TX area. You are friendly, professional, and knowledgeable about heating, ventilation, and air conditioning.

Key information about NexAir Comfort:
- We serve the greater Houston, TX metro area
- Services: AC repair, AC installation, heating repair, heating installation, maintenance, duct cleaning, indoor air quality
- We offer membership plans (Silver, Gold, Platinum) with priority service, discounts, and preventive maintenance
- Emergency service available 24/7
- Licensed, bonded, and insured
- We work with all major HVAC brands
- Financing options available
- Bilingual service (English and Spanish)

Your role:
- Answer questions about HVAC services, pricing, and scheduling
- Help customers troubleshoot common HVAC issues
- Recommend appropriate services based on customer descriptions
- Encourage booking appointments for complex issues
- Be helpful but always recommend professional service for safety-critical issues
- If asked about specific pricing, provide general ranges and recommend a free estimate
- You can communicate in both English and Spanish based on the customer's preference

Always be warm, helpful, and guide customers toward booking a service or getting a free estimate when appropriate.`;

// POST /api/chat - Proxy to Claude API with NexAir system prompt
router.post('/', async (req: Request, res: Response) => {
  try {
    const { message, session_id, language } = req.body;

    if (!message) {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      res.status(500).json({ error: 'Chat service not configured' });
      return;
    }

    const anthropic = new Anthropic({ apiKey });

    // Load existing chat history if session exists
    let messages: Array<{ role: 'user' | 'assistant'; content: string }> = [];

    if (session_id) {
      const [existing] = await db
        .select()
        .from(chatSessions)
        .where(eq(chatSessions.session_id, session_id))
        .limit(1);

      if (existing && Array.isArray(existing.messages)) {
        messages = existing.messages as Array<{ role: 'user' | 'assistant'; content: string }>;
      }
    }

    // Add user message
    messages.push({ role: 'user', content: message });

    // Call Claude API
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: language === 'es'
        ? NEXAIR_SYSTEM_PROMPT + '\n\nThe customer prefers Spanish. Respond in Spanish.'
        : NEXAIR_SYSTEM_PROMPT,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const assistantMessage =
      response.content[0].type === 'text' ? response.content[0].text : '';

    // Add assistant response to history
    messages.push({ role: 'assistant', content: assistantMessage });

    // Save/update chat session
    const chatSessionId = session_id || crypto.randomUUID();

    if (session_id) {
      await db
        .update(chatSessions)
        .set({
          messages,
          updated_at: new Date(),
        })
        .where(eq(chatSessions.session_id, session_id));
    } else {
      await db.insert(chatSessions).values({
        session_id: chatSessionId,
        messages,
        language: language || 'en',
        status: 'active',
      });
    }

    res.json({
      message: assistantMessage,
      session_id: chatSessionId,
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
