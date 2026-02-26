import { useState, type FormEvent } from 'react'
import {
  FileText,
  Loader2,
  CheckCircle,
  AlertTriangle,
  Upload,
  Clock,
} from 'lucide-react'
import { useTranslation } from '@/i18n/LanguageContext'
import SEOHead from '@/components/SEOHead'
import { submitEstimate } from '@/lib/api'

export default function EstimatePage() {
  const { t, language } = useTranslation()
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address_street: '',
    address_city: '',
    address_state: 'AZ',
    address_zip: '',
    service_type: '',
    square_footage: '',
    year_built: '',
    stories: '',
    num_ac_units: '',
    current_system: '',
    budget: '',
    financing: '',
    urgency: '',
    details: '',
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

    const result = await submitEstimate({
      name: form.name,
      email: form.email,
      phone: form.phone,
      address_street: form.address_street,
      address_city: form.address_city,
      address_state: form.address_state,
      address_zip: form.address_zip,
      service_type: form.service_type,
      square_footage: form.square_footage,
      system_age: form.current_system,
      details: `Stories: ${form.stories}\nAC Units: ${form.num_ac_units}\nYear Built: ${form.year_built}\nBudget: ${form.budget}\nFinancing: ${form.financing}\nUrgency: ${form.urgency}\n\n${form.details}`,
      language,
    })

    if (result.success) {
      setFormState('success')
    } else {
      setFormState('error')
      setErrorMsg(result.error || 'Something went wrong. Please try again.')
    }
  }

  const serviceTypes = [
    'AC Installation / Replacement',
    'AC Repair',
    'Heating Installation / Replacement',
    'Heating Repair',
    'Ductless Mini-Split',
    'Indoor Air Quality',
    'Ductwork',
    'Maintenance Plan',
    'Plumbing',
    'Electrical',
    'Other',
  ]

  const budgetRanges = [
    'Under $1,000',
    '$1,000 - $3,000',
    '$3,000 - $5,000',
    '$5,000 - $10,000',
    '$10,000 - $20,000',
    '$20,000+',
    'Not sure - help me figure it out',
  ]

  const urgencyOptions = [
    'Emergency - ASAP',
    'Within a few days',
    'Within a week',
    'Within a month',
    'Just planning ahead',
  ]

  if (formState === 'success') {
    return (
      <>
        <SEOHead
          title={t('seo.estimateTitle') || 'Free HVAC Estimate | NexAir Comfort Phoenix'}
          description={t('seo.estimateDescription') || 'Get a free, no-obligation estimate for HVAC services in the Phoenix metro area.'}
          path={language === 'es' ? '/es/cotizacion' : '/get-estimate'}
        />
        <section className="min-h-[70vh] flex items-center justify-center px-4 py-24">
          <div className="max-w-lg mx-auto text-center">
            <CheckCircle className="w-20 h-20 text-[var(--green)] mx-auto mb-6" />
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Estimate Request Received!
            </h1>
            <p className="text-lg text-[var(--text-secondary)] mb-6 leading-relaxed">
              {t('estimate.successMessage') || 'Thank you! Your estimate request has been received. A NexAir Comfort specialist will contact you within 24 hours to discuss your project.'}
            </p>
            <div className="card p-5 flex items-center gap-4 text-left mb-8">
              <Clock className="w-8 h-8 text-[var(--sky)] flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-white">What happens next?</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  We will prepare a custom estimate within 24 hours and contact you to schedule a free in-home consultation if needed.
                </p>
              </div>
            </div>
            <a href="/" className="btn-primary">
              Back to Home
            </a>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <SEOHead
        title={t('seo.estimateTitle') || 'Free HVAC Estimate | NexAir Comfort Phoenix'}
        description={t('seo.estimateDescription') || 'Get a free, no-obligation estimate for HVAC services in the Phoenix metro area.'}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="glow-sky" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <FileText className="w-12 h-12 text-[var(--sky)] mx-auto mb-6" />
          <h1 className="gradient-heading text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 font-[var(--font-display)]">
            {t('estimate.title') || 'Get a Free Estimate'}
          </h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            {t('estimate.subtitle') || 'Tell us about your project and we will provide a no-obligation estimate within 24 hours.'}
          </p>
        </div>
      </section>

      {/* ── Form ─────────────────────────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="card p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              {formState === 'error' && (
                <div className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <p className="text-sm text-red-300">{errorMsg}</p>
                </div>
              )}

              {/* ── Contact Info ──────────────────────────────────────────────── */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Your Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                      Full Name *
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
                      Email Address *
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
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                      Phone Number *
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
                    <label htmlFor="service_type" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                      Service Type *
                    </label>
                    <select
                      id="service_type"
                      name="service_type"
                      required
                      value={form.service_type}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-white focus:outline-none focus:border-[var(--sky)] transition-colors"
                    >
                      <option value="">Select a service</option>
                      {serviceTypes.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* ── Property Address ──────────────────────────────────────────── */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Property Address</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label htmlFor="address_street" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                      Street Address *
                    </label>
                    <input
                      id="address_street"
                      name="address_street"
                      type="text"
                      required
                      value={form.address_street}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--sky)] transition-colors"
                      placeholder="123 Main St"
                    />
                  </div>
                  <div>
                    <label htmlFor="address_city" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                      City *
                    </label>
                    <input
                      id="address_city"
                      name="address_city"
                      type="text"
                      required
                      value={form.address_city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--sky)] transition-colors"
                      placeholder="Phoenix"
                    />
                  </div>
                  <div>
                    <label htmlFor="address_zip" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                      ZIP Code *
                    </label>
                    <input
                      id="address_zip"
                      name="address_zip"
                      type="text"
                      required
                      value={form.address_zip}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--sky)] transition-colors"
                      placeholder="85001"
                    />
                  </div>
                </div>
              </div>

              {/* ── Property Details ──────────────────────────────────────────── */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Property Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="square_footage" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                      Square Footage
                    </label>
                    <input
                      id="square_footage"
                      name="square_footage"
                      type="text"
                      value={form.square_footage}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--sky)] transition-colors"
                      placeholder="e.g. 2,000"
                    />
                  </div>
                  <div>
                    <label htmlFor="year_built" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                      Year Built
                    </label>
                    <input
                      id="year_built"
                      name="year_built"
                      type="text"
                      value={form.year_built}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--sky)] transition-colors"
                      placeholder="e.g. 2005"
                    />
                  </div>
                  <div>
                    <label htmlFor="stories" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                      Number of Stories
                    </label>
                    <select
                      id="stories"
                      name="stories"
                      value={form.stories}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-white focus:outline-none focus:border-[var(--sky)] transition-colors"
                    >
                      <option value="">Select</option>
                      <option value="1">1 Story</option>
                      <option value="2">2 Stories</option>
                      <option value="3">3+ Stories</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="num_ac_units" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                      Number of AC Units
                    </label>
                    <select
                      id="num_ac_units"
                      name="num_ac_units"
                      value={form.num_ac_units}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-white focus:outline-none focus:border-[var(--sky)] transition-colors"
                    >
                      <option value="">Select</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4+">4+</option>
                      <option value="unsure">Not sure</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* ── Current System ────────────────────────────────────────────── */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Current System Info</h3>
                <div>
                  <label htmlFor="current_system" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                    Current System (brand, age, type)
                  </label>
                  <input
                    id="current_system"
                    name="current_system"
                    type="text"
                    value={form.current_system}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--sky)] transition-colors"
                    placeholder="e.g. Carrier 3-ton, installed ~2012"
                  />
                </div>
              </div>

              {/* ── Photos Upload ─────────────────────────────────────────────── */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Photos (Optional)</h3>
                <div
                  className="rounded-lg p-8 text-center cursor-pointer hover:bg-[var(--bg-card-hover)] transition-colors"
                  style={{
                    background: 'var(--bg-card)',
                    border: '2px dashed var(--border-medium)',
                  }}
                >
                  <Upload className="w-10 h-10 text-[var(--text-muted)] mx-auto mb-3" />
                  <p className="text-sm text-[var(--text-secondary)] mb-1">
                    Drag and drop photos of your current system
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">
                    or click to browse (JPG, PNG up to 10MB each)
                  </p>
                  <p className="text-xs text-[var(--text-muted)] mt-2 italic">
                    Photo upload coming soon -- you can email photos to info@nexaircomfort.com
                  </p>
                </div>
              </div>

              {/* ── Budget & Timeline ─────────────────────────────────────────── */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Budget & Timeline</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-white focus:outline-none focus:border-[var(--sky)] transition-colors"
                    >
                      <option value="">Select</option>
                      {budgetRanges.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="financing" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                      Interested in Financing?
                    </label>
                    <select
                      id="financing"
                      name="financing"
                      value={form.financing}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-white focus:outline-none focus:border-[var(--sky)] transition-colors"
                    >
                      <option value="">Select</option>
                      <option value="yes">Yes, I would like financing options</option>
                      <option value="no">No, I will pay in full</option>
                      <option value="maybe">Maybe, tell me more</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="urgency" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                      How Soon Do You Need Service?
                    </label>
                    <select
                      id="urgency"
                      name="urgency"
                      value={form.urgency}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-white focus:outline-none focus:border-[var(--sky)] transition-colors"
                    >
                      <option value="">Select</option>
                      {urgencyOptions.map((u) => (
                        <option key={u} value={u}>{u}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* ── Notes ─────────────────────────────────────────────────────── */}
              <div>
                <label htmlFor="details" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                  Additional Notes
                </label>
                <textarea
                  id="details"
                  name="details"
                  rows={4}
                  value={form.details}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--sky)] transition-colors resize-none"
                  placeholder="Anything else we should know about your project?"
                />
              </div>

              {/* ── Submit ────────────────────────────────────────────────────── */}
              <button
                type="submit"
                disabled={formState === 'submitting'}
                className="btn-primary w-full justify-center text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formState === 'submitting' ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
                ) : (
                  <><FileText className="w-5 h-5" /> {t('estimate.submitText') || 'Request Free Estimate'}</>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
