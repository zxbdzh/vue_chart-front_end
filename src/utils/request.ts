import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import router from '@/router'
import { useUserStore } from '@/stores/user.ts'
// 定义全局 baseURL
const baseURL = import.meta.env.VITE_APP_BASEURL

// 请求拦截器
function requestInterceptor(options: AxiosRequestConfig) {
  // 将 baseURL 和请求的 url 拼接
  options.url = baseURL + options.url
  options.timeout = 15000
  return options
}

// 响应拦截器
function responseInterceptor(response: AxiosResponse) {
  return response
}

// 封装 axios 请求函数并添加拦截器
function request(options: AxiosRequestConfig) {
  // 应用请求拦截器
  const newOptions = requestInterceptor(options)
  newOptions.headers = newOptions.headers || {} // 确保headers对象存在
  newOptions.headers.Authorization = useUserStore().userInfo.token || ''

  return axios(newOptions)
    .then((response) => {
      // 应用响应拦截器
      // 判断code是否异常
      if (response?.data.code === 500) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        ElMessage({
          message: response.data.message,
          type: 'error',
        })
      }
      // 判断是否为登录请求
      if (response.config.url?.endsWith('/user/login')) {
        if (response.data.code === 200) {
          // 将 token 存储到 userStore 中
          // localStorage.setItem('token', response.data.data)
          useUserStore().userInfo.token = response.data.data
        }
      }
      return responseInterceptor(response)
    })
    .catch((error) => {
      // 处理请求失败的情况
      // console.error('请求失败: ', error)
      if (error.response?.status === 401) {
        // 处理 token 过期情况
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        ElMessage({
          message: '登录过期，请重新登录',
          type: 'error',
        })
        router.push('/login').then(() => {
          useUserStore().userInfo.token = ''
          window.location.reload()
        })
      }
      throw error
    })
}

// 封装上传文件方法
function uploadFile(file: File) {
  const formData = new FormData()
  formData.append('file', file)
  const options: AxiosRequestConfig = {
    url: '/common/upload',
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }
  // 复用请求拦截器处理基础配置
  const newOptions = requestInterceptor(options)
  return new Promise((resolve, reject) => {
    axios(newOptions)
      .then((response) => {
        // 应用响应拦截器
        const newResponse = responseInterceptor(response)
        resolve(newResponse)
      })
      .catch((error) => {
        // 处理请求失败的情况
        console.error(' 请求失败：', error)
        reject(error)
      })
  })
}

export { request as default, uploadFile }
