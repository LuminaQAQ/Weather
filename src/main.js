import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from './utils/axios'

import ElementUI from "element-plus";
import 'element-plus/theme-chalk/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import 'qweather-icons/font/qweather-icons.css'


const app = createApp(App);

app.use(ElementUI)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(createPinia())
app.use(router)
app.provide('$axios', axios);

app.mount('#app')