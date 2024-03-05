import { createRouter, createWebHashHistory } from 'vue-router'
import AdminLayout from '@/views/admin/AdminLayout.vue'
import AdminLoginPage from '@/views/admin/LoginPage.vue'
import AdminProductsPage from '@/views/admin/ProductsPage.vue'
import AdminVoucherPage from '@/views/admin/VoucherPage.vue'
import AdminOrdersPage from '@/views/admin/OrdersPage.vue'
import ConsumerLayout from '@/views/consumer/ConsumerLayout.vue'
import ConsumerCheckout from '@/views/consumer/CheckoutPage.vue'
import ConsumerHome from '@/views/consumer/HomePage.vue'
import ConsumerProducts from '@/views/consumer/ProductPage.vue'
import ConsumerProductItem from '@/views/consumer/ProductItem.vue'
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
        },
        {
          path: 'orders',
          name: 'adminOrders',
          component: AdminOrdersPage
        }
      ]
    },
    {
      path: '/consumer',
      name: 'consumer',
      component: ConsumerLayout,
      children: [
        {
          path: 'home',
          name: 'consumerHome',
          component: ConsumerHome
        },
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
          path: 'productItem',
          name: 'consumerProductItem',
          component: ConsumerProductItem
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
      redirect: '/consumer/home'
    }
  ]
})

export default router
