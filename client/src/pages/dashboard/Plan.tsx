import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Shield,
  Check,
  Star,
  ArrowRight,
  Loader2,
  AlertCircle,
  CalendarCheck,
} from 'lucide-react'
import { useTranslation } from '@/i18n/LanguageContext'
import { fetchDashboardOverview, type MembershipInfo } from '@/lib/api'

export default function Plan() {
  const { language } = useTranslation()
  const isEs = language === 'es'
  const [membership, setMembership] = useState<MembershipInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardOverview().then((result) => {
      if (result.success && result.data) {
        setMembership(result.data.membership)
      }
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-10 h-10 text-[var(--sky)] animate-spin" />
      </div>
    )
  }

  // No plan state
  if (!membership) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{
            background: 'rgba(212, 112, 42, 0.12)',
            border: '1px solid rgba(212, 112, 42, 0.2)',
          }}
        >
          <Shield className="w-10 h-10 text-[var(--orange)]" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 font-[var(--font-display)]">
          {isEs ? 'No Tiene un Plan Activo' : 'You Do Not Have an Active Plan'}
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-8 leading-relaxed max-w-md mx-auto">
          {isEs
            ? 'Unase a un plan de membresia para disfrutar de servicio prioritario, descuentos exclusivos, afinaciones incluidas y monitoreo Nuve 24/7.'
            : 'Join a membership plan to enjoy priority service, exclusive discounts, included tune-ups, and 24/7 Nuve monitoring.'}
        </p>
        <Link to={isEs ? '/es/membresia' : '/membership'} className="btn-primary text-lg">
          <Star className="w-5 h-5" />
          {isEs ? 'Ver Planes' : 'View Plans'}
        </Link>
      </div>
    )
  }

  // Active plan features (example based on plan name)
  const planFeatures: Record<string, string[]> = {
    'Comfort Care': [
      '1 HVAC tune-up per year',
      'Nuve Smart Monitoring',
      'Priority scheduling',
      '10% repair discount',
      'No overtime charges',
    ],
    'Comfort Shield': [
      '2 HVAC tune-ups per year',
      'Nuve Smart Monitoring',
      'Priority scheduling',
      'Electrical safety check',
      'Plumbing inspection',
      '15% repair discount',
      '10% installation discount',
      'Waived diagnostic fees',
    ],
    'Comfort Elite': [
      '2 HVAC tune-ups per year',
      'Nuve Smart Monitoring',
      'Front-of-line priority',
      'Electrical safety check',
      'Plumbing inspection',
      '20% repair discount',
      '15% installation discount',
      'Waived diagnostic fees',
      '24/7 emergency support',
      'Dedicated account manager',
    ],
  }

  const features = planFeatures[membership.plan] || planFeatures['Comfort Care'] || []

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-8 font-[var(--font-display)]">
        {isEs ? 'Mi Plan' : 'My Plan'}
      </h1>

      {/* Plan Card */}
      <div
        className="rounded-2xl p-6 md:p-8 mb-8"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-6 h-6 text-[var(--orange)]" />
              <h2 className="text-xl font-bold text-white">{membership.plan}</h2>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  membership.status === 'active'
                    ? 'bg-[var(--green)]/10 text-[var(--green)]'
                    : membership.status === 'past_due'
                    ? 'bg-red-500/10 text-red-400'
                    : 'bg-[var(--text-muted)]/10 text-[var(--text-muted)]'
                }`}
              >
                {membership.status === 'active'
                  ? isEs ? 'Activo' : 'Active'
                  : membership.status === 'past_due'
                  ? isEs ? 'Pago Vencido' : 'Past Due'
                  : isEs ? 'Cancelado' : 'Cancelled'}
              </span>
              <span className="text-sm text-[var(--text-secondary)]">
                {membership.billing_cycle === 'monthly'
                  ? isEs ? 'Facturacion mensual' : 'Monthly billing'
                  : isEs ? 'Facturacion anual' : 'Annual billing'}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-[var(--text-muted)]">
              {isEs ? 'Proxima facturacion' : 'Next billing date'}
            </p>
            <p className="text-sm font-semibold text-white">
              {new Date(membership.next_billing_date).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="border-t border-[var(--border-subtle)] pt-6">
          <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4">
            {isEs ? 'Beneficios de su Plan' : 'Your Plan Benefits'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[var(--green)] flex-shrink-0" />
                <span className="text-sm text-[var(--text-secondary)]">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4">
        <Link
          to={isEs ? '/es/membresia' : '/membership'}
          className="btn-secondary"
        >
          <ArrowRight className="w-4 h-4" />
          {isEs ? 'Cambiar Plan' : 'Change Plan'}
        </Link>
        <Link
          to={isEs ? '/es/panel/citas' : '/dashboard/appointments'}
          className="btn-secondary"
        >
          <CalendarCheck className="w-4 h-4" />
          {isEs ? 'Programar Afinacion' : 'Schedule Tune-Up'}
        </Link>
        <button
          className="text-sm text-red-400 hover:text-red-300 transition-colors px-4 py-2"
          onClick={() => {
            if (window.confirm(isEs ? 'Esta seguro de que desea cancelar?' : 'Are you sure you want to cancel?')) {
              // Cancel logic would go here
            }
          }}
        >
          {isEs ? 'Cancelar Membresia' : 'Cancel Membership'}
        </button>
      </div>
    </div>
  )
}
