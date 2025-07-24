<script setup lang="ts">
import type { Event } from '@/types'

defineProps<{
  event: Event
}>()
</script>

<template>
  <div class="event-info">
    <div class="category">{{ event.category }}</div>
    <div class="organizer">{{ event.organizer }}</div>
  </div>
</template>

<style scoped>
.event-info {
  text-align: right;
}

.category,
.organizer {
  font-size: 14px;
  font-family: inherit;
  margin: 2px 0;
}
</style>
