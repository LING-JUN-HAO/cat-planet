import { createApp } from 'vue'
// boostrap
import 'bootstrap-icons/font/bootstrap-icons.css'
// axios
import axios from 'axios'
import VueAxios from 'vue-axios'
// validate
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'
import * as AllRules from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
// Pinia
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './assets/scss/all.scss'
// SweetAlert2
import ShowNotification from '@/mixin/Swal.js'
import ToastNotification from '@/mixin/Toast.js'
// Loading
import Loading from '@/components/Loading.vue'
// AOS
import AOS from 'aos'
import 'aos/dist/aos.css'
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true
})
setLocale('zh_TW')
const app = createApp(App)
// 全域註冊
app.config.globalProperties.$showNotification = ShowNotification
app.config.globalProperties.$toastNotification = ToastNotification
const pinia = createPinia()
app.use({
  install: () => {
    AOS.init({
      disable: false,
      offset: 200,
      duration: 1000,
      easing: 'ease',
      once: true,
      mirror: false
    })
  }
})
app.use(router)
app.use(VueAxios, axios)
app.use(pinia)
app.use(ToastPlugin)
app.component('VField', Field)
app.component('VForm', Form)
app.component('ErrorMessage', ErrorMessage)
app.component('Loading', Loading)
app.mount('#app')
