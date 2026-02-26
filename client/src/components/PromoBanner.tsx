import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from '@/i18n/LanguageContext'

interface Promotion {
  id: number
  title: string
  title_es?: string
  description: string
  description_es?: string
  code?: string
  valid_until: string
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))
  return match ? match[2] : null
}

function setCookie(name: string, value: string, days: number) {
  const d = new Date()
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`
}

export default function PromoBanner() {
  const { language } = useTranslation()
  const [promo, setPromo] = useState<Promotion | null>(null)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Check if already dismissed via cookie
    if (getCookie('promo_dismissed')) {
      setDismissed(true)
      return
    }

    const fetchPromo = async () => {
      try {
        const res = await fetch('/api/promotions/active')
        if (!res.ok) return
        const data = await res.json() as { data?: Promotion } | Promotion
        const promotion = 'data' in data && data.data ? data.data : data as Promotion
        if (promotion && promotion.id) {
          setPromo(promotion)
        }
      } catch {
        // Silently fail - no promo banner is fine
      }
    }

    fetchPromo()
  }, [])

  const handleDismiss = () => {
    setDismissed(true)
    setCookie('promo_dismissed', 'true', 7)
  }

  if (!promo || dismissed) return null

  const title = language === 'es' && promo.title_es ? promo.title_es : promo.title
  const contactHref = language === 'es' ? '/es/contacto' : '/contact'

  return (
    <div
      className="w-full py-2.5 px-4 text-center relative z-50"
      style={{ background: 'var(--gradient-cta)' }}
      role="banner"
      aria-label="Promotional offer"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-4">
        <p className="text-sm font-semibold text-white">
          {title}
          {promo.code && (
            <span className="ml-2 px-2 py-0.5 bg-white/20 rounded text-xs font-bold">
              {promo.code}
            </span>
          )}
        </p>
        <Link
          to={contactHref}
          className="text-xs font-bold text-white underline underline-offset-2 hover:no-underline transition-all duration-300"
        >
          {language === 'es' ? 'Mas Info' : 'Learn More'}
        </Link>
      </div>

      <button
        onClick={handleDismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/20 transition-all duration-300"
        aria-label="Dismiss promotion"
      >
        <X className="w-4 h-4 text-white" />
      </button>
    </div>
  )
}
