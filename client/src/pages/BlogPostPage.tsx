import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Tag,
  Loader2,
  AlertTriangle,
} from 'lucide-react'
import { useTranslation } from '@/i18n/LanguageContext'
import SEOHead from '@/components/SEOHead'
import { fetchBlogPost, type BlogPost } from '@/lib/api'

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const { t, language } = useTranslation()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    setError('')
    fetchBlogPost(slug).then((result) => {
      if (result.success && result.data) {
        setPost(result.data as BlogPost)
      } else {
        setError(result.error || 'Post not found.')
      }
      setLoading(false)
    })
  }, [slug])

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-[var(--sky)] animate-spin" />
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-[var(--orange)] mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-4">Post Not Found</h1>
          <p className="text-[var(--text-secondary)] mb-8">{error || 'This blog post could not be found.'}</p>
          <Link to="/blog" className="btn-primary">
            <ArrowLeft className="w-4 h-4" />
            {t('blog.backToBlog') || 'Back to Blog'}
          </Link>
        </div>
      </div>
    )
  }

  const title = language === 'es' && post.title_es ? post.title_es : post.title
  const content = language === 'es' && post.content_es ? post.content_es : post.content

  return (
    <>
      <SEOHead
        title={`${title} | NexAir Comfort Blog`}
        description={language === 'es' && post.excerpt_es ? post.excerpt_es : post.excerpt}
        path={language === 'es' ? `/es/blog/${slug}` : `/blog/${slug}`}
      />

      <article className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Back Link */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[var(--sky)] text-sm font-semibold mb-8 hover:text-[var(--sky-light)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('blog.backToBlog') || 'Back to Blog'}
          </Link>

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="badge bg-[var(--sky)]/10 text-[var(--sky)] border border-[var(--sky)]/20">
                {post.category}
              </span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 text-xs text-[var(--text-muted)]"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="gradient-heading text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 font-[var(--font-display)] leading-tight">
              {title}
            </h1>

            <div className="flex flex-wrap items-center gap-5 text-sm text-[var(--text-secondary)]">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(post.published_at)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.read_time} min read
              </span>
            </div>
          </header>

          {/* Cover Image */}
          {post.cover_image && (
            <div className="rounded-xl overflow-hidden mb-10">
              <img
                src={post.cover_image}
                alt={title}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-invert prose-lg max-w-none
              prose-headings:font-[var(--font-display)] prose-headings:text-white
              prose-p:text-[var(--text-secondary)] prose-p:leading-relaxed
              prose-a:text-[var(--sky)] prose-a:no-underline hover:prose-a:text-[var(--sky-light)]
              prose-strong:text-white
              prose-li:text-[var(--text-secondary)]
              prose-hr:border-[var(--border-subtle)]"
          >
            {/* Render content as paragraphs -- assume plain text or basic content */}
            {content.split('\n').map((paragraph, i) => {
              if (!paragraph.trim()) return null
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={i} className="text-2xl font-bold text-white mt-10 mb-4">
                    {paragraph.replace('## ', '')}
                  </h2>
                )
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={i} className="text-xl font-bold text-white mt-8 mb-3">
                    {paragraph.replace('### ', '')}
                  </h3>
                )
              }
              if (paragraph.startsWith('- ')) {
                return (
                  <li key={i} className="text-[var(--text-secondary)] ml-4">
                    {paragraph.replace('- ', '')}
                  </li>
                )
              }
              return (
                <p key={i} className="text-[var(--text-secondary)] leading-relaxed mb-4">
                  {paragraph}
                </p>
              )
            })}
          </div>

          {/* Divider */}
          <div className="divider my-12" />

          {/* Related Posts Suggestion */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-4">
              {t('blog.recentPosts') || 'Recent Posts'}
            </h3>
            <p className="text-[var(--text-secondary)] mb-6">
              Explore more articles from the NexAir Comfort team.
            </p>
            <Link to="/blog" className="btn-primary">
              View All Posts
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
