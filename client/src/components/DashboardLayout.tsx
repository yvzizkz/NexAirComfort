import { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Home,
  ClipboardList,
  Calendar,
  Wrench,
  FileText,
  Thermometer,
  Gift,
  MessageCircle,
  Settings,
  Bell,
  LogOut,
  Menu,
  X,
  ChevronLeft,
} from 'lucide-react'
import { useTranslation } from '@/i18n/LanguageContext'
import { useAuth } from '@/hooks/useAuth'
import LanguageToggle from './LanguageToggle'

interface SidebarLink {
  icon: typeof Home
  labelKey: string
  href: string
  hrefEs: string
}

const sidebarLinks: SidebarLink[] = [
  { icon: Home, labelKey: 'dashboard.overview', href: '/dashboard', hrefEs: '/es/panel' },
  { icon: ClipboardList, labelKey: 'dashboard.myPlan', href: '/dashboard/plan', hrefEs: '/es/panel/plan' },
  { icon: Calendar, labelKey: 'dashboard.appointments', href: '/dashboard/appointments', hrefEs: '/es/panel/citas' },
  { icon: Wrench, labelKey: 'dashboard.serviceHistory', href: '/dashboard/history', hrefEs: '/es/panel/historial' },
  { icon: FileText, labelKey: 'dashboard.invoices', href: '/dashboard/invoices', hrefEs: '/es/panel/facturas' },
  { icon: Thermometer, labelKey: 'dashboard.myNuve', href: '/dashboard/nuve', hrefEs: '/es/panel/nuve' },
  { icon: Gift, labelKey: 'dashboard.referrals', href: '/dashboard/referrals', hrefEs: '/es/panel/referidos' },
  { icon: MessageCircle, labelKey: 'dashboard.getHelp', href: '/dashboard/support', hrefEs: '/es/panel/soporte' },
  { icon: Settings, labelKey: 'dashboard.settings', href: '/dashboard/settings', hrefEs: '/es/panel/configuracion' },
]

// Mobile bottom bar shows first 5 items
const MOBILE_TAB_COUNT = 5

export default function DashboardLayout() {
  const { t, language } = useTranslation()
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const getHref = (link: SidebarLink) =>
    language === 'es' ? link.hrefEs : link.href

  const isActive = (link: SidebarLink) => {
    const href = getHref(link)
    // Exact match for overview/dashboard root
    if (href === '/dashboard' || href === '/es/panel') {
      return location.pathname === href
    }
    return location.pathname.startsWith(href)
  }

  const handleLogout = () => {
    logout()
    navigate(language === 'es' ? '/es' : '/')
  }

  const mobileTabLinks = sidebarLinks.slice(0, MOBILE_TAB_COUNT)
  const mobileOverflowLinks = sidebarLinks.slice(MOBILE_TAB_COUNT)

  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row"
      style={{ background: 'var(--gradient-page)' }}
    >
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col flex-shrink-0 h-screen sticky top-0 transition-all duration-300 ${
          sidebarCollapsed ? 'w-[72px]' : 'w-[240px]'
        }`}
        style={{
          background: 'var(--bg-secondary)',
          borderRight: '1px solid var(--border-subtle)',
        }}
        aria-label="Dashboard navigation"
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 h-16">
          {!sidebarCollapsed && (
            <Link
              to={language === 'es' ? '/es' : '/'}
              className="text-lg font-bold gradient-heading font-[var(--font-display)] truncate"
            >
              NexAir
            </Link>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-all duration-300"
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <ChevronLeft
              className={`w-5 h-5 text-[var(--text-secondary)] transition-transform duration-300 ${
                sidebarCollapsed ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>

        {/* Sidebar Nav Links */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const active = isActive(link)
            return (
              <Link
                key={link.href}
                to={getHref(link)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  active
                    ? 'bg-[var(--sky)]/15 text-white'
                    : 'text-[var(--text-secondary)] hover:text-white hover:bg-white/5'
                } ${sidebarCollapsed ? 'justify-center' : ''}`}
                title={sidebarCollapsed ? t(link.labelKey) : undefined}
                aria-current={active ? 'page' : undefined}
              >
                <link.icon
                  className={`w-5 h-5 flex-shrink-0 ${
                    active ? 'text-[var(--sky)]' : ''
                  }`}
                />
                {!sidebarCollapsed && <span className="truncate">{t(link.labelKey)}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Sidebar Footer */}
        <div
          className="p-3 border-t"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--text-secondary)] hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 ${
              sidebarCollapsed ? 'justify-center' : ''
            }`}
            aria-label={t('dashboard.logout')}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && <span>{t('dashboard.logout')}</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen lg:min-h-0">
        {/* Top Bar */}
        <header
          className="sticky top-0 z-30 h-16 flex items-center justify-between px-4 lg:px-8"
          style={{
            background: 'var(--bg-primary)',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          {/* Left: Mobile menu + Greeting */}
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-[var(--text-primary)]" />
              ) : (
                <Menu className="w-5 h-5 text-[var(--text-primary)]" />
              )}
            </button>
            <p className="text-sm text-[var(--text-secondary)]">
              {t('dashboard.greeting')},{' '}
              <span className="font-semibold text-white">
                {user?.name?.split(' ')[0] || 'User'}
              </span>
            </p>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <button
              className="p-2 rounded-lg hover:bg-white/10 transition-all duration-300 relative"
              aria-label={t('dashboard.notifications')}
            >
              <Bell className="w-5 h-5 text-[var(--text-secondary)]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--orange)]" />
            </button>
            <button
              onClick={handleLogout}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-[var(--text-secondary)] hover:text-red-400 hover:bg-red-500/10 transition-all duration-300"
              aria-label={t('dashboard.logout')}
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden xl:inline">{t('dashboard.logout')}</span>
            </button>
          </div>
        </header>

        {/* Mobile Overflow Menu (slide-down) */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden border-b px-4 py-3 space-y-1"
            style={{
              background: 'var(--bg-secondary)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            {mobileOverflowLinks.map((link) => {
              const active = isActive(link)
              return (
                <Link
                  key={link.href}
                  to={getHref(link)}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    active
                      ? 'bg-[var(--sky)]/15 text-white'
                      : 'text-[var(--text-secondary)] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <link.icon className={`w-5 h-5 ${active ? 'text-[var(--sky)]' : ''}`} />
                  <span>{t(link.labelKey)}</span>
                </Link>
              )
            })}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--text-secondary)] hover:text-red-400 hover:bg-red-500/10 transition-all duration-300"
            >
              <LogOut className="w-5 h-5" />
              <span>{t('dashboard.logout')}</span>
            </button>
          </div>
        )}

        {/* Page Content */}
        <div className="flex-1 p-4 lg:p-8 pb-24 lg:pb-8 overflow-y-auto">
          <Outlet />
        </div>
      </div>

      {/* Mobile Bottom Tab Bar */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around h-16"
        style={{
          background: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-subtle)',
        }}
        aria-label="Dashboard tabs"
      >
        {mobileTabLinks.map((link) => {
          const active = isActive(link)
          return (
            <Link
              key={link.href}
              to={getHref(link)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg transition-all duration-300 ${
                active
                  ? 'text-[var(--sky)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
              }`}
              aria-current={active ? 'page' : undefined}
            >
              <link.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium truncate max-w-[56px]">
                {t(link.labelKey)}
              </span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
