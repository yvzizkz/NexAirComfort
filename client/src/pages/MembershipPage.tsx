import { useState } from 'react'
import { useTranslation } from '@/i18n/LanguageContext'
import SEOHead from '@/components/SEOHead'
import MembershipCard from '@/components/MembershipCard'
import CTABanner from '@/components/CTABanner'
import { Check, X, ChevronDown, ChevronUp, Wifi, Shield, Phone } from 'lucide-react'
import { createCheckoutSession } from '@/lib/api'

const plans = [
  {
    key: 'comfortCare' as const,
    name: 'Comfort Care',
    monthlyPrice: 25,
    annualPrice: 269,
    popular: false,
  },
  {
    key: 'comfortShield' as const,
    name: 'Comfort Shield',
    monthlyPrice: 42,
    annualPrice: 449,
    popular: true,
  },
  {
    key: 'comfortElite' as const,
    name: 'Comfort Elite',
    monthlyPrice: 67,
    annualPrice: 719,
    popular: false,
  },
]

const featureMatrix = [
  { label: 'HVAC Tune-Ups', care: '1/year', shield: '2/year', elite: '2/year' },
  { label: 'Nuve Smart Monitoring', care: true, shield: true, elite: true },
  { label: 'Priority Scheduling', care: 'Standard', shield: 'Priority', elite: 'VIP (same-day)' },
  { label: 'Electrical Safety Check', care: true, shield: true, elite: true },
  { label: 'Plumbing Safety Check', care: true, shield: true, elite: true },
  { label: 'Repair Discount', care: '5%', shield: '10%', elite: '15%' },
  { label: 'Install Discount', care: false, shield: false, elite: '15%' },
  { label: 'Waived Diagnostics ($89)', care: false, shield: true, elite: true },
  { label: '24/7 Emergency Support', care: false, shield: true, elite: true },
  { label: 'Front-of-Line Emergency', care: false, shield: false, elite: true },
]

const faqs = [
  {
    q: 'What is included in a tune-up?',
    a: 'Our tune-ups include a comprehensive 50+ point inspection, coil cleaning, refrigerant check, electrical connection tightening, thermostat calibration, filter replacement, drain line clearing, and a full efficiency performance report.',
  },
  {
    q: 'Can I cancel my membership anytime?',
    a: 'Yes, you can cancel anytime. Monthly memberships can be canceled at any time and will remain active until the end of your billing period. Annual memberships are non-refundable but will remain active for the full year.',
  },
  {
    q: 'What is the Nuve Smart Thermostat?',
    a: 'The Nuve Smart Thermostat is a WiFi-connected thermostat branded with the NexAir logo. It monitors your HVAC system 24/7, sends you and our team alerts when it detects issues, and allows one-touch service requests. It is included with all membership plans.',
  },
  {
    q: 'How does priority scheduling work?',
    a: 'Comfort Shield members get priority scheduling, meaning you are moved ahead of non-members in the queue. Comfort Elite members get VIP same-day scheduling — we guarantee a technician visit the same day you call.',
  },
  {
    q: 'Do discounts apply to all services?',
    a: 'Repair discounts apply to all HVAC, plumbing, and electrical repair services. The 15% install discount (Elite only) applies to new system installations. Discounts cannot be combined with other promotions.',
  },
  {
    q: 'What happens if I need emergency service?',
    a: 'Comfort Shield and Elite members have access to 24/7 emergency support. Elite members are guaranteed front-of-line emergency service. Non-members and Comfort Care members can still call our emergency line, but members are prioritized.',
  },
]

export default function MembershipPage() {
  const { t, language } = useTranslation()
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleSelect = async (plan: string) => {
    try {
      const { url } = await createCheckoutSession(plan, billingCycle)
      if (url) window.location.href = url
    } catch {
      alert('Unable to start checkout. Please try again.')
    }
  }

  return (
    <>
      <SEOHead
        title={language === 'es' ? 'Membresias | NexAir Comfort' : 'Membership Plans | NexAir Comfort'}
        description={language === 'es' ? 'Planes de membresia HVAC con monitoreo Nuve 24/7, mantenimientos incluidos y descuentos exclusivos.' : 'HVAC membership plans with 24/7 Nuve monitoring, included tune-ups, and exclusive discounts.'}
        path={language === 'es' ? '/es/membresia' : '/membership'}
      />

      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="glow-sky" />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <span className="badge bg-sky/15 text-sky mb-4 inline-block">
            {language === 'es' ? 'PLANES DE MEMBRESIA' : 'MEMBERSHIP PLANS'}
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-extrabold gradient-heading mb-6">
            {language === 'es' ? 'Proteja Su Hogar Todo el Ano' : 'Protect Your Home Year-Round'}
          </h1>
          <p className="text-lg text-[--text-secondary] max-w-2xl mx-auto mb-10">
            {language === 'es'
              ? 'Planes de mantenimiento que mantienen su sistema HVAC funcionando eficientemente, con monitoreo inteligente Nuve incluido.'
              : 'Maintenance plans that keep your HVAC running efficiently, with Nuve smart monitoring included.'}
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-4 bg-[--bg-card] border border-[--border-subtle] rounded-full p-1.5 mb-12">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                billingCycle === 'monthly' ? 'gradient-cta text-white' : 'text-[--text-secondary] hover:text-[--text-primary]'
              }`}
            >
              {language === 'es' ? 'Mensual' : 'Monthly'}
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                billingCycle === 'annual' ? 'gradient-cta text-white' : 'text-[--text-secondary] hover:text-[--text-primary]'
              }`}
            >
              {language === 'es' ? 'Anual' : 'Annual'}
              <span className="ml-2 text-green text-xs">
                {language === 'es' ? '(Ahorre 10%)' : '(Save 10%)'}
              </span>
            </button>
          </div>

          {/* Plan cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <MembershipCard
                key={plan.key}
                planName={plan.name}
                monthlyPrice={plan.monthlyPrice}
                annualPrice={plan.annualPrice}
                features={
                  plan.key === 'comfortCare'
                    ? ['1 HVAC Tune-Up/year', 'Nuve 24/7 Monitoring', 'Electrical Safety Check', 'Plumbing Safety Check', '5% Repair Discount']
                    : plan.key === 'comfortShield'
                    ? ['2 HVAC Tune-Ups/year', 'Nuve 24/7 Monitoring', 'Priority Scheduling', 'Electrical & Plumbing Checks', '10% Repair Discount', 'Waived Diagnostics ($89)', '24/7 Emergency Support']
                    : ['2 HVAC Tune-Ups/year', 'Nuve 24/7 Monitoring', 'VIP Same-Day Scheduling', 'Electrical & Plumbing Checks', '15% Repair & Install Discount', 'Waived Diagnostics ($89)', '24/7 Emergency Support', 'Front-of-Line Emergency']
                }
                isPopular={plan.popular}
                billingCycle={billingCycle}
                onSelect={() => handleSelect(plan.key)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Feature comparison */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-display font-bold gradient-heading text-center mb-12">
            {language === 'es' ? 'Comparar Planes' : 'Compare Plans'}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[--border-subtle]">
                  <th className="text-left py-4 px-4 text-[--text-secondary] font-medium">
                    {language === 'es' ? 'Caracteristica' : 'Feature'}
                  </th>
                  <th className="text-center py-4 px-4 text-[--text-primary] font-semibold">Comfort Care</th>
                  <th className="text-center py-4 px-4 text-orange font-semibold">Comfort Shield</th>
                  <th className="text-center py-4 px-4 text-[--text-primary] font-semibold">Comfort Elite</th>
                </tr>
              </thead>
              <tbody>
                {featureMatrix.map((row, i) => (
                  <tr key={i} className="border-b border-[--border-subtle]">
                    <td className="py-3 px-4 text-[--text-secondary]">{row.label}</td>
                    {(['care', 'shield', 'elite'] as const).map((tier) => {
                      const val = row[tier]
                      return (
                        <td key={tier} className="text-center py-3 px-4">
                          {val === true ? (
                            <Check className="w-5 h-5 text-green mx-auto" />
                          ) : val === false ? (
                            <X className="w-5 h-5 text-[--text-muted] mx-auto" />
                          ) : (
                            <span className="text-[--text-primary] font-medium">{val}</span>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Nuve integration callout */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto card p-8 md:p-12 border-sky/20">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 rounded-full bg-sky/15 flex items-center justify-center flex-shrink-0">
              <Wifi className="w-10 h-10 text-sky" />
            </div>
            <div>
              <h3 className="text-2xl font-display font-bold mb-3">
                {language === 'es' ? 'Monitoreo Inteligente Nuve Incluido' : 'Nuve Smart Monitoring Included'}
              </h3>
              <p className="text-[--text-secondary] leading-relaxed">
                {language === 'es'
                  ? 'Cada plan de membresia incluye nuestro termostato inteligente Nuve, que monitorea su sistema HVAC 24/7. Reciba alertas antes de que surjan problemas y solicite servicio con un solo toque.'
                  : 'Every membership plan includes our Nuve Smart Thermostat, which monitors your HVAC system 24/7. Get alerts before problems arise and request service with one touch.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-display font-bold gradient-heading text-center mb-12">
            {language === 'es' ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'}
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="card p-0 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-[--bg-card-hover] transition-all"
                  aria-expanded={openFaq === i}
                >
                  <span className="font-semibold pr-4">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-sky flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-[--text-muted] flex-shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-[--text-secondary] leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        heading={language === 'es' ? 'Listo para Proteger su Hogar?' : 'Ready to Protect Your Home?'}
        subheading={language === 'es' ? 'Unase a la familia NexAir Comfort hoy' : 'Join the NexAir Comfort family today'}
        buttonText={language === 'es' ? 'Llamar Ahora' : 'Call Now'}
        buttonLink="tel:4809996100"
        variant="orange"
      />
    </>
  )
}
