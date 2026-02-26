import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Thermometer,
  Wifi,
  Activity,
  Zap,
  Bell,
  Loader2,
  ArrowRight,
  Snowflake,
  Flame,
  Power,
  Shield,
} from 'lucide-react'
import { useTranslation } from '@/i18n/LanguageContext'
import { fetchDashboardOverview, type SystemHealth } from '@/lib/api'

export default function Nuve() {
  const { language } = useTranslation()
  const isEs = language === 'es'
  const [system, setSystem] = useState<SystemHealth | null>(null)
  const [loading, setLoading] = useState(true)
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    fetchDashboardOverview().then((result) => {
      if (result.success && result.data && result.data.system_health) {
        setSystem(result.data.system_health)
        setConnected(true)
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

  // Not Connected State
  if (!connected) {
    return (
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-8 font-[var(--font-display)]">
          {isEs ? 'Mi Nuve' : 'My Nuve'}
        </h1>

        {/* Marketing Section */}
        <div
          className="rounded-2xl p-8 md:p-12 text-center mb-8"
          style={{
            background: 'rgba(74, 144, 217, 0.06)',
            border: '1px solid rgba(74, 144, 217, 0.15)',
          }}
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{
              background: 'rgba(74, 144, 217, 0.15)',
              border: '1px solid rgba(74, 144, 217, 0.25)',
            }}
          >
            <Wifi className="w-10 h-10 text-[var(--sky)]" />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-[var(--font-display)]">
            {isEs ? 'Monitoreo Inteligente Nuve' : 'Nuve Smart Monitoring'}
          </h2>

          <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            {isEs
              ? 'Conecte su sistema HVAC directamente a nuestro equipo tecnico. Nuve detecta problemas antes de que se conviertan en emergencias, optimiza su consumo de energia y mantiene su hogar comodo las 24 horas.'
              : 'Connect your HVAC system directly to our tech team. Nuve detects issues before they become emergencies, optimizes your energy usage, and keeps your home comfortable around the clock.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-lg mx-auto">
            {[
              { icon: Activity, text: isEs ? 'Monitoreo 24/7' : '24/7 Monitoring' },
              { icon: Bell, text: isEs ? 'Alertas Proactivas' : 'Proactive Alerts' },
              { icon: Zap, text: isEs ? 'Ahorro de Energia' : 'Energy Savings' },
            ].map((item) => (
              <div
                key={item.text}
                className="flex flex-col items-center gap-2 p-4 rounded-xl"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <item.icon className="w-6 h-6 text-[var(--sky)]" />
                <span className="text-xs font-semibold text-white">{item.text}</span>
              </div>
            ))}
          </div>

          <p className="text-sm text-[var(--text-secondary)] mb-6">
            {isEs
              ? 'Nuve se incluye gratis con todos los planes de membresia. Se instala durante su primera visita de servicio.'
              : 'Nuve is included free with all membership plans. It is installed during your first service visit.'}
          </p>

          <Link
            to={isEs ? '/es/membresia' : '/membership'}
            className="btn-primary"
          >
            {isEs ? 'Obtener Membresia' : 'Get a Membership'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    )
  }

  // Connected State
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-8 font-[var(--font-display)]">
        {isEs ? 'Mi Nuve' : 'My Nuve'}
      </h1>

      {/* Status Bar */}
      <div
        className="rounded-xl p-4 mb-6 flex items-center gap-3"
        style={{
          background: 'rgba(102, 187, 106, 0.08)',
          border: '1px solid rgba(102, 187, 106, 0.2)',
        }}
      >
        <span className="w-3 h-3 rounded-full bg-[var(--green)] animate-pulse" />
        <span className="text-sm font-semibold text-[var(--green)]">
          {isEs ? 'Nuve esta conectado y monitoreando su sistema' : 'Nuve is connected and monitoring your system'}
        </span>
      </div>

      {/* Main Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Temperature */}
        <div
          className="rounded-xl p-6 text-center"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <Thermometer className="w-8 h-8 text-[var(--sky)] mx-auto mb-3" />
          <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">
            {isEs ? 'Temperatura Interior' : 'Indoor Temperature'}
          </p>
          <p className="text-4xl font-bold text-white">
            74<span className="text-lg text-[var(--text-secondary)]">&#176;F</span>
          </p>
        </div>

        {/* System Status */}
        <div
          className="rounded-xl p-6 text-center"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <Activity className="w-8 h-8 text-[var(--green)] mx-auto mb-3" />
          <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">
            {isEs ? 'Estado del Sistema' : 'System Status'}
          </p>
          <p className="text-lg font-bold text-[var(--green)]">
            {isEs ? 'Normal' : 'Normal'}
          </p>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            {isEs ? 'Sin alertas' : 'No alerts'}
          </p>
        </div>

        {/* System Mode */}
        <div
          className="rounded-xl p-6 text-center"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <Snowflake className="w-8 h-8 text-[var(--sky)] mx-auto mb-3" />
          <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">
            {isEs ? 'Modo del Sistema' : 'System Mode'}
          </p>
          <p className="text-lg font-bold text-white">
            {isEs ? 'Enfriamiento' : 'Cooling'}
          </p>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            Set to 74&#176;F
          </p>
        </div>
      </div>

      {/* System Health */}
      {system && (
        <div
          className="rounded-xl p-6 mb-6"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <h3 className="text-lg font-bold text-white mb-4">
            {isEs ? 'Salud del Sistema' : 'System Health'}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-[var(--text-muted)] mb-1">
                {isEs ? 'Ultimo Mantenimiento' : 'Last Maintenance'}
              </p>
              <p className="text-sm font-semibold text-white">
                {new Date(system.last_maintenance).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-[var(--text-muted)] mb-1">
                {isEs ? 'Proximo Recomendado' : 'Next Recommended'}
              </p>
              <p className="text-sm font-semibold text-white">
                {new Date(system.next_recommended).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-[var(--text-muted)] mb-1">
                {isEs ? 'Edad del Sistema' : 'System Age'}
              </p>
              <p className="text-sm font-semibold text-white">
                {system.system_age_years} {isEs ? 'anos' : 'years'}
              </p>
            </div>
            <div>
              <p className="text-xs text-[var(--text-muted)] mb-1">
                {isEs ? 'Eficiencia' : 'Efficiency'}
              </p>
              <p className="text-sm font-semibold text-[var(--green)]">
                {system.efficiency_rating}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
