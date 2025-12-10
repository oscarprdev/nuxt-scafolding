<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { type VariantProps, cva } from 'class-variance-authority'
import { cn } from '~/lib/utils'

const alertVariants = cva('relative w-full rounded-md p-4 text-sm', {
  variants: {
    variant: {
      default: 'bg-gray-50 text-gray-800',
      error: 'bg-red-50 text-red-800',
      success: 'bg-green-50 text-green-800',
      warning: 'bg-yellow-50 text-yellow-800',
      info: 'bg-blue-50 text-blue-800',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

type AlertVariants = VariantProps<typeof alertVariants>

interface Props {
  variant?: AlertVariants['variant']
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
})

const classes = computed(() => cn(alertVariants({ variant: props.variant }), props.class))
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
