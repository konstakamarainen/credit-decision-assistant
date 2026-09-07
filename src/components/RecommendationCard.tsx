import type { RecommendationResult } from '../types'
import { StatusBadge } from './StatusBadge'

interface RecommendationCardProps {
  result: RecommendationResult
  highlight?: boolean
}

const STATUS_PANEL: Record<
  RecommendationResult['status'],
  string
> = {
  green: 'border-status-green-border bg-status-green-bg',
  yellow: 'border-status-yellow-border bg-status-yellow-bg',
  red: 'border-status-red-border bg-status-red-bg',
}

export function RecommendationCard({
  result,
  highlight = false,
}: RecommendationCardProps) {
  return (
    <section
      id="recommendation"
      className={`rounded-xl border bg-card p-5 shadow-sm sm:p-6 ${
        highlight ? 'ring-2 ring-brand/20' : ''
      } ${STATUS_PANEL[result.status]}`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-ink">Suositus</h2>
        <StatusBadge status={result.status} label={result.statusLabel} size="lg" />
      </div>

      <p className="mt-4 text-base leading-relaxed text-ink">
        {result.suggestion}
      </p>

      <p className="mt-3 text-sm leading-relaxed text-ink-muted">
        {result.explanation}
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="rounded-lg border border-border/80 bg-white/80 p-4">
          <h3 className="text-sm font-semibold text-ink">Miksi?</h3>
          <ul className="mt-2 space-y-1.5">
            {result.why.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-ink-muted"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-subtle" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-border/80 bg-white/80 p-4">
          <h3 className="text-sm font-semibold text-ink">
            Mitä tarkistaisin seuraavaksi?
          </h3>
          <ul className="mt-2 space-y-1.5">
            {result.nextChecks.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-ink-muted"
              >
                <span
                  className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border border-border text-[10px] text-ink-subtle"
                  aria-hidden
                >
                  ?
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
