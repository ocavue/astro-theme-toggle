<script setup lang="ts">
import { handleToggleClick } from 'astro-theme-toggle/client'
import { Moon, Sun } from 'lucide-vue-next'
import './icon.css'
</script>

<template>
  <button @click="handleToggleClick">
    <Moon class="icon-moon" />
    <Sun class="icon-sun" />
  </button>
</template>
