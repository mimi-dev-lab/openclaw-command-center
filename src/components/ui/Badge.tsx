import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  children: ReactNode
  className?: string
}

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium',
        {
          'bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)]':
            variant === 'default',
          'bg-green-500/10 text-green-400': variant === 'success',
          'bg-yellow-500/10 text-yellow-400': variant === 'warning',
          'bg-red-500/10 text-red-400': variant === 'error',
          'bg-blue-500/10 text-blue-400': variant === 'info',
        },
        className
      )}
    >
      {children}
    </span>
  )
}
