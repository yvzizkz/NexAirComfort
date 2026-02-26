import { useState, useEffect } from 'react'
import {
  FileText,
  Loader2,
  DollarSign,
  ExternalLink,
  Download,
} from 'lucide-react'
import { useTranslation } from '@/i18n/LanguageContext'
import { fetchInvoices, type Invoice } from '@/lib/api'

export default function Invoices() {
  const { language } = useTranslation()
  const isEs = language === 'es'
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInvoices().then((result) => {
      if (result.success && result.data) {
        setInvoices(result.data)
      }
      setLoading(false)
    })
  }, [])

  const statusColors: Record<string, string> = {
    paid: 'bg-[var(--green)]/10 text-[var(--green)]',
    pending: 'bg-[var(--gold)]/10 text-[var(--gold)]',
    overdue: 'bg-red-500/10 text-red-400',
  }

  const statusLabels: Record<string, string> = isEs
    ? { paid: 'Pagada', pending: 'Pendiente', overdue: 'Vencida' }
    : { paid: 'Paid', pending: 'Pending', overdue: 'Overdue' }

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-8 font-[var(--font-display)]">
        {isEs ? 'Facturas y Pagos' : 'Invoices & Payments'}
      </h1>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-10 h-10 text-[var(--sky)] animate-spin" />
        </div>
      ) : invoices.length === 0 ? (
        <div className="text-center py-16">
          <FileText className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4" />
          <p className="text-[var(--text-secondary)] text-lg mb-2">
            {isEs ? 'No tiene facturas aun.' : 'No invoices yet.'}
          </p>
          <p className="text-sm text-[var(--text-muted)]">
            {isEs
              ? 'Sus facturas apareceran aqui despues de su primer servicio.'
              : 'Your invoices will appear here after your first service.'}
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border-subtle)]">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    {isEs ? 'Fecha' : 'Date'}
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    {isEs ? 'Descripcion' : 'Description'}
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    {isEs ? 'Monto' : 'Amount'}
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    {isEs ? 'Estado' : 'Status'}
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    {isEs ? 'Accion' : 'Action'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr
                    key={inv.id}
                    className="border-b border-[var(--border-subtle)] hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-3.5 px-4 text-sm text-[var(--text-secondary)]">
                      {new Date(inv.issued_date).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-sm text-white font-medium">
                      {inv.service_description}
                    </td>
                    <td className="py-3.5 px-4 text-sm text-white font-semibold text-right">
                      ${inv.amount.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          statusColors[inv.status] || statusColors.pending
                        }`}
                      >
                        {statusLabels[inv.status] || inv.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {inv.payment_url && inv.status !== 'paid' ? (
                        <a
                          href={inv.payment_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-[var(--sky)] font-semibold hover:text-[var(--sky-light)] transition-colors"
                        >
                          {isEs ? 'Pagar' : 'Pay Now'}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-xs text-[var(--text-muted)]">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {invoices.map((inv) => (
              <div
                key={inv.id}
                className="rounded-xl p-4"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">
                    {inv.service_description}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      statusColors[inv.status] || statusColors.pending
                    }`}
                  >
                    {statusLabels[inv.status] || inv.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--text-muted)]">
                    {new Date(inv.issued_date).toLocaleDateString()}
                  </span>
                  <span className="text-white font-semibold">
                    ${inv.amount.toFixed(2)}
                  </span>
                </div>
                {inv.payment_url && inv.status !== 'paid' && (
                  <a
                    href={inv.payment_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full justify-center text-sm mt-3 py-2"
                  >
                    {isEs ? 'Pagar Ahora' : 'Pay Now'}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
