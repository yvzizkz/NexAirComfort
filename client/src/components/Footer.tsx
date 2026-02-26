import { Link } from 'react-router-dom'
import { Phone, Mail, Clock, MapPin, Facebook, Instagram } from 'lucide-react'
import { useTranslation } from '@/i18n/LanguageContext'
import {
  COMPANY_NAME,
  PHONE_NUMBER,
  PHONE_LINK,
  LICENSE_NUMBERS,
  SOCIAL_LINKS,
  NAV_ITEMS,
} from '@/lib/constants'
import LanguageToggle from './LanguageToggle'

export default function Footer() {
  const { t, language } = useTranslation()

  const serviceLinks = NAV_ITEMS[0].children || []

  const companyLinks = [
    {
      label: t('nav.about'),
      href: language === 'es' ? '/es/nosotros' : '/about',
    },
    {
      label: t('nav.contact'),
      href: language === 'es' ? '/es/contacto' : '/contact',
    },
    {
      label: t('nav.areas'),
      href: language === 'es' ? '/es/areas' : '/areas',
    },
    {
      label: t('nav.blog'),
      href: language === 'es' ? '/es/blog' : '/blog',
    },
    {
      label: t('footer.careers'),
      href: language === 'es' ? '/es/carreras' : '/careers',
    },
  ]

  return (
    <footer
      className="w-full pt-16 pb-6"
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
      }}
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Logo & Description */}
          <div>
            <Link
              to={language === 'es' ? '/es' : '/'}
              className="inline-block text-xl font-bold mb-4"
              aria-label="NexAir Comfort home"
            >
              <span className="gradient-heading font-[var(--font-display)]">
                {COMPANY_NAME}
              </span>
            </Link>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
              {t('footer.description')}
            </p>
            <div className="flex items-center gap-3">
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                }}
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 text-[var(--text-secondary)]" />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                }}
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-[var(--text-secondary)]" />
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t('footer.servicesTitle')}
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={language === 'es' ? link.hrefEs : link.href}
                    className="text-sm text-[var(--text-secondary)] hover:text-white transition-all duration-300"
                  >
                    {language === 'es' ? link.labelEs : link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t('footer.companyTitle')}
            </h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-[var(--text-secondary)] hover:text-white transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t('footer.contactTitle')}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={PHONE_LINK}
                  className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)] hover:text-white transition-all duration-300"
                  aria-label={`Call us at ${PHONE_NUMBER}`}
                >
                  <Phone className="w-4 h-4 text-[var(--sky)] flex-shrink-0" />
                  {PHONE_NUMBER}
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@nexaircomfort.com"
                  className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)] hover:text-white transition-all duration-300"
                  aria-label="Email us"
                >
                  <Mail className="w-4 h-4 text-[var(--sky)] flex-shrink-0" />
                  info@nexaircomfort.com
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
                <Clock className="w-4 h-4 text-[var(--sky)] flex-shrink-0 mt-0.5" />
                <div>
                  <p>{t('footer.hours')}</p>
                  <p className="text-[var(--gold)]">{t('footer.emergency')}</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
                <MapPin className="w-4 h-4 text-[var(--sky)] flex-shrink-0 mt-0.5" />
                <span>Phoenix, AZ Metro Area</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="divider mb-6" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center">
            <span>{LICENSE_NUMBERS.join(' | ')}</span>
            <span className="hidden md:inline">|</span>
            <span>{t('footer.saddlewood')}</span>
          </div>

          <div className="flex items-center gap-4">
            <span>{t('footer.copyright')}</span>
            <LanguageToggle />
          </div>
        </div>
      </div>
    </footer>
  )
}
