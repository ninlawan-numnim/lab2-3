<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useRouter, useRoute } from 'vue-router'
import { type Event } from '@/types'
import { useMessageStore } from '@/stores/message'

const props = defineProps<{
  event: Event
  id: string
}>()
const router = useRouter()
const store = useMessageStore()

const register = () => {
  store.updateMessage('You are successfully registered for ' + props.event.title)
  setTimeout(() => {
    store.resetMessage()
  }, 3000)
  router.push({
    name: 'event-detail-view',
    params: { id: props.event.id },
  })
}
</script>
<template>
  <p>Register here</p>
  <button @click="register">Register</button>
</template>
