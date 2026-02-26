import { type LucideIcon, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from '@/i18n/LanguageContext'

interface ServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
  href: string
  price?: string
}

export default function ServiceCard({ icon: Icon, title, description, href, price }: ServiceCardProps) {
  const { t } = useTranslation()

  return (
    <div className="card group p-6 flex flex-col h-full">
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
        style={{
          background: 'rgba(74, 144, 217, 0.12)',
          border: '1px solid rgba(74, 144, 217, 0.2)',
        }}
      >
        <Icon className="w-7 h-7 text-[var(--sky)]" />
      </div>

      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>

      <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4 flex-grow">
        {description}
      </p>

      {price && (
        <p className="text-xs font-medium text-[var(--gold)] mb-4">{price}</p>
      )}

      <Link
        to={href}
        className="inline-flex items-center gap-2 text-[var(--sky)] text-sm font-semibold transition-all duration-300 hover:gap-3 hover:text-[var(--sky-light)]"
        aria-label={`${t('services.learnMore') || 'Learn More'} - ${title}`}
      >
        {t('services.learnMore') || 'Learn More'}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  )
}
