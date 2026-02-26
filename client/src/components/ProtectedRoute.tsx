import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Loader2 } from 'lucide-react'

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()
  const isSpanish = location.pathname.startsWith('/es')

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'var(--gradient-page)' }}
        role="status"
        aria-label="Loading"
      >
        <Loader2 className="w-10 h-10 text-[var(--sky)] animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated) {
    const loginPath = isSpanish ? '/es/iniciar-sesion' : '/login'
    return <Navigate to={loginPath} state={{ from: location }} replace />
  }

  return <Outlet />
}
