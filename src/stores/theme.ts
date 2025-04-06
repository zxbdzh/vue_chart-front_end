import { type Ref, ref } from 'vue'
import { defineStore } from 'pinia'
import { useDark } from '@vueuse/core'

export const useThemeStore = defineStore('theme', () => {
  const isDark: Ref<boolean> = ref(false)

  // 初始化使用useDark
  const use_dark = ref(false)

  // 主题切换
  const toggleDarkMode = (isDark: boolean) => {
    document.documentElement.classList.toggle('dark_', isDark)

  }

  const changeDark = (): void => {
    if (use_dark.value == false) {
      use_dark.value = true
      isDark.value = useDark().value
    }
    isDark.value = !isDark.value
    toggleDarkMode(isDark.value)
  }

  return { isDark, use_dark, changeDark, toggleDarkMode }
}, {
  persist: true
})
