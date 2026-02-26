import { Helmet } from 'react-helmet-async'
import { useTranslation } from '@/i18n/LanguageContext'
import { COMPANY_NAME, PHONE_NUMBER } from '@/lib/constants'

interface SEOHeadProps {
  title: string
  description: string
  path: string
  image?: string
}

const BASE_URL = 'https://nexaircomfort.com'

export default function SEOHead({ title, description, path, image }: SEOHeadProps) {
  const { language } = useTranslation()

  const fullTitle = `${title} | ${COMPANY_NAME}`
  const canonicalUrl = `${BASE_URL}${path}`
  const ogImage = image || `${BASE_URL}/og-image.jpg`

  // Build alternate language paths
  const enPath = path.startsWith('/es') ? path.replace(/^\/es/, '') || '/' : path
  const esPath = path.startsWith('/es') ? path : path === '/' ? '/es' : `/es${path}`

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: COMPANY_NAME,
    description,
    telephone: PHONE_NUMBER,
    url: BASE_URL,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Phoenix',
      addressRegion: 'AZ',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 33.4484,
      longitude: -112.074,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '17:00',
      },
    ],
    areaServed: [
      'Phoenix', 'Scottsdale', 'Paradise Valley', 'Tempe',
      'Mesa', 'Chandler', 'Gilbert', 'Glendale', 'Peoria',
    ],
    priceRange: '$$',
    image: ogImage,
    sameAs: [
      'https://facebook.com/nexaircomfort',
      'https://instagram.com/nexaircomfort',
    ],
  }

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={COMPANY_NAME} />
      <meta property="og:locale" content={language === 'es' ? 'es_MX' : 'en_US'} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Canonical & Hreflang */}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="en" href={`${BASE_URL}${enPath}`} />
      <link rel="alternate" hrefLang="es" href={`${BASE_URL}${esPath}`} />
      <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}${enPath}`} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  )
}
