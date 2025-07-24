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

// Function to change page size
const changePageSize = (newSize: number) => {
  router.push({
    name: 'event-list-view',
    query: {
      page: 1, // Reset to first page when changing size
      size: newSize,
    },
  })
}

onMounted(async () => {
  watchEffect(() => {
    events.value = null
    EventService.getEvents(pageSize.value, page.value)
      .then((response) => {
        events.value = response.data
        totalEvents.value = response.headers['x-total-count']
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })
  })
})
</script>

<template>
  <h1>Events For Good</h1>

  <!-- Page Size Selector -->
  <div class="page-size-selector">
    <label>Events per page: </label>
    <select
      :value="pageSize"
      @change="changePageSize(Number(($event.target as HTMLSelectElement).value))"
      class="page-size-select"
    >
      <option value="2">2</option>
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="20">20</option>
    </select>
  </div>

  <div class="events">
    <div v-for="event in events" :key="event.id" class="event-container">
      <EventCard :event="event" />
      <EventInfo :event="event" />
    </div>

    <!-- Pagination Info -->
    <div class="pagination-info">
      <p>
        Showing {{ events?.length || 0 }} of {{ totalEvents }} events (Page {{ page }} of
        {{ totalPages }})
      </p>
    </div>

    <div class="pagination">
      <RouterLink
        id="page-prev"
        :to="{ name: 'event-list-view', query: { page: page - 1, size: pageSize } }"
        rel="prev"
        v-if="page != 1"
        >&#60; Prev Page</RouterLink
      >

      <RouterLink
        id="page-next"
        :to="{ name: 'event-list-view', query: { page: page + 1, size: pageSize } }"
        rel="next"
        v-if="hasNextPage"
        >Next Page &#62;</RouterLink
      >
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

.page-size-selector {
  margin: 20px 0;
  text-align: center;
}

.page-size-select {
  margin-left: 10px;
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.pagination-info {
  margin: 20px 0;
  text-align: center;
  color: #666;
  font-size: 14px;
}

.pagination {
  display: flex;
  width: 290px;
  margin-top: 20px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 0 5px;
  text-align: center;
}

.pagination a:hover {
  background-color: #f5f5f5;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
