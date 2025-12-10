import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:outline-2 focus-visible:outline-offset-2",
  {
    variants: {
      variant: {
        primary: 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600',
        default: 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600',
        destructive: 'bg-red-600 text-white hover:bg-red-500 focus-visible:outline-red-600',
        outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus-visible:outline-gray-600',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:outline-gray-600',
        ghost: 'text-gray-700 hover:bg-gray-100 focus-visible:outline-gray-600',
        link: 'text-indigo-600 underline-offset-4 hover:underline focus-visible:outline-indigo-600',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
