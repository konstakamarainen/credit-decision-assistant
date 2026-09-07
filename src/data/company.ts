import type { CompanyData } from '../types'

export const company: CompanyData = {
  name: 'Nordic Components Oy',
  businessId: '1234567-8',
  creditRating: 'BBB',
  bankruptcyRisk2y: 2.8,
  recommendedCreditLimit: 25_000,
  revenue: 2_400_000,
  operatingMargin: 6.2,
  quickRatio: 0.9,
  equityRatio: 31,
  observations: [
    'Kannattavuus on vakaa',
    'Maksuvalmius on heikentynyt',
    'Ei merkittäviä negatiivisia uutisia havaittu',
  ],
}

export const DEFAULT_DEAL = {
  amount: 32_000,
  paymentTerm: 30 as const,
  customerType: 'new' as const,
}
