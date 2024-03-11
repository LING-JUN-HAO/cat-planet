<template>
  <Loading v-model:active="isLoading" :loadingMessage="loadingMessage"></Loading>
  <section v-if="!isLoading" class="product-item-container container container-title py-3 category">
    <h2 data-aos="fade-down" data-aos-delay="0" data-aos-duration="900" class="text-center py-3 fw-bold">商品介紹</h2>
    <div data-aos="fade-up" data-aos-delay="450" data-aos-duration="900"
      class="product-item-content content-shadow border border-1 bg-white rounded-4 d-flex p-5">
      <div class="row w-100">
        <div class="col-sm-6">
          <img class="main-img w-100 h-100 object-fit-cover rounded-3" :src="product.imageUrl" :alt="product.id">
        </div>
        <div class="col-sm-6 d-flex flex-column">
          <span class="badge bg-pink rounded-pill p-2 my-3 align-self-start fs-6 fw-normal">{{ product.category
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
            <button type="button" class="btn btn-taupe rounded-3 p-2 col-8 text-white"
              @click="addToCart(product.id, qty)">
              <i class="fas fa-spinner fa-pulse" v-if="isAddCart"></i>
              <i class="bi bi-cart" v-else></i>
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div v-if="!isLoading" data-aos="zoom-in-up" data-aos-delay="0" data-aos-duration="900" class="pt-3 pb-4 text-center">
    <button type="button" class="btn btn-primary rounded-3 py-2 px-5 text-white" @click="backOnclick">
      <i class="bi bi-caret-left-fill ps-1"></i>
      商品頁面
    </button>
  </div>
</template>

<script>
import { cartStore } from '@/store/Cart.js'
import { mapActions } from 'pinia'
const { VITE_API, VITE_PATH } = import.meta.env

export default {
  data () {
    return {
      product: {},
      loadingMessage: '商品加載中...請稍候',
      isLoading: false,
      isAddCart: false,
      qty: 1
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
        this.$toast.open({
          message: '商品已成功加入購物車!',
          type: 'success',
          position: 'top-right',
          duration: 1000
        })
      } catch (error) {
        this.$showNotification('Oops...請稍後嘗試')
      } finally {
        this.isAddCart = false
      }
    },
    backOnclick () {
      this.$router.push({ name: 'consumerProducts', query: { category: '所有產品', page: 1 } })
    },
    ...mapActions(cartStore, ['getCart'])
  },
  mounted () {
    const { productID } = this.$route.query
    this.getProduct(productID)
    this.getCart()
  }
}
</script>