import { Link } from 'react-router-dom'
import { Phone } from 'lucide-react'
import { PHONE_NUMBER, PHONE_LINK } from '@/lib/constants'

interface CTABannerProps {
  heading: string
  subheading: string
  buttonText: string
  buttonLink: string
  variant?: 'orange' | 'sky'
  showPhone?: boolean
}

export default function CTABanner({
  heading,
  subheading,
  buttonText,
  buttonLink,
  variant = 'orange',
  showPhone = false,
}: CTABannerProps) {
  const borderColor =
    variant === 'orange' ? 'var(--orange)' : 'var(--sky)'
  const glowColor =
    variant === 'orange'
      ? 'rgba(212, 112, 42, 0.15)'
      : 'rgba(74, 144, 217, 0.15)'

  return (
    <section className="w-full py-16 px-4">
      <div
        className="max-w-4xl mx-auto rounded-2xl p-10 md:p-14 text-center relative overflow-hidden"
        style={{
          background: 'var(--bg-elevated)',
          border: `1px solid ${borderColor}`,
          boxShadow: `0 0 80px ${glowColor}`,
        }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-[var(--font-display)]">
          {heading}
        </h2>

        <p className="text-[var(--text-secondary)] text-lg mb-8 max-w-xl mx-auto">
          {subheading}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to={buttonLink}
            className={`btn-primary text-lg ${
              variant === 'sky'
                ? '!bg-[var(--sky)] hover:!shadow-[0_8px_30px_rgba(74,144,217,0.3)]'
                : ''
            }`}
            aria-label={buttonText}
          >
            {buttonText}
          </Link>

          {showPhone && (
            <a
              href={PHONE_LINK}
              className="btn-secondary text-lg"
              aria-label={`Call us at ${PHONE_NUMBER}`}
            >
              <Phone className="w-5 h-5" />
              {PHONE_NUMBER}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
