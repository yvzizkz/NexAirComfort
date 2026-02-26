import { Router } from 'express';
import type { Request, Response } from 'express';
import { db } from '../db/index.js';
import { blogPosts } from '../db/schema.js';
import { eq, desc, and } from 'drizzle-orm';

const router = Router();

// Simple API key middleware for blog management
function requireApiKey(req: Request, res: Response, next: () => void): void {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== process.env.BLOG_API_KEY) {
    res.status(403).json({ error: 'Invalid API key' });
    return;
  }
  next();
}

// GET /api/blog - List published blog posts (paginated)
router.get('/', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const category = req.query.category as string | undefined;
    const offset = (page - 1) * limit;

    let conditions = eq(blogPosts.published, true);

    if (category) {
      conditions = and(conditions, eq(blogPosts.category, category))!;
    }

    const posts = await db
      .select({
        id: blogPosts.id,
        title_en: blogPosts.title_en,
        title_es: blogPosts.title_es,
        slug: blogPosts.slug,
        excerpt_en: blogPosts.excerpt_en,
        excerpt_es: blogPosts.excerpt_es,
        featured_image: blogPosts.featured_image,
        category: blogPosts.category,
        author: blogPosts.author,
        created_at: blogPosts.created_at,
      })
      .from(blogPosts)
      .where(conditions)
      .orderBy(desc(blogPosts.created_at))
      .limit(limit)
      .offset(offset);

    const [countResult] = await db
      .select({ count: blogPosts.id })
      .from(blogPosts)
      .where(conditions);

    res.json({
      posts,
      pagination: {
        page,
        limit,
        total: countResult?.count || 0,
      },
    });
  } catch (error) {
    console.error('Blog list error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/blog/:slug - Get single blog post
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug as string;

    const [post] = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug))
      .limit(1);

    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    res.json({ post });
  } catch (error) {
    console.error('Blog get error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/blog - Create blog post (API key protected)
router.post('/', requireApiKey, async (req: Request, res: Response) => {
  try {
    const {
      title_en,
      title_es,
      slug,
      content_en,
      content_es,
      excerpt_en,
      excerpt_es,
      featured_image,
      category,
      author,
      published,
    } = req.body;

    if (!title_en || !slug || !content_en) {
      res.status(400).json({ error: 'title_en, slug, and content_en are required' });
      return;
    }

    const [post] = await db
      .insert(blogPosts)
      .values({
        title_en,
        title_es: title_es || null,
        slug,
        content_en,
        content_es: content_es || null,
        excerpt_en: excerpt_en || null,
        excerpt_es: excerpt_es || null,
        featured_image: featured_image || null,
        category: category || null,
        author: author || null,
        published: published ?? false,
      })
      .returning();

    res.status(201).json({ post });
  } catch (error) {
    console.error('Blog create error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
