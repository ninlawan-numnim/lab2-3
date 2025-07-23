<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import EventInfo from '@/components/EventInfo.vue'
import type { Event } from '@/type'
import EventService from '@/services/EventService'
import { ref, onMounted } from 'vue'

const events = ref<Event[]>([])

onMounted(async () => {
  try {
    const response = await EventService.getEvents()
    events.value = response.data
    console.log(response.data)
  } catch (error) {
    console.error('There was an error!', error)
  }
})
</script>

<template>
  <h1>Events For Good</h1>
  <div class="events">
    <div v-for="event in events" :key="event.id" class="event-container">
      <EventCard :event="event" />
      <EventInfo :event="event" />
    </div>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.event-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}
</style>