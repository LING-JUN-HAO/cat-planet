<template>
  <Loading v-model:active="isLoading" :loadingMessage="loadingMessage"></Loading>
  <section v-if="!isLoading" class="product-item-container container container-title pt-3 pb-6 category">
    <h2 data-aos="fade-down" data-aos-delay="0" data-aos-duration="900" class="text-center py-3 fw-bold">商品介紹</h2>
    <div data-aos="fade-up" data-aos-delay="450" data-aos-duration="900"
      class="product-item-content content-shadow border border-1 bg-white rounded-4 d-flex p-5">
      <div class="row w-100">
        <div class="col-sm-6">
          <img class="main-img w-100 h-100 object-fit-cover rounded-3" :src="product.imageUrl" :alt="product.id">
        </div>
        <div class="col-sm-6 d-flex flex-column">
          <span class="badge bg-primary rounded-pill p-2 my-3 align-self-start fs-6 fw-normal">{{ product.category
            }}</span>
          <h3 class="modal-title" id="exampleModalLabel">
            <span>{{ product.title }}</span>
          </h3>
          <div class="h4 my-3" v-if="!product.price">{{ product.origin_price }} 元</div>
          <div class="h4 my-3" v-if="product.price">
            <span class="text-pink">NT${{ product.price }} / {{ product.unit }}</span>
          </div>
          <del v-if="product.price">NT${{ product.origin_price }}</del>
          <p class="my-3">商品描述：{{ product.description }}</p>
          <p class="my-3">商品內容：{{ product.content }}</p>
          <div class="input-group mt-auto gap-4">
            <input type="number" class="form-control rounded-2 p-2 text-center col-4 fs-5" v-model.number="qty">
            <button type="button" class="btn btn-primary rounded-3 p-2 col-8 text-white"
              @click="addToCart(product.id, qty)">
              <i class="fas fa-spinner fa-pulse" v-if="isAddCart"></i>
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { cartStore } from '@/store/Store.js'
import { mapActions } from 'pinia'
const { VITE_API, VITE_PATH } = import.meta.env

export default {
  data () {
    return {
      product: {},
      loadingMessage: '商品加載中...請稍候',
      isLoading: false,
      isAddCart: false,
      qty: 1,
    }
  },
  methods: {
    async getProduct (id) {
      try {
        this.isLoading = true
        const productInfo = await this.$http.get(`${VITE_API}/api/${VITE_PATH}/product/${id}`)
        this.product = productInfo.data.product
      } catch (error) {
        this.$showNotification('Oops...請稍後嘗試')
      } finally {
        this.isLoading = false
      }
    },
    async addToCart (id, qty = 1) {
      const cart = {
        product_id: id,
        qty
      }
      try {
        this.isAddCart = true
        await this.$http.post(`${VITE_API}/api/${VITE_PATH}/cart`, { data: cart })
        this.getCart()
        this.$showNotification('商品已加入購物車')
      } catch (error) {
        this.$showNotification('Oops...請稍後嘗試')
      } finally {
        this.isAddCart = false
      }
    },
    handleRouteChange () {
      const { productID } = this.$route.query
      this.getProduct(productID)
    },
    ...mapActions(cartStore, ['getCart'])
  },
  mounted () {
    this.handleRouteChange()
    this.getCart()
  },
}
</script>