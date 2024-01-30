import { createRouter, createWebHashHistory } from 'vue-router'
import LoginPage from '@/views/LoginPage.vue'
import ProductsPage from '@/views/ProductsPage.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/Products',
      name: 'Products',
      component: ProductsPage
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/login'
    }
  ]
})

export default router
