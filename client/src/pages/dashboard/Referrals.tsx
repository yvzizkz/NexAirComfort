import { useState, useEffect } from 'react'
import {
  Gift,
  Copy,
  Check,
  Users,
  DollarSign,
  Share2,
  ArrowRight,
  Loader2,
} from 'lucide-react'
import { useTranslation } from '@/i18n/LanguageContext'
import { fetchReferralInfo, type ReferralInfo } from '@/lib/api'

export default function Referrals() {
  const { language } = useTranslation()
  const isEs = language === 'es'
  const [info, setInfo] = useState<ReferralInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    fetchReferralInfo().then((result) => {
      if (result.success && result.data) {
        setInfo(result.data)
      }
      setLoading(false)
    })
  }, [])

  const handleCopy = () => {
    const link = info?.referral_link || 'https://nexaircomfort.com/r/YOUR-CODE'
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-10 h-10 text-[var(--sky)] animate-spin" />
      </div>
    )
  }

  const code = info?.referral_code || 'NEXAIR-0000'
  const totalReferrals = info?.total_referrals || 0
  const successfulReferrals = info?.successful_referrals || 0
  const totalEarned = info?.total_earned || 0

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-8 font-[var(--font-display)]">
        {isEs ? 'Programa de Referidos' : 'Referral Program'}
      </h1>

      {/* Referral Code Display */}
      <div
        className="rounded-2xl p-8 text-center mb-8"
        style={{
          background: 'rgba(212, 160, 72, 0.06)',
          border: '1px solid rgba(212, 160, 72, 0.15)',
        }}
      >
        <Gift className="w-10 h-10 text-[var(--gold)] mx-auto mb-4" />
        <p className="text-sm text-[var(--text-secondary)] mb-2">
          {isEs ? 'Su codigo de referido' : 'Your referral code'}
        </p>
        <div
          className="inline-flex items-center gap-3 px-6 py-3 rounded-xl mb-6"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-medium)',
          }}
        >
          <span className="text-2xl md:text-3xl font-bold text-white tracking-wider font-mono">
            {code}
          </span>
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Copy referral code"
          >
            {copied ? (
              <Check className="w-5 h-5 text-[var(--green)]" />
            ) : (
              <Copy className="w-5 h-5 text-[var(--text-secondary)]" />
            )}
          </button>
        </div>

        {/* Share Buttons */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={handleCopy}
            className="btn-primary text-sm px-6"
          >
            <Share2 className="w-4 h-4" />
            {copied
              ? isEs ? 'Copiado!' : 'Copied!'
              : isEs ? 'Copiar Enlace' : 'Copy Link'}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        <div
          className="rounded-xl p-5 text-center"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <Users className="w-6 h-6 text-[var(--sky)] mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">{totalReferrals}</p>
          <p className="text-xs text-[var(--text-muted)]">
            {isEs ? 'Total Referidos' : 'Total Referrals'}
          </p>
        </div>
        <div
          className="rounded-xl p-5 text-center"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <Check className="w-6 h-6 text-[var(--green)] mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">{successfulReferrals}</p>
          <p className="text-xs text-[var(--text-muted)]">
            {isEs ? 'Exitosos' : 'Successful'}
          </p>
        </div>
        <div
          className="rounded-xl p-5 text-center"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <DollarSign className="w-6 h-6 text-[var(--gold)] mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">${totalEarned.toFixed(0)}</p>
          <p className="text-xs text-[var(--text-muted)]">
            {isEs ? 'Total Ganado' : 'Total Earned'}
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="mb-10">
        <h2 className="text-lg font-bold text-white mb-6">
          {isEs ? 'Como Funciona' : 'How It Works'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              step: 1,
              title: isEs ? 'Comparta su Codigo' : 'Share Your Code',
              desc: isEs
                ? 'Envie su codigo de referido unico a amigos, familiares y vecinos.'
                : 'Send your unique referral code to friends, family, and neighbors.',
            },
            {
              step: 2,
              title: isEs ? 'Ellos se Registran' : 'They Sign Up',
              desc: isEs
                ? 'Cuando alguien se registra usando su codigo, ambos reciben una recompensa.'
                : 'When someone signs up using your code, you both get a reward.',
            },
            {
              step: 3,
              title: isEs ? 'Usted Gana' : 'You Earn',
              desc: isEs
                ? 'Reciba credito en su cuenta para futuros servicios. Sin limite de referidos.'
                : 'Get credit on your account for future services. No limit on referrals.',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="rounded-xl p-5 text-center"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold text-white"
                style={{ background: 'var(--gradient-cta)' }}
              >
                {item.step}
              </div>
              <h3 className="text-sm font-bold text-white mb-2">{item.title}</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Referral History */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">
          {isEs ? 'Historial de Referidos' : 'Referral History'}
        </h2>
        <div
          className="rounded-xl overflow-hidden"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          {info?.referral_history && info.referral_history.length > 0 ? (
            <div className="divide-y divide-[var(--border-subtle)]">
              {info.referral_history.map((ref) => (
                <div key={ref.id} className="flex items-center justify-between p-4">
                  <div>
                    <p className="text-sm font-medium text-white">{ref.referred_name}</p>
                    <p className="text-xs text-[var(--text-muted)]">
                      {new Date(ref.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        ref.status === 'completed'
                          ? 'bg-[var(--green)]/10 text-[var(--green)]'
                          : ref.status === 'expired'
                          ? 'bg-red-500/10 text-red-400'
                          : 'bg-[var(--gold)]/10 text-[var(--gold)]'
                      }`}
                    >
                      {ref.status === 'completed'
                        ? isEs ? 'Completado' : 'Completed'
                        : ref.status === 'expired'
                        ? isEs ? 'Expirado' : 'Expired'
                        : isEs ? 'Pendiente' : 'Pending'}
                    </span>
                    {ref.status === 'completed' && (
                      <p className="text-xs text-[var(--green)] mt-1">
                        +${ref.reward_amount.toFixed(0)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <Users className="w-8 h-8 text-[var(--text-muted)] mx-auto mb-3" />
              <p className="text-sm text-[var(--text-secondary)]">
                {isEs
                  ? 'Aun no tiene referidos. Comparta su codigo para empezar a ganar.'
                  : 'No referrals yet. Share your code to start earning.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
