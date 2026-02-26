import { useState, useEffect } from 'react'
import {
  Wrench,
  AirVent,
  Flame,
  ShieldCheck,
  Wind,
  Sparkles,
  Loader2,
  Clock,
  DollarSign,
  FileText,
} from 'lucide-react'
import { useTranslation } from '@/i18n/LanguageContext'
import { fetchAppointments, type Appointment } from '@/lib/api'

const FILTER_OPTIONS = [
  { value: 'all', label: 'All Services', labelEs: 'Todos los Servicios' },
  { value: 'AC Repair', label: 'AC Repair', labelEs: 'Reparacion AC' },
  { value: 'AC Installation', label: 'AC Installation', labelEs: 'Instalacion AC' },
  { value: 'Heating', label: 'Heating', labelEs: 'Calefaccion' },
  { value: 'Maintenance', label: 'Maintenance', labelEs: 'Mantenimiento' },
  { value: 'Mini-Split', label: 'Mini-Split', labelEs: 'Mini-Split' },
  { value: 'Air Quality', label: 'Air Quality', labelEs: 'Calidad de Aire' },
]

export default function History() {
  const { language } = useTranslation()
  const isEs = language === 'es'
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchAppointments().then((result) => {
      if (result.success && result.data) {
        setAppointments(
          result.data.filter((a) => a.status === 'completed')
        )
      }
      setLoading(false)
    })
  }, [])

  const filteredHistory =
    filter === 'all'
      ? appointments
      : appointments.filter((a) =>
          a.service_type.toLowerCase().includes(filter.toLowerCase())
        )

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-8 font-[var(--font-display)]">
        {isEs ? 'Historial de Servicios' : 'Service History'}
      </h1>

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              filter === opt.value
                ? 'bg-[var(--sky)]/15 text-white border border-[var(--sky)]/30'
                : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:border-[var(--sky)]/30 hover:text-white'
            }`}
          >
            {isEs ? opt.labelEs : opt.label}
          </button>
        ))}
      </div>

      {/* Timeline */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-10 h-10 text-[var(--sky)] animate-spin" />
        </div>
      ) : filteredHistory.length === 0 ? (
        <div className="text-center py-16">
          <Clock className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4" />
          <p className="text-[var(--text-secondary)] text-lg">
            {isEs
              ? 'No se encontro historial de servicios.'
              : 'No service history found.'}
          </p>
        </div>
      ) : (
        <div className="relative">
          {/* Timeline Line */}
          <div
            className="absolute left-5 top-0 bottom-0 w-px"
            style={{ background: 'var(--border-subtle)' }}
          />

          <div className="space-y-6">
            {filteredHistory.map((entry) => (
              <div key={entry.id} className="relative flex gap-5 pl-2">
                {/* Dot */}
                <div className="relative z-10 flex-shrink-0">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      background: 'rgba(74, 144, 217, 0.12)',
                      border: '1px solid rgba(74, 144, 217, 0.25)',
                    }}
                  >
                    <Wrench className="w-4 h-4 text-[var(--sky)]" />
                  </div>
                </div>

                {/* Content */}
                <div
                  className="flex-grow rounded-xl p-5"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <h3 className="text-base font-semibold text-white">
                      {entry.service_type}
                    </h3>
                    <span className="text-xs text-[var(--text-muted)]">
                      {new Date(entry.scheduled_date).toLocaleDateString()}
                    </span>
                  </div>
                  {entry.notes && (
                    <p className="text-sm text-[var(--text-secondary)] mb-2">
                      {entry.notes}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
                    {entry.technician_name && (
                      <span className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {entry.technician_name}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {entry.scheduled_time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
