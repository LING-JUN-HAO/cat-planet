import { defineStore } from 'pinia'
import ShowNotification from '@/mixin/Swal.js'
import ToastNotification from '@/mixin/Toast.js'
import { loadingStore } from '@/store/Loading'
import { getCartApi, addCartApi } from '@/mixin/Api.js'

export const cartStore = defineStore('cartStore', {
  state: () => ({
    cart: {
      carts: [],
      final_total: 0,
      total: 0
    },
    orderInfo: {
      deliveryMethod: '',
      pickupLocation: '',
      deliveryArea: '',
      logistics: '',
      paymentMethod: '',
      creditCardInfo: {
        cardNumber: '',
        expiryDate: '',
        securityCode: ''
      }
    }
  }),
  actions: {
    async getCart () {
      try {
        const cartInfo = await getCartApi()
        this.cart = cartInfo.data
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
        await addCartApi(cart)
        ToastNotification('success', '商品已成功加入購物車')
        this.getCart()
      } catch (error) {
        ShowNotification('Oops...請重新嘗試')
      } finally {
        loadingStoreInstance.loadingItem = ''
      }
    },
    setOrderInfo (key, value) {
      this.orderInfo[key] = value
    },
    updateCardNumber (newValue) {
      this.orderInfo.creditCardInfo.cardNumber = newValue
    },
    updateExpiryDate (newValue) {
      this.orderInfo.creditCardInfo.expiryDate = newValue
    },
    updateSecurityCode (newValue) {
      this.orderInfo.creditCardInfo.securityCode = newValue
    },
    cleanOrderInfo () {
      this.orderInfo = {
        deliveryMethod: '',
        pickupLocation: '',
        deliveryArea: '',
        logistics: '',
        paymentMethod: '',
        creditCardInfo: {
          cardNumber: '',
          expiryDate: '',
          securityCode: ''
        }
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
