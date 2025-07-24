<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Student List</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div
        v-for="student in students"
        :key="student.id"
        class="p-4 rounded-xl border shadow bg-white"
      >
        <h2 class="font-semibold text-lg">{{ student.name }} {{ student.surname }}</h2>
        <p class="text-gray-600">GPA: {{ student.gpa }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import studentService from '@/services/studentService'

interface Student {
  id: number
  name: string
  surname: string
  gpa: number
}

const students = ref<Student[]>([])

onMounted(async () => {
  try {
    const response = await studentService.getStudents()
    students.value = response.data
  } catch (error) {
    console.error('Failed to load students', error)
  }
})
</script>
