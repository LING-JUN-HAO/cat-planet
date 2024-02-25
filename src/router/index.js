import { createRouter, createWebHashHistory } from 'vue-router'
import AdminLayout from '@/views/admin/AdminLayout.vue'
import AdminLoginPage from '@/views/admin/LoginPage.vue'
import AdminProductsPage from '@/views/admin/ProductsPage.vue'
import AdminVoucherPage from '@/views/admin/VoucherPage.vue'
import ConsumerLayout from '@/views/consumer/ConsumerLayout.vue'
import ConsumerCheckout from '@/views/consumer/CheckoutPage.vue'
import ConsumerProducts from '@/views/consumer/ProductsPage.vue'
import ConsumerCart from '@/views/consumer/CartPage.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/admin',
      name: 'admin',
      component: AdminLayout,
      children: [
        {
          path: 'login',
          name: 'adminLogin',
          component: AdminLoginPage
        },
        {
          path: 'products',
          name: 'adminProducts',
          component: AdminProductsPage
        },
        {
          path: 'vouchers',
          name: 'adminVoucher',
          component: AdminVoucherPage
        }
      ]
    },
    {
      path: '/consumer',
      name: 'consumer',
      component: ConsumerLayout,
      children: [
        {
          path: 'checkout',
          name: 'consumerCheckout',
          component: ConsumerCheckout
        },
        {
          path: 'products',
          name: 'consumerProducts',
          component: ConsumerProducts
        },
        {
          path: 'carts',
          name: 'consumerCarts',
          component: ConsumerCart
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFount',
      redirect: '/Consumer/Products'
    }
  ]
})

export default router
