import { useState } from 'react'
import {
  User,
  Shield,
  Bell,
  Globe,
  Trash2,
  Loader2,
  CheckCircle,
  AlertTriangle,
  Eye,
  EyeOff,
} from 'lucide-react'
import { useTranslation } from '@/i18n/LanguageContext'
import { useAuth } from '@/hooks/useAuth'
import { updateProfile, changePassword } from '@/lib/api'

export default function Settings() {
  const { language, setLanguage } = useTranslation()
  const { user, updateUser, logout } = useAuth()
  const isEs = language === 'es'

  // Profile Form
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address_street: user?.address_street || '',
    address_city: user?.address_city || '',
    address_state: user?.address_state || 'AZ',
    address_zip: user?.address_zip || '',
  })
  const [profileStatus, setProfileStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  // Password Form
  const [passwords, setPasswords] = useState({
    current: '',
    newPassword: '',
    confirm: '',
  })
  const [showPasswords, setShowPasswords] = useState(false)
  const [passwordStatus, setPasswordStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [passwordError, setPasswordError] = useState('')

  // Preferences
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    marketing: false,
  })

  const inputClasses =
    'w-full px-4 py-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--sky)] transition-colors text-sm'

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setProfileStatus('saving')
    const result = await updateProfile({
      name: profile.name,
      phone: profile.phone,
      address_street: profile.address_street,
      address_city: profile.address_city,
      address_state: profile.address_state,
      address_zip: profile.address_zip,
      language,
    })
    if (result.success) {
      setProfileStatus('saved')
      if (result.data?.user) {
        updateUser(result.data.user as any)
      }
      setTimeout(() => setProfileStatus('idle'), 3000)
    } else {
      setProfileStatus('error')
    }
  }

  const handlePasswordSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError('')
    if (passwords.newPassword !== passwords.confirm) {
      setPasswordError(isEs ? 'Las contrasenas no coinciden.' : 'Passwords do not match.')
      return
    }
    if (passwords.newPassword.length < 8) {
      setPasswordError(
        isEs ? 'La contrasena debe tener al menos 8 caracteres.' : 'Password must be at least 8 characters.'
      )
      return
    }
    setPasswordStatus('saving')
    const result = await changePassword(passwords.current, passwords.newPassword)
    if (result.success) {
      setPasswordStatus('saved')
      setPasswords({ current: '', newPassword: '', confirm: '' })
      setTimeout(() => setPasswordStatus('idle'), 3000)
    } else {
      setPasswordStatus('error')
      setPasswordError(result.error || (isEs ? 'Error al cambiar contrasena.' : 'Failed to change password.'))
    }
  }

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      isEs
        ? 'Esta seguro de que desea eliminar su cuenta? Esta accion es irreversible.'
        : 'Are you sure you want to delete your account? This action cannot be undone.'
    )
    if (confirmed) {
      // Delete account logic would be here
      logout()
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-8 font-[var(--font-display)]">
        {isEs ? 'Configuracion de Cuenta' : 'Account Settings'}
      </h1>

      {/* Profile Section */}
      <div
        className="rounded-xl p-6 md:p-8 mb-8"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <div className="flex items-center gap-3 mb-6">
          <User className="w-5 h-5 text-[var(--sky)]" />
          <h2 className="text-lg font-bold text-white">
            {isEs ? 'Informacion de Perfil' : 'Profile Information'}
          </h2>
        </div>

        <form onSubmit={handleProfileSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                {isEs ? 'Nombre Completo' : 'Full Name'}
              </label>
              <input
                name="name"
                type="text"
                value={profile.name}
                onChange={handleProfileChange}
                className={inputClasses}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                {isEs ? 'Correo Electronico' : 'Email Address'}
              </label>
              <input
                name="email"
                type="email"
                value={profile.email}
                disabled
                className={`${inputClasses} opacity-50 cursor-not-allowed`}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                {isEs ? 'Telefono' : 'Phone Number'}
              </label>
              <input
                name="phone"
                type="tel"
                value={profile.phone}
                onChange={handleProfileChange}
                className={inputClasses}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                {isEs ? 'Direccion' : 'Street Address'}
              </label>
              <input
                name="address_street"
                type="text"
                value={profile.address_street}
                onChange={handleProfileChange}
                className={inputClasses}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                {isEs ? 'Ciudad' : 'City'}
              </label>
              <input
                name="address_city"
                type="text"
                value={profile.address_city}
                onChange={handleProfileChange}
                className={inputClasses}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                {isEs ? 'Codigo Postal' : 'ZIP Code'}
              </label>
              <input
                name="address_zip"
                type="text"
                value={profile.address_zip}
                onChange={handleProfileChange}
                className={inputClasses}
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={profileStatus === 'saving'}
              className="btn-primary text-sm disabled:opacity-50"
            >
              {profileStatus === 'saving' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : profileStatus === 'saved' ? (
                <><CheckCircle className="w-4 h-4" /> {isEs ? 'Guardado' : 'Saved'}</>
              ) : (
                isEs ? 'Guardar Cambios' : 'Save Changes'
              )}
            </button>
            {profileStatus === 'error' && (
              <span className="text-xs text-red-400">
                {isEs ? 'Error al guardar.' : 'Failed to save.'}
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Preferences */}
      <div
        className="rounded-xl p-6 md:p-8 mb-8"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-5 h-5 text-[var(--orange)]" />
          <h2 className="text-lg font-bold text-white">
            {isEs ? 'Preferencias' : 'Preferences'}
          </h2>
        </div>

        <div className="space-y-5">
          {/* Language */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="w-4 h-4 text-[var(--text-muted)]" />
              <div>
                <p className="text-sm font-medium text-white">
                  {isEs ? 'Idioma' : 'Language'}
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  {isEs ? 'Seleccione su idioma preferido' : 'Select your preferred language'}
                </p>
              </div>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'es')}
              className="px-3 py-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-white text-sm focus:outline-none focus:border-[var(--sky)]"
            >
              <option value="en">English</option>
              <option value="es">Espanol</option>
            </select>
          </div>

          {/* Notification Toggles */}
          {[
            {
              key: 'email' as const,
              label: isEs ? 'Notificaciones por Correo' : 'Email Notifications',
              desc: isEs ? 'Reciba confirmaciones de citas y actualizaciones' : 'Receive appointment confirmations and updates',
            },
            {
              key: 'sms' as const,
              label: isEs ? 'Notificaciones SMS' : 'SMS Notifications',
              desc: isEs ? 'Reciba recordatorios de citas por mensaje de texto' : 'Receive appointment reminders via text message',
            },
            {
              key: 'marketing' as const,
              label: isEs ? 'Correos Promocionales' : 'Marketing Emails',
              desc: isEs ? 'Ofertas especiales, consejos y noticias de la empresa' : 'Special offers, tips, and company news',
            },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">{item.label}</p>
                <p className="text-xs text-[var(--text-muted)]">{item.desc}</p>
              </div>
              <button
                onClick={() =>
                  setNotifications((prev) => ({
                    ...prev,
                    [item.key]: !prev[item.key],
                  }))
                }
                className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
                  notifications[item.key] ? 'bg-[var(--sky)]' : 'bg-[var(--text-muted)]'
                }`}
                role="switch"
                aria-checked={notifications[item.key]}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${
                    notifications[item.key] ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div
        className="rounded-xl p-6 md:p-8 mb-8"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-5 h-5 text-[var(--green)]" />
          <h2 className="text-lg font-bold text-white">
            {isEs ? 'Seguridad' : 'Security'}
          </h2>
        </div>

        <form onSubmit={handlePasswordSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                {isEs ? 'Contrasena Actual' : 'Current Password'}
              </label>
              <div className="relative">
                <input
                  type={showPasswords ? 'text' : 'password'}
                  value={passwords.current}
                  onChange={(e) =>
                    setPasswords((prev) => ({ ...prev, current: e.target.value }))
                  }
                  className={inputClasses}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                {isEs ? 'Nueva Contrasena' : 'New Password'}
              </label>
              <input
                type={showPasswords ? 'text' : 'password'}
                value={passwords.newPassword}
                onChange={(e) =>
                  setPasswords((prev) => ({ ...prev, newPassword: e.target.value }))
                }
                className={inputClasses}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                {isEs ? 'Confirmar Contrasena' : 'Confirm Password'}
              </label>
              <input
                type={showPasswords ? 'text' : 'password'}
                value={passwords.confirm}
                onChange={(e) =>
                  setPasswords((prev) => ({ ...prev, confirm: e.target.value }))
                }
                className={inputClasses}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-xs text-[var(--text-secondary)] cursor-pointer">
              <input
                type="checkbox"
                checked={showPasswords}
                onChange={(e) => setShowPasswords(e.target.checked)}
                className="rounded border-[var(--border-medium)] bg-[var(--bg-elevated)]"
              />
              {isEs ? 'Mostrar contrasenas' : 'Show passwords'}
            </label>
          </div>

          {passwordError && (
            <div className="flex items-center gap-2 text-xs text-red-400">
              <AlertTriangle className="w-3.5 h-3.5" />
              {passwordError}
            </div>
          )}

          <button
            type="submit"
            disabled={passwordStatus === 'saving'}
            className="btn-secondary text-sm disabled:opacity-50"
          >
            {passwordStatus === 'saving' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : passwordStatus === 'saved' ? (
              <><CheckCircle className="w-4 h-4" /> {isEs ? 'Actualizada' : 'Updated'}</>
            ) : (
              isEs ? 'Cambiar Contrasena' : 'Change Password'
            )}
          </button>
        </form>
      </div>

      {/* Danger Zone */}
      <div
        className="rounded-xl p-6 md:p-8"
        style={{
          background: 'rgba(239, 68, 68, 0.04)',
          border: '1px solid rgba(239, 68, 68, 0.15)',
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <Trash2 className="w-5 h-5 text-red-400" />
          <h2 className="text-lg font-bold text-red-400">
            {isEs ? 'Zona de Peligro' : 'Danger Zone'}
          </h2>
        </div>
        <p className="text-sm text-[var(--text-secondary)] mb-4">
          {isEs
            ? 'Eliminar su cuenta es una accion permanente. Se eliminaran todos sus datos, historial de servicios y beneficios de membresia.'
            : 'Deleting your account is a permanent action. All your data, service history, and membership benefits will be removed.'}
        </p>
        <button
          onClick={handleDeleteAccount}
          className="px-5 py-2.5 rounded-full text-sm font-semibold text-red-400 border border-red-500/30 hover:bg-red-500/10 transition-colors"
        >
          {isEs ? 'Eliminar mi Cuenta' : 'Delete My Account'}
        </button>
      </div>
    </div>
  )
}
