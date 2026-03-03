<script setup>
import { Calendar } from 'lucide-vue-next'
</script>

<template>
  <header class="border-b border-border bg-background px-6 py-4">
    <RouterLink to="/" class="flex items-center gap-2">
      <Calendar class="h-6 w-6 text-primary" />
      <span class="text-xl font-bold text-foreground">SmartEvent</span>
    </RouterLink>
  </header>
</template>
