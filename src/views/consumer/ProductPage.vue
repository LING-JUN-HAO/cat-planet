<template>
  <Loading v-model:active="isLoading" :loadingMessage="loadingMessage"></Loading>
  <section class="container container-title py-3 category">
    <h2 data-aos="fade-down" data-aos-delay="0" data-aos-duration="900" class="text-center py-3 fw-bold">各項精美商品</h2>
    <div class="row d-flex flex-column flex-xl-row">
      <AsideList data-aos="fade-left" data-aos-delay="450" data-aos-duration="900"></AsideList>
      <ProductList data-aos="fade-right" data-aos-delay="450" data-aos-duration="900" :products="products"
        :loadingStatus="loadingStatus" :productItemOnclick="productItemOnclick" :addToCart="addToCart" @searchValue="filterProduct"></ProductList>
    </div>
  </section>
</template>

<script>
import AsideList from '@/components/consumer/productpage/AsideList.vue'
import ProductList from '@/components/consumer/productpage/ProductList.vue'
import { getProducts } from '@/mixin/Api.js'
import { cartStore } from '@/store/Cart.js'
import { mapActions } from 'pinia'
const { VITE_API, VITE_PATH } = import.meta.env

export default {
  data () {
    return {
      loadingStatus: {
        loadingItem: ''
      },
      loadingMessage: '商品加載中...請稍候',
      isLoading: false,
      pages: {},
      products: []
    }
  },
  methods: {
    async getProducts (category, page) {
      try {
        this.isLoading = true
        const productsInfo = await getProducts(category, page)
        this.products = productsInfo.products
        this.pages = productsInfo.pagination
      } catch (error) {
        this.$showNotification('Oops...請稍後嘗試')
      } finally {
        this.isLoading = false
      }
    },
    productItemOnclick (id) {
      this.$router.push({ name: 'consumerProductItem', query: { productID: id } })
    },
    handleRouteChange () {
      const { category, page } = this.$route.query
      this.getProducts(category, page)
    },
    async addToCart (id, qty = 1) {
      this.loadingStatus.loadingItem = id
      const cart = {
        product_id: id,
        qty
      }
      try {
        await this.$http.post(`${VITE_API}/api/${VITE_PATH}/cart`, { data: cart })
        this.getCart()
        this.$toast.open({
          message: '商品已成功加入購物車!',
          type: 'success',
          position: 'top-right',
          duration: 1000
        })
      } catch (error) {
        this.$showNotification('Oops...請稍後嘗試')
      } finally {
        this.loadingStatus.loadingItem = ''
      }
    },
    filterProduct (searchValue) {
      console.log('searchValue', searchValue)
      console.log('products', this.products)
      const test = this.products.filter((x) => x.title === '球形毛絨貓抓球')
      console.log('test', test)
    },
    ...mapActions(cartStore, ['getCart'])
  },
  mounted () {
    this.handleRouteChange()
    this.getCart()
  },
  watch: {
    '$route.query': 'handleRouteChange'
  },
  components: {
    AsideList, ProductList
  }
}
</script>
