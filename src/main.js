import { createApp } from 'vue'
import { createPinia } from 'pinia'
// 第三方套件匯入(axios、aos、vue-validate、vue-toast-notification)
import axios from 'axios'
import VueAxios from 'vue-axios'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'
import * as AllRules from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
import 'bootstrap-icons/font/bootstrap-icons.css'
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'
// 自定義方法(SweetAlert2 & vue-toast-notification)
import ShowNotification from '@/mixin/Swal.js'
import ToastNotification from '@/mixin/Toast.js'
import LoadingComponent from '@/components/utils/LoadingComponent.vue'
import router from './router'
import App from './App.vue'
import './assets/scss/all.scss'
const app = createApp(App)
const pinia = createPinia()
app.config.globalProperties.$showNotification = ShowNotification
app.config.globalProperties.$toastNotification = ToastNotification
// i18n多國語系設定
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true
})
setLocale('zh_TW')
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
app.use(pinia)
app.use(ToastPlugin)
app.use(VueAxios, axios)
app.component('VField', Field)
app.component('VForm', Form)
app.component('ErrorMessage', ErrorMessage)
app.component('LoadingComponent', LoadingComponent)
app.mount('#app')
