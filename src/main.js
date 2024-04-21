import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from './utils/axios'

import ElementUI from "element-plus";
import 'element-plus/theme-chalk/index.css'

import 'qweather-icons/font/qweather-icons.css'


const app = createApp(App);

app.use(ElementUI)
app.use(createPinia())
app.use(router)
app.provide('$axios', axios);

app.mount('#app')