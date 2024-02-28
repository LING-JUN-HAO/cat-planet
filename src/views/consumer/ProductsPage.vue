<template>
  <div>
    <section>
      <div class="bannerContainer object-fit-cover position-relative">
        <div class="bannerContent text-white fw-normal position-absolute top-50 left-50 translate-middle-y lh-lg me-5">
          <p class="fs-5 mt-2 rounded-5 p-4">
            探索貓咪的奇幻天地!專注呵護您家中的小貓貓,我們提供精選的貓咪用品,從玩耍到美容,滿足每一隻貓咪的需求。讓您的毛小孩擁有尊榮的生活,點擊探索貓咪的專屬天堂! 🐾🐾🐾🐾🐾🐾
          </p>
          <h1 class="text-center fw-bold fs-3 border border-2 border-white rounded-5 p-2">開始探索</h1>
        </div>
      </div>
    </section>
    <main class="bg-gray">
      <section class="container container-title py-3 category">
        <h2 class="text-center py-3 fw-bold">商品分類</h2>
        <div class="content-shadow border border-1 bg-white rounded-4 d-flex p-5">
          <div class="category-item flex-grow-1 d-flex justify-content-center align-items-center flex-column">
            <img src="../../assets/image/toys.svg" alt="貓咪玩具">
            <h3 class="fw-normal lh-lg">貓咪玩具</h3>
          </div>
          <div class="category-item flex-grow-1 d-flex justify-content-center align-items-center flex-column">
            <img src="../../assets/image/care.svg" alt="美容護理">
            <h3 class="fw-normal lh-lg">美容護理</h3>
          </div>
          <div class="category-item flex-grow-1 d-flex justify-content-center align-items-center flex-column">
            <img src="../../assets/image/restaurant.svg" alt="飲食用品">
            <h3 class="fw-normal lh-lg">飲食用品</h3>
          </div>
          <div class="category-item flex-grow-1 d-flex justify-content-center align-items-center flex-column">
            <img src="../../assets/image/chair.svg" alt="貓咪床窩">
            <h3 class="fw-normal lh-lg">貓咪床窩</h3>
          </div>
        </div>
      </section>
      <section class="container container-title py-3">
        <h2 class="text-center py-3 fw-bold">關於貓星球</h2>
        <div class="content-shadow border border-1 bg-white rounded-4 d-flex">
          <div class="introductionContainer-item d-flex justify-content-center align-items-center flex-column p-6">
            <h2 class="mb-4 fs-2">貓咪王國：愛與冒險的天地</h2>
            <p class="lh-lg fs-5 fw-normal">
              歡迎蒞臨喵星球，這是一個專屬於主人和貓咪的小天地！在這裡，我們帶您深入了解與毛絨絨夥伴共度的點滴時光。從貓咪的搞笑瞬間到我們的互動冒險，喵星球是一個充滿愛和貓咪魅力的空間。
            </p>
            <p class="lh-lg fs-5 fw-normal">
              在喵星球，我們不僅提供優質的產品，還擁有專業的客服團隊，隨時準備為您提供幫助和解答您的疑問。我們致力於讓您的購物體驗愉快而輕鬆，並與您一起創造更多美好的回憶。
            </p>
          </div>
          <div class="introductionContainer-item">
            <img class="object-fit-cover w-100 introduction-img"
              src="https://images.unsplash.com/photo-1494256997604-768d1f608cac?q=80&w=3029&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="">
          </div>
        </div>
      </section>
      <!-- <div class="container">
        <div class="row mt-4 d-flex justify-content-end gap-3">
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
      </div> -->
      <section class="container container-title pt-3 pb-6 category">
        <h2 class="text-center py-3 fw-bold">熱銷商品</h2>
        <div class="content-shadow row border border-1 bg-white rounded-4 d-flex p-5 container position-relative z-1">
          <div class="col-md-4 d-flex justify-content-center align-items-center flex-column">
            <h3 class="mb-4 hot-product-title">店長五星級推薦商品!!!!</h3>
            <p class="fs-6">想為您的貓咪帶來不一樣的體驗嗎？</p>
            <p>快来看看我们店長為您推薦的新品吧！</p>
          </div>
          <!-- <SwiperComponent :products='products' class="w-100"></SwiperComponent> -->
          <div class="col-md-8">
            <SwiperComponent :products='products' class="w-100"></SwiperComponent>
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
import SwiperComponent from '@/components/SwiperComponent.vue'
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
    ConsumerProduct, SwiperComponent
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
.hot-product-title::before{
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
.hot-product-title::before{
  transform: rotate(15deg) translate(-20%, -20%);
}
.hot-product-title::after{
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
