<template>
  <div>
    <main class="bg-gray">
      <section class="container container-title py-3 category">
        <h2 class="text-center py-3 fw-bold">各項精美商品</h2>
        <div class="pt-3">
          <div class="row">
            <div class="col-3">
              <ul class="text-center">
                <li>
                  <router-link :to="{ path: '/consumer/products', query: { category: '所有產品', page: 1 } }" class="p-2"
                    :class="{ active: $route.query.category === '所有產品' || !$route.query.category }">
                    所有產品
                  </router-link>
                </li>
                <li>
                  <router-link :to="{ path: '/consumer/products', query: { category: '貓咪玩具', page: 1 } }" class="p-2"
                    :class="{ active: $route.query.category === '貓咪玩具' }">
                    貓咪玩具
                  </router-link>
                </li>
                <li>
                  <router-link :to="{ path: '/consumer/products', query: { category: '美容護理', page: 1 } }" class="p-2"
                    :class="{ active: $route.query.category === '美容護理' }">
                    美容護理
                  </router-link>
                </li>
                <li>
                  <router-link :to="{ path: '/consumer/products', query: { category: '飲食用品', page: 1 } }" class="p-2"
                    :class="{ active: $route.query.category === '飲食用品' }">
                    飲食用品
                  </router-link>
                </li>
                <li>
                  <router-link :to="{ path: '/consumer/products', query: { category: '貓咪床窩', page: 1 } }" class="p-2"
                    :class="{ active: $route.query.category === '貓咪床窩' }">
                    貓咪床窩
                  </router-link>
                </li>
              </ul>

            </div>
            <div class="col-9">
              <div class="row">
                <div v-for="item in products" :key="item.id" class="col-4 mb-4 text-center">
                  <div class="border border-1 border-hex pb-4 rounded-1">
                    <div class="overflow-hidden" @click="getProduct(item.id)">
                      <img :src="item.imageUrl" :alt="item.id" class="w-100 object-fit-cover productImg ">
                    </div>
                    <div class="container">
                      <h3 class="fs-5 fw-bold my-3">{{ item.title }}</h3>
                      <p>
                        <span class="fs-5">NT{{ item.price }}</span>
                        <span class="text-decoration-line-through ps-3 fs-6">原價: {{ item.origin_price }}</span>
                      </p>
                      <div class="btn-group w-100">
                        <button type="button" class="btn btn-outline-danger py-2" @click="getProduct(item.id)">
                          <i class="bi bi-heart-fill fs-4"></i>
                        </button>
                        <button type="button" class="btn btn-outline-hex py-2" @click="addToCart(item.id)"
                          :disabled="loadingStatus.loadingItem === item.id || !item.is_enabled">
                          <i class="fas fa-spinner fa-pulse" v-if="loadingStatus.loadingItem === item.id"></i>
                          <i class="bi bi-cart-fill fs-4"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <footer>
      <div class="footerContainer object-fit-cover position-relative" style="height: 400px;">
        <div style="width: 400px;" class="footerContent position-absolute top-50 translate-middle-y me-5">
          <h1 class="text-hex fs-2 fw-bold mb-3">訂閱獲取貓咪相關資訊</h1>
          <div class="d-flex">
            <input class="form-control text-truncate me-2" type="email" placeholder="Enter Your Email">
            <button class="btn btn-primary text-white p-3 fs-6">Subscribe</button>
          </div>
        </div>
      </div>
    </footer>
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
    async getProducts (category, page = 1) {
      try {
        let productsInfo
        if (category === '所有產品') {
          productsInfo = await this.$http.get(`${VITE_API}/api/${VITE_PATH}/products?page=${page}`)
        } else {
          productsInfo = await this.$http.get(`${VITE_API}/api/${VITE_PATH}/products?category=${category}&page=${page}`)
        }
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
    const query = this.$route.query
    const { category, page } = query
    this.getProducts(category, page)
    this.cartStore.getCart()
  },
  watch: {
    '$route.query': function (newVal, oldVal) {
      const query = this.$route.query
      const { category, page } = query
      this.getProducts(category, page)
    }
  },
  components: {
    ConsumerProduct
  }
}
</script>
<style lang="scss" scoped>
.content-shadow {
  box-shadow: 0 0 30px #ccc;
}

// banner
.bannerContainer {
  height: 100vh;
  background-image: url('../../assets/image/image.png');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  // background-attachment: fixed
}

.footerContainer {
  background-image: url('../../assets/image/footer.png');
  background-position: bottom;
  background-size: cover;
  background-repeat: no-repeat;
}

.footerContent,
.bannerContent {
  max-width: 400px;
  right: 0;
}

.bannerContent p {
  background-color: rgba($color: #000000, $alpha: .3);
}

.bannerContent h1 {
  cursor: pointer;
  transition: all .5s ease;
}

.bannerContent h1:hover {
  color: rgba($color: #000000, $alpha: .5);
  background-color: rgba($color: white, $alpha: .5);
}

.category .category-item {
  cursor: pointer;
  transition: all .3s ease;
}

.category .category-item:hover {
  transform: scale(1.1);
}

.category .category-item img {
  height: 7em;
  width: 7em;
}

.container-title>h2 {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #6c5c53;
}

.container-title>h2::before,
.container-title>h2::after {
  content: '';
  height: 5px;
  width: 40px;
  background-color: #6c5c53;
}

.container-title>h2::before {
  margin-right: 10px;
}

.container-title>h2::after {
  margin-left: 10px;
}

.introductionContainer-item {
  flex: 1;
}

.introduction-img {
  height: 100%;
  border-radius: 0px 1rem 1rem 0px;
}

.productImg {
  height: 250px;
  transition: all ease .3s;
}

.productImg:hover {
  cursor: pointer;
  scale: 1.1;
}

.hot-product-title::after,
.hot-product-title::before {
  content: "";
  position: absolute;
  height: 150px;
  width: 150px;
  border: 20px solid #F1b444;
  top: 0;
  left: 0;
  opacity: .8;
  z-index: -1;
}

.hot-product-title::before {
  transform: rotate(15deg) translate(-20%, -20%);
}

.hot-product-title::after {
  transform: rotate(25deg) translate(-20%, -20%);
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

/* generated by https://loading.io/ */
</style>
