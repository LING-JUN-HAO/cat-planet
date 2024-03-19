<template>
  <LoadingComponent v-model:active="isLoading" :loadingMessage="loadingMessage"></LoadingComponent>
  <section class="container container-title py-3 category">
    <h2 data-aos="fade-down" data-aos-delay="0" data-aos-duration="900" class="text-center py-3 fw-bold">各項精美商品</h2>
    <div class="row d-flex flex-column flex-xl-row">
      <AsideList data-aos="fade-left" data-aos-delay="450" data-aos-duration="900"></AsideList>
      <ProductList data-aos="fade-right" data-aos-delay="450" data-aos-duration="900" :products="products"></ProductList>
    </div>
    <QueryPagination data-aos="fade-right" data-aos-delay="450" data-aos-duration="900" :pages="pages"></QueryPagination>
  </section>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import AsideList from '@/components/consumer/productListPage/AsideList.vue'
import ProductList from '@/components/consumer/productListPage/ProductList.vue'
import QueryPagination from '@/components/utils/QueryPagination.vue'
import { cartStore } from '@/store/Cart.js'
import { loadingStore } from '@/store/Loading.js'
import { getProductsApi } from '@/mixin/Api.js'

export default {
  data () {
    return {
      pages: {},
      products: []
    }
  },
  methods: {
    async getProducts (category, page) {
      try {
        this.setLoading(true, '商品加載中...請稍候')
        const productsInfo = await getProductsApi(category, page)
        this.products = productsInfo.products
        this.pages = productsInfo.pagination
      } catch (error) {
        this.$showNotification('Oops...請稍後嘗試')
      } finally {
        this.setLoading(false, '')
      }
    },
    onRouteChange () {
      const { category, page } = this.$route.query
      this.getProducts(category, page)
    },
    ...mapActions(cartStore, ['getCart']),
    ...mapActions(loadingStore, ['setLoading'])
  },
  computed: {
    ...mapState(loadingStore, ['isLoading', 'loadingMessage'])
  },
  mounted () {
    this.getCart()
    this.onRouteChange()
  },
  watch: {
    '$route.query': 'onRouteChange'
  },
  components: {
    AsideList, ProductList, QueryPagination
  }
}
</script>
