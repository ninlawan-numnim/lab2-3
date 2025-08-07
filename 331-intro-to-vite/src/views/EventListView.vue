<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import EventInfo from '@/components/EventInfo.vue'
import { type Event } from '@/types'
import EventService from '@/services/EventService'
import { ref, onMounted, computed, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const events = ref<Event[] | null>(null)
const totalEvents = ref(0)

const props = defineProps({
  page: {
    type: Number,
    required: true,
  },
  size: {
    type: Number,
    default: 2,
  },
})

const page = computed(() => props.page)
const pageSize = computed(() => props.size)

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / pageSize.value)
  return page.value < totalPages
})

const totalPages = computed(() => Math.ceil(totalEvents.value / pageSize.value))

const changePageSize = (newSize: number) => {
  router.push({
    name: 'event-list-view',
    query: {
      page: 1,
      size: newSize,
    },
  })
}

onMounted(async () => {
  watchEffect(() => {
    EventService.getEvents(pageSize.value, page.value)
      .then((response) => {
        events.value = response.data
        totalEvents.value = response.headers['x-total-count']
      })
      .catch(() => {
        router.push({ name: 'network-error-view' })
      })
  })
})
</script>

<template>
  <div>
    <h1>Events For Good</h1>

    <!-- Page Size Selector -->
    <div class="my-5 text-center">
      <label>Events per page: </label>
      <select
        :value="pageSize"
        @change="changePageSize(Number(($event.target as HTMLSelectElement).value))"
        class="ml-2 px-2 py-1 border border-gray-300 rounded text-sm"
      >
        <option value="2">2</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
    </div>

    <div class="flex flex-col items-center">
      <div v-for="event in events" :key="event.id" class="flex flex-col items-center mb-5">
        <EventCard :event="event" />
        <EventInfo :event="event" />
      </div>

      <div class="my-5 text-center text-gray-600 text-sm">
        <p>
          Showing {{ events?.length || 0 }} of {{ totalEvents }} events (Page {{ page }} of
          {{ totalPages }})
        </p>
      </div>

      <div class="flex w-72 mt-5">
        <RouterLink
          id="page-prev"
          :to="{ name: 'event-list-view', query: { page: page - 1, size: pageSize } }"
          rel="prev"
          v-if="page != 1"
          class="flex-1 no-underline text-gray-700 p-2 border border-gray-300 rounded mx-1 text-center text-left hover:bg-gray-100"
        >&#60; Prev Page</RouterLink>

        <RouterLink
          id="page-next"
          :to="{ name: 'event-list-view', query: { page: page + 1, size: pageSize } }"
          rel="next"
          v-if="hasNextPage"
          class="flex-1 no-underline text-gray-700 p-2 border border-gray-300 rounded mx-1 text-center text-right hover:bg-gray-100"
        >Next Page &#62;</RouterLink>
      </div>
    </div>
  </div>
</template>


