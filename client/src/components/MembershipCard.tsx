import { Check } from 'lucide-react'
import { useTranslation } from '@/i18n/LanguageContext'

interface MembershipCardProps {
  planName: string
  monthlyPrice: number
  annualPrice: number
  features: string[]
  isPopular?: boolean
  billingCycle: 'monthly' | 'annual'
  onSelect: () => void
}

export default function MembershipCard({
  planName,
  monthlyPrice,
  annualPrice,
  features,
  isPopular = false,
  billingCycle,
  onSelect,
}: MembershipCardProps) {
  const { t } = useTranslation()

  const displayPrice = billingCycle === 'monthly' ? monthlyPrice : annualPrice
  const priceSuffix =
    billingCycle === 'monthly' ? t('membership.perMonth') : t('membership.perYear')

  return (
    <div
      className={`relative rounded-2xl p-6 md:p-8 flex flex-col h-full transition-all duration-300 ${
        isPopular
          ? 'border-2 border-[var(--orange)] shadow-[0_0_40px_rgba(212,112,42,0.15)]'
          : 'border border-[var(--border-subtle)]'
      }`}
      style={{ background: 'var(--bg-card)' }}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span
            className="badge text-white px-4 py-1.5"
            style={{ background: 'var(--gradient-cta)' }}
          >
            {t('membership.mostPopular')}
          </span>
        </div>
      )}

      {/* Plan Name */}
      <h3 className="text-xl font-bold text-white mb-4 mt-2">{planName}</h3>

      {/* Price */}
      <div className="mb-6">
        <span className="text-4xl font-bold text-white">
          ${displayPrice.toFixed(2)}
        </span>
        <span className="text-sm text-[var(--text-secondary)] ml-1">
          {priceSuffix}
        </span>
      </div>

      {/* Features List */}
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2.5">
            <Check className="w-4 h-4 text-[var(--green)] flex-shrink-0 mt-0.5" />
            <span className="text-sm text-[var(--text-secondary)]">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button
        onClick={onSelect}
        className={`w-full py-3 rounded-full font-semibold text-center transition-all duration-300 ${
          isPopular
            ? 'btn-primary justify-center'
            : 'btn-secondary justify-center hover:bg-white/12'
        }`}
        aria-label={`${t('membership.selectPlan')} - ${planName}`}
      >
        {t('membership.selectPlan')}
      </button>
    </div>
  )
}
