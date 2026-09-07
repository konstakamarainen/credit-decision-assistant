import { company } from '../data/company'
import {
  formatEuro,
  formatNumber,
  formatPercent,
  formatRevenueMillions,
} from '../lib/format'
import type { DealInput, RecommendationResult } from '../types'

interface FactsVsInterpretationProps {
  deal: DealInput
  result: RecommendationResult
}

export function FactsVsInterpretation({
  deal,
  result,
}: FactsVsInterpretationProps) {
  const facts = [
    `Liikevaihto: ${formatRevenueMillions(company.revenue)}`,
    `Liikevoittomarginaali: ${formatPercent(company.operatingMargin)}`,
    `Quick ratio: ${formatNumber(company.quickRatio)}`,
    `Omavaraisuusaste: ${formatPercent(company.equityRatio)}`,
    `Luottoluokitus: ${company.creditRating}`,
    `Suositeltu luottolimiitti: ${formatEuro(company.recommendedCreditLimit)}`,
    `Kaupan arvo: ${formatEuro(deal.amount)}`,
    `Maksuehto: ${deal.paymentTerm} päivää`,
    `Asiakkuus: ${deal.customerType === 'new' ? 'Uusi asiakas' : 'Nykyinen asiakas'}`,
  ]

  const interpretation = [
    result.statusLabel,
    result.suggestion,
    result.explanation,
    ...result.nextChecks.map((item) => `Seuraava tarkistus: ${item}`),
  ]

  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold text-ink">Faktat ja AI-tulkinta</h2>
      <p className="mt-1 text-sm text-ink-muted">
        Erotamme raportin faktat ja työkalun tulkinnan, jotta päätös pysyy
        läpinäkyvänä.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-border bg-page/50 p-4">
          <h3 className="text-sm font-semibold text-ink">Faktat</h3>
          <p className="mt-1 text-xs text-ink-subtle">
            Talousluvut, luottoluokitus ja käyttäjän syöttämät kaupan tiedot
          </p>
          <ul className="mt-3 space-y-1.5">
            {facts.map((fact) => (
              <li
                key={fact}
                className="flex items-start gap-2 text-sm text-ink-muted"
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400"
                  aria-hidden
                />
                {fact}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-border bg-brand-soft/40 p-4">
          <h3 className="text-sm font-semibold text-ink">Tulkinta</h3>
          <p className="mt-1 text-xs text-ink-subtle">
            Suositus, perustelu ja ehdotetut lievennystoimet
          </p>
          <ul className="mt-3 space-y-1.5">
            {interpretation.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-ink-muted"
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-5 rounded-lg border border-border bg-page px-4 py-3 text-xs leading-relaxed text-ink-subtle">
        Tämä työkalu tukee luottopäätöstä eikä tee lopullista päätöstä käyttäjän
        puolesta. Taloustiedot ovat tässä prototyypissä esimerkkidataa.
      </p>
    </section>
  )
}
