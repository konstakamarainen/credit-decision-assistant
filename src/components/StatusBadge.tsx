import type { RiskStatus } from '../types'

const STATUS_STYLES: Record<
  RiskStatus,
  { wrap: string; icon: string; label: string }
> = {
  green: {
    wrap: 'bg-status-green-bg border-status-green-border text-status-green',
    icon: '✓',
    label: 'Hyväksyttävissä',
  },
  yellow: {
    wrap: 'bg-status-yellow-bg border-status-yellow-border text-status-yellow',
    icon: '!',
    label: 'Tarkista',
  },
  red: {
    wrap: 'bg-status-red-bg border-status-red-border text-status-red',
    icon: '✕',
    label: 'Korkea riski',
  },
}

interface StatusBadgeProps {
  status: RiskStatus
  label?: string
  size?: 'sm' | 'md' | 'lg'
}

export function StatusBadge({ status, label, size = 'md' }: StatusBadgeProps) {
  const styles = STATUS_STYLES[status]
  const sizeClasses =
    size === 'sm'
      ? 'text-xs px-2 py-0.5 gap-1.5'
      : size === 'lg'
        ? 'text-base px-3.5 py-2 gap-2.5'
        : 'text-sm px-2.5 py-1 gap-2'

  const iconSize =
    size === 'sm' ? 'h-4 w-4 text-[10px]' : size === 'lg' ? 'h-6 w-6 text-sm' : 'h-5 w-5 text-xs'

  return (
    <span
      className={`inline-flex max-w-full items-center rounded-md border font-medium ${styles.wrap} ${sizeClasses}`}
      role="status"
    >
      <span
        className={`inline-flex shrink-0 items-center justify-center rounded-full border border-current/30 bg-white/60 font-bold ${iconSize}`}
        aria-hidden
      >
        {styles.icon}
      </span>
      <span className="leading-snug">{label ?? styles.label}</span>
    </span>
  )
}
