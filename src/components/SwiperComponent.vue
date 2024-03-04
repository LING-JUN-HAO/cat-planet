<template>
  <div class="container">
    <div class="swiper">
      <div class="swiper-wrapper">
        <template v-for="(item, index) in products" :key="index + '123'">
          <div class="swiper-slide">
            <div class="w-100 swiper-img" :style="{ backgroundImage: `url(${item.imageUrl})` }"
              @click="moreProduct(item.id)"></div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'

export default {
  props: ['products'],
  data () {
    return {
      swiperInitialized: false
    }
  },
  methods: {
    initSwiper () {
      // eslint-disable-next-line no-new
      new Swiper('.swiper', {
        modules: [Autoplay, Navigation, Pagination],
        // Optional parameters
        loop: true,
        slidesPerView: 3,
        spaceBetween: 20,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        }
      })
    },
    moreProduct (id) {
      this.$router.push({ path: '/consumer/productItem', query: { 'productID': id } })
    }

  },
  watch: {
    // 在 tempProduct 屬性變化時執行
    products: function (newVal, oldVal) {
      this.initSwiper()
    }
  }
}
</script>

<style>
.swiper-img {
  height: 250px;
  background-size: cover;
  background-position: center center;
  transition: all .4s ease;
  cursor: pointer;
}

.swiper-img:hover {
  transform: scale(1.03) translateY(-10px);
  box-shadow: 4px 1px 10px #555;
}
</style>
