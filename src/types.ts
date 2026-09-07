export type PaymentTerm = 14 | 30 | 60 | 90

export type CustomerType = 'new' | 'existing'

export type RiskStatus = 'green' | 'yellow' | 'red'

export interface DealInput {
  amount: number
  paymentTerm: PaymentTerm
  customerType: CustomerType
}

export interface CompanyData {
  name: string
  businessId: string
  creditRating: string
  bankruptcyRisk2y: number
  recommendedCreditLimit: number
  revenue: number
  operatingMargin: number
  quickRatio: number
  equityRatio: number
  observations: string[]
}

export interface RecommendationResult {
  status: RiskStatus
  statusLabel: string
  explanation: string
  suggestion: string
  why: string[]
  nextChecks: string[]
  effectiveRatio: number
}
