import { useState, type FormEvent } from 'react'
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  Send,
  Loader2,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react'
import { useTranslation } from '@/i18n/LanguageContext'
import SEOHead from '@/components/SEOHead'
import { PHONE_NUMBER, PHONE_LINK, SERVICE_AREAS } from '@/lib/constants'
import { submitContactForm } from '@/lib/api'

export default function ContactPage() {
  const { t, language } = useTranslation()
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    preferred_time: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setFormState('submitting')
    setErrorMsg('')

    const result = await submitContactForm({ ...form, language })
    if (result.success) {
      setFormState('success')
      setForm({ name: '', email: '', phone: '', service: '', message: '', preferred_time: '' })
    } else {
      setFormState('error')
      setErrorMsg(result.error || 'Something went wrong. Please try again.')
    }
  }

  const serviceOptions = [
    'AC Repair',
    'AC Installation',
    'Heating Services',
    'Maintenance',
    'Mini-Splits',
    'Indoor Air Quality',
    'Plumbing',
    'Electrical',
    'Other',
  ]

  return (
    <>
      <SEOHead
        title={t('seo.contactTitle') || 'Contact NexAir Comfort | Phoenix HVAC Service'}
        description={t('seo.contactDescription') || 'Contact NexAir Comfort for HVAC, plumbing, and electrical service in the Phoenix area.'}
        path={language === 'es' ? '/es/contacto' : '/contact'}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="glow-sky" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="gradient-heading text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 font-[var(--font-display)]">
            {t('contact.title') || 'Contact Us'}
          </h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            {t('contact.subtitle') || 'Have a question or need service? Reach out and our team will get back to you promptly.'}
          </p>
        </div>
      </section>

      {/* ── Two-Column Layout ────────────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* ── Left: Contact Form ──────────────────────────────────────────── */}
          <div className="card p-8">
            {formState === 'success' ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle className="w-16 h-16 text-[var(--green)] mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Message Sent!</h3>
                <p className="text-[var(--text-secondary)] max-w-md">
                  {t('contact.successMessage') || 'Thank you! Your message has been sent. Our team will contact you within one business hour during normal business hours.'}
                </p>
                <button
                  onClick={() => setFormState('idle')}
                  className="btn-primary mt-8"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>

                {formState === 'error' && (
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <p className="text-sm text-red-300">{errorMsg}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                      {t('contact.form.name') || 'Full Name'} *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--sky)] transition-colors"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                      {t('contact.form.email') || 'Email Address'} *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--sky)] transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                      {t('contact.form.phone') || 'Phone Number'} *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--sky)] transition-colors"
                      placeholder="(480) 555-0123"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                      {t('contact.form.serviceNeeded') || 'Service Needed'}
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-white focus:outline-none focus:border-[var(--sky)] transition-colors"
                    >
                      <option value="">Select a service</option>
                      {serviceOptions.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="preferred_time" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                    {t('contact.form.preferredTime') || 'Preferred Time'}
                  </label>
                  <select
                    id="preferred_time"
                    name="preferred_time"
                    value={form.preferred_time}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-white focus:outline-none focus:border-[var(--sky)] transition-colors"
                  >
                    <option value="">No preference</option>
                    <option value="morning">Morning (7AM - 12PM)</option>
                    <option value="afternoon">Afternoon (12PM - 5PM)</option>
                    <option value="evening">Evening (5PM - 7PM)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                    {t('contact.form.message') || 'Message'} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--sky)] transition-colors resize-none"
                    placeholder="Tell us about your issue or question..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="btn-primary w-full justify-center text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formState === 'submitting' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t('contact.form.submit') || 'Send Message'}
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* ── Right: Contact Info ─────────────────────────────────────────── */}
          <div className="space-y-8">
            {/* Phone */}
            <div className="card p-6">
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'rgba(212, 112, 42, 0.12)',
                    border: '1px solid rgba(212, 112, 42, 0.2)',
                  }}
                >
                  <Phone className="w-6 h-6 text-[var(--orange)]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Call Us</h3>
                  <a
                    href={PHONE_LINK}
                    className="text-2xl font-bold text-[var(--orange)] hover:text-[var(--gold)] transition-colors"
                  >
                    {PHONE_NUMBER}
                  </a>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    Tap to call from your mobile device
                  </p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="card p-6">
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'rgba(74, 144, 217, 0.12)',
                    border: '1px solid rgba(74, 144, 217, 0.2)',
                  }}
                >
                  <Mail className="w-6 h-6 text-[var(--sky)]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Email Us</h3>
                  <a
                    href="mailto:info@nexaircomfort.com"
                    className="text-[var(--sky)] hover:text-[var(--sky-light)] transition-colors font-medium"
                  >
                    info@nexaircomfort.com
                  </a>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    We respond within one business hour
                  </p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="card p-6">
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'rgba(102, 187, 106, 0.12)',
                    border: '1px solid rgba(102, 187, 106, 0.2)',
                  }}
                >
                  <Clock className="w-6 h-6 text-[var(--green)]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Business Hours</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between gap-8">
                      <span className="text-[var(--text-secondary)]">Monday - Friday</span>
                      <span className="text-white font-medium">7:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between gap-8">
                      <span className="text-[var(--text-secondary)]">Saturday</span>
                      <span className="text-white font-medium">8:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex justify-between gap-8">
                      <span className="text-[var(--text-secondary)]">Sunday</span>
                      <span className="text-white font-medium">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Note */}
            <div
              className="card p-6"
              style={{
                border: '1px solid rgba(212, 112, 42, 0.3)',
                background: 'rgba(212, 112, 42, 0.05)',
              }}
            >
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-[var(--orange)] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Emergency Service</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {t('contact.emergencyNote') || 'For after-hours emergencies, call (480) 999-6100 and press 1 for our emergency dispatch line.'}{' '}
                    <strong className="text-[var(--orange)]">Members receive priority emergency dispatch.</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="card p-6">
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'rgba(74, 144, 217, 0.12)',
                    border: '1px solid rgba(74, 144, 217, 0.2)',
                  }}
                >
                  <MapPin className="w-6 h-6 text-[var(--sky)]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Service Area</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    Proudly serving {SERVICE_AREAS.join(', ')}, and the surrounding Phoenix metro area.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
