import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Shield,
  CalendarCheck,
  Thermometer,
  Gift,
  ArrowRight,
  Clock,
  AlertCircle,
  Loader2,
  Wrench,
  DollarSign,
  CheckCircle,
} from 'lucide-react'
import { useTranslation } from '@/i18n/LanguageContext'
import { useAuth } from '@/hooks/useAuth'
import {
  fetchDashboardOverview,
  type DashboardOverview as DashboardOverviewData,
} from '@/lib/api'

export default function Overview() {
  const { t, language } = useTranslation()
  const { user } = useAuth()
  const isEs = language === 'es'
  const [data, setData] = useState<DashboardOverviewData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardOverview().then((result) => {
      if (result.success && result.data) {
        setData(result.data)
      }
      setLoading(false)
    })
  }, [])

  const firstName = user?.name?.split(' ')[0] || (isEs ? 'Usuario' : 'User')

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-10 h-10 text-[var(--sky)] animate-spin" />
      </div>
    )
  }

  const planName = data?.membership?.plan || null
  const nextAppt = data?.upcoming_appointments?.[0] || null
  const nuveConnected = data?.system_health !== null
  const referralBalance = data?.referral_stats?.total_earned || 0

  return (
    <div>
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white font-[var(--font-display)]">
          {isEs ? `Bienvenido de nuevo, ${firstName}` : `Welcome back, ${firstName}`}
        </h1>
        <p className="text-[var(--text-secondary)] mt-1">
          {isEs
            ? 'Aqui tiene un resumen rapido de su cuenta.'
            : 'Here is a quick overview of your account.'}
        </p>
      </div>

      {/* 4-Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {/* Current Plan Card */}
        <Link
          to={isEs ? '/es/panel/plan' : '/dashboard/plan'}
          className="card p-5 group hover:border-[var(--orange)] transition-colors"
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{
                background: 'rgba(212, 112, 42, 0.12)',
                border: '1px solid rgba(212, 112, 42, 0.2)',
              }}
            >
              <Shield className="w-5 h-5 text-[var(--orange)]" />
            </div>
            <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--orange)] transition-colors" />
          </div>
          <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">
            {isEs ? 'Plan Actual' : 'Current Plan'}
          </p>
          <p className="text-lg font-bold text-white">
            {planName || (isEs ? 'Sin Plan' : 'No Plan')}
          </p>
          {data?.membership?.status === 'active' && (
            <span className="inline-flex items-center gap-1 mt-2 text-xs text-[var(--green)]">
              <CheckCircle className="w-3 h-3" />
              {isEs ? 'Activo' : 'Active'}
            </span>
          )}
          {!planName && (
            <span className="inline-flex items-center gap-1 mt-2 text-xs text-[var(--orange)]">
              {isEs ? 'Unirse ahora' : 'Join now'}
            </span>
          )}
        </Link>

        {/* Next Appointment Card */}
        <Link
          to={isEs ? '/es/panel/citas' : '/dashboard/appointments'}
          className="card p-5 group hover:border-[var(--sky)] transition-colors"
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{
                background: 'rgba(74, 144, 217, 0.12)',
                border: '1px solid rgba(74, 144, 217, 0.2)',
              }}
            >
              <CalendarCheck className="w-5 h-5 text-[var(--sky)]" />
            </div>
            <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--sky)] transition-colors" />
          </div>
          <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">
            {isEs ? 'Proxima Cita' : 'Next Appointment'}
          </p>
          {nextAppt ? (
            <>
              <p className="text-lg font-bold text-white">{nextAppt.service_type}</p>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                {new Date(nextAppt.scheduled_date).toLocaleDateString()} at {nextAppt.scheduled_time}
              </p>
            </>
          ) : (
            <>
              <p className="text-lg font-bold text-white">
                {isEs ? 'Ninguna' : 'None Scheduled'}
              </p>
              <span className="inline-flex items-center gap-1 mt-2 text-xs text-[var(--sky)]">
                {isEs ? 'Programar ahora' : 'Schedule now'}
              </span>
            </>
          )}
        </Link>

        {/* Nuve Status Card */}
        <Link
          to={isEs ? '/es/panel/nuve' : '/dashboard/nuve'}
          className="card p-5 group hover:border-[var(--green)] transition-colors"
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{
                background: 'rgba(102, 187, 106, 0.12)',
                border: '1px solid rgba(102, 187, 106, 0.2)',
              }}
            >
              <Thermometer className="w-5 h-5 text-[var(--green)]" />
            </div>
            <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--green)] transition-colors" />
          </div>
          <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">
            {isEs ? 'Estado Nuve' : 'Nuve Status'}
          </p>
          {nuveConnected ? (
            <>
              <p className="text-lg font-bold text-white">
                {isEs ? 'Conectado' : 'Connected'}
              </p>
              <span className="inline-flex items-center gap-1.5 mt-2 text-xs text-[var(--green)]">
                <span className="w-2 h-2 rounded-full bg-[var(--green)] animate-pulse" />
                {isEs ? 'Monitoreando' : 'Monitoring'}
              </span>
            </>
          ) : (
            <>
              <p className="text-lg font-bold text-white">
                {isEs ? 'No Conectado' : 'Not Connected'}
              </p>
              <span className="inline-flex items-center gap-1 mt-2 text-xs text-[var(--orange)]">
                {isEs ? 'Configurar' : 'Set up'}
              </span>
            </>
          )}
        </Link>

        {/* Referral Balance Card */}
        <Link
          to={isEs ? '/es/panel/referidos' : '/dashboard/referrals'}
          className="card p-5 group hover:border-[var(--gold)] transition-colors"
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{
                background: 'rgba(212, 160, 72, 0.12)',
                border: '1px solid rgba(212, 160, 72, 0.2)',
              }}
            >
              <Gift className="w-5 h-5 text-[var(--gold)]" />
            </div>
            <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--gold)] transition-colors" />
          </div>
          <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">
            {isEs ? 'Balance de Referidos' : 'Referral Balance'}
          </p>
          <p className="text-lg font-bold text-white">
            ${referralBalance.toFixed(2)}
          </p>
          <span className="inline-flex items-center gap-1 mt-2 text-xs text-[var(--text-secondary)]">
            {isEs ? 'Ganar mas' : 'Earn more'}
          </span>
        </Link>
      </div>

      {/* Recent Activity Feed */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">
          {isEs ? 'Actividad Reciente' : 'Recent Activity'}
        </h2>
        <div
          className="rounded-xl divide-y divide-[var(--border-subtle)]"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          {data?.upcoming_appointments && data.upcoming_appointments.length > 0 ? (
            data.upcoming_appointments.slice(0, 5).map((appt) => (
              <div key={appt.id} className="flex items-center gap-4 p-4">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'rgba(74, 144, 217, 0.12)',
                    border: '1px solid rgba(74, 144, 217, 0.2)',
                  }}
                >
                  <Wrench className="w-4 h-4 text-[var(--sky)]" />
                </div>
                <div className="flex-grow min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {appt.service_type}
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">
                    {new Date(appt.scheduled_date).toLocaleDateString()} &middot; {appt.status}
                  </p>
                </div>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    appt.status === 'confirmed'
                      ? 'bg-[var(--green)]/10 text-[var(--green)]'
                      : appt.status === 'completed'
                      ? 'bg-[var(--sky)]/10 text-[var(--sky)]'
                      : appt.status === 'cancelled'
                      ? 'bg-red-500/10 text-red-400'
                      : 'bg-[var(--gold)]/10 text-[var(--gold)]'
                  }`}
                >
                  {appt.status}
                </span>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Clock className="w-8 h-8 text-[var(--text-muted)] mb-3" />
              <p className="text-sm text-[var(--text-secondary)]">
                {isEs ? 'Sin actividad reciente.' : 'No recent activity.'}
              </p>
              <Link
                to={isEs ? '/es/contacto' : '/contact'}
                className="text-sm text-[var(--sky)] font-semibold mt-2 hover:text-[var(--sky-light)] transition-colors"
              >
                {isEs ? 'Programar un servicio' : 'Schedule a service'}
              </Link>
            </div>
          )}

          {data?.recent_invoices && data.recent_invoices.length > 0 &&
            data.recent_invoices.slice(0, 3).map((inv) => (
              <div key={inv.id} className="flex items-center gap-4 p-4">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'rgba(212, 160, 72, 0.12)',
                    border: '1px solid rgba(212, 160, 72, 0.2)',
                  }}
                >
                  <DollarSign className="w-4 h-4 text-[var(--gold)]" />
                </div>
                <div className="flex-grow min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {inv.service_description}
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">
                    {new Date(inv.issued_date).toLocaleDateString()} &middot; ${inv.amount.toFixed(2)}
                  </p>
                </div>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    inv.status === 'paid'
                      ? 'bg-[var(--green)]/10 text-[var(--green)]'
                      : inv.status === 'overdue'
                      ? 'bg-red-500/10 text-red-400'
                      : 'bg-[var(--gold)]/10 text-[var(--gold)]'
                  }`}
                >
                  {inv.status}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
