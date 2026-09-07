import type { CustomerType, DealInput, PaymentTerm } from '../types'
import { formatInteger } from '../lib/format'

interface DealFormProps {
  deal: DealInput
  onChange: (deal: DealInput) => void
  onAnalyze: () => void
}

const PAYMENT_TERMS: PaymentTerm[] = [14, 30, 60, 90]

export function DealForm({ deal, onChange, onAnalyze }: DealFormProps) {
  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold text-ink">Suunniteltu kauppa</h2>
      <p className="mt-1 text-sm text-ink-muted">
        Syötä kaupan ehdot. Suositus päivittyy automaattisesti.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="text-xs font-medium tracking-wide text-ink-subtle uppercase">
            Kaupan arvo (€)
          </span>
          <input
            type="number"
            min={1000}
            step={1000}
            value={deal.amount}
            onChange={(e) =>
              onChange({
                ...deal,
                amount: Math.max(0, Number(e.target.value) || 0),
              })
            }
            className="mt-1.5 w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-ink tabular-nums outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
          <span className="mt-1 block text-xs text-ink-subtle">
            {formatInteger(deal.amount)} €
          </span>
        </label>

        <label className="block">
          <span className="text-xs font-medium tracking-wide text-ink-subtle uppercase">
            Maksuehto
          </span>
          <select
            value={deal.paymentTerm}
            onChange={(e) =>
              onChange({
                ...deal,
                paymentTerm: Number(e.target.value) as PaymentTerm,
              })
            }
            className="mt-1.5 w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          >
            {PAYMENT_TERMS.map((term) => (
              <option key={term} value={term}>
                {term} päivää
              </option>
            ))}
          </select>
        </label>

        <fieldset className="block">
          <legend className="text-xs font-medium tracking-wide text-ink-subtle uppercase">
            Asiakkuus
          </legend>
          <div className="mt-1.5 flex flex-col gap-2">
            {(
              [
                { value: 'new', label: 'Uusi asiakas' },
                { value: 'existing', label: 'Nykyinen asiakas' },
              ] as const
            ).map((option) => (
              <label
                key={option.value}
                className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                  deal.customerType === option.value
                    ? 'border-brand bg-brand-soft text-brand'
                    : 'border-border bg-white text-ink-muted hover:border-brand/40'
                }`}
              >
                <input
                  type="radio"
                  name="customerType"
                  value={option.value}
                  checked={deal.customerType === option.value}
                  onChange={() =>
                    onChange({
                      ...deal,
                      customerType: option.value as CustomerType,
                    })
                  }
                  className="accent-[#0b3a53]"
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="mt-5">
        <button
          type="button"
          onClick={onAnalyze}
          className="inline-flex w-full items-center justify-center rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0a3248] focus:outline-none focus:ring-2 focus:ring-brand/30 sm:w-auto"
        >
          Analysoi päätös
        </button>
      </div>
    </section>
  )
}
