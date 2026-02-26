import { Link, useLocation } from 'react-router-dom'
import { Home, Wrench, Phone, ArrowRight } from 'lucide-react'

export default function NotFoundPage() {
  const location = useLocation()
  const isEs = location.pathname.startsWith('/es')

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--gradient-page)' }}
    >
      <div className="max-w-lg mx-auto text-center">
        {/* 404 Number */}
        <div className="text-[8rem] md:text-[10rem] font-extrabold leading-none gradient-heading font-[var(--font-display)] select-none">
          404
        </div>

        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 font-[var(--font-display)]">
          {isEs
            ? 'Parece que esta pagina se tomo el dia libre'
            : 'Looks like this page took a day off'}
        </h1>

        {/* Description */}
        <p className="text-[var(--text-secondary)] text-lg mb-10 leading-relaxed">
          {isEs
            ? 'No pudimos encontrar la pagina que busca. Puede que haya sido movida o ya no exista. Pero no se preocupe, estamos aqui para ayudarle.'
            : 'We could not find the page you are looking for. It may have been moved or no longer exists. But do not worry, we are here to help you find what you need.'}
        </p>

        {/* Navigation Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            to={isEs ? '/es' : '/'}
            className="card p-5 flex flex-col items-center gap-3 group hover:border-[var(--sky)] transition-colors"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                background: 'rgba(74, 144, 217, 0.12)',
                border: '1px solid rgba(74, 144, 217, 0.2)',
              }}
            >
              <Home className="w-6 h-6 text-[var(--sky)]" />
            </div>
            <span className="text-sm font-semibold text-white">
              {isEs ? 'Inicio' : 'Home'}
            </span>
            <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--sky)] transition-colors" />
          </Link>

          <Link
            to={isEs ? '/es/servicios/reparacion-ac' : '/services/ac-repair'}
            className="card p-5 flex flex-col items-center gap-3 group hover:border-[var(--orange)] transition-colors"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                background: 'rgba(212, 112, 42, 0.12)',
                border: '1px solid rgba(212, 112, 42, 0.2)',
              }}
            >
              <Wrench className="w-6 h-6 text-[var(--orange)]" />
            </div>
            <span className="text-sm font-semibold text-white">
              {isEs ? 'Servicios' : 'Services'}
            </span>
            <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--orange)] transition-colors" />
          </Link>

          <Link
            to={isEs ? '/es/contacto' : '/contact'}
            className="card p-5 flex flex-col items-center gap-3 group hover:border-[var(--green)] transition-colors"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                background: 'rgba(102, 187, 106, 0.12)',
                border: '1px solid rgba(102, 187, 106, 0.2)',
              }}
            >
              <Phone className="w-6 h-6 text-[var(--green)]" />
            </div>
            <span className="text-sm font-semibold text-white">
              {isEs ? 'Contacto' : 'Contact'}
            </span>
            <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--green)] transition-colors" />
          </Link>
        </div>
      </div>
    </div>
  )
}
