import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useTranslation } from '@/i18n/LanguageContext'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { language } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [remember, setRemember] = useState(false)

  const from = (location.state as { from?: string })?.from || '/dashboard'
  const isEs = language === 'es'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const result = await login(email, password)
    setLoading(false)
    if (result.success) {
      navigate(from, { replace: true })
    } else {
      setError(result.error || (isEs ? 'Correo o contrasena invalidos' : 'Invalid email or password'))
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--gradient-page)' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to={isEs ? '/es' : '/'} className="text-3xl font-display font-extrabold gradient-heading inline-block">
            NexAir Comfort
          </Link>
        </div>

        <div className="card p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">
            {isEs ? 'Iniciar Sesion' : 'Sign In'}
          </h1>

          {error && (
            <div className="mb-4 p-3 rounded-md bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[--text-secondary] mb-1">
                {isEs ? 'Correo Electronico' : 'Email'}
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[--bg-elevated] border border-[--border-subtle] rounded-md text-[--text-primary] focus:outline-none focus:border-sky transition-colors"
                placeholder={isEs ? 'su@correo.com' : 'you@email.com'}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[--text-secondary] mb-1">
                {isEs ? 'Contrasena' : 'Password'}
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-[--bg-elevated] border border-[--border-subtle] rounded-md text-[--text-primary] focus:outline-none focus:border-sky transition-colors pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[--text-muted] hover:text-[--text-secondary]"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-[--text-secondary] cursor-pointer">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="rounded border-[--border-medium] bg-[--bg-elevated]" />
                {isEs ? 'Recordarme' : 'Remember me'}
              </label>
              <Link to={isEs ? '/es/recuperar-contrasena' : '/forgot-password'} className="text-sm text-sky hover:text-sky-light transition-colors">
                {isEs ? 'Olvido su contrasena?' : 'Forgot password?'}
              </Link>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center text-lg py-3.5">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isEs ? 'Iniciar Sesion' : 'Sign In')}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[--text-secondary]">
            {isEs ? 'No tiene cuenta? ' : "Don't have an account? "}
            <Link to={isEs ? '/es/registro' : '/register'} className="text-sky hover:text-sky-light font-medium transition-colors">
              {isEs ? 'Registrarse' : 'Register'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
