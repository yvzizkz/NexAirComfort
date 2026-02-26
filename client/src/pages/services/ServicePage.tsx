import { useParams, Link } from 'react-router-dom'
import { useState, type FormEvent } from 'react'
import {
  Wrench,
  AirVent,
  Flame,
  ShieldCheck,
  Wind,
  Sparkles,
  CalendarCheck,
  Phone,
  CheckCircle,
  Star,
  ArrowRight,
  Send,
  Loader2,
  AlertTriangle,
  type LucideIcon,
} from 'lucide-react'
import { useTranslation } from '@/i18n/LanguageContext'
import SEOHead from '@/components/SEOHead'
import CTABanner from '@/components/CTABanner'
import { PHONE_NUMBER, PHONE_LINK, MEMBERSHIP_PLANS } from '@/lib/constants'
import { submitContactForm } from '@/lib/api'

// ─── Service Data ────────────────────────────────────────────────────────────

interface ServiceData {
  slug: string
  name: string
  tagline: string
  heroDescription: string
  icon: LucideIcon
  problemTitle: string
  problemDescription: string
  solutionTitle: string
  solutionDescription: string
  features: string[]
  pricingNote: string
  testimonial: {
    quote: string
    author: string
    location: string
    rating: number
  }
}

const SERVICE_DATA: Record<string, ServiceData> = {
  'ac-repair': {
    slug: 'ac-repair',
    name: 'AC Repair',
    tagline: 'Fast, Reliable AC Repair in Phoenix',
    heroDescription:
      'When your AC fails in the Arizona heat, every minute matters. NexAir Comfort provides same-day AC repair service with upfront pricing and a satisfaction guarantee.',
    icon: Wrench,
    problemTitle: 'Phoenix Heat Is No Joke',
    problemDescription:
      'With summer temperatures regularly exceeding 110 degrees, a broken AC is not just uncomfortable -- it is dangerous. Waiting days for a repair is not an option for Arizona families. That is why NexAir Comfort offers same-day emergency AC repair, fully stocked service vehicles, and technicians who arrive ready to fix the problem on the first visit.',
    solutionTitle: 'Our AC Repair Process',
    solutionDescription:
      'We start with a thorough 21-point diagnostic to identify the exact issue. Before any work begins, we provide a clear, upfront estimate -- no surprises. Our technicians carry the most common parts on their trucks, so most repairs are completed in a single visit.',
    features: [
      '21-point system diagnostic',
      'Upfront pricing before work begins',
      'Same-day and emergency service',
      'All major brands serviced',
      'Parts and labor warranty',
      '24/7 emergency availability',
      'EPA-certified refrigerant handling',
      'Nuve monitoring post-repair',
    ],
    pricingNote: '$49.95 diagnostic fee (waived with repair). Most repairs completed same-day.',
    testimonial: {
      quote:
        'Our AC died on a Friday at 5PM in July. NexAir had a technician at our door within an hour and our system was running again by 7PM. Absolute lifesavers.',
      author: 'Jennifer M.',
      location: 'Scottsdale, AZ',
      rating: 5,
    },
  },
  'ac-installation': {
    slug: 'ac-installation',
    name: 'AC Installation',
    tagline: 'Expert AC Installation for Phoenix Homes',
    heroDescription:
      'Whether you are replacing an aging system or installing new construction AC, NexAir Comfort delivers expert installation with top-rated equipment, proper load calculations, and comprehensive warranties.',
    icon: AirVent,
    problemTitle: 'The Right System Matters in Arizona',
    problemDescription:
      'An improperly sized or installed AC system will cost you thousands in energy bills and fail years before it should. In the Phoenix heat, getting the installation right is critical. NexAir Comfort performs Manual J load calculations for every installation to ensure your system is perfectly matched to your home.',
    solutionTitle: 'Our Installation Process',
    solutionDescription:
      'We start with a free in-home consultation to assess your home, ductwork, and comfort goals. We recommend systems based on efficiency, reliability, and your budget -- not sales commissions. Every installation includes a post-install inspection and Nuve monitoring setup.',
    features: [
      'Free in-home consultation and estimate',
      'Manual J load calculation',
      'Premium equipment from Carrier, Lennox, Trane',
      'Professional ductwork evaluation',
      'Permit pulling and inspection',
      'Manufacturer warranty registration',
      'Post-install performance verification',
      'Nuve Smart Monitoring setup',
    ],
    pricingNote: 'Free in-home estimates. Financing available with approved credit.',
    testimonial: {
      quote:
        'NexAir helped us choose a high-efficiency system that cut our summer electric bills by 30%. The installation was clean, professional, and completed on schedule.',
      author: 'Robert & Linda K.',
      location: 'Gilbert, AZ',
      rating: 5,
    },
  },
  heating: {
    slug: 'heating',
    name: 'Heating Services',
    tagline: 'Keep Warm During Arizona\'s Cool Desert Nights',
    heroDescription:
      'Arizona winters bring surprisingly cold nights. NexAir Comfort provides expert furnace and heat pump repair, installation, and maintenance to keep your home comfortable year-round.',
    icon: Flame,
    problemTitle: 'Desert Nights Get Cold',
    problemDescription:
      'While Arizona is known for its heat, winter nighttime temperatures in the Valley can drop into the 30s and 40s. A reliable heating system is essential for comfort and safety, especially for families with young children and elderly members. Many homes rely on heat pumps that also serve as their AC system, making year-round maintenance crucial.',
    solutionTitle: 'Our Heating Services',
    solutionDescription:
      'From furnace repairs to heat pump installations, our team handles all heating needs. We service gas furnaces, electric furnaces, heat pumps, and dual-fuel systems. Every heating service includes a safety inspection to check for carbon monoxide risks and electrical hazards.',
    features: [
      'Furnace repair and installation',
      'Heat pump service and replacement',
      'Dual-fuel system expertise',
      'Carbon monoxide safety checks',
      'Thermostat calibration',
      'Ductwork inspection',
      'Emergency heating repair',
      'Energy efficiency evaluation',
    ],
    pricingNote: '$49.95 diagnostic fee (waived with repair). Seasonal tune-ups starting at $79.',
    testimonial: {
      quote:
        'Our furnace stopped working on Christmas Eve. NexAir came out within two hours and had us warm again before dinner. True emergency service when we needed it most.',
      author: 'Michael T.',
      location: 'Chandler, AZ',
      rating: 5,
    },
  },
  maintenance: {
    slug: 'maintenance',
    name: 'Preventive Maintenance',
    tagline: 'Protect Your Investment with Regular Tune-Ups',
    heroDescription:
      'Preventive maintenance is the smartest investment you can make in your HVAC system. Regular tune-ups extend equipment life, improve efficiency, and prevent costly emergency breakdowns.',
    icon: ShieldCheck,
    problemTitle: 'Why Maintenance Matters in Phoenix',
    problemDescription:
      'Arizona HVAC systems work harder than almost anywhere else in the country. Running 8-10 months of the year, your AC accumulates dust, wear, and stress that silently degrades performance. A system that is not maintained regularly loses 5% efficiency every year -- costing you money on every utility bill and shortening the life of your equipment.',
    solutionTitle: 'What Is Included in a Tune-Up',
    solutionDescription:
      'Our comprehensive tune-up covers every critical component of your HVAC system. We clean, inspect, calibrate, and test to ensure peak performance and catch small issues before they become big problems.',
    features: [
      '21-point system inspection',
      'Coil cleaning and treatment',
      'Refrigerant level check and top-off',
      'Electrical connection tightening',
      'Thermostat calibration',
      'Filter replacement',
      'Condensate drain clearing',
      'Safety controls verification',
    ],
    pricingNote: 'Starting at $49 per visit. Membership plans include tune-ups at no additional cost.',
    testimonial: {
      quote:
        'Since joining the NexAir membership and getting regular tune-ups, we have not had a single AC breakdown in three years. It completely pays for itself.',
      author: 'Carlos & Maria R.',
      location: 'Mesa, AZ',
      rating: 5,
    },
  },
  'mini-splits': {
    slug: 'mini-splits',
    name: 'Ductless Mini-Splits',
    tagline: 'Flexible, Efficient Zone Cooling and Heating',
    heroDescription:
      'Ductless mini-split systems offer energy-efficient cooling and heating without the need for ductwork. Perfect for room additions, garages, and homes looking for zone control.',
    icon: Wind,
    problemTitle: 'Not Every Space Has Ductwork',
    problemDescription:
      'Room additions, converted garages, casitas, and older homes often lack proper ductwork. Running new ducts can be expensive and impractical. Mini-splits solve this problem by delivering powerful, efficient cooling and heating directly where you need it -- with no ducts required.',
    solutionTitle: 'Our Mini-Split Solutions',
    solutionDescription:
      'We design custom mini-split installations based on your space, usage, and budget. Whether you need a single-zone system for a garage office or a multi-zone setup for an entire guest house, our team delivers clean, professional installations with optimal placement for maximum comfort.',
    features: [
      'Single and multi-zone configurations',
      'Up to 25 SEER2 efficiency',
      'Heating and cooling in one system',
      'Whisper-quiet operation',
      'WiFi-enabled controls',
      'No ductwork required',
      'Professional installation with concealed lines',
      'Manufacturer warranty included',
    ],
    pricingNote: 'Free in-home estimates. Single-zone systems starting at $3,500 installed.',
    testimonial: {
      quote:
        'We added a mini-split to our garage conversion and it is now the most comfortable room in the house. NexAir installed it in half a day with zero mess.',
      author: 'David L.',
      location: 'Tempe, AZ',
      rating: 5,
    },
  },
  'indoor-air-quality': {
    slug: 'indoor-air-quality',
    name: 'Indoor Air Quality',
    tagline: 'Breathe Easier with Cleaner Indoor Air',
    heroDescription:
      'Arizona homes face unique air quality challenges -- from desert dust to wildfire smoke. NexAir Comfort offers a full range of air purification, filtration, and humidity control solutions.',
    icon: Sparkles,
    problemTitle: 'Arizona Air Quality Challenges',
    problemDescription:
      'Living in the desert means dealing with fine dust, allergens, low humidity, and increasingly, wildfire smoke. Most people spend 90% of their time indoors, and indoor air can be 2-5 times more polluted than outdoor air. For families with allergies, asthma, or respiratory conditions, poor indoor air quality is a serious health concern.',
    solutionTitle: 'Our Air Quality Solutions',
    solutionDescription:
      'We offer a comprehensive approach to indoor air quality that addresses filtration, purification, humidity, and ventilation. Our team will assess your home and recommend the right combination of solutions for your specific needs and budget.',
    features: [
      'HEPA and media air filtration systems',
      'UV-C germicidal light installation',
      'Whole-home air purifiers',
      'Humidifier and dehumidifier systems',
      'Air quality testing and assessment',
      'Duct cleaning referral coordination',
      'Fresh air ventilation systems',
      'Allergen reduction strategies',
    ],
    pricingNote: 'Free consultation and home assessment. Solutions starting at $299 installed.',
    testimonial: {
      quote:
        'After NexAir installed a whole-home purifier and UV light, my daughter\'s allergies improved dramatically. We can actually tell the difference in the air quality.',
      author: 'Amanda S.',
      location: 'Paradise Valley, AZ',
      rating: 5,
    },
  },
}

export default function ServicePage() {
  const { serviceSlug } = useParams<{ serviceSlug: string }>()
  const { t, language } = useTranslation()
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const service = serviceSlug ? SERVICE_DATA[serviceSlug] : null

  if (!service) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Service Not Found</h1>
          <p className="text-[var(--text-secondary)] mb-8">
            We could not find this service page.
          </p>
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const Icon = service.icon

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setFormState('submitting')
    const result = await submitContactForm({
      ...form,
      service: service.name,
      language,
    })
    if (result.success) {
      setFormState('success')
      setForm({ name: '', email: '', phone: '', message: '' })
    } else {
      setFormState('error')
      setErrorMsg(result.error || 'Something went wrong.')
    }
  }

  return (
    <>
      <SEOHead
        title={`${service.name} in Phoenix, AZ | NexAir Comfort`}
        description={service.heroDescription}
        path={language === 'es' ? `/es/servicios/${serviceSlug}` : `/services/${serviceSlug}`}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="glow-sky" />
        <div className="glow-orange" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{
              background: 'rgba(74, 144, 217, 0.12)',
              border: '1px solid rgba(74, 144, 217, 0.2)',
            }}
          >
            <Icon className="w-8 h-8 text-[var(--sky)]" />
          </div>
          <h1 className="gradient-heading text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 font-[var(--font-display)]">
            {service.tagline}
          </h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10">
            {service.heroDescription}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="btn-primary text-lg">
              <CalendarCheck className="w-5 h-5" />
              Schedule {service.name}
            </Link>
            <a href={PHONE_LINK} className="btn-secondary text-lg">
              <Phone className="w-5 h-5" />
              {PHONE_NUMBER}
            </a>
          </div>
        </div>
      </section>

      {/* ── Problem / Solution ────────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-16">
          <div>
            <h2 className="gradient-heading text-3xl md:text-4xl font-bold mb-6 font-[var(--font-display)]">
              {service.problemTitle}
            </h2>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
              {service.problemDescription}
            </p>
          </div>

          <div>
            <h2 className="gradient-heading text-3xl md:text-4xl font-bold mb-6 font-[var(--font-display)]">
              {service.solutionTitle}
            </h2>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
              {service.solutionDescription}
            </p>
          </div>
        </div>
      </section>

      <div className="divider max-w-5xl mx-auto" />

      {/* ── What Is Included ──────────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="gradient-heading text-3xl md:text-4xl font-bold mb-10 text-center font-[var(--font-display)]">
            What&apos;s Included
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3 p-4 rounded-lg"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <CheckCircle className="w-5 h-5 text-[var(--green)] flex-shrink-0" />
                <span className="text-sm font-medium text-white">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider max-w-5xl mx-auto" />

      {/* ── Pricing Transparency ──────────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="gradient-heading text-3xl md:text-4xl font-bold mb-6 font-[var(--font-display)]">
            Transparent Pricing
          </h2>
          <p className="text-[var(--text-secondary)] text-lg mb-4">
            {service.pricingNote}
          </p>
          <p className="text-sm text-[var(--text-muted)]">
            We always provide upfront pricing before beginning any work. No hidden fees, no surprises.
          </p>
        </div>
      </section>

      <div className="divider max-w-5xl mx-auto" />

      {/* ── Pair with Membership ──────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="gradient-heading text-3xl md:text-4xl font-bold mb-4 font-[var(--font-display)]">
              Pair with a Membership & Save
            </h2>
            <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
              NexAir Comfort members enjoy priority scheduling, repair discounts, free tune-ups, and Nuve Smart Monitoring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {MEMBERSHIP_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`card p-5 text-center ${plan.highlighted ? 'border-[var(--orange)] ring-1 ring-[var(--orange)]' : ''}`}
              >
                <h3 className="text-lg font-bold text-white mb-1">
                  {language === 'es' ? plan.nameEs : plan.name}
                </h3>
                <div className="text-2xl font-extrabold text-white mb-2">
                  ${plan.monthlyPrice}<span className="text-sm font-normal text-[var(--text-secondary)]">/mo</span>
                </div>
                <ul className="space-y-1.5 mb-4">
                  {(language === 'es' ? plan.featuresEs : plan.features).slice(0, 3).map((f) => (
                    <li key={f} className="text-xs text-[var(--text-secondary)] flex items-center gap-1.5">
                      <CheckCircle className="w-3 h-3 text-[var(--green)] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/membership" className="text-sm text-[var(--sky)] font-semibold hover:text-[var(--sky-light)]">
                  Learn More <ArrowRight className="w-3 h-3 inline" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider max-w-5xl mx-auto" />

      {/* ── Testimonial ──────────────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-1 mb-6">
            {Array.from({ length: service.testimonial.rating }).map((_, i) => (
              <Star key={i} className="w-6 h-6 text-[var(--gold)] fill-[var(--gold)]" />
            ))}
          </div>
          <blockquote className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-6 italic">
            &ldquo;{service.testimonial.quote}&rdquo;
          </blockquote>
          <p className="text-[var(--text-secondary)]">
            <strong className="text-white">{service.testimonial.author}</strong>
            {' '}&mdash; {service.testimonial.location}
          </p>
        </div>
      </section>

      <div className="divider max-w-5xl mx-auto" />

      {/* ── Contact Form ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="gradient-heading text-3xl md:text-4xl font-bold mb-4 text-center font-[var(--font-display)]">
            Request {service.name}
          </h2>
          <p className="text-[var(--text-secondary)] text-center mb-10">
            Fill out the form below and we will contact you to schedule your service.
          </p>

          <div className="card p-8">
            {formState === 'success' ? (
              <div className="text-center py-8">
                <CheckCircle className="w-14 h-14 text-[var(--green)] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Request Received!</h3>
                <p className="text-[var(--text-secondary)]">
                  We will contact you within one business hour to schedule your {service.name.toLowerCase()} service.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {formState === 'error' && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    <p className="text-sm text-red-300">{errorMsg}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full px-4 py-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--sky)] transition-colors"
                  />
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="w-full px-4 py-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--sky)] transition-colors"
                  />
                </div>
                <input
                  name="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--sky)] transition-colors"
                />
                <textarea
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Describe your issue or what you need..."
                  className="w-full px-4 py-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--sky)] transition-colors resize-none"
                />
                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="btn-primary w-full justify-center disabled:opacity-50"
                >
                  {formState === 'submitting' ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
                  ) : (
                    <><Send className="w-5 h-5" /> Request Service</>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────────────── */}
      <CTABanner
        heading="Ready for Reliable Comfort?"
        subheading={`Schedule your ${service.name.toLowerCase()} service today.`}
        buttonText="Schedule Service"
        buttonLink="/contact"
        showPhone
      />
    </>
  )
}
