<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted, watch } from 'vue'
import { useThemeStore } from '@/stores/theme.ts'
import { useDark } from '@vueuse/core'

const theme = useThemeStore()

onMounted(() => {
  // 主题初始化
  if (!theme.use_dark) {
    theme.isDark = useDark().value
    theme.toggleDarkMode(theme.isDark)
    // 监测自动主题变化
    watch(useDark(), (newValue) => {
      theme.isDark = newValue
      theme.toggleDarkMode(newValue)
    })
  }
  if (theme.isDark) {
    theme.toggleDarkMode(true)
  }
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
