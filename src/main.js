import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import './style.css'
import 'virtual:windi.css'
import App from './App.vue'
import { router } from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './permission'
import 'nprogress/nprogress.css'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(router)

app.mount('#app')
