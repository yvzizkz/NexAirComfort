import { Link } from 'react-router-dom'
import { MapPin, ArrowRight } from 'lucide-react'
import { useTranslation } from '@/i18n/LanguageContext'
import SEOHead from '@/components/SEOHead'
import CTABanner from '@/components/CTABanner'

interface CityInfo {
  name: string
  slug: string
  description: string
}

const CITIES: CityInfo[] = [
  {
    name: 'Phoenix',
    slug: 'phoenix',
    description:
      'Our home base. Full HVAC, plumbing, and electrical service throughout the Phoenix metro area, from Ahwatukee to North Phoenix.',
  },
  {
    name: 'Scottsdale',
    slug: 'scottsdale',
    description:
      'From South Scottsdale condos to North Scottsdale luxury homes, premium comfort solutions tailored to every property.',
  },
  {
    name: 'Paradise Valley',
    slug: 'paradise-valley',
    description:
      'Serving the exclusive homes of Paradise Valley with discreet, high-end HVAC, plumbing, and electrical services.',
  },
  {
    name: 'Tempe',
    slug: 'tempe',
    description:
      'Fast, reliable service for Tempe homeowners, renters, and businesses -- including ASU campus-area properties.',
  },
  {
    name: 'Mesa',
    slug: 'mesa',
    description:
      'Comprehensive home comfort services for Mesa residents, from historic downtown to the growing eastern communities.',
  },
  {
    name: 'Chandler',
    slug: 'chandler',
    description:
      'Keeping Chandler families comfortable year-round with expert HVAC installation, repair, and maintenance.',
  },
  {
    name: 'Gilbert',
    slug: 'gilbert',
    description:
      'Growing with Gilbert -- new construction installs, system upgrades, and ongoing maintenance for one of Arizona\'s fastest-growing towns.',
  },
  {
    name: 'Glendale',
    slug: 'glendale',
    description:
      'Full-service HVAC, plumbing, and electrical for Glendale homes and businesses, with same-day availability.',
  },
  {
    name: 'Peoria',
    slug: 'peoria',
    description:
      'Serving Peoria and the West Valley with dependable home comfort solutions and Nuve Smart Monitoring.',
  },
]

export default function AreasPage() {
  const { t, language } = useTranslation()

  return (
    <>
      <SEOHead
        title={t('seo.areasTitle') || 'Service Areas | NexAir Comfort Phoenix Metro HVAC'}
        description={t('seo.areasDescription') || 'NexAir Comfort serves Phoenix, Scottsdale, Paradise Valley, Tempe, Mesa, Chandler, Gilbert, Glendale, and Peoria.'}
        path={language === 'es' ? '/es/areas' : '/areas'}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="glow-sky" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="gradient-heading text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 font-[var(--font-display)]">
            {t('serviceAreas.title') || 'Areas We Serve'}
          </h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            {t('serviceAreas.subtitle') || 'NexAir Comfort proudly serves the greater Phoenix metropolitan area. If you are in the Valley, we have you covered.'}
          </p>
        </div>
      </section>

      {/* ── City Grid ────────────────────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CITIES.map((city) => (
            <Link
              key={city.slug}
              to={`/areas/${city.slug}`}
              className="card p-6 group flex flex-col h-full"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all group-hover:scale-110"
                  style={{
                    background: 'rgba(212, 112, 42, 0.12)',
                    border: '1px solid rgba(212, 112, 42, 0.2)',
                  }}
                >
                  <MapPin className="w-5 h-5 text-[var(--orange)]" />
                </div>
                <h2 className="text-xl font-bold text-white">{city.name}, AZ</h2>
              </div>

              <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-grow mb-4">
                {city.description}
              </p>

              <span className="inline-flex items-center gap-2 text-[var(--sky)] text-sm font-semibold transition-all group-hover:gap-3">
                View Services
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────────────── */}
      <CTABanner
        heading="Need Service in the Phoenix Area?"
        subheading="Schedule today and get same-day or next-day availability."
        buttonText="Schedule Service"
        buttonLink="/contact"
        showPhone
      />
    </>
  )
}
