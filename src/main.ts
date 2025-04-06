import './assets/base.css'
import './assets/css-vars.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import persist from 'pinia-plugin-persistedstate'

const app = createApp(App)

const pinia = createPinia().use(persist)

app.use(pinia)
app.use(router)

app.mount('#app')
