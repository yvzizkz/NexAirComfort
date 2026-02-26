import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  BookOpen,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertTriangle,
  Tag,
} from 'lucide-react'
import { useTranslation } from '@/i18n/LanguageContext'
import SEOHead from '@/components/SEOHead'
import { fetchBlogPosts, type BlogPost, type BlogListResponse } from '@/lib/api'

const CATEGORIES = ['All', 'HVAC Tips', 'Maintenance', 'Energy Savings', 'Company News']

export default function BlogPage() {
  const { t, language } = useTranslation()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    setLoading(true)
    setError('')
    fetchBlogPosts(page).then((result) => {
      if (result.success && result.data) {
        const data = result.data as BlogListResponse
        setPosts(data.posts)
        setTotalPages(data.totalPages)
      } else {
        setError(result.error || 'Failed to load blog posts.')
      }
      setLoading(false)
    })
  }, [page])

  const filteredPosts =
    activeCategory === 'All'
      ? posts
      : posts.filter((p) => p.category === activeCategory)

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <>
      <SEOHead
        title={t('seo.blogTitle') || 'HVAC Tips & News | NexAir Comfort Blog'}
        description={t('seo.blogDescription') || 'Expert HVAC tips, energy-saving advice, and home comfort news from the NexAir Comfort team.'}
        path={language === 'es' ? '/es/blog' : '/blog'}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="glow-sky" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <BookOpen className="w-12 h-12 text-[var(--sky)] mx-auto mb-6" />
          <h1 className="gradient-heading text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 font-[var(--font-display)]">
            {t('blog.title') || 'NexAir Comfort Blog'}
          </h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            Expert HVAC tips, energy-saving advice, and home comfort news from the NexAir Comfort team.
          </p>
        </div>
      </section>

      {/* ── Category Filter ──────────────────────────────────────────────────── */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-[var(--orange)] text-white'
                  : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:border-[var(--sky)] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── Blog Grid ────────────────────────────────────────────────────────── */}
      <section className="py-8 px-4 min-h-[50vh]">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-10 h-10 text-[var(--sky)] animate-spin" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <AlertTriangle className="w-10 h-10 text-[var(--orange)] mb-4" />
              <p className="text-[var(--text-secondary)]">{error}</p>
              <button
                onClick={() => { setPage(1); setError('') }}
                className="btn-primary mt-6"
              >
                Try Again
              </button>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[var(--text-secondary)] text-lg">
                No posts found{activeCategory !== 'All' ? ` in "${activeCategory}"` : ''}. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="card group flex flex-col overflow-hidden"
                >
                  {/* Featured Image Placeholder */}
                  <div
                    className="h-48 flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, var(--navy-light), var(--navy))',
                      borderBottom: '1px solid var(--border-subtle)',
                    }}
                  >
                    {post.cover_image ? (
                      <img
                        src={post.cover_image}
                        alt={language === 'es' && post.title_es ? post.title_es : post.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <BookOpen className="w-12 h-12 text-[var(--text-muted)]" />
                    )}
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    {/* Category Badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="badge bg-[var(--sky)]/10 text-[var(--sky)] border border-[var(--sky)]/20">
                        {post.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-[var(--sky)] transition-colors leading-snug">
                      {language === 'es' && post.title_es ? post.title_es : post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-grow mb-4">
                      {language === 'es' && post.excerpt_es ? post.excerpt_es : post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(post.published_at)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.read_time} min read
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* ── Pagination ──────────────────────────────────────────────────── */}
          {totalPages > 1 && !loading && (
            <div className="flex items-center justify-center gap-4 mt-12">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="btn-secondary disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              <span className="text-sm text-[var(--text-secondary)]">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="btn-secondary disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
