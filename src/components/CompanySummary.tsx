import { company } from '../data/company'
import {
  formatEuro,
  formatNumber,
  formatPercent,
  formatRevenueMillions,
} from '../lib/format'

export function CompanySummary() {
  const metrics = [
    { label: 'Luottoluokitus', value: company.creditRating },
    {
      label: '2 vuoden konkurssiriski',
      value: formatPercent(company.bankruptcyRisk2y),
    },
    {
      label: 'Suositeltu luottolimiitti',
      value: formatEuro(company.recommendedCreditLimit),
    },
    { label: 'Liikevaihto', value: formatRevenueMillions(company.revenue) },
    {
      label: 'Liikevoittomarginaali',
      value: formatPercent(company.operatingMargin),
    },
    { label: 'Quick ratio', value: formatNumber(company.quickRatio) },
    {
      label: 'Omavaraisuusaste',
      value: formatPercent(company.equityRatio),
    },
  ]

  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-ink">{company.name}</h2>
          <p className="mt-0.5 text-sm text-ink-muted">
            Y-tunnus: {company.businessId}
          </p>
        </div>
        <span className="rounded-md bg-brand-soft px-2.5 py-1 text-xs font-medium text-brand">
          Luottoraportti
        </span>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-lg border border-border bg-page/60 px-3 py-2.5"
          >
            <dt className="text-[11px] font-medium tracking-wide text-ink-subtle uppercase">
              {metric.label}
            </dt>
            <dd className="mt-1 text-base font-semibold text-ink tabular-nums">
              {metric.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-5">
        <h3 className="text-sm font-semibold text-ink">Havainnot</h3>
        <ul className="mt-2 space-y-1.5">
          {company.observations.map((observation) => (
            <li
              key={observation}
              className="flex items-start gap-2 text-sm text-ink-muted"
            >
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                aria-hidden
              />
              {observation}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
