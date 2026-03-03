<script setup>
import Header from '@/components/Header.vue'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Button from '@/components/ui/Button.vue'
import { Calendar, MapPin, Users } from 'lucide-vue-next'

const events = [
  { id: 1, title: 'Научная конференция', date: '15 марта 2026', location: 'Аудитория 301', participants: 45 },
  { id: 2, title: 'Спортивный турнир', date: '20 марта 2026', location: 'Спортзал', participants: 120 },
  { id: 3, title: 'Культурный вечер', date: '25 марта 2026', location: 'Актовый зал', participants: 80 },
]
</script>

<template>
  <div class="min-h-screen bg-background">
    <Header />
    <main class="mx-auto max-w-4xl px-4 py-8">
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-foreground">Мероприятия</h1>
          <p class="mt-1 text-muted-foreground">Список внеучебных мероприятий</p>
        </div>
        <RouterLink to="/login">
          <Button variant="outline">Войти</Button>
        </RouterLink>
      </div>
      <div class="grid gap-4">
        <Card
          v-for="event in events"
          :key="event.id"
          class="transition-shadow hover:shadow-md"
        >
          <CardHeader class="pb-2">
            <CardTitle class="text-lg">{{ event.title }}</CardTitle>
          </CardHeader>
          <CardContent class="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span class="flex items-center gap-1">
              <Calendar class="h-4 w-4" />
              {{ event.date }}
            </span>
            <span class="flex items-center gap-1">
              <MapPin class="h-4 w-4" />
              {{ event.location }}
            </span>
            <span class="flex items-center gap-1">
              <Users class="h-4 w-4" />
              {{ event.participants }} участников
            </span>
          </CardContent>
        </Card>
      </div>
    </main>
  </div>
</template>
