import { createApp } from 'vue'
import './style.css'
import router from './router'
import App from './App.vue'
// eslint-disable-next-line no-unused-vars
import * as bootstrap from 'bootstrap'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const app = createApp(App)
app.use(router)
app.use(VueAxios, axios)
app.use(VueSweetalert2)
app.mount('#app')
