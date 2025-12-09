<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const props = defineProps<{
  user: {
    name: string
    image?: string | null
  }
}>()

const emit = defineEmits<{
  updated: []
}>()

// Validation schema
const schema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  image: yup.string().url('Please enter a valid URL').nullable(),
})

// Form state
const formState = ref({
  loading: false,
  error: '',
  success: '',
})

// Form setup with vee-validate
const { defineField, handleSubmit, errors, resetForm, setValues } = useForm({
  validationSchema: schema,
  initialValues: {
    name: props.user.name,
    image: props.user.image || '',
  },
})

const [name, nameAttrs] = defineField('name')
const [image, imageAttrs] = defineField('image')

// Watch for user prop changes
watch(
  () => props.user,
  newUser => {
    setValues({
      name: newUser.name,
      image: newUser.image || '',
    })
  }
)

// Submit handler
const onSubmit = handleSubmit(async values => {
  formState.value.loading = true
  formState.value.error = ''
  formState.value.success = ''

  try {
    const response = await $fetch('/api/user/update', {
      method: 'PATCH',
      body: {
        name: values.name,
        image: values.image || null,
      },
    })

    if (response.success) {
      formState.value.success = 'Profile updated successfully!'
      emit('updated')
    }
  } catch (e: any) {
    formState.value.error = e.data?.message || 'Failed to update profile'
  } finally {
    formState.value.loading = false
  }
})

// Reset form to initial values
const handleReset = () => {
  resetForm()
  formState.value.error = ''
  formState.value.success = ''
}
</script>

<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h3 class="text-lg font-semibold text-gray-900 mb-4">Update Profile</h3>

    <form @submit="onSubmit" class="space-y-4">
      <div v-if="formState.error" class="rounded-md bg-red-50 p-4">
        <p class="text-sm text-red-800">{{ formState.error }}</p>
      </div>

      <div v-if="formState.success" class="rounded-md bg-green-50 p-4">
        <p class="text-sm text-green-800">{{ formState.success }}</p>
      </div>

      <div>
        <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
        <div class="mt-2">
          <input
            id="name"
            v-model="name"
            v-bind="nameAttrs"
            name="name"
            type="text"
            class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            :class="{ 'ring-red-500 focus:ring-red-500': errors.name }"
          />
          <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
        </div>
      </div>

      <div>
        <label for="image" class="block text-sm font-medium leading-6 text-gray-900"
          >Profile Image URL (optional)</label
        >
        <div class="mt-2">
          <input
            id="image"
            v-model="image"
            v-bind="imageAttrs"
            name="image"
            type="url"
            class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            :class="{ 'ring-red-500 focus:ring-red-500': errors.image }"
          />
          <p v-if="errors.image" class="mt-1 text-sm text-red-600">{{ errors.image }}</p>
        </div>
      </div>

      <div class="flex gap-3">
        <button
          type="submit"
          :disabled="formState.loading"
          class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ formState.loading ? 'Updating...' : 'Update Profile' }}
        </button>
        <button
          type="button"
          @click="handleReset"
          class="rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>
