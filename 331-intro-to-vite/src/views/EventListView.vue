<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import EventInfo from '@/components/EventInfo.vue'
import type { Event } from '@/type'
import axios from 'axios'
import {ref, onMounted } from 'vue'

const events = ref<Event[]>(null)

onMounted( ()=>{
  axios
  .get('https://my-json-server.typicode.com/ninlawan-numnim/db/events')
  .then((response)=>{
    console.log(response.data)
  })
  .catch((error)=>{
    console.error('There was an error!',error)
  })
})
</script>

<template>
  <h1>Events For Good</h1>
    <!-- new element-->
  <div class="events">
    <div v-for="event in events" :key="event.id" class="event-container">
      <EventCard :event="event" />
      <EventInfo :event="event" />
      </div>
      </div>
</template>
<style scoped>
.events{
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
