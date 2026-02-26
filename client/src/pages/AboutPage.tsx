import { Link } from 'react-router-dom'
import {
  Users,
  BadgeCheck,
  Cpu,
  Heart,
  Shield,
  ArrowRight,
} from 'lucide-react'
import { useTranslation } from '@/i18n/LanguageContext'
import SEOHead from '@/components/SEOHead'
import CTABanner from '@/components/CTABanner'
import { LICENSE_NUMBERS, PARENT_COMPANY } from '@/lib/constants'

export default function AboutPage() {
  const { t } = useTranslation()

  const values = [
    {
      icon: Users,
      title: 'Family-Owned',
      description:
        'We started as a family operation and we still treat every customer like family. Your comfort is personal to us.',
    },
    {
      icon: BadgeCheck,
      title: 'Licensed All Trades',
      description:
        'Fully licensed for HVAC, plumbing, and electrical work in Arizona. One company for all your home comfort needs.',
    },
    {
      icon: Cpu,
      title: 'Modern Technology',
      description:
        'From Nuve Smart Monitoring to digital invoicing, we use technology to deliver a better, faster, more transparent experience.',
    },
    {
      icon: Heart,
      title: 'Community First',
      description:
        'We live and work in the Valley. Supporting our local community through honest, reliable service is at the core of everything we do.',
    },
  ]

  const team = [
    {
      name: 'Marcus Rivera',
      role: 'Founder & CEO',
      bio: 'Over 20 years of HVAC experience in the Phoenix Valley. Licensed contractor and technology enthusiast.',
    },
    {
      name: 'Sarah Chen',
      role: 'Operations Manager',
      bio: 'Keeps every job running on time, on budget, and with a smile. Background in logistics and customer success.',
    },
    {
      name: 'David Thompson',
      role: 'Lead Technician',
      bio: 'EPA certified, NATE certified, and passionate about solving complex HVAC challenges the right way.',
    },
    {
      name: 'Ana Garcia',
      role: 'Customer Experience Lead',
      bio: 'Bilingual specialist ensuring every customer -- English and Spanish -- feels heard and cared for.',
    },
  ]

  return (
    <>
      <SEOHead
        title={t('seo.aboutTitle') || 'About NexAir Comfort | Phoenix HVAC Company'}
        description={t('seo.aboutDescription') || 'Family-owned, Arizona-licensed HVAC, plumbing, and electrical company serving the Phoenix Valley.'}
        path={language === 'es' ? '/es/nosotros' : '/about'}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="glow-sky" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="gradient-heading text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 font-[var(--font-display)]">
            {t('about.title') || 'About NexAir Comfort'}
          </h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            {t('about.subtitle') || 'Family-Owned. Arizona-Licensed. Technology-Driven.'}
          </p>
        </div>
      </section>

      {/* ── Our Story ────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="gradient-heading text-3xl md:text-4xl font-bold mb-8 font-[var(--font-display)]">
            Our Story
          </h2>

          <div className="space-y-6 text-[var(--text-secondary)] text-lg leading-relaxed">
            <p>
              It all started with <strong className="text-white">{PARENT_COMPANY}</strong> --
              a small, family-owned contracting company founded right here in the Phoenix Valley.
              What began as a vision to serve Arizona homeowners with honest, dependable service
              quickly grew into something much bigger.
            </p>
            <p>
              Over the years, we acquired our full suite of Arizona Registrar of Contractors (ROC)
              licenses: <strong className="text-white">HVAC residential, HVAC commercial,
              plumbing, and electrical</strong>. Having all four licenses under one roof means our
              customers never need to juggle multiple contractors. One call handles it all.
            </p>
            <p>
              From that foundation, <strong className="text-white">NexAir Comfort</strong> was born --
              our dedicated brand for residential and light commercial HVAC excellence. We brought
              together decades of hands-on expertise with cutting-edge technology like{' '}
              <strong className="text-[var(--sky)]">Nuve Smart Monitoring</strong>, creating an
              experience that puts the homeowner first, every single time.
            </p>
          </div>
        </div>
      </section>

      <div className="divider max-w-5xl mx-auto" />

      {/* ── Our Mission ──────────────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="gradient-heading text-3xl md:text-4xl font-bold mb-8 font-[var(--font-display)]">
            Our Mission
          </h2>
          <p className="text-[var(--text-secondary)] text-xl leading-relaxed max-w-3xl mx-auto">
            {t('about.mission') || 'Our mission is to keep every home in the Phoenix metro area safe, comfortable, and energy-efficient -- backed by transparent pricing, honest communication, and technology that keeps you connected to your home\'s health.'}
          </p>
        </div>
      </section>

      <div className="divider max-w-5xl mx-auto" />

      {/* ── Values ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="gradient-heading text-3xl md:text-4xl font-bold mb-12 text-center font-[var(--font-display)]">
            Our Values
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="card p-6 text-center">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: 'rgba(212, 112, 42, 0.12)',
                    border: '1px solid rgba(212, 112, 42, 0.2)',
                  }}
                >
                  <value.icon className="w-7 h-7 text-[var(--orange)]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider max-w-5xl mx-auto" />

      {/* ── Team ─────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="gradient-heading text-3xl md:text-4xl font-bold mb-12 text-center font-[var(--font-display)]">
            {t('about.team') || 'Our Team'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="card p-6 text-center">
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white"
                  style={{
                    background: 'linear-gradient(135deg, var(--sky), var(--navy-light))',
                    border: '2px solid var(--border-medium)',
                  }}
                >
                  {member.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
                <p className="text-sm text-[var(--orange)] font-medium mb-3">{member.role}</p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider max-w-5xl mx-auto" />

      {/* ── Licenses ─────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Shield className="w-12 h-12 text-[var(--sky)] mx-auto mb-6" />
          <h2 className="gradient-heading text-3xl md:text-4xl font-bold mb-6 font-[var(--font-display)]">
            Licensed & Insured
          </h2>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8 max-w-3xl mx-auto">
            {t('about.licenses') || 'NexAir Comfort operates under Saddlewood Contracting LLC and holds full Arizona Registrar of Contractors (ROC) licenses for HVAC (residential and commercial), plumbing, and electrical work.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
            {LICENSE_NUMBERS.map((license) => (
              <div
                key={license}
                className="card p-4 flex items-center justify-center gap-2"
              >
                <BadgeCheck className="w-5 h-5 text-[var(--green)]" />
                <span className="text-sm font-semibold text-white">{license}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────────────── */}
      <CTABanner
        heading="Ready to Experience the Difference?"
        subheading="Schedule your service today and see why Arizona families trust NexAir Comfort."
        buttonText="Schedule Service"
        buttonLink="/contact"
        showPhone
      />
    </>
  )
}
