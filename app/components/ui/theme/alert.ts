import { type VariantProps, cva } from 'class-variance-authority'

export const alertVariants = cva(
  'relative w-full rounded-md border px-4 py-3 text-sm',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground border-border',
        error: 'bg-destructive/10 text-destructive border-destructive/20',
        success: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20',
        warning: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20',
        info: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export type AlertVariants = VariantProps<typeof alertVariants>
