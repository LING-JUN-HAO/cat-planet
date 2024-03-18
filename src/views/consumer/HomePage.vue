<template>
  <LoadingComponent v-model:active="isLoading" :loadingMessage="loadingMessage"></LoadingComponent>
  <BannerComponent></BannerComponent>
  <CategoryComponent></CategoryComponent>
  <AboutComponent></AboutComponent>
  <HotProductComponent :products="products"></HotProductComponent>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import BannerComponent from '@/components/consumer/homePage/BannerComponent.vue'
import CategoryComponent from '@/components/consumer/homePage/CategoryComponent.vue'
import AboutComponent from '@/components/consumer/homePage/AboutComponent.vue'
import HotProductComponent from '@/components/consumer/homePage/HotProductComponent.vue'
import { cartStore } from '@/store/Cart.js'
import { loadingStore } from '@/store/Loading.js'
import { getProductsApi } from '@/mixin/Api.js'

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
        const productsInfo = await getProductsApi(category, page)
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
    BannerComponent, CategoryComponent, AboutComponent, HotProductComponent
  }
}
</script>
