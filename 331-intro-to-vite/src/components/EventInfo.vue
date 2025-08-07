<script setup lang="ts">
import type { Event } from '@/types'

defineProps<{
  event: Event
}>()
</script>

<template>
  <div class="text-right">
    <div class="text-sm font-inherit my-1">{{ event.category }}</div>
    <div class="text-sm font-inherit my-1">{{ event.organizer }}</div>
  </div>
</template>

