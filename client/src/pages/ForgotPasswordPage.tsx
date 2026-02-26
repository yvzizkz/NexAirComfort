import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from '@/i18n/LanguageContext'
import { ArrowLeft, Loader2, CheckCircle } from 'lucide-react'

export default function ForgotPasswordPage() {
  const { language } = useTranslation()
  const isEs = language === 'es'
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
    } catch { /* ignore */ }
    setLoading(false)
    setSent(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--gradient-page)' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to={isEs ? '/es' : '/'} className="text-3xl font-display font-extrabold gradient-heading inline-block">NexAir Comfort</Link>
        </div>

        <div className="card p-8">
          {sent ? (
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-3">{isEs ? 'Revise su Correo' : 'Check Your Email'}</h1>
              <p className="text-[--text-secondary] mb-6">
                {isEs ? 'Si existe una cuenta con ese correo, le enviaremos instrucciones para restablecer su contrasena.' : 'If an account with that email exists, we\'ll send you password reset instructions.'}
              </p>
              <Link to={isEs ? '/es/iniciar-sesion' : '/login'} className="btn-secondary inline-flex">
                <ArrowLeft className="w-4 h-4" /> {isEs ? 'Volver a Iniciar Sesion' : 'Back to Sign In'}
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-2 text-center">{isEs ? 'Recuperar Contrasena' : 'Reset Password'}</h1>
              <p className="text-[--text-secondary] text-sm text-center mb-6">
                {isEs ? 'Ingrese su correo y le enviaremos un enlace para restablecer su contrasena.' : 'Enter your email and we\'ll send you a link to reset your password.'}
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[--text-secondary] mb-1">{isEs ? 'Correo Electronico' : 'Email'}</label>
                  <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 bg-[--bg-elevated] border border-[--border-subtle] rounded-md text-[--text-primary] focus:outline-none focus:border-sky transition-colors" />
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isEs ? 'Enviar Enlace' : 'Send Reset Link')}
                </button>
              </form>
              <p className="mt-4 text-center text-sm">
                <Link to={isEs ? '/es/iniciar-sesion' : '/login'} className="text-sky hover:text-sky-light inline-flex items-center gap-1">
                  <ArrowLeft className="w-4 h-4" /> {isEs ? 'Volver a Iniciar Sesion' : 'Back to Sign In'}
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
