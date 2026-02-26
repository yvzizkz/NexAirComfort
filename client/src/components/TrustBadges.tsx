import { Shield, Users, Clock, Wifi } from 'lucide-react'
import { useTranslation } from '@/i18n/LanguageContext'

export default function TrustBadges() {
  const { t } = useTranslation()

  const badges = [
    { icon: Shield, label: t('trust.licensed') },
    { icon: Users, label: t('trust.familyOwned') },
    { icon: Clock, label: t('trust.emergency') },
    { icon: Wifi, label: t('trust.smartMonitoring') },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {badges.map((badge) => (
        <div
          key={badge.label}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full transition-all duration-300 hover:bg-[var(--bg-card-hover)]"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <badge.icon className="w-4 h-4 text-[var(--sky)] flex-shrink-0" />
          <span className="text-xs font-semibold text-[var(--text-primary)] whitespace-nowrap">
            {badge.label}
          </span>
        </div>
      ))}
    </div>
  )
}
