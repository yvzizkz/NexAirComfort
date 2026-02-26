import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  CalendarCheck,
  Plus,
  Loader2,
  Clock,
  MapPin,
  User,
  FileText,
} from 'lucide-react'
import { useTranslation } from '@/i18n/LanguageContext'
import { fetchAppointments, type Appointment } from '@/lib/api'

type Tab = 'upcoming' | 'past'

export default function Appointments() {
  const { language } = useTranslation()
  const isEs = language === 'es'
  const [tab, setTab] = useState<Tab>('upcoming')
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAppointments().then((result) => {
      if (result.success && result.data) {
        setAppointments(result.data)
      }
      setLoading(false)
    })
  }, [])

  const now = new Date()
  const upcoming = appointments.filter(
    (a) => new Date(a.scheduled_date) >= now && a.status !== 'cancelled'
  )
  const past = appointments.filter(
    (a) => new Date(a.scheduled_date) < now || a.status === 'completed' || a.status === 'cancelled'
  )

  const displayed = tab === 'upcoming' ? upcoming : past

  const statusColors: Record<string, string> = {
    pending: 'bg-[var(--gold)]/10 text-[var(--gold)]',
    confirmed: 'bg-[var(--green)]/10 text-[var(--green)]',
    completed: 'bg-[var(--sky)]/10 text-[var(--sky)]',
    cancelled: 'bg-red-500/10 text-red-400',
  }

  const statusLabels: Record<string, string> = isEs
    ? { pending: 'Pendiente', confirmed: 'Confirmada', completed: 'Completada', cancelled: 'Cancelada' }
    : { pending: 'Pending', confirmed: 'Confirmed', completed: 'Completed', cancelled: 'Cancelled' }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white font-[var(--font-display)]">
          {isEs ? 'Citas' : 'Appointments'}
        </h1>
        <Link
          to={isEs ? '/es/contacto' : '/contact'}
          className="btn-primary"
        >
          <Plus className="w-4 h-4" />
          {isEs ? 'Programar Nueva' : 'Schedule New'}
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl mb-6 inline-flex" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
        {(['upcoming', 'past'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
              tab === t
                ? 'bg-[var(--sky)]/15 text-white'
                : 'text-[var(--text-secondary)] hover:text-white'
            }`}
          >
            {t === 'upcoming'
              ? isEs ? 'Proximas' : 'Upcoming'
              : isEs ? 'Pasadas' : 'Past'}
            <span className="ml-1.5 text-xs text-[var(--text-muted)]">
              ({t === 'upcoming' ? upcoming.length : past.length})
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-10 h-10 text-[var(--sky)] animate-spin" />
        </div>
      ) : displayed.length === 0 ? (
        <div className="text-center py-16">
          <CalendarCheck className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4" />
          <p className="text-[var(--text-secondary)] text-lg mb-2">
            {tab === 'upcoming'
              ? isEs ? 'No tiene citas proximas.' : 'No upcoming appointments.'
              : isEs ? 'No tiene citas pasadas.' : 'No past appointments.'}
          </p>
          {tab === 'upcoming' && (
            <Link
              to={isEs ? '/es/contacto' : '/contact'}
              className="text-[var(--sky)] text-sm font-semibold hover:text-[var(--sky-light)] transition-colors"
            >
              {isEs ? 'Programar un servicio' : 'Schedule a service'}
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {displayed.map((appt) => (
            <div
              key={appt.id}
              className="rounded-xl p-5 transition-all duration-300 hover:bg-white/[0.02]"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                <h3 className="text-base font-semibold text-white">
                  {appt.service_type}
                </h3>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full inline-flex w-fit ${
                    statusColors[appt.status] || statusColors.pending
                  }`}
                >
                  {statusLabels[appt.status] || appt.status}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-[var(--text-secondary)]">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[var(--text-muted)]" />
                  {new Date(appt.scheduled_date).toLocaleDateString()} at {appt.scheduled_time}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[var(--text-muted)]" />
                  {appt.address}
                </span>
                {appt.technician_name && (
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[var(--text-muted)]" />
                    {appt.technician_name}
                  </span>
                )}
              </div>
              {appt.notes && (
                <div className="mt-3 flex items-start gap-2 text-xs text-[var(--text-muted)]">
                  <FileText className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  {appt.notes}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
