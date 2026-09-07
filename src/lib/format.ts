const euroFormatter = new Intl.NumberFormat('fi-FI', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
})

const euroCompactFormatter = new Intl.NumberFormat('fi-FI', {
  style: 'currency',
  currency: 'EUR',
  notation: 'compact',
  maximumFractionDigits: 1,
})

const numberFormatter = new Intl.NumberFormat('fi-FI', {
  maximumFractionDigits: 1,
})

const integerFormatter = new Intl.NumberFormat('fi-FI', {
  maximumFractionDigits: 0,
})

export function formatEuro(value: number): string {
  return euroFormatter.format(value)
}

export function formatEuroCompact(value: number): string {
  return euroCompactFormatter.format(value)
}

export function formatPercent(value: number): string {
  const fractionDigits = Number.isInteger(value) ? 0 : 1
  return new Intl.NumberFormat('fi-FI', {
    style: 'percent',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value / 100)
}

export function formatNumber(value: number): string {
  return numberFormatter.format(value)
}

export function formatInteger(value: number): string {
  return integerFormatter.format(value)
}

export function formatRevenueMillions(value: number): string {
  const millions = value / 1_000_000
  return `${formatNumber(millions)} M€`
}
