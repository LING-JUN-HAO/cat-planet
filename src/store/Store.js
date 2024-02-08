import { defineStore } from 'pinia'
import ShowNotification from '@/mixin/Swal.js'
import axios from 'axios'

const { VITE_API, VITE_PATH } = import.meta.env

export const cartStore = defineStore('cartStore', {
  state: () => ({
    cartNumber: 0,
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
    cleanCart () {
      this.cart = {
        carts: [],
        final_total: 0,
        total: 0
      }
    }
  }
})
