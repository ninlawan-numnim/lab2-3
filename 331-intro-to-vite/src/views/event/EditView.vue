<script setup lang="ts">
import { toRefs } from 'vue'
import { type Event } from '@/types'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'

const props = defineProps<{
  event: Event
  id: string
}>()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { event } = toRefs(props)
const router = useRouter()
const store = useMessageStore()

const updateEvent = () => {
  store.updateMessage('The data has been updated!')
  setTimeout(() => {
    store.resetMessage()
  }, 3000)
  router.push({
    name: 'event-detail-view',
    params: { id: props.event.id },
    // query: { message: 'The data has been updated!' }
  })
}
</script>

<template>
  <div>
    <button @click="updateEvent" class="update-btn">Update Event</button>
  </div>
</template>

<style scoped>
.update-btn {
  background-color: #42b983;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.update-btn:hover {
  background-color: #369870;
}
</style>
