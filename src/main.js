import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from './utils/axios'

import 'qweather-icons/font/qweather-icons.css'


const app = createApp(App);

app.use(createPinia())
app.use(router)
app.provide('$axios', axios);

app.mount('#app')