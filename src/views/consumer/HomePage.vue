<template>
  <Loading v-model:active="isLoading" :loadingMessage="loadingMessage"></Loading>
  <Banner></Banner>
  <Category></Category>
  <About></About>
  <HotProduct :products="products"></HotProduct>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { cartStore } from '@/store/Cart.js'
import { getProducts } from '@/mixin/Api.js'
import { loadingStore } from '@/store/Loading.js'
import Banner from '@/components/consumer/homepage/Banner.vue'
import Category from '@/components/consumer/homepage/Category.vue'
import About from '@/components/consumer/homepage/About.vue'
import HotProduct from '@/components/consumer/homepage/HotProduct.vue'

export default {
  data () {
    return {
      products: []
    }
  },
  methods: {
    async getProducts (category, page) {
      try {
        this.setLoading(true, '資料載入中...請稍候')
        const productsInfo = await getProducts(category, page)
        this.products = productsInfo.products
      } catch (error) {
        this.$showNotification('Oops...請稍後嘗試')
      } finally {
        this.setLoading(false, '')
      }
    },
    ...mapActions(cartStore, ['getCart']),
    ...mapActions(loadingStore, ['setLoading'])
  },
  computed: {
    ...mapState(loadingStore, ['isLoading', 'loadingMessage'])
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
