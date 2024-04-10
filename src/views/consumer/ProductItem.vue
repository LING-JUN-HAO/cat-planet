<template v-if="!isDefaultStatus">
  <LoadingComponent v-model:active="isLoading" :loadingMessage="loadingMessage"></LoadingComponent>
  <section class="product-item-container container container-title category">
    <h2 data-aos="fade-down" data-aos-delay="0" data-aos-duration="900" class="text-center py-6 m-0 fw-bold">商品介紹</h2>
    <div data-aos="fade-up" data-aos-delay="450" data-aos-duration="900"
      class="product-item-content content-shadow border border-1 bg-white rounded-4 d-flex p-4 p-md-5">
      <div class="row w-100 ms-0">
        <div class="col-12 col-md-6">
          <img class="main-img w-100 h-100 object-fit-cover rounded-3" :src="product.imageUrl" :alt="product.id">
        </div>
        <div class="col-12 col-md-6 d-flex flex-column">
          <span class="badge bg-pink rounded-pill p-2 my-3 align-self-start fs-6 fw-normal">{{ product.category
            }}</span>
          <h3 class="modal-title" id="exampleModalLabel">
            <span>{{ product.title }}</span>
          </h3>
          <div class="h4 my-3" v-if="!product.price">{{ product.origin_price }} 元</div>
          <div class="h4 my-3" v-if="product.price">
            <span class="text-pink"><del class="fs-5">NT${{ product.origin_price }}</del> NT${{ product.price }} / {{ product.unit
              }}</span>
          </div>
          <p class="my-3">商品描述：{{ product.description }}</p>
          <p class="my-3">商品內容：{{ product.content }}</p>
          <div class="row mt-auto col-12">
            <div class="col-12 pb-3">
              <div class="input-group">
                <button type="button" :disabled="qty == 1" @click="qty--;"
                  class="d-flex align-items-center justify-content-center btn btn-outline-primary">-</button>
                <input type="number" class="form-control p-2 text-center" v-model.number="qty" min="1"
                  readonly>
                <button @click="qty++;" type="button"
                  class="d-flex align-items-center justify-content-center btn btn-outline-primary">+</button>
              </div>
            </div>
            <div class="col-12">
              <button type="button" class="btn btn-taupe rounded-3 p-2 text-white fs-6 w-100"
                @click="addToCart(product.id, qty)">
                <i class="fas fa-spinner fa-pulse" v-if="loadingItem !== ''"></i>
                <i class="bi bi-cart" v-else></i>
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <HotProductComponent :products="products"></HotProductComponent>
  <RouterButton :arrowIcon="'left'" :routerName="'consumerProducts'" :query="{ category: '所有產品', page: 1 }"
    :display="'商品頁面'"></RouterButton>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import HotProductComponent from '@/components/consumer/homePage/HotProductComponent.vue'
import RouterButton from '@/components/utils/RouterButton.vue'
import { cartStore } from '@/store/Cart.js'
import { loadingStore } from '@/store/Loading.js'
import { getProductApi, getProductsApi } from '@/mixin/Api.js'

export default {
  data () {
    return {
      product: {},
      products: [],
      isDefaultStatus: false,
      qty: 1
    }
  },
  methods: {
    async getProduct (id) {
      try {
        const productInfo = await getProductApi(id)
        this.product = productInfo.product
      } catch (error) {
        this.$showNotification('Oops...請稍後嘗試')
      }
    },
    async getProducts (category, page) {
      try {
        const productsInfo = await getProductsApi(category, page)
        this.products = productsInfo.products
        this.products = this.products.filter((item) => item.id !== this.$route.query.productID)
      } catch (error) {
        this.$showNotification('Oops...請稍後嘗試')
      }
    },
    async onRouteChange () {
      const { productID } = this.$route.query
      this.setLoading(true, '商品加載中...請稍候')
      await this.getProduct(productID)
      await this.getProducts()
      this.isDefaultStatus = true
      this.setLoading(false, '')
      this.getCart()
    },
    ...mapActions(loadingStore, ['setLoading']),
    ...mapActions(cartStore, ['getCart', 'addToCart'])
  },
  computed: {
    ...mapState(loadingStore, ['isLoading', 'loadingMessage', 'loadingItem'])
  },
  watch: {
    '$route.query': 'onRouteChange'
  },
  mounted () {
    this.onRouteChange()
  },
  components: {
    HotProductComponent, RouterButton
  }
}
</script>
