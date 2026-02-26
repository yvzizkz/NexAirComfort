import { Link } from 'react-router-dom'
import {
  PartyPopper,
  CalendarCheck,
  Thermometer,
  User,
  ArrowRight,
  Phone,
  Shield,
} from 'lucide-react'
import { useTranslation } from '@/i18n/LanguageContext'
import { useAuth } from '@/hooks/useAuth'
import { PHONE_NUMBER, PHONE_LINK } from '@/lib/constants'

export default function MembershipWelcomePage() {
  const { language } = useTranslation()
  const { user } = useAuth()
  const isEs = language === 'es'

  const firstName = user?.name?.split(' ')[0] || (isEs ? 'Miembro' : 'Member')

  const steps = isEs
    ? [
        {
          number: 1,
          title: 'Revise su Panel',
          description:
            'Acceda a su panel personalizado para ver su plan, programar servicios y monitorear su sistema HVAC.',
          link: '/es/panel',
          linkText: 'Ir al Panel',
          icon: User,
        },
        {
          number: 2,
          title: 'Programe su Primera Afinacion',
          description:
            'Su membresia incluye afinaciones de HVAC. Programe su primera para asegurar que su sistema este funcionando en optimas condiciones.',
          link: '/es/panel/citas',
          linkText: 'Programar Cita',
          icon: CalendarCheck,
        },
        {
          number: 3,
          title: 'Configure Nuve Smart Monitoring',
          description:
            'Su termostato inteligente Nuve sera instalado durante su primera visita de servicio. Monitorea su sistema 24/7 y le alerta sobre cualquier problema.',
          link: '/es/panel/nuve',
          linkText: 'Mas Sobre Nuve',
          icon: Thermometer,
        },
      ]
    : [
        {
          number: 1,
          title: 'Explore Your Dashboard',
          description:
            'Access your personalized dashboard to view your plan, schedule services, and monitor your HVAC system.',
          link: '/dashboard',
          linkText: 'Go to Dashboard',
          icon: User,
        },
        {
          number: 2,
          title: 'Schedule Your First Tune-Up',
          description:
            'Your membership includes HVAC tune-ups. Schedule your first one to make sure your system is running at peak performance.',
          link: '/dashboard/appointments',
          linkText: 'Schedule Appointment',
          icon: CalendarCheck,
        },
        {
          number: 3,
          title: 'Set Up Nuve Smart Monitoring',
          description:
            'Your Nuve smart thermostat will be installed during your first service visit. It monitors your system 24/7 and alerts you to any issues.',
          link: '/dashboard/nuve',
          linkText: 'Learn About Nuve',
          icon: Thermometer,
        },
      ]

  return (
    <section className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Celebration Header */}
        <div className="text-center mb-16">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{
              background: 'rgba(102, 187, 106, 0.12)',
              border: '1px solid rgba(102, 187, 106, 0.25)',
            }}
          >
            <PartyPopper className="w-10 h-10 text-[var(--green)]" />
          </div>

          <h1 className="gradient-heading text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 font-[var(--font-display)]">
            {isEs
              ? `Bienvenido a la Familia NexAir, ${firstName}!`
              : `Welcome to the NexAir Family, ${firstName}!`}
          </h1>

          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            {isEs
              ? 'Su membresia esta activa. Ahora tiene acceso a servicio prioritario, descuentos exclusivos y Monitoreo Inteligente Nuve. Esto es lo que sigue.'
              : 'Your membership is now active. You now have access to priority service, exclusive discounts, and Nuve Smart Monitoring. Here is what to do next.'}
          </p>
        </div>

        {/* Next Steps */}
        <div className="space-y-6 mb-16">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex gap-5 p-6 rounded-xl transition-all duration-300 hover:bg-white/[0.02]"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div className="flex-shrink-0">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-white"
                  style={{ background: 'var(--gradient-cta)' }}
                >
                  {step.number}
                </div>
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-2">
                  <step.icon className="w-5 h-5 text-[var(--sky)]" />
                  <h3 className="text-lg font-bold text-white">{step.title}</h3>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
                  {step.description}
                </p>
                <Link
                  to={step.link}
                  className="inline-flex items-center gap-1.5 text-sm text-[var(--sky)] font-semibold hover:text-[var(--sky-light)] transition-colors"
                >
                  {step.linkText}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Membership Benefits Reminder */}
        <div
          className="rounded-2xl p-8 mb-12 text-center"
          style={{
            background: 'rgba(212, 112, 42, 0.06)',
            border: '1px solid rgba(212, 112, 42, 0.15)',
          }}
        >
          <Shield className="w-10 h-10 text-[var(--orange)] mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">
            {isEs ? 'Su Hogar Ahora Esta Protegido' : 'Your Home Is Now Protected'}
          </h3>
          <p className="text-[var(--text-secondary)] leading-relaxed max-w-lg mx-auto">
            {isEs
              ? 'Como miembro de NexAir Comfort, su sistema HVAC es monitoreado por nuestro equipo. Si algo necesita atencion, lo sabremos antes que usted.'
              : 'As a NexAir Comfort member, your HVAC system is monitored by our team. If something needs attention, we will know before you do.'}
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to={isEs ? '/es/panel' : '/dashboard'}
            className="btn-primary text-lg"
          >
            {isEs ? 'Ir al Panel' : 'Go to Dashboard'}
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a href={PHONE_LINK} className="btn-secondary text-lg">
            <Phone className="w-5 h-5" />
            {PHONE_NUMBER}
          </a>
        </div>
      </div>
    </section>
  )
}
