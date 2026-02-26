import { useParams, Link } from 'react-router-dom'
import {
  MapPin,
  Wrench,
  AirVent,
  Flame,
  ShieldCheck,
  Wind,
  Sparkles,
  CalendarCheck,
  Phone,
  ArrowRight,
} from 'lucide-react'
import { useTranslation } from '@/i18n/LanguageContext'
import SEOHead from '@/components/SEOHead'
import CTABanner from '@/components/CTABanner'
import { PHONE_NUMBER, PHONE_LINK, SERVICES } from '@/lib/constants'

interface CityData {
  name: string
  paragraphs: string[]
}

const CITY_DATA: Record<string, CityData> = {
  phoenix: {
    name: 'Phoenix',
    paragraphs: [
      'As our home base, Phoenix is where NexAir Comfort got its start. We know the unique challenges Phoenix homeowners face -- from sweltering summers that push AC systems to their limits, to the dust storms and monsoons that wreak havoc on outdoor units. Our technicians are trained specifically for the extreme conditions of the Sonoran Desert.',
      'Whether you live in Ahwatukee, Arcadia, North Phoenix, or downtown, our team provides full-service HVAC, plumbing, and electrical support. We offer same-day appointments for most service requests and 24/7 emergency service for critical failures.',
      'Phoenix residents also benefit from our Nuve Smart Monitoring system, which keeps an eye on your HVAC performance around the clock. When the temperature hits 115 degrees, you want to know your system is working before it fails. That is what Nuve delivers.',
    ],
  },
  scottsdale: {
    name: 'Scottsdale',
    paragraphs: [
      'From the bustling shops of Old Town Scottsdale to the sprawling estates of North Scottsdale, NexAir Comfort provides premium HVAC services tailored to your property. Scottsdale homes often feature high-efficiency systems, zoned cooling, and smart home integrations -- and our team is fully equipped to service them all.',
      'Our Scottsdale clients appreciate our attention to detail, clean work practices, and respect for their homes. We understand that service quality matters as much as technical skill, and we deliver both.',
      'Pair your service with a NexAir Comfort membership plan and enjoy priority scheduling, exclusive discounts, and Nuve Smart Monitoring -- the modern way to keep your Scottsdale home comfortable year-round.',
    ],
  },
  'paradise-valley': {
    name: 'Paradise Valley',
    paragraphs: [
      'Paradise Valley is home to some of the most beautiful and sophisticated residences in Arizona. NexAir Comfort is proud to serve this community with discreet, high-end HVAC, plumbing, and electrical services that match the standard of living our Paradise Valley clients expect.',
      'Many homes in Paradise Valley feature complex multi-zone systems, variable-speed equipment, and integrated home automation. Our technicians carry advanced certifications and have extensive experience with premium brands and high-capacity systems.',
      'We treat every Paradise Valley home with the utmost care -- shoe covers, drop cloths, and a thorough cleanup after every job. Your home is your sanctuary, and we never forget that.',
    ],
  },
  tempe: {
    name: 'Tempe',
    paragraphs: [
      'Tempe is a vibrant community with a mix of established neighborhoods, new developments, and the energy of Arizona State University. NexAir Comfort serves Tempe homeowners, renters, and small businesses with fast, reliable HVAC, plumbing, and electrical services.',
      'Whether you are cooling a bungalow near Mill Avenue or maintaining a system in a Tempe townhome community, our team has the expertise to handle it. We also work with property managers and landlords to keep rental properties comfortable and compliant.',
      'Tempe residents love our membership plans -- affordable monthly coverage that includes tune-ups, priority scheduling, and Nuve Smart Monitoring. It is peace of mind that pays for itself.',
    ],
  },
  mesa: {
    name: 'Mesa',
    paragraphs: [
      'Mesa is one of the largest cities in Arizona, and NexAir Comfort is proud to serve its diverse neighborhoods -- from the historic charm of downtown Mesa to the rapidly growing communities on the eastern edge. Our technicians know Mesa well and are equipped to handle any residential HVAC challenge.',
      'With hot summers and cool winter nights, Mesa homeowners need a reliable HVAC partner. We provide comprehensive AC repair, heating services, ductless mini-splits, and indoor air quality solutions tailored to the Mesa climate.',
      'Join hundreds of Mesa families who already trust NexAir Comfort. With same-day service availability and Nuve Smart Monitoring, your comfort is always our priority.',
    ],
  },
  chandler: {
    name: 'Chandler',
    paragraphs: [
      'Chandler is a thriving community known for its excellent schools, parks, and growing tech industry. NexAir Comfort keeps Chandler families comfortable with expert HVAC installation, repair, and maintenance services -- all backed by our satisfaction guarantee.',
      'Many Chandler neighborhoods feature newer construction with modern HVAC systems. Our team is trained on the latest equipment from Carrier, Lennox, Trane, and other leading brands. Whether your system needs a routine tune-up or a complete replacement, we have you covered.',
      'Chandler residents can save even more by joining a NexAir Comfort membership plan. Enjoy priority scheduling, repair discounts, free tune-ups, and Nuve Smart Monitoring -- all for one low monthly price.',
    ],
  },
  gilbert: {
    name: 'Gilbert',
    paragraphs: [
      'Gilbert is one of the fastest-growing towns in Arizona, and NexAir Comfort is growing right along with it. From new construction HVAC installations to maintaining systems in established neighborhoods, we provide the full range of home comfort services Gilbert families need.',
      'Our Gilbert team specializes in energy-efficient solutions that help homeowners save on their SRP or APS bills. Whether it is upgrading to a high-SEER AC unit, adding a smart thermostat, or improving your home\'s insulation, we have the expertise to help.',
      'Gilbert families trust NexAir Comfort because we treat every home like our own. Clean work, honest pricing, and technology like Nuve Smart Monitoring set us apart from the competition.',
    ],
  },
  glendale: {
    name: 'Glendale',
    paragraphs: [
      'From the sports and entertainment district to the historic neighborhoods near downtown, Glendale is a community that values comfort and reliability. NexAir Comfort delivers both with full-service HVAC, plumbing, and electrical expertise.',
      'Glendale homeowners face the same intense Arizona heat as the rest of the Valley, and our team is ready to respond quickly. We offer same-day appointments for most service requests and maintain a fleet of fully stocked service vehicles so we can resolve most issues in a single visit.',
      'Whether you need an emergency AC repair on a 110-degree day or want to schedule a seasonal tune-up, NexAir Comfort is the Glendale HVAC company you can count on.',
    ],
  },
  peoria: {
    name: 'Peoria',
    paragraphs: [
      'Peoria and the West Valley are growing rapidly, and NexAir Comfort is here to serve this expanding community. We provide expert HVAC installation, repair, and maintenance for Peoria homes of all sizes -- from cozy starter homes to spacious custom builds.',
      'Our Peoria service team is equipped with the latest diagnostic tools and genuine manufacturer parts. We diagnose problems accurately the first time and provide upfront pricing before any work begins. No surprises, no hidden fees.',
      'Peoria residents can take their home comfort to the next level with Nuve Smart Monitoring, included with every NexAir Comfort membership plan. Monitor your system from your phone, receive proactive alerts, and request service with a single tap.',
    ],
  },
}

const SERVICE_ICONS = [Wrench, AirVent, Flame, ShieldCheck, Wind, Sparkles]

export default function CityPage() {
  const { city: citySlug } = useParams<{ city: string }>()
  const { t, language } = useTranslation()

  const cityData = citySlug ? CITY_DATA[citySlug] : null

  if (!cityData) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">City Not Found</h1>
          <p className="text-[var(--text-secondary)] mb-8">
            We could not find information for this service area.
          </p>
          <Link to="/areas" className="btn-primary">
            View All Service Areas
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEOHead
        title={`HVAC Services in ${cityData.name}, AZ | NexAir Comfort`}
        description={`Licensed HVAC, plumbing, and electrical services in ${cityData.name}, Arizona. Same-day service, 24/7 emergency, Nuve Smart Monitoring. Call (480) 999-6100.`}
        path={language === 'es' ? `/es/areas/${citySlug}` : `/areas/${citySlug}`}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="glow-sky" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-[var(--orange)]" />
            <span className="text-sm font-semibold text-[var(--orange)] uppercase tracking-wider">
              Service Area
            </span>
          </div>
          <h1 className="gradient-heading text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 font-[var(--font-display)]">
            HVAC Services in {cityData.name}, AZ
          </h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-8">
            Licensed HVAC, plumbing, and electrical services for {cityData.name} homes and businesses.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="btn-primary text-lg">
              <CalendarCheck className="w-5 h-5" />
              Schedule Service
            </Link>
            <a href={PHONE_LINK} className="btn-secondary text-lg">
              <Phone className="w-5 h-5" />
              {PHONE_NUMBER}
            </a>
          </div>
        </div>
      </section>

      {/* ── City Content ─────────────────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {cityData.paragraphs.map((paragraph, i) => (
            <p
              key={i}
              className="text-[var(--text-secondary)] text-lg leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <div className="divider max-w-5xl mx-auto" />

      {/* ── Services Available ────────────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="gradient-heading text-3xl md:text-4xl font-bold mb-10 text-center font-[var(--font-display)]">
            Services Available in {cityData.name}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => {
              const Icon = SERVICE_ICONS[i]
              return (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  className="card p-5 group flex items-center gap-4"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110"
                    style={{
                      background: 'rgba(74, 144, 217, 0.12)',
                      border: '1px solid rgba(74, 144, 217, 0.2)',
                    }}
                  >
                    <Icon className="w-6 h-6 text-[var(--sky)]" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-base font-semibold text-white">{service.name}</h3>
                    <p className="text-xs text-[var(--text-secondary)]">{service.priceLabel}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--sky)] transition-colors" />
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <CTABanner
        heading={`Ready for Comfort in ${cityData.name}?`}
        subheading="Schedule your service today and experience the NexAir Comfort difference."
        buttonText="Schedule Service"
        buttonLink="/contact"
        showPhone
      />
    </>
  )
}
