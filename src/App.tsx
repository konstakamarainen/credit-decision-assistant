import { useMemo, useState } from 'react'
import { CompanySummary } from './components/CompanySummary'
import { DealForm } from './components/DealForm'
import { FactsVsInterpretation } from './components/FactsVsInterpretation'
import { Header } from './components/Header'
import { RecommendationCard } from './components/RecommendationCard'
import { ScenarioSimulator } from './components/ScenarioSimulator'
import { DEFAULT_DEAL } from './data/company'
import { analyzeDeal } from './lib/decisionLogic'
import type { DealInput } from './types'

function App() {
  const [deal, setDeal] = useState<DealInput>({ ...DEFAULT_DEAL })
  const [highlightRecommendation, setHighlightRecommendation] = useState(false)

  const result = useMemo(() => analyzeDeal(deal), [deal])

  const handleAnalyze = () => {
    setHighlightRecommendation(true)
    document.getElementById('recommendation')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
    window.setTimeout(() => setHighlightRecommendation(false), 1200)
  }

  return (
    <div className="min-h-screen bg-page">
      <Header />
      <main className="mx-auto max-w-6xl space-y-5 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <CompanySummary />
        <DealForm deal={deal} onChange={setDeal} onAnalyze={handleAnalyze} />
        <RecommendationCard
          result={result}
          highlight={highlightRecommendation}
        />
        <ScenarioSimulator customerType={deal.customerType} />
        <FactsVsInterpretation deal={deal} result={result} />
      </main>
      <footer className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-4 text-xs text-ink-subtle sm:px-6 lg:px-8">
          <span>Luottoriskit.fi · Luottopäätösavustaja</span>
          <span>Konseptiprototyyppi – ei tuotantokäyttöön</span>
        </div>
      </footer>
    </div>
  )
}

export default App
