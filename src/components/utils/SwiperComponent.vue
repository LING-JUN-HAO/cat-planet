<template>
  <div class="container">
    <div class="swiper">
      <div class="swiper-wrapper">
        <template v-for="(item, index) in products" :key="index + '123'">
          <div class="swiper-slide position-relative" @click="moreProduct(item.id)">
            <div class="w-100 swiper-img" :style="{ backgroundImage: `url(${item.imageUrl})` }">
            </div>
            <a class="more position-absolute w-100 bottom-0 text-white text-center bg-hex p-3 text-decoration-none">
              顯示更多
            </a>
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
      this.$nextTick(() => {
        // eslint-disable-next-line no-new
        new Swiper('.swiper', {
          modules: [Autoplay, Navigation, Pagination],
          loop: true,
          slidesPerView: 1,
          spaceBetween: 20,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false
          },
          breakpoints: {
            992: {
              slidesPerView: 3
            },
            768: {
              slidesPerView: 2
            },
            576: {
              slidesPerView: 1
            }
          }
        })
      })
    },
    moreProduct (id) {
      this.$router.push({ path: '/consumer/productItem', query: { productID: id } })
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
}

.swiper-img,
.more {
  transition: all .5s ease;
  cursor: pointer;
}

.swiper-slide:hover .swiper-img {
  transform: scale(1.03);
  box-shadow: 4px 1px 10px #555;
  opacity: .7;
}

.swiper-slide .more {
  opacity: 0;
}

.swiper-slide:hover .active,
.swiper-slide:hover .more {
  opacity: 1;
  transform: scale(1.03);
}
</style>
