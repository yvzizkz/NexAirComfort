import { Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './i18n/LanguageContext'
import { AuthProvider } from './hooks/useAuth'
import Layout from './components/Layout'
import DashboardLayout from './components/DashboardLayout'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import MembershipPage from './pages/MembershipPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import AreasPage from './pages/AreasPage'
import CityPage from './pages/areas/CityPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import EstimatePage from './pages/EstimatePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ServicePage from './pages/services/ServicePage'
import DashboardOverview from './pages/dashboard/Overview'
import DashboardPlan from './pages/dashboard/Plan'
import DashboardAppointments from './pages/dashboard/Appointments'
import DashboardHistory from './pages/dashboard/History'
import DashboardInvoices from './pages/dashboard/Invoices'
import DashboardNuve from './pages/dashboard/Nuve'
import DashboardReferrals from './pages/dashboard/Referrals'
import DashboardSupport from './pages/dashboard/Support'
import DashboardSettings from './pages/dashboard/Settings'
import TermsPage from './pages/TermsPage'
import PrivacyPage from './pages/PrivacyPage'
import NotFoundPage from './pages/NotFoundPage'
import MembershipWelcomePage from './pages/MembershipWelcomePage'

function AppRoutes() {
  return (
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
