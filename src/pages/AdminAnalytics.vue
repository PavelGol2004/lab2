<script setup>
import { ref, onMounted } from 'vue'
import Header from '@/components/Header.vue'
import Card from '@/components/ui/Card.vue'
import CardContent from '@/components/ui/CardContent.vue'
import { getAnalytics } from '@/api/admin.js'
import { backendFeatures } from '@/api/compat.js'

const stats = ref(null)
const loading = ref(true)

async function load() {
  loading.value = true
  try {
    stats.value = await getAnalytics()
  } catch (e) {
    stats.value = {
      unavailable: true,
      events: 0,
      registrations: 0,
      attendance: 0,
      noShowRate: 0,
    }
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>

<template>
  <div class="min-h-screen bg-background">
    <Header />
    <main class="mx-auto max-w-4xl px-4 py-8">
      <h1 class="mb-4 text-xl font-semibold">Analytics</h1>
      <div v-if="!backendFeatures.adminAnalytics" class="mb-4 rounded-md border border-border bg-card p-4 text-sm text-muted-foreground">
        Аналитика пока не поддерживается текущей версией backend.
      </div>
      <div v-if="loading">...</div>
      <div v-else class="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card><CardContent class="p-4"><p class="text-xs text-muted-foreground">Events</p><p class="text-2xl font-bold">{{ stats.events }}</p></CardContent></Card>
        <Card><CardContent class="p-4"><p class="text-xs text-muted-foreground">Registrations</p><p class="text-2xl font-bold">{{ stats.registrations }}</p></CardContent></Card>
        <Card><CardContent class="p-4"><p class="text-xs text-muted-foreground">Attendance</p><p class="text-2xl font-bold">{{ stats.attendance }}</p></CardContent></Card>
        <Card><CardContent class="p-4"><p class="text-xs text-muted-foreground">No-show</p><p class="text-2xl font-bold">{{ stats.noShowRate }}%</p></CardContent></Card>
      </div>
    </main>
  </div>
</template>
