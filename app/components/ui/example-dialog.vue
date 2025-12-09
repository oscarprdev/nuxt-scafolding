<script setup lang="ts">
import {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from 'reka-ui'

const isOpen = ref(false)
</script>

<template>
  <DialogRoot v-model:open="isOpen">
    <DialogTrigger class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500">
      Open Dialog
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay
        class="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
      />
      <DialogContent
        class="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-gray-200 bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg"
      >
        <div class="flex flex-col space-y-1.5 text-center sm:text-left">
          <DialogTitle class="text-lg font-semibold leading-none tracking-tight"> Example Reka UI Dialog </DialogTitle>
          <DialogDescription class="text-sm text-gray-500">
            This is an example of using Reka UI components with Tailwind CSS styling.
          </DialogDescription>
        </div>
        <div class="py-4">
          <p class="text-sm text-gray-700">
            Reka UI provides unstyled, accessible components that you can style with Tailwind CSS. This dialog component
            is fully accessible and keyboard navigable.
          </p>
        </div>
        <div class="flex justify-end gap-2">
          <DialogClose
            class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </DialogClose>
          <button
            class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
            @click="isOpen = false"
          >
            Confirm
          </button>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
