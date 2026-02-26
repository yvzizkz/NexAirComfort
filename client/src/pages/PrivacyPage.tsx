import { useTranslation } from '@/i18n/LanguageContext'
import SEOHead from '@/components/SEOHead'
import { COMPANY_NAME, PARENT_COMPANY, PHONE_NUMBER } from '@/lib/constants'

export default function PrivacyPage() {
  const { language } = useTranslation()
  const isEs = language === 'es'

  return (
    <>
      <SEOHead
        title={isEs ? 'Politica de Privacidad | NexAir Comfort' : 'Privacy Policy | NexAir Comfort'}
        description={isEs ? 'Conozca como NexAir Comfort recopila, usa y protege su informacion personal.' : 'Learn how NexAir Comfort collects, uses, and protects your personal information.'}
        path={isEs ? '/es/privacidad' : '/privacy'}
      />

      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="gradient-heading text-4xl md:text-5xl font-extrabold mb-4 font-[var(--font-display)]">
            {isEs ? 'Politica de Privacidad' : 'Privacy Policy'}
          </h1>
          <p className="text-[var(--text-muted)] text-sm mb-12">
            {isEs ? 'Ultima actualizacion: 1 de enero de 2025' : 'Last updated: January 1, 2025'}
          </p>

          <div className="space-y-10 text-[var(--text-secondary)] leading-relaxed">
            {/* 1 Information We Collect */}
            <div>
              <h2 className="text-xl font-bold text-white mb-3">1. Information We Collect</h2>
              <p className="mb-3">
                {COMPANY_NAME}, operated by {PARENT_COMPANY}, collects information in several ways to provide and improve our Services:
              </p>
              <p className="mb-2">
                <strong className="text-white">Information you provide directly:</strong> When you create an account, request a service, submit a contact form, enroll in a membership, or communicate with us, you may provide your name, email address, phone number, physical address, payment information, property details, and service preferences.
              </p>
              <p className="mb-2">
                <strong className="text-white">Information collected automatically:</strong> When you use our website or app, we automatically collect device information (browser type, operating system, device identifiers), IP address, pages visited, time spent on pages, referral sources, and interaction data.
              </p>
              <p>
                <strong className="text-white">Information from Nuve Smart Monitoring:</strong> If you use Nuve Smart Monitoring, we collect data from your HVAC system including temperature readings, system status, energy consumption patterns, fault codes, and performance metrics. This data is used to monitor your system, provide proactive maintenance alerts, and optimize system performance.
              </p>
            </div>

            {/* 2 How We Use Information */}
            <div>
              <h2 className="text-xl font-bold text-white mb-3">2. How We Use Information</h2>
              <p className="mb-3">We use the information we collect for the following purposes:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>To provide, maintain, and improve our HVAC, plumbing, and electrical services</li>
                <li>To process payments, manage memberships, and send billing communications</li>
                <li>To schedule appointments and dispatch technicians to your location</li>
                <li>To monitor your HVAC system through Nuve Smart Monitoring and send alerts</li>
                <li>To communicate with you about service appointments, promotions, and company news</li>
                <li>To respond to your inquiries and provide customer support</li>
                <li>To personalize your experience and provide relevant recommendations</li>
                <li>To analyze usage patterns and improve our website and services</li>
                <li>To comply with legal obligations and protect our rights</li>
              </ul>
            </div>

            {/* 3 Cookies */}
            <div>
              <h2 className="text-xl font-bold text-white mb-3">3. Cookies & Tracking Technologies</h2>
              <p className="mb-3">
                Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and personalize content.
              </p>
              <p className="mb-2">
                <strong className="text-white">Essential cookies:</strong> Required for the website to function properly, including session management, authentication, and security.
              </p>
              <p className="mb-2">
                <strong className="text-white">Analytics cookies:</strong> We use Google Analytics to understand how visitors interact with our website. This data is aggregated and anonymized.
              </p>
              <p className="mb-2">
                <strong className="text-white">Marketing cookies:</strong> We may use cookies from advertising platforms (such as Google Ads and Meta) to deliver relevant advertisements and measure campaign effectiveness.
              </p>
              <p>
                You can manage your cookie preferences through your browser settings. Disabling certain cookies may affect the functionality of our website.
              </p>
            </div>

            {/* 4 Third-Party Services */}
            <div>
              <h2 className="text-xl font-bold text-white mb-3">4. Third-Party Services</h2>
              <p className="mb-3">
                We work with trusted third-party service providers to operate our business. These providers have access to your personal information only as necessary to perform their functions:
              </p>
              <div className="space-y-4">
                <div
                  className="rounded-lg p-4"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
                >
                  <p className="text-white font-semibold mb-1">Stripe</p>
                  <p className="text-sm">
                    Processes all payment transactions securely. Stripe is PCI-DSS Level 1 compliant, the highest level of certification in the payment industry. We never store your full credit card number on our servers.
                  </p>
                </div>
                <div
                  className="rounded-lg p-4"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
                >
                  <p className="text-white font-semibold mb-1">GoHighLevel (GHL)</p>
                  <p className="text-sm">
                    Our CRM and marketing automation platform. GoHighLevel manages contact records, appointment scheduling, automated follow-ups, and marketing communications on our behalf.
                  </p>
                </div>
                <div
                  className="rounded-lg p-4"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
                >
                  <p className="text-white font-semibold mb-1">Google Analytics</p>
                  <p className="text-sm">
                    Provides website traffic analytics and visitor behavior insights. Data is aggregated and does not personally identify individual users.
                  </p>
                </div>
              </div>
            </div>

            {/* 5 SMS/Email Consent */}
            <div>
              <h2 className="text-xl font-bold text-white mb-3">5. SMS & Email Communications</h2>
              <p className="mb-3">
                By providing your phone number and/or email address, you consent to receive service-related communications from {COMPANY_NAME}, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-3">
                <li>Appointment confirmations and reminders</li>
                <li>Service completion notifications</li>
                <li>Invoice and payment receipts</li>
                <li>Nuve Smart Monitoring alerts</li>
                <li>Membership billing notifications</li>
              </ul>
              <p className="mb-3">
                With your separate opt-in consent, you may also receive promotional communications including special offers, seasonal promotions, and company news. You may opt out of promotional messages at any time by replying STOP to any text message or clicking the unsubscribe link in any email.
              </p>
              <p>
                Message and data rates may apply for SMS communications. Message frequency varies based on your service activity and communication preferences.
              </p>
            </div>

            {/* 6 TCPA Compliance */}
            <div>
              <h2 className="text-xl font-bold text-white mb-3">6. TCPA Compliance</h2>
              <p className="mb-3">
                {COMPANY_NAME} complies with the Telephone Consumer Protection Act (TCPA) and all applicable federal and state telecommunications regulations.
              </p>
              <p className="mb-3">
                We will not send you automated text messages or make automated calls unless you have provided your prior express consent. You may revoke your consent at any time by contacting us directly or replying STOP to any text message.
              </p>
              <p>
                Your consent to receive calls or texts is not a condition of purchasing any goods or services from {COMPANY_NAME}.
              </p>
            </div>

            {/* 7 Data Retention */}
            <div>
              <h2 className="text-xl font-bold text-white mb-3">7. Data Retention</h2>
              <p className="mb-3">
                We retain your personal information for as long as your account is active or as needed to provide you services. Specifically:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Account data is retained for the life of your account plus 3 years after account closure</li>
                <li>Service records are retained for 7 years for warranty and legal compliance purposes</li>
                <li>Payment records are retained for 7 years in accordance with financial regulations</li>
                <li>Nuve monitoring data is retained for 2 years to provide historical performance insights</li>
                <li>Marketing communication preferences are retained until you modify or delete your account</li>
              </ul>
            </div>

            {/* 8 Your Rights */}
            <div>
              <h2 className="text-xl font-bold text-white mb-3">8. Your Rights</h2>
              <p className="mb-3">
                Depending on your location, you may have certain rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-3">
                <li><strong className="text-white">Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong className="text-white">Correction:</strong> Request that we correct inaccurate or incomplete information</li>
                <li><strong className="text-white">Deletion:</strong> Request that we delete your personal information, subject to legal retention requirements</li>
                <li><strong className="text-white">Portability:</strong> Request a machine-readable copy of your data</li>
                <li><strong className="text-white">Opt-out:</strong> Opt out of promotional communications at any time</li>
                <li><strong className="text-white">Restrict processing:</strong> Request that we limit how we use your data</li>
              </ul>
              <p>
                To exercise any of these rights, please contact us at privacy@nexaircomfort.com or call {PHONE_NUMBER}. We will respond to your request within 30 days.
              </p>
            </div>

            {/* 9 Data Security */}
            <div>
              <h2 className="text-xl font-bold text-white mb-3">9. Data Security</h2>
              <p>
                We implement industry-standard security measures to protect your personal information, including encryption in transit (TLS/SSL), encryption at rest for sensitive data, regular security audits, access controls, and employee training. However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee its absolute security.
              </p>
            </div>

            {/* 10 Contact */}
            <div>
              <h2 className="text-xl font-bold text-white mb-3">10. Contact Us</h2>
              <p className="mb-3">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div
                className="rounded-xl p-6"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <p className="text-white font-semibold mb-2">{COMPANY_NAME} - Privacy Team</p>
                <p className="text-sm">Operated by {PARENT_COMPANY}</p>
                <p className="text-sm">Phoenix, Arizona</p>
                <p className="text-sm">Phone: {PHONE_NUMBER}</p>
                <p className="text-sm">Email: privacy@nexaircomfort.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
