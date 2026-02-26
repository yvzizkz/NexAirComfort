import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useTranslation } from '@/i18n/LanguageContext'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const { language } = useTranslation()
  const isEs = language === 'es'

  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' })
  const [agree, setAgree] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirmPassword) {
      setError(isEs ? 'Las contrasenas no coinciden' : 'Passwords do not match')
      return
    }
    if (form.password.length < 8) {
      setError(isEs ? 'La contrasena debe tener al menos 8 caracteres' : 'Password must be at least 8 characters')
      return
    }
    if (!agree) {
      setError(isEs ? 'Debe aceptar los terminos' : 'You must agree to the terms')
      return
    }
    setLoading(true)
    const result = await register({ name: form.name, email: form.email, phone: form.phone, password: form.password, language })
    setLoading(false)
    if (result.success) {
      navigate(isEs ? '/es/panel' : '/dashboard', { replace: true })
    } else {
      setError(result.error || (isEs ? 'Error al registrarse' : 'Registration failed'))
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ background: 'var(--gradient-page)' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to={isEs ? '/es' : '/'} className="text-3xl font-display font-extrabold gradient-heading inline-block">
            NexAir Comfort
          </Link>
        </div>

        <div className="card p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">
            {isEs ? 'Crear Cuenta' : 'Create Account'}
          </h1>

          {error && (
            <div className="mb-4 p-3 rounded-md bg-red-500/10 border border-red-500/30 text-red-400 text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[--text-secondary] mb-1">
                {isEs ? 'Nombre Completo' : 'Full Name'}
              </label>
              <input id="name" type="text" required value={form.name} onChange={(e) => update('name', e.target.value)} className="w-full px-4 py-3 bg-[--bg-elevated] border border-[--border-subtle] rounded-md text-[--text-primary] focus:outline-none focus:border-sky transition-colors" />
            </div>

            <div>
              <label htmlFor="reg-email" className="block text-sm font-medium text-[--text-secondary] mb-1">
                {isEs ? 'Correo Electronico' : 'Email'}
              </label>
              <input id="reg-email" type="email" required value={form.email} onChange={(e) => update('email', e.target.value)} className="w-full px-4 py-3 bg-[--bg-elevated] border border-[--border-subtle] rounded-md text-[--text-primary] focus:outline-none focus:border-sky transition-colors" />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-[--text-secondary] mb-1">
                {isEs ? 'Telefono' : 'Phone'}
              </label>
              <input id="phone" type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} className="w-full px-4 py-3 bg-[--bg-elevated] border border-[--border-subtle] rounded-md text-[--text-primary] focus:outline-none focus:border-sky transition-colors" placeholder="(480) 555-1234" />
            </div>

            <div>
              <label htmlFor="reg-password" className="block text-sm font-medium text-[--text-secondary] mb-1">
                {isEs ? 'Contrasena' : 'Password'}
              </label>
              <div className="relative">
                <input id="reg-password" type={showPassword ? 'text' : 'password'} required value={form.password} onChange={(e) => update('password', e.target.value)} className="w-full px-4 py-3 bg-[--bg-elevated] border border-[--border-subtle] rounded-md text-[--text-primary] focus:outline-none focus:border-sky transition-colors pr-12" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[--text-muted]" aria-label="Toggle password">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-[--text-secondary] mb-1">
                {isEs ? 'Confirmar Contrasena' : 'Confirm Password'}
              </label>
              <input id="confirm-password" type="password" required value={form.confirmPassword} onChange={(e) => update('confirmPassword', e.target.value)} className="w-full px-4 py-3 bg-[--bg-elevated] border border-[--border-subtle] rounded-md text-[--text-primary] focus:outline-none focus:border-sky transition-colors" />
            </div>

            <label className="flex items-start gap-2 text-sm text-[--text-secondary] cursor-pointer">
              <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="rounded border-[--border-medium] bg-[--bg-elevated] mt-0.5" />
              <span>
                {isEs ? 'Acepto los ' : 'I agree to the '}
                <Link to={isEs ? '/es/terminos' : '/terms'} className="text-sky hover:text-sky-light">{isEs ? 'Terminos de Servicio' : 'Terms of Service'}</Link>
                {isEs ? ' y la ' : ' and '}
                <Link to={isEs ? '/es/privacidad' : '/privacy'} className="text-sky hover:text-sky-light">{isEs ? 'Politica de Privacidad' : 'Privacy Policy'}</Link>
              </span>
            </label>

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center text-lg py-3.5">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isEs ? 'Crear Cuenta' : 'Create Account')}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[--text-secondary]">
            {isEs ? 'Ya tiene cuenta? ' : 'Already have an account? '}
            <Link to={isEs ? '/es/iniciar-sesion' : '/login'} className="text-sky hover:text-sky-light font-medium">{isEs ? 'Iniciar Sesion' : 'Sign In'}</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
