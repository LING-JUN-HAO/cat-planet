<template>
  <div class="container mt-4">
    <div class="row gap-3">
      <div v-for="item in products" :key="item.id" class="col-3 mb-4 py-4 card">
        <div class="overflow-hidden" @click="getProduct(item.id)">
          <img :src="item.imageUrl" :alt="item.id" class="w-100 object-fit-cover productImg ">
        </div>
        <div>
          <h2 class="fs-6 fw-bold my-3">{{ item.title }} | {{ item.category }}</h2>
          <p>
            <span>NT{{ item.price }}</span>
            <span class="text-decoration-line-through ps-2">原價: {{ item.origin_price }}</span>
          </p>
        </div>
        <div class="btn-group btn-group-sm">
          <button type="button" class="btn btn-outline-secondary" @click="getProduct(item.id)"
            :disabled="loadingStatus.loadingItem === item.id || !item.is_enabled">
            <i class="fas fa-spinner fa-pulse" v-if="loadingStatus.loadingItem === item.id"></i>
            查看更多
          </button>
          <button type="button" class="btn btn-outline-danger" @click="addToCart(item.id)"
            :disabled="loadingStatus.loadingItem === item.id || !item.is_enabled">
            <i class="fas fa-spinner fa-pulse" v-if="loadingStatus.loadingItem === item.id"></i>
            加到購物車
          </button>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <consumer-product :product='product' ref="userProductModal" @add-to-cart='addToCart'></consumer-product>
    <VueLoading v-model:active="isLoading" :loader="'spinner'" :is-full-page="true">
      <div class="loadingio-spinner-ripple-wu44vrvts1">
        <div class="ldio-2gn8nvj94zp">
          <div></div>
          <div></div>
        </div>
      </div>
    </VueLoading>
  </div>
</template>

<script>

import ConsumerProduct from '@/components/ConsumerProduct.vue'
import ShowNotification from '@/mixin/Swal.js'
import { cartStore } from '@/store/Store.js'

const { VITE_API, VITE_PATH } = import.meta.env

export default {
  data () {
    return {
      cartStore: cartStore(),
      loadingStatus: {
        loadingItem: ''
      },
      products: [],
      product: {},
      isLoading: true
    }
  },
  methods: {
    async getProducts () {
      try {
        const productsInfo = await this.$http.get(`${VITE_API}/api/${VITE_PATH}/products`)
        this.products = productsInfo.data.products
        this.isLoading = false
      } catch (error) {
        console.log('error', error)
      }
    },
    async getProduct (id) {
      try {
        this.loadingStatus.loadingItem = id
        const productInfo = await this.$http.get(`${VITE_API}/api/${VITE_PATH}/product/${id}`)
        this.product = productInfo.data.product
        this.$refs.userProductModal.openModal()
      } catch (error) {
        console.log('error', error)
      } finally {
        this.loadingStatus.loadingItem = ''
      }
    },
    async addToCart (id, qty = 1) {
      this.loadingStatus.loadingItem = id
      const cart = {
        product_id: id,
        qty
      }
      try {
        await this.$http.post(`${VITE_API}/api/${VITE_PATH}/cart`, { data: cart })
        this.cartStore.getCart()
        ShowNotification('商品已加入購物車')
      } catch (error) {
        console.log('error', error)
      } finally {
        this.$refs.userProductModal.hideModal()
        this.loadingStatus.loadingItem = ''
      }
    }
  },
  mounted () {
    this.getProducts()
    this.cartStore.getCart()
  },
  components: {
    ConsumerProduct
  }
}
</script>
<style scoped>
.card {
  flex-basis: 23%;
}

.productImg {
  height: 280px;
  transition: all ease .3s;
}

.productImg:hover {
  cursor: pointer;
  scale: 1.1;
}

.vl-shown {
  overflow: hidden;
}

.vl-overlay {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  align-items: center;
  display: none;
  justify-content: center;
  overflow: hidden;
  z-index: 9999;
}

.vl-overlay.vl-active {
  display: flex;
}

.vl-overlay.vl-full-page {
  z-index: 9999;
  position: fixed;
}

.vl-overlay .vl-background {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  background: #fff;
  opacity: 0.5;
}

.vl-overlay .vl-icon,
.vl-parent {
  position: relative;
}

@keyframes ldio-2gn8nvj94zp {
  0% {
    top: 96px;
    left: 96px;
    width: 0;
    height: 0;
    opacity: 1;
  }

  100% {
    top: 18px;
    left: 18px;
    width: 156px;
    height: 156px;
    opacity: 0;
  }
}

.ldio-2gn8nvj94zp div {
  position: absolute;
  border-width: 4px;
  border-style: solid;
  opacity: 1;
  border-radius: 50%;
  animation: ldio-2gn8nvj94zp 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}

.ldio-2gn8nvj94zp div:nth-child(1) {
  border-color: #1d3f72
}

.ldio-2gn8nvj94zp div:nth-child(2) {
  border-color: #5699d2;
  animation-delay: -0.5s;
}

.loadingio-spinner-ripple-wu44vrvts1 {
  width: 200px;
  height: 200px;
  display: inline-block;
  overflow: hidden;
  /*  background 設定 none  */
  background: none;
}

.ldio-2gn8nvj94zp {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0;
  /* see note above */
}

.ldio-2gn8nvj94zp div {
  box-sizing: content-box;
}

/* generated by https://loading.io/ */</style>
