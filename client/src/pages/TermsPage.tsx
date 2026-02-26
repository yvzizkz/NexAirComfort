import { useTranslation } from '@/i18n/LanguageContext'
import SEOHead from '@/components/SEOHead'
import { COMPANY_NAME, PARENT_COMPANY, PHONE_NUMBER } from '@/lib/constants'

export default function TermsPage() {
  const { language } = useTranslation()
  const isEs = language === 'es'

  return (
    <>
      <SEOHead
        title={isEs ? 'Terminos de Servicio | NexAir Comfort' : 'Terms of Service | NexAir Comfort'}
        description={isEs ? 'Terminos y condiciones de uso para NexAir Comfort.' : 'Terms and conditions of service for NexAir Comfort.'}
        path={isEs ? '/es/terminos' : '/terms'}
      />

      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="gradient-heading text-4xl md:text-5xl font-extrabold mb-4 font-[var(--font-display)]">
            {isEs ? 'Terminos de Servicio' : 'Terms of Service'}
          </h1>
          <p className="text-[var(--text-muted)] text-sm mb-12">
            {isEs ? 'Ultima actualizacion: 1 de enero de 2025' : 'Last updated: January 1, 2025'}
          </p>

          <div className="space-y-10 text-[var(--text-secondary)] leading-relaxed">
            {/* 1 Introduction */}
            <div>
              <h2 className="text-xl font-bold text-white mb-3">1. Introduction</h2>
              <p className="mb-3">
                Welcome to {COMPANY_NAME}, a service brand operated by {PARENT_COMPANY}. These Terms of Service ("Terms") govern your access to and use of the {COMPANY_NAME} website, mobile application, Nuve Smart Monitoring platform, and all related services (collectively, the "Services").
              </p>
              <p>
                By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Services. We reserve the right to update these Terms at any time, and your continued use of the Services constitutes acceptance of those changes.
              </p>
            </div>

            {/* 2 Services */}
            <div>
              <h2 className="text-xl font-bold text-white mb-3">2. Services</h2>
              <p className="mb-3">
                {COMPANY_NAME} provides residential and commercial HVAC (heating, ventilation, and air conditioning) services, including but not limited to: air conditioning repair and installation, heating repair and installation, preventive maintenance, ductless mini-split installation, indoor air quality solutions, and Nuve Smart Monitoring services.
              </p>
              <p className="mb-3">
                All services are performed by licensed, insured, and background-checked technicians in accordance with applicable Arizona Registrar of Contractors (ROC) regulations. Our work is performed under the following Arizona ROC license numbers: ROC #350714, ROC #350715, ROC #350716, and ROC #305762.
              </p>
              <p>
                Service availability, pricing, and scope may vary by location and are subject to change without notice. Estimates provided are non-binding and represent our best assessment based on the information available at the time. Final pricing will be confirmed before any work begins.
              </p>
            </div>

            {/* 3 Membership Terms */}
            <div>
              <h2 className="text-xl font-bold text-white mb-3">3. Membership Terms</h2>
              <p className="mb-3">
                {COMPANY_NAME} offers membership plans ("Comfort Care," "Comfort Shield," and "Comfort Elite") that provide benefits including scheduled tune-ups, priority scheduling, repair discounts, Nuve Smart Monitoring, and other perks as described on the membership page at the time of enrollment.
              </p>
              <p className="mb-3">
                <strong className="text-white">Enrollment:</strong> By enrolling in a membership plan, you authorize {COMPANY_NAME} to charge your selected payment method at the recurring interval (monthly or annual) associated with your chosen plan. Membership benefits begin on the date of enrollment and are tied to a single residential property address.
              </p>
              <p className="mb-3">
                <strong className="text-white">Renewal:</strong> Memberships automatically renew at the end of each billing cycle unless cancelled. Monthly plans renew every 30 days. Annual plans renew every 365 days.
              </p>
              <p className="mb-3">
                <strong className="text-white">Changes:</strong> You may upgrade your plan at any time, and the price difference will be prorated. Downgrades take effect at the start of the next billing cycle.
              </p>
              <p>
                <strong className="text-white">Transferability:</strong> Memberships are non-transferable and may not be shared between properties. If you move, contact us to transfer your membership to your new address within the Phoenix metropolitan area.
              </p>
            </div>

            {/* 4 Payments & Billing */}
            <div>
              <h2 className="text-xl font-bold text-white mb-3">4. Payments & Billing</h2>
              <p className="mb-3">
                All payments are processed securely through Stripe, our third-party payment processor. By providing your payment information, you authorize {COMPANY_NAME} and Stripe to charge the applicable fees to your payment method.
              </p>
              <p className="mb-3">
                Service invoices are due upon completion of work unless otherwise agreed in writing. We accept credit cards, debit cards, and ACH bank transfers. Financing may be available through approved third-party lenders for qualifying projects.
              </p>
              <p className="mb-3">
                If a recurring payment fails, we will attempt to process the charge again within 3 business days. If the payment continues to fail, your membership may be suspended until the balance is resolved.
              </p>
              <p>
                All prices are listed in U.S. dollars and do not include applicable taxes unless explicitly stated. Arizona state and local taxes will be applied where required by law.
              </p>
            </div>

            {/* 5 Cancellation Policy */}
            <div>
              <h2 className="text-xl font-bold text-white mb-3">5. Cancellation Policy</h2>
              <p className="mb-3">
                <strong className="text-white">Monthly memberships:</strong> You may cancel a monthly membership at any time through your account dashboard or by contacting us directly. Cancellation takes effect at the end of the current billing period. No refunds are issued for partial months.
              </p>
              <p className="mb-3">
                <strong className="text-white">Annual memberships:</strong> Annual memberships may be cancelled at any time. If cancelled within the first 30 days, you will receive a full refund minus the cost of any services already rendered. After 30 days, annual memberships are non-refundable, but you will retain access to benefits through the end of the paid term.
              </p>
              <p>
                <strong className="text-white">Service appointments:</strong> Appointments may be cancelled or rescheduled with at least 24 hours notice at no charge. Cancellations with less than 24 hours notice may be subject to a $49 cancellation fee.
              </p>
            </div>

            {/* 6 Limitation of Liability */}
            <div>
              <h2 className="text-xl font-bold text-white mb-3">6. Limitation of Liability</h2>
              <p className="mb-3">
                To the fullest extent permitted by applicable law, {COMPANY_NAME} and {PARENT_COMPANY}, along with their officers, directors, employees, agents, and contractors, shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, or goodwill, arising out of or in connection with your use of the Services.
              </p>
              <p className="mb-3">
                Our total liability for any claim arising out of or relating to these Terms or our Services shall not exceed the total amount you have paid to {COMPANY_NAME} in the twelve (12) months preceding the claim.
              </p>
              <p>
                {COMPANY_NAME} warrants that all work will be performed in a professional and workmanlike manner in accordance with industry standards. If you are not satisfied with our work, contact us within 30 days and we will make it right at no additional charge.
              </p>
            </div>

            {/* 7 Privacy */}
            <div>
              <h2 className="text-xl font-bold text-white mb-3">7. Privacy</h2>
              <p>
                Your use of the Services is also governed by our Privacy Policy, which describes how we collect, use, and protect your personal information. By using the Services, you consent to the collection and use of your data as described in the Privacy Policy. You can review our full Privacy Policy at{' '}
                <a href="/privacy" className="text-[var(--sky)] hover:text-[var(--sky-light)] transition-colors">
                  nexaircomfort.com/privacy
                </a>.
              </p>
            </div>

            {/* 8 Governing Law */}
            <div>
              <h2 className="text-xl font-bold text-white mb-3">8. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State of Arizona, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be resolved in the state or federal courts located in Maricopa County, Arizona, and you consent to the personal jurisdiction of such courts.
              </p>
            </div>

            {/* 9 Contact Information */}
            <div>
              <h2 className="text-xl font-bold text-white mb-3">9. Contact Information</h2>
              <p className="mb-3">
                If you have any questions about these Terms, please contact us:
              </p>
              <div
                className="rounded-xl p-6"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <p className="text-white font-semibold mb-2">{COMPANY_NAME}</p>
                <p className="text-sm">Operated by {PARENT_COMPANY}</p>
                <p className="text-sm">Phoenix, Arizona</p>
                <p className="text-sm">Phone: {PHONE_NUMBER}</p>
                <p className="text-sm">Email: legal@nexaircomfort.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
