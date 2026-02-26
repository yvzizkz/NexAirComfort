import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from '@/i18n/LanguageContext'
import { Globe } from 'lucide-react'

interface LanguageToggleProps {
  className?: string
}

export default function LanguageToggle({ className = '' }: LanguageToggleProps) {
  const { language, setLanguage } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'es' : 'en'
    setLanguage(newLang)
    localStorage.setItem('lang', newLang)

    let newPath = location.pathname

    if (newLang === 'es') {
      // Add /es prefix
      if (!newPath.startsWith('/es')) {
        newPath = newPath === '/' ? '/es' : `/es${newPath}`
      }
    } else {
      // Remove /es prefix
      if (newPath.startsWith('/es')) {
        newPath = newPath.replace(/^\/es/, '') || '/'
      }
    }

    navigate(newPath + location.search + location.hash)
  }

  return (
    <button
      onClick={toggleLanguage}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full border transition-all duration-300 ${
        language === 'en'
          ? 'border-[var(--border-medium)] text-[var(--text-secondary)] hover:text-white hover:border-[var(--sky)]'
          : 'border-[var(--sky)] text-[var(--sky)] hover:text-white hover:bg-[var(--sky)]'
      } ${className}`}
      aria-label={language === 'en' ? 'Switch to Spanish' : 'Cambiar a Ingles'}
    >
      <Globe className="w-3.5 h-3.5" />
      {language === 'en' ? 'ES' : 'EN'}
    </button>
  )
}
