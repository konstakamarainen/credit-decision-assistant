import { company } from '../data/company'
import type {
  DealInput,
  PaymentTerm,
  RecommendationResult,
  RiskStatus,
} from '../types'
import { formatEuro, formatInteger } from './format'

const TERM_MULTIPLIER: Record<PaymentTerm, number> = {
  14: 0.85,
  30: 1.0,
  60: 1.2,
  90: 1.4,
}

const STATUS_LABELS: Record<RiskStatus, string> = {
  green: 'Hyväksyttävissä nykyisillä ehdoilla',
  yellow: 'Tarkista ennen hyväksyntää',
  red: 'Korkea luottoriski',
}

export function computeEffectiveRatio(deal: DealInput): number {
  const ratio = deal.amount / company.recommendedCreditLimit
  const termFactor = TERM_MULTIPLIER[deal.paymentTerm]
  const customerBump = deal.customerType === 'new' ? 0.1 : 0
  return ratio * termFactor + customerBump
}

export function statusFromRatio(effectiveRatio: number): RiskStatus {
  if (effectiveRatio <= 0.9) return 'green'
  if (effectiveRatio <= 1.45) return 'yellow'
  return 'red'
}

function roundToNearestThousand(value: number): number {
  return Math.round(value / 1000) * 1000
}

function buildSuggestion(deal: DealInput, status: RiskStatus): string {
  const limit = company.recommendedCreditLimit

  if (status === 'green') {
    if (deal.customerType === 'new') {
      return 'Voit edetä kaupalla nykyisillä ehdoilla. Seuraa maksukäyttäytymistä ensimmäisten laskujen osalta.'
    }
    return 'Kauppa sopii nykyiseen luottoprofiiliin. Voit hyväksyä ehdot nykyisellään.'
  }

  if (deal.amount > limit) {
    const creditPart = Math.min(limit - 5_000, roundToNearestThousand(limit * 0.8))
    const safeCredit = Math.max(15_000, creditPart)
    const prepayment = deal.amount - safeCredit
    return `Harkitse kaupan jakamista esimerkiksi ${formatEuro(safeCredit)} luottoon ja ${formatEuro(prepayment)} ennakkomaksuun.`
  }

  if (deal.paymentTerm >= 60) {
    return 'Lyhennä maksuehtoa 14–30 päivään tai pyydä osittaista ennakkoa ennen hyväksyntää.'
  }

  return 'Pienennä luottoaltistusta tai vahvista ehtoja ennen hyväksyntää.'
}

function buildExplanation(deal: DealInput, status: RiskStatus): string {
  const limit = company.recommendedCreditLimit
  const overPct = Math.round(((deal.amount - limit) / limit) * 100)

  const isDefaultCase =
    deal.amount === 32_000 &&
    deal.paymentTerm === 30 &&
    deal.customerType === 'new'

  if (isDefaultCase) {
    return `Haettu ${formatEuro(deal.amount)} luotto ylittää yritykselle arvioidun ${formatEuro(limit)} luottolimiitin 28 prosentilla. Yrityksen kannattavuus on vakaa, mutta maksuvalmius on heikentynyt viime tilikaudella.`
  }

  if (status === 'green') {
    if (deal.amount <= limit) {
      return `Haettu ${formatEuro(deal.amount)} on suositellun ${formatEuro(limit)} luottolimiitin sisällä, ja maksuehto ${deal.paymentTerm} päivää pitää altistuksen hallittuna.`
    }
    return `Vaikka summa on hieman yli limiitin, lyhyt maksuehto pitää tehollisen riskin hyväksyttävällä tasolla.`
  }

  if (status === 'yellow') {
    if (deal.amount > limit) {
      return `Haettu ${formatEuro(deal.amount)} luotto ylittää yritykselle arvioidun ${formatEuro(limit)} luottolimiitin ${formatInteger(overPct)} prosentilla. Yrityksen kannattavuus on vakaa, mutta maksuvalmius on heikentynyt viime tilikaudella.`
    }
    return `Kaupan arvo on limiitin tuntumassa, ja ${deal.paymentTerm} päivän maksuehto kasvattaa altistusta. Tarkista ehdot ennen hyväksyntää.`
  }

  if (deal.amount > limit) {
    return `Haettu ${formatEuro(deal.amount)} ylittää selvästi suositellun ${formatEuro(limit)} limiitin${deal.paymentTerm >= 60 ? `, ja pitkä ${deal.paymentTerm} päivän maksuehto kasvattaa riskiä edelleen` : ''}. Suosittelemme ehtojen uudelleenneuvottelua.`
  }

  return `Pitkä ${deal.paymentTerm} päivän maksuehto nostaa tehollisen luottoaltistuksen korkeaksi suhteessa yrityksen riskiprofiiliin.`
}

function buildWhy(deal: DealInput): string[] {
  const items = [
    `Luottoluokitus: ${company.creditRating}`,
    `Suositeltu luottolimiitti: ${formatEuro(company.recommendedCreditLimit)}`,
    `Pyydetty luotto: ${formatEuro(deal.amount)}`,
    'Maksuvalmius on heikentynyt',
  ]

  if (deal.customerType === 'new') {
    items.push('Asiakas on uusi')
  } else {
    items.push('Asiakas on nykyinen')
  }

  if (deal.paymentTerm >= 60) {
    items.push(`Pitkä maksuehto: ${deal.paymentTerm} päivää`)
  }

  return items
}

function buildNextChecks(deal: DealInput, status: RiskStatus): string[] {
  const checks = [
    'Onko asiakkaalla tuoreita maksuhäiriöitä?',
    'Mikä selittää maksuvalmiuden heikkenemisen?',
  ]

  if (status !== 'green' || deal.customerType === 'new') {
    checks.push('Voidaanko ensimmäisessä kaupassa käyttää osittaista ennakkomaksua?')
  } else {
    checks.push('Onko maksuhistoria ollut ajallaan viimeisen 12 kuukauden aikana?')
  }

  if (deal.paymentTerm >= 60) {
    checks.push('Voidaanko maksuehtoa lyhentää riskin hallitsemiseksi?')
  }

  return checks.slice(0, 3)
}

export function analyzeDeal(deal: DealInput): RecommendationResult {
  const effectiveRatio = computeEffectiveRatio(deal)
  const status = statusFromRatio(effectiveRatio)

  return {
    status,
    statusLabel: STATUS_LABELS[status],
    explanation: buildExplanation(deal, status),
    suggestion: buildSuggestion(deal, status),
    why: buildWhy(deal),
    nextChecks: buildNextChecks(deal, status),
    effectiveRatio,
  }
}

export function scenarioLabel(status: RiskStatus): string {
  switch (status) {
    case 'green':
      return 'Matala riski'
    case 'yellow':
      return 'Tarkista'
    case 'red':
      return 'Korkea altistus'
  }
}
