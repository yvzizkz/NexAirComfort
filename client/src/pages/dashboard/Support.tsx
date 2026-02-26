import { useState } from 'react'
import {
  MessageCircle,
  Phone,
  PhoneCall,
  Mail,
  ChevronDown,
  ExternalLink,
} from 'lucide-react'
import { useTranslation } from '@/i18n/LanguageContext'
import { PHONE_NUMBER, PHONE_LINK } from '@/lib/constants'

export default function Support() {
  const { language } = useTranslation()
  const isEs = language === 'es'
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const supportCards = [
    {
      icon: MessageCircle,
      title: isEs ? 'Chat en Vivo' : 'Live Chat',
      desc: isEs
        ? 'Hable con un representante en linea durante horarios de oficina.'
        : 'Chat with a representative online during business hours.',
      action: isEs ? 'Iniciar Chat' : 'Start Chat',
      color: 'var(--sky)',
      bgColor: 'rgba(74, 144, 217, 0.12)',
      borderColor: 'rgba(74, 144, 217, 0.2)',
      onClick: () => {
        // Open chat widget
        const chatBtn = document.querySelector('[aria-label="Open chat"]') as HTMLButtonElement
        if (chatBtn) chatBtn.click()
      },
    },
    {
      icon: Phone,
      title: isEs ? 'Llamenos' : 'Call Us',
      desc: isEs
        ? `Disponible L-V 7am-7pm, S 8am-5pm. ${PHONE_NUMBER}`
        : `Available M-F 7am-7pm, Sat 8am-5pm. ${PHONE_NUMBER}`,
      action: isEs ? 'Llamar Ahora' : 'Call Now',
      color: 'var(--green)',
      bgColor: 'rgba(102, 187, 106, 0.12)',
      borderColor: 'rgba(102, 187, 106, 0.2)',
      href: PHONE_LINK,
    },
    {
      icon: PhoneCall,
      title: isEs ? 'Solicitar Devolucion de Llamada' : 'Request Callback',
      desc: isEs
        ? 'Dejenos su numero y le devolveremos la llamada en 30 minutos.'
        : 'Leave your number and we will call you back within 30 minutes.',
      action: isEs ? 'Solicitar Llamada' : 'Request Callback',
      color: 'var(--orange)',
      bgColor: 'rgba(212, 112, 42, 0.12)',
      borderColor: 'rgba(212, 112, 42, 0.2)',
      href: `${PHONE_LINK}`,
    },
    {
      icon: Mail,
      title: isEs ? 'Correo Electronico' : 'Email',
      desc: isEs
        ? 'Envie un correo a support@nexaircomfort.com para consultas no urgentes.'
        : 'Email support@nexaircomfort.com for non-urgent inquiries.',
      action: isEs ? 'Enviar Correo' : 'Send Email',
      color: 'var(--gold)',
      bgColor: 'rgba(212, 160, 72, 0.12)',
      borderColor: 'rgba(212, 160, 72, 0.2)',
      href: 'mailto:support@nexaircomfort.com',
    },
  ]

  const faqs = isEs
    ? [
        {
          q: 'Como programo una cita de servicio?',
          a: 'Puede programar una cita a traves de su panel de control haciendo clic en "Programar Nueva" en la pagina de Citas, o llamendonos directamente al (480) 999-6100.',
        },
        {
          q: 'Que hago si mi AC deja de funcionar?',
          a: 'Si es una emergencia, llame a nuestra linea de emergencia 24/7 al (480) 999-6100 y presione 1. Los miembros Comfort Shield y Elite tienen servicio de emergencia prioritario.',
        },
        {
          q: 'Como cambio o cancelo mi membresia?',
          a: 'Vaya a la pagina "Mi Plan" en su panel y haga clic en "Cambiar Plan" o "Cancelar Membresia". Tambien puede llamarnos para hacer cambios.',
        },
        {
          q: 'Que incluye mi afinacion de HVAC?',
          a: 'Nuestras afinaciones incluyen una inspeccion de 50+ puntos, limpieza de bobinas, verificacion de refrigerante, ajuste de conexiones electricas, calibracion del termostato, reemplazo de filtro y mas.',
        },
        {
          q: 'Como funciona Nuve Smart Monitoring?',
          a: 'Nuve monitorea su sistema HVAC 24/7, enviando alertas a usted y a nuestro equipo cuando detecta un problema. Se instala durante su primera visita de servicio como miembro.',
        },
        {
          q: 'Puedo transferir mi membresia si me mudo?',
          a: 'Si, puede transferir su membresia a su nueva direccion dentro del area metropolitana de Phoenix. Contactenos y haremos la actualizacion.',
        },
      ]
    : [
        {
          q: 'How do I schedule a service appointment?',
          a: 'You can schedule an appointment through your dashboard by clicking "Schedule New" on the Appointments page, or call us directly at (480) 999-6100.',
        },
        {
          q: 'What should I do if my AC stops working?',
          a: 'If it is an emergency, call our 24/7 emergency line at (480) 999-6100 and press 1. Comfort Shield and Elite members receive priority emergency service.',
        },
        {
          q: 'How do I change or cancel my membership?',
          a: 'Go to the "My Plan" page in your dashboard and click "Change Plan" or "Cancel Membership." You can also call us to make changes over the phone.',
        },
        {
          q: 'What is included in an HVAC tune-up?',
          a: 'Our tune-ups include a 50+ point inspection, coil cleaning, refrigerant check, electrical connection tightening, thermostat calibration, filter replacement, and more.',
        },
        {
          q: 'How does Nuve Smart Monitoring work?',
          a: 'Nuve monitors your HVAC system 24/7, sending alerts to you and our team when it detects an issue. It is installed during your first service visit as a member.',
        },
        {
          q: 'Can I transfer my membership if I move?',
          a: 'Yes, you can transfer your membership to your new address within the Phoenix metro area. Contact us and we will update your account.',
        },
      ]

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-8 font-[var(--font-display)]">
        {isEs ? 'Obtener Ayuda' : 'Get Help'}
      </h1>

      {/* Support Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        {supportCards.map((card) => {
          const inner = (
            <>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{
                  background: card.bgColor,
                  border: `1px solid ${card.borderColor}`,
                }}
              >
                <card.icon className="w-6 h-6" style={{ color: card.color }} />
              </div>
              <h3 className="text-base font-bold text-white mb-1">{card.title}</h3>
              <p className="text-xs text-[var(--text-secondary)] mb-4 leading-relaxed">
                {card.desc}
              </p>
              <span
                className="text-sm font-semibold inline-flex items-center gap-1"
                style={{ color: card.color }}
              >
                {card.action}
                {card.href && <ExternalLink className="w-3 h-3" />}
              </span>
            </>
          )

          if (card.href) {
            return (
              <a
                key={card.title}
                href={card.href}
                className="rounded-xl p-5 transition-all duration-300 hover:bg-white/[0.02] block"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                {inner}
              </a>
            )
          }

          return (
            <button
              key={card.title}
              onClick={card.onClick}
              className="rounded-xl p-5 transition-all duration-300 hover:bg-white/[0.02] text-left w-full"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              {inner}
            </button>
          )
        })}
      </div>

      {/* FAQ */}
      <h2 className="text-lg font-bold text-white mb-6">
        {isEs ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'}
      </h2>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden transition-all duration-300"
            style={{
              background: 'var(--bg-card)',
              border: `1px solid ${
                openFaq === i ? 'rgba(74, 144, 217, 0.3)' : 'var(--border-subtle)'
              }`,
            }}
          >
            <button
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="w-full flex items-center justify-between p-4 text-left"
              aria-expanded={openFaq === i}
            >
              <span className="text-sm font-semibold text-white pr-4">{faq.q}</span>
              <ChevronDown
                className={`w-4 h-4 text-[var(--text-secondary)] flex-shrink-0 transition-transform duration-300 ${
                  openFaq === i ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openFaq === i ? 'max-h-60 pb-4' : 'max-h-0'
              }`}
            >
              <p className="px-4 text-sm text-[var(--text-secondary)] leading-relaxed">
                {faq.a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
