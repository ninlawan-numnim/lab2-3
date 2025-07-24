<script setup lang="ts">
import { toRefs} from 'vue'
import { type Event } from '@/types'

const props = defineProps<{
 event: Event
 id: String
}>()
const {event} = toRefs(props)
// eslint-disable-next-line @typescript-eslint/no-unused-vars

</script>
<template>
    <p>Edit event here</p>
</template>
