import { defineStore } from 'pinia'
import ShowNotification from '@/mixin/Swal.js'
import ToastNotification from '@/mixin/Toast.js'
import { loadingStore } from '@/store/Loading'
import axios from 'axios'

const { VITE_API, VITE_PATH } = import.meta.env

export const cartStore = defineStore('cartStore', {
  state: () => ({
    cart: {
      carts: [],
      final_total: 0,
      total: 0
    }
  }),
  actions: {
    async getCart () {
      try {
        const cartInfo = await axios.get(`${VITE_API}/api/${VITE_PATH}/cart`)
        this.cart = cartInfo.data.data
      } catch (error) {
        ShowNotification('Oops...請重新嘗試')
      }
    },
    async addToCart (id, qty = 1) {
      const loadingStoreInstance = loadingStore()
      loadingStoreInstance.loadingItem = id
      try {
        const cart = {
          product_id: id,
          qty
        }
        await axios.post(`${VITE_API}/api/${VITE_PATH}/cart`, { data: cart })
        ToastNotification('success', '商品已成功加入購物車')
        this.getCart()
      } catch (error) {
        ShowNotification('Oops...請重新嘗試')
      } finally {
        console.log('執行finally了')
        loadingStoreInstance.loadingItem = ''
      }
    },
    cleanCart () {
      this.cart = {
        carts: [],
        final_total: 0,
        total: 0
      }
    }
  }
})
