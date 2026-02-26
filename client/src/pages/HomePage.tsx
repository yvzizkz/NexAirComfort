import { Link } from 'react-router-dom'
import {
  Phone,
  Wrench,
  AirVent,
  Flame,
  ShieldCheck,
  Wind,
  Sparkles,
  Wifi,
  Activity,
  Bell,
  Smartphone,
  Zap,
  Clock,
  CalendarCheck,
  Award,
  BadgeCheck,
  MapPin,
  ArrowRight,
} from 'lucide-react'
import { useTranslation } from '@/i18n/LanguageContext'
import SEOHead from '@/components/SEOHead'
import TrustBadges from '@/components/TrustBadges'
import ServiceCard from '@/components/ServiceCard'
import CTABanner from '@/components/CTABanner'
import { PHONE_NUMBER, PHONE_LINK, SERVICE_AREAS, MEMBERSHIP_PLANS } from '@/lib/constants'

const SERVICE_ICONS = [Wrench, AirVent, Flame, ShieldCheck, Wind, Sparkles]

export default function HomePage() {
  const { t, language } = useTranslation()

  const services = [
    {
      title: t('services.acRepair') || 'AC Repair',
      description: 'Fast, reliable air conditioning repair when you need it most. Our certified technicians diagnose and fix all makes and models.',
      href: '/services/ac-repair',
      price: 'Starting at $89 diagnostic',
    },
    {
      title: t('services.acInstallation') || 'AC Installation',
      description: 'Expert air conditioning installation with top-rated equipment. We help you choose the right system for your home.',
      href: '/services/ac-installation',
      price: 'Free in-home estimate',
    },
    {
      title: t('services.heating') || 'Heating Services',
      description: 'Stay warm during cool desert nights. We install, repair, and maintain furnaces, heat pumps, and dual-fuel systems.',
      href: '/services/heating',
      price: 'Starting at $89 diagnostic',
    },
    {
      title: t('services.maintenance') || 'Maintenance',
      description: 'Protect your investment with seasonal tune-ups and inspections. Regular maintenance prevents costly breakdowns.',
      href: '/services/maintenance',
      price: 'Starting at $49/visit',
    },
    {
      title: t('services.miniSplits') || 'Mini-Splits',
      description: 'Efficient zone cooling and heating without ductwork. Ideal for room additions, garages, and homes without existing ducts.',
      href: '/services/mini-splits',
      price: 'Free in-home estimate',
    },
    {
      title: t('services.indoorAirQuality') || 'Indoor Air Quality',
      description: 'Breathe easier with air purifiers, filtration systems, UV lights, and whole-home humidifiers for healthier living.',
      href: '/services/indoor-air-quality',
      price: 'Free consultation',
    },
  ]

  const nuveFeatures = [
    { icon: Activity, label: t('nuve.features.monitoring') || 'Real-Time Monitoring' },
    { icon: Bell, label: t('nuve.features.alerts') || 'Proactive Maintenance Alerts' },
    { icon: Smartphone, label: t('nuve.features.requests') || 'One-Touch Service Requests' },
    { icon: Zap, label: t('nuve.features.optimization') || 'Energy Optimization' },
  ]

  const stats = [
    { value: t('whyChoose.emergency24') || '24/7', label: t('whyChoose.emergencyLabel') || 'Emergency Service', icon: Clock },
    { value: t('whyChoose.sameDay') || 'Same Day', label: t('whyChoose.sameDayLabel') || 'Appointments', icon: CalendarCheck },
    { value: t('whyChoose.satisfaction') || '100%', label: t('whyChoose.satisfactionLabel') || 'Satisfaction Guarantee', icon: Award },
    { value: t('whyChoose.licensed') || 'AZ Licensed', label: t('whyChoose.licensedLabel') || 'All Trades', icon: BadgeCheck },
  ]

  return (
    <>
      <SEOHead
        title={t('seo.homeTitle') || 'NexAir Comfort | Phoenix HVAC, Plumbing & Electrical Services'}
        description={t('seo.homeDescription') || 'Licensed HVAC, plumbing, and electrical services in Phoenix, Scottsdale & Paradise Valley. Family-owned, 24/7 emergency service, Nuve Smart Monitoring.'}
        path={language === 'es' ? '/es' : '/'}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 py-24 overflow-hidden">
        <div className="glow-sky" />
        <div className="glow-orange" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="gradient-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 font-[var(--font-display)]">
            {t('hero.title') || 'Phoenix HVAC You Can Trust'}
          </h1>

          <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed">
            {t('hero.subtitle') || 'Licensed HVAC, Plumbing & Electrical -- Serving Phoenix, Scottsdale & Paradise Valley'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link to="/contact" className="btn-primary text-lg">
              <CalendarCheck className="w-5 h-5" />
              {t('hero.scheduleService') || 'Schedule Service'}
            </Link>
            <a href={PHONE_LINK} className="btn-secondary text-lg">
              <Phone className="w-5 h-5" />
              {t('hero.callNow') || 'Call Now'} {PHONE_NUMBER}
            </a>
          </div>

          <TrustBadges />
        </div>
      </section>

      {/* ── Services Overview ────────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="gradient-heading text-3xl md:text-4xl font-bold mb-4 font-[var(--font-display)]">
              {t('services.title') || 'Our Services'}
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg">
              {t('services.subtitle') || 'Comprehensive HVAC, plumbing, and electrical solutions for your home and business.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <ServiceCard
                key={service.href}
                icon={SERVICE_ICONS[i]}
                title={service.title}
                description={service.description}
                href={service.href}
                price={service.price}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="divider max-w-5xl mx-auto" />

      {/* ── Nuve Section ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left: content */}
          <div>
            <div className="badge text-[var(--sky)] border border-[var(--sky)] inline-block mb-4">
              NUVE SMART MONITORING
            </div>
            <h2 className="gradient-heading text-3xl md:text-4xl font-bold mb-6 font-[var(--font-display)]">
              {t('nuve.title') || 'Your Home, Connected to Our Team'}
            </h2>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8">
              {t('nuve.description') || 'Nuve Smart Monitoring connects your HVAC system directly to our technicians. We detect issues before they become emergencies, optimize your energy usage, and keep your home comfortable around the clock.'}
            </p>
          </div>

          {/* Right: feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {nuveFeatures.map((feature) => (
              <div
                key={feature.label}
                className="card p-5 flex items-start gap-4"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'rgba(74, 144, 217, 0.12)',
                    border: '1px solid rgba(74, 144, 217, 0.2)',
                  }}
                >
                  <feature.icon className="w-5 h-5 text-[var(--sky)]" />
                </div>
                <span className="text-sm font-semibold text-white leading-snug">
                  {feature.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider max-w-5xl mx-auto" />

      {/* ── Why Choose NexAir ────────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="gradient-heading text-3xl md:text-4xl font-bold mb-12 text-center font-[var(--font-display)]">
            {t('whyChoose.title') || 'Why Choose NexAir'}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat) => (
              <div key={stat.label} className="card p-6 text-center">
                <stat.icon className="w-8 h-8 text-[var(--orange)] mx-auto mb-3" />
                <div className="text-2xl md:text-3xl font-extrabold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-[var(--text-secondary)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <p className="text-[var(--text-secondary)] text-lg leading-relaxed max-w-3xl mx-auto text-center">
            {t('whyChoose.description') || 'NexAir Comfort is a family-owned, Arizona-licensed HVAC, plumbing, and electrical company. We combine cutting-edge technology like Nuve Smart Monitoring with old-fashioned dedication to customer service. Your comfort is our business.'}
          </p>
        </div>
      </section>

      <div className="divider max-w-5xl mx-auto" />

      {/* ── Membership Preview ───────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="gradient-heading text-3xl md:text-4xl font-bold mb-4 font-[var(--font-display)]">
              {t('membership.title') || 'Membership Plans'}
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg">
              {t('membership.subtitle') || 'Join the NexAir Comfort family and enjoy priority service, exclusive discounts, and worry-free home comfort year-round.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {MEMBERSHIP_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`card p-6 relative ${plan.highlighted ? 'border-[var(--orange)] ring-1 ring-[var(--orange)]' : ''}`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--orange)] text-white text-xs font-bold px-4 py-1 rounded-full">
                    {t('membership.mostPopular') || 'Most Popular'}
                  </div>
                )}
                <h3 className="text-xl font-bold text-white mb-2">
                  {language === 'es' ? plan.nameEs : plan.name}
                </h3>
                <div className="text-3xl font-extrabold text-white mb-1">
                  ${plan.monthlyPrice}
                  <span className="text-sm font-normal text-[var(--text-secondary)]">
                    {t('membership.perMonth') || '/mo'}
                  </span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-6">
                  {language === 'es' ? plan.descriptionEs : plan.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {(language === 'es' ? plan.featuresEs : plan.features).slice(0, 4).map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <ShieldCheck className="w-4 h-4 text-[var(--green)] flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/membership"
              className="inline-flex items-center gap-2 text-[var(--sky)] font-semibold hover:gap-3 transition-all"
            >
              {t('membership.viewAllPlans') || 'View All Plans'}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <div className="divider max-w-5xl mx-auto" />

      {/* ── Service Areas ────────────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="gradient-heading text-3xl md:text-4xl font-bold mb-12 text-center font-[var(--font-display)]">
            {t('serviceAreas.title') || 'Areas We Serve'}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {SERVICE_AREAS.map((city) => (
              <Link
                key={city}
                to={`/areas/${city.toLowerCase().replace(/\s+/g, '-')}`}
                className="card p-4 text-center hover:border-[var(--sky)] transition-colors"
              >
                <MapPin className="w-5 h-5 text-[var(--orange)] mx-auto mb-2" />
                <span className="text-sm font-semibold text-white">{city}, AZ</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────────────── */}
      <CTABanner
        heading="Ready for Reliable Comfort?"
        subheading="Schedule your service today and experience the NexAir Comfort difference."
        buttonText={t('hero.scheduleService') || 'Schedule Service'}
        buttonLink="/contact"
        showPhone
      />
    </>
  )
}
