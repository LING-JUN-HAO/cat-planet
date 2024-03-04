<template>
  <Loading v-model:active="isLoading" :loadingMessage="loadingMessage"></Loading>
  <Banner></Banner>
  <main class="bg-gray">
    <Category></Category>
    <About></About>
    <HotProduct :products="products"></HotProduct>
  </main>
</template>

<script>
import Banner from '@/components/consumer/homepage/Banner.vue'
import Category from '@/components/consumer/homepage/Category.vue'
import About from '@/components/consumer/homepage/About.vue'
import HotProduct from '@/components/consumer/homepage/HotProduct.vue'
import { cartStore } from '@/store/Store.js'
import { mapActions } from 'pinia'
const { VITE_API, VITE_PATH } = import.meta.env

export default {
  data () {
    return {
      products: [],
      isLoading: true,
      loadingMessage: "資料載入中...請稍候"
    }
  },
  methods: {
    async getProducts (category, page = 1) {
      try {
        const productsInfo = await this.$http.get(`${VITE_API}/api/${VITE_PATH}/products?page=${page}`)
        this.products = productsInfo.data.products
      } catch (error) {
        this.$showNotification('Oops...請稍後嘗試')
      } finally {
        this.isLoading = false
      }
    },
    ...mapActions(cartStore, ['getCart'])
  },
  mounted () {
    this.getProducts()
    this.getCart()
  },
  components: {
    Banner, Category, About, HotProduct
  }
}
</script>