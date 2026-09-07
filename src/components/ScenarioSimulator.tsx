import { useMemo, useState } from 'react'
import {
  analyzeDeal,
  scenarioLabel,
  statusFromRatio,
  computeEffectiveRatio,
} from '../lib/decisionLogic'
import { formatEuro, formatInteger } from '../lib/format'
import type { CustomerType, PaymentTerm } from '../types'
import { StatusBadge } from './StatusBadge'

interface ScenarioSimulatorProps {
  customerType: CustomerType
}

const EXAMPLE_SCENARIOS = [
  { amount: 20_000, paymentTerm: 14 as PaymentTerm },
  { amount: 30_000, paymentTerm: 30 as PaymentTerm },
  { amount: 50_000, paymentTerm: 60 as PaymentTerm },
]

const PAYMENT_TERMS: PaymentTerm[] = [14, 30, 60, 90]

export function ScenarioSimulator({ customerType }: ScenarioSimulatorProps) {
  const [amount, setAmount] = useState(20_000)
  const [paymentTerm, setPaymentTerm] = useState<PaymentTerm>(14)

  const liveResult = useMemo(
    () => analyzeDeal({ amount, paymentTerm, customerType }),
    [amount, paymentTerm, customerType],
  )

  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold text-ink">Mitä jos?</h2>
      <p className="mt-1 text-sm text-ink-muted">
        Kokeile eri kaupan arvoja ja maksuaikoja. Riskiarvio päivittyy heti.
      </p>

      <div className="mt-5 grid gap-6 lg:grid-cols-2">
        <div className="space-y-5">
          <label className="block">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-medium tracking-wide text-ink-subtle uppercase">
                Kaupan arvo
              </span>
              <span className="text-sm font-semibold tabular-nums text-ink">
                {formatEuro(amount)}
              </span>
            </div>
            <input
              type="range"
              min={5000}
              max={100000}
              step={1000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="mt-3 w-full accent-[#0b3a53]"
            />
            <div className="mt-1 flex justify-between text-[11px] text-ink-subtle">
              <span>5 000 €</span>
              <span>100 000 €</span>
            </div>
          </label>

          <fieldset>
            <legend className="text-xs font-medium tracking-wide text-ink-subtle uppercase">
              Maksuaika
            </legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {PAYMENT_TERMS.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setPaymentTerm(term)}
                  aria-pressed={paymentTerm === term}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                    paymentTerm === term
                      ? 'border-brand bg-brand text-white'
                      : 'border-border bg-white text-ink-muted hover:border-brand/40'
                  }`}
                >
                  {term} pv
                </button>
              ))}
            </div>
          </fieldset>

          <div className="rounded-lg border border-border bg-page px-4 py-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-xs font-medium tracking-wide text-ink-subtle uppercase">
                  Simuloitu riski
                </p>
                <p className="mt-1 text-sm text-ink">
                  {formatInteger(amount)} € / {paymentTerm} pv
                </p>
              </div>
              <StatusBadge
                status={liveResult.status}
                label={scenarioLabel(liveResult.status)}
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-ink">Esimerkkiskenaariot</h3>
          <div className="mt-3 space-y-2">
            {EXAMPLE_SCENARIOS.map((scenario) => {
              const ratio = computeEffectiveRatio({
                amount: scenario.amount,
                paymentTerm: scenario.paymentTerm,
                customerType,
              })
              const status = statusFromRatio(ratio)
              const isActive =
                amount === scenario.amount &&
                paymentTerm === scenario.paymentTerm

              return (
                <button
                  key={`${scenario.amount}-${scenario.paymentTerm}`}
                  type="button"
                  onClick={() => {
                    setAmount(scenario.amount)
                    setPaymentTerm(scenario.paymentTerm)
                  }}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg border px-3.5 py-3 text-left transition-colors ${
                    isActive
                      ? 'border-brand bg-brand-soft'
                      : 'border-border bg-white hover:border-brand/30'
                  }`}
                >
                  <span className="text-sm text-ink">
                    <span className="font-semibold tabular-nums">
                      {formatEuro(scenario.amount)}
                    </span>
                    <span className="text-ink-muted">
                      {' '}
                      / {scenario.paymentTerm} pv
                    </span>
                  </span>
                  <StatusBadge
                    status={status}
                    label={scenarioLabel(status)}
                    size="sm"
                  />
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
