<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { type Event } from '@/types'

const props = defineProps<{
  event: Event
  id: string
}>()
const router = useRouter()
const register = () => {
  router.push({ name: 'event-detail-view' })
}
</script>
<template>
  <p>Register here</p>
  <button @click="register">Register</button>
</template>
