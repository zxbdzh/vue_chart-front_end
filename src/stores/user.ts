import { type Ref, ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/pojo/user.ts'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo: Ref<User> = ref({
      id: -1,
      username: '',
      token: '',
    })

    const changeUserInfo = (newUserInfo: User) => {
      userInfo.value = newUserInfo
    }

    const setToken = (token: string) => {
      userInfo.value.token = token
    }

    return { userInfo, changeUserInfo, setToken }
  },
  {
    persist: true,
  },
)
