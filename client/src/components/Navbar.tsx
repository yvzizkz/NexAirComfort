import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, Phone } from 'lucide-react'
import { useTranslation } from '@/i18n/LanguageContext'
import { NAV_ITEMS, PHONE_NUMBER, PHONE_LINK } from '@/lib/constants'
import LanguageToggle from './LanguageToggle'

export default function Navbar() {
  const { t, language } = useTranslation()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
    setServicesOpen(false)
    setMobileServicesOpen(false)
  }, [location.pathname])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const isActive = (href: string) => {
    if (href === '/' || href === '/es') {
      return location.pathname === href
    }
    return location.pathname.startsWith(href)
  }

  const getHref = (item: { href: string; hrefEs: string }) =>
    language === 'es' ? item.hrefEs : item.href

  const getLabel = (item: { label: string; labelEs: string }) =>
    language === 'es' ? item.labelEs : item.label

  const homeHref = language === 'es' ? '/es' : '/'
  const contactHref = language === 'es' ? '/es/contacto' : '/contact'
  const areasHref = language === 'es' ? '/es/areas' : '/areas'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--navy)]/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
      role="banner"
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          to={homeHref}
          className="flex items-center gap-2 text-xl font-bold z-10"
          aria-label="NexAir Comfort home"
        >
          <span className="gradient-heading font-[var(--font-display)]">
            NexAir Comfort
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {/* Home */}
          <Link
            to={homeHref}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
              isActive(homeHref)
                ? 'text-white bg-white/10'
                : 'text-[var(--text-secondary)] hover:text-white hover:bg-white/5'
            }`}
          >
            {t('nav.home')}
          </Link>

          {/* Services Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 flex items-center gap-1 ${
                isActive(language === 'es' ? '/es/servicios' : '/services')
                  ? 'text-white bg-white/10'
                  : 'text-[var(--text-secondary)] hover:text-white hover:bg-white/5'
              }`}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
            >
              {t('nav.services')}
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  servicesOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {servicesOpen && (
              <div
                className="absolute top-full left-0 mt-2 w-64 py-2 rounded-xl shadow-xl"
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-medium)',
                }}
                role="menu"
              >
                {NAV_ITEMS[0].children?.map((child) => (
                  <Link
                    key={child.href}
                    to={getHref(child)}
                    className="block px-4 py-2.5 text-sm text-[var(--text-secondary)] hover:text-white hover:bg-white/5 transition-all duration-300"
                    role="menuitem"
                  >
                    {getLabel(child)}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Other Nav Items */}
          {NAV_ITEMS.slice(1).map((item) => (
            <Link
              key={item.href}
              to={getHref(item)}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                isActive(getHref(item))
                  ? 'text-white bg-white/10'
                  : 'text-[var(--text-secondary)] hover:text-white hover:bg-white/5'
              }`}
            >
              {getLabel(item)}
            </Link>
          ))}

          {/* Areas link */}
          <Link
            to={areasHref}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
              isActive(areasHref)
                ? 'text-white bg-white/10'
                : 'text-[var(--text-secondary)] hover:text-white hover:bg-white/5'
            }`}
          >
            {t('nav.areas')}
          </Link>
        </div>

        {/* Desktop Right Side */}
        <div className="hidden lg:flex items-center gap-3">
          <LanguageToggle />

          <a
            href={PHONE_LINK}
            className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] hover:text-white transition-all duration-300"
            aria-label={`Call us at ${PHONE_NUMBER}`}
          >
            <Phone className="w-4 h-4 text-[var(--sky)]" />
            {PHONE_NUMBER}
          </a>

          <Link
            to={contactHref}
            className="btn-primary text-sm !py-2.5 !px-6"
            aria-label={t('nav.scheduleService')}
          >
            {t('nav.scheduleService')}
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden z-10 p-2 rounded-lg text-[var(--text-primary)] hover:bg-white/10 transition-all duration-300"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 top-16 z-40"
          style={{ background: 'var(--bg-primary)' }}
        >
          <div className="flex flex-col h-full overflow-y-auto px-6 py-6">
            {/* Home */}
            <Link
              to={homeHref}
              className={`py-3 text-lg font-medium border-b transition-all duration-300 ${
                isActive(homeHref)
                  ? 'text-white border-[var(--sky)]'
                  : 'text-[var(--text-secondary)] border-[var(--border-subtle)] hover:text-white'
              }`}
            >
              {t('nav.home')}
            </Link>

            {/* Services with sub-items */}
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className={`py-3 text-lg font-medium border-b flex items-center justify-between transition-all duration-300 ${
                isActive(language === 'es' ? '/es/servicios' : '/services')
                  ? 'text-white border-[var(--sky)]'
                  : 'text-[var(--text-secondary)] border-[var(--border-subtle)] hover:text-white'
              }`}
            >
              {t('nav.services')}
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-300 ${
                  mobileServicesOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {mobileServicesOpen && (
              <div className="pl-4 border-b border-[var(--border-subtle)]">
                {NAV_ITEMS[0].children?.map((child) => (
                  <Link
                    key={child.href}
                    to={getHref(child)}
                    className="block py-2.5 text-base text-[var(--text-secondary)] hover:text-white transition-all duration-300"
                  >
                    {getLabel(child)}
                  </Link>
                ))}
              </div>
            )}

            {/* Other Nav Items */}
            {NAV_ITEMS.slice(1).map((item) => (
              <Link
                key={item.href}
                to={getHref(item)}
                className={`py-3 text-lg font-medium border-b transition-all duration-300 ${
                  isActive(getHref(item))
                    ? 'text-white border-[var(--sky)]'
                    : 'text-[var(--text-secondary)] border-[var(--border-subtle)] hover:text-white'
                }`}
              >
                {getLabel(item)}
              </Link>
            ))}

            {/* Areas */}
            <Link
              to={areasHref}
              className={`py-3 text-lg font-medium border-b transition-all duration-300 ${
                isActive(areasHref)
                  ? 'text-white border-[var(--sky)]'
                  : 'text-[var(--text-secondary)] border-[var(--border-subtle)] hover:text-white'
              }`}
            >
              {t('nav.areas')}
            </Link>

            {/* Mobile CTA */}
            <div className="mt-6 flex flex-col gap-4">
              <a
                href={PHONE_LINK}
                className="btn-secondary justify-center text-lg"
                aria-label={`Call us at ${PHONE_NUMBER}`}
              >
                <Phone className="w-5 h-5 text-[var(--sky)]" />
                {PHONE_NUMBER}
              </a>

              <Link
                to={contactHref}
                className="btn-primary justify-center text-lg"
              >
                {t('nav.scheduleService')}
              </Link>

              <div className="flex justify-center pt-2">
                <LanguageToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
