import { useState, type FormEvent } from 'react'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { useTranslation } from '@/i18n/LanguageContext'

interface FormData {
  name: string
  email: string
  phone: string
  address: string
  serviceNeeded: string
  preferredDate: string
  preferredTime: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
}

const SERVICE_OPTIONS = [
  { value: 'ac-repair', labelKey: 'services.acRepair' },
  { value: 'ac-installation', labelKey: 'services.acInstallation' },
  { value: 'heating', labelKey: 'services.heating' },
  { value: 'maintenance', labelKey: 'services.maintenance' },
  { value: 'mini-splits', labelKey: 'services.miniSplits' },
  { value: 'indoor-air-quality', labelKey: 'services.indoorAirQuality' },
  { value: 'plumbing', labelKey: 'services.plumbing' },
  { value: 'electrical', labelKey: 'services.electrical' },
]

export default function ContactForm() {
  const { t, language } = useTranslation()

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    serviceNeeded: '',
    preferredDate: '',
    preferredTime: '',
    message: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = t('contact.required')
    }

    if (!formData.email.trim()) {
      newErrors.email = t('contact.required')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contact.invalidEmail')
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t('contact.required')
    } else if (!/^[\d\s\-().+]{7,20}$/.test(formData.phone)) {
      newErrors.phone = t('contact.invalidPhone')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error on field change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          service: formData.serviceNeeded,
          preferred_date: formData.preferredDate,
          preferred_time: formData.preferredTime,
          message: formData.message,
          language,
        }),
      })

      if (!res.ok) throw new Error('Failed to submit')

      setStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        serviceNeeded: '',
        preferredDate: '',
        preferredTime: '',
        message: '',
      })
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        className="rounded-2xl p-10 text-center"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-green-500/10 border border-green-500/30">
          <CheckCircle className="w-8 h-8 text-green-400 animate-bounce" />
        </div>
        <p className="text-lg text-white font-semibold">{t('contact.success')}</p>
      </div>
    )
  }

  const inputClasses =
    'w-full px-4 py-3 rounded-xl text-sm text-white placeholder-[var(--text-muted)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--sky)] focus:border-transparent'
  const inputStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid var(--border-subtle)',
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Name */}
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
          {t('contact.name')} <span className="text-red-400">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={inputClasses}
          style={inputStyle}
          placeholder={t('contact.name')}
          aria-required="true"
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-400">{errors.name}</p>
        )}
      </div>

      {/* Email & Phone row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
            {t('contact.email')} <span className="text-red-400">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={inputClasses}
            style={inputStyle}
            placeholder={t('contact.email')}
            aria-required="true"
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-400">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="contact-phone" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
            {t('contact.phone')} <span className="text-red-400">*</span>
          </label>
          <input
            id="contact-phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={inputClasses}
            style={inputStyle}
            placeholder={t('contact.phone')}
            aria-required="true"
            aria-invalid={!!errors.phone}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-400">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Address */}
      <div>
        <label htmlFor="contact-address" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
          {t('contact.address')}
        </label>
        <input
          id="contact-address"
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className={inputClasses}
          style={inputStyle}
          placeholder={t('contact.address')}
        />
      </div>

      {/* Service Needed */}
      <div>
        <label htmlFor="contact-service" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
          {t('contact.serviceNeeded')}
        </label>
        <select
          id="contact-service"
          name="serviceNeeded"
          value={formData.serviceNeeded}
          onChange={handleChange}
          className={inputClasses}
          style={inputStyle}
        >
          <option value="">{t('contact.selectService')}</option>
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {t(opt.labelKey)}
            </option>
          ))}
        </select>
      </div>

      {/* Date & Time row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-date" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
            {t('contact.preferredDate')}
          </label>
          <input
            id="contact-date"
            type="date"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={handleChange}
            className={inputClasses}
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="contact-time" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
            {t('contact.preferredTime')}
          </label>
          <input
            id="contact-time"
            type="time"
            name="preferredTime"
            value={formData.preferredTime}
            onChange={handleChange}
            className={inputClasses}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
          {t('contact.message')}
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className={inputClasses}
          style={inputStyle}
          placeholder={t('contact.message')}
        />
      </div>

      {/* Error Message */}
      {status === 'error' && (
        <div className="flex items-center gap-2 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{t('contact.error')}</span>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full justify-center text-base disabled:opacity-60 disabled:cursor-not-allowed"
        aria-label={t('contact.submit')}
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            {t('contact.submitting')}
          </>
        ) : (
          t('contact.submit')
        )}
      </button>
    </form>
  )
}
