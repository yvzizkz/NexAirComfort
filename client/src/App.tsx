import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './i18n/LanguageContext'
import { AuthProvider } from './hooks/useAuth'
import Layout from './components/Layout'
import DashboardLayout from './components/DashboardLayout'
import ProtectedRoute from './components/ProtectedRoute'

// Eagerly load homepage for fastest initial paint
import HomePage from './pages/HomePage'

// Lazy-load all other pages for code splitting
const MembershipPage = lazy(() => import('./pages/MembershipPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const AreasPage = lazy(() => import('./pages/AreasPage'))
const CityPage = lazy(() => import('./pages/areas/CityPage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'))
const EstimatePage = lazy(() => import('./pages/EstimatePage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const RegisterPage = lazy(() => import('./pages/RegisterPage'))
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'))
const ServicePage = lazy(() => import('./pages/services/ServicePage'))
const TermsPage = lazy(() => import('./pages/TermsPage'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const MembershipWelcomePage = lazy(() => import('./pages/MembershipWelcomePage'))

// Dashboard pages
const DashboardOverview = lazy(() => import('./pages/dashboard/Overview'))
const DashboardPlan = lazy(() => import('./pages/dashboard/Plan'))
const DashboardAppointments = lazy(() => import('./pages/dashboard/Appointments'))
const DashboardHistory = lazy(() => import('./pages/dashboard/History'))
const DashboardInvoices = lazy(() => import('./pages/dashboard/Invoices'))
const DashboardNuve = lazy(() => import('./pages/dashboard/Nuve'))
const DashboardReferrals = lazy(() => import('./pages/dashboard/Referrals'))
const DashboardSupport = lazy(() => import('./pages/dashboard/Support'))
const DashboardSettings = lazy(() => import('./pages/dashboard/Settings'))

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="w-10 h-10 border-3 border-[var(--sky)] border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
    <Routes>
      {/* Public routes with main layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/membership" element={<MembershipPage />} />
        <Route path="/membership/welcome" element={<MembershipWelcomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/areas" element={<AreasPage />} />
        <Route path="/areas/:city" element={<CityPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/get-estimate" element={<EstimatePage />} />
        <Route path="/services/:serviceSlug" element={<ServicePage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />

        {/* Spanish public routes */}
        <Route path="/es" element={<HomePage />} />
        <Route path="/es/membresia" element={<MembershipPage />} />
        <Route path="/es/membresia/bienvenido" element={<MembershipWelcomePage />} />
        <Route path="/es/nosotros" element={<AboutPage />} />
        <Route path="/es/contacto" element={<ContactPage />} />
        <Route path="/es/areas" element={<AreasPage />} />
        <Route path="/es/areas/:city" element={<CityPage />} />
        <Route path="/es/blog" element={<BlogPage />} />
        <Route path="/es/blog/:slug" element={<BlogPostPage />} />
        <Route path="/es/cotizacion" element={<EstimatePage />} />
        <Route path="/es/servicios/:serviceSlug" element={<ServicePage />} />
        <Route path="/es/terminos" element={<TermsPage />} />
        <Route path="/es/privacidad" element={<PrivacyPage />} />
      </Route>

      {/* Auth routes (no main nav) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/es/iniciar-sesion" element={<LoginPage />} />
      <Route path="/es/registro" element={<RegisterPage />} />
      <Route path="/es/recuperar-contrasena" element={<ForgotPasswordPage />} />

      {/* Dashboard routes (protected) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardOverview />} />
          <Route path="/dashboard/plan" element={<DashboardPlan />} />
          <Route path="/dashboard/appointments" element={<DashboardAppointments />} />
          <Route path="/dashboard/history" element={<DashboardHistory />} />
          <Route path="/dashboard/invoices" element={<DashboardInvoices />} />
          <Route path="/dashboard/nuve" element={<DashboardNuve />} />
          <Route path="/dashboard/referrals" element={<DashboardReferrals />} />
          <Route path="/dashboard/support" element={<DashboardSupport />} />
          <Route path="/dashboard/settings" element={<DashboardSettings />} />
          {/* Spanish dashboard */}
          <Route path="/es/panel" element={<DashboardOverview />} />
          <Route path="/es/panel/plan" element={<DashboardPlan />} />
          <Route path="/es/panel/citas" element={<DashboardAppointments />} />
          <Route path="/es/panel/historial" element={<DashboardHistory />} />
          <Route path="/es/panel/facturas" element={<DashboardInvoices />} />
          <Route path="/es/panel/nuve" element={<DashboardNuve />} />
          <Route path="/es/panel/referidos" element={<DashboardReferrals />} />
          <Route path="/es/panel/soporte" element={<DashboardSupport />} />
          <Route path="/es/panel/configuracion" element={<DashboardSettings />} />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </Suspense>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </LanguageProvider>
  )
}
