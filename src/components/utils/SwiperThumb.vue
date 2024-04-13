<template>
  <swiper :spaceBetween="10" :thumbs="{ swiper: thumbsSwiper }" :modules="modules" class="main-swiperThumb-container"
    :class="{ 'full': !isThumbDisplay }">
    <template v-for="(item, index) in productImages" :key="index + '123'">
      <swiper-slide>
        <img :src="item" alt="">
      </swiper-slide>
    </template>
  </swiper>
  <swiper v-if="isThumbDisplay" @swiper="setThumbsSwiper" :spaceBetween="10" :slidesPerView="4" :freeMode="false"
    :watchSlidesProgress="true" :modules="modules" class="preview-swiperThumb-container swiper-childre py-2">
    <template v-for="(item, index) in productImages" :key="index + '123'">
      <swiper-slide :class="{ 'hidden': item === product.imageUrl }">
        <img :src="item" alt="">
      </swiper-slide>
    </template>
  </swiper>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/thumbs'
import { FreeMode, Thumbs } from 'swiper/modules'

export default {
  props: ['product'],
  data () {
    return {
      thumbsSwiper: null,
      productImages: [],
      isThumbDisplay: true,
      modules: [FreeMode, Thumbs]
    }
  },
  methods: {
    setThumbsSwiper (swiper) {
      this.thumbsSwiper = swiper
    }
  },
  watch: {
    product: function (newVal, oldVal) {
      if (this.product.imagesUrl === undefined || this.product.imagesUrl.length === 0) {
        this.productImages = [this.product.imageUrl]
        this.isThumbDisplay = false
      } else {
        this.productImages = this.product.imagesUrl
        this.isThumbDisplay = true
      }
    }
  },
  components: {
    Swiper,
    SwiperSlide
  }
}
</script>

<style scoped>
.main-swiperThumb-container {
  height: 75%;
}

.full {
  height: 100%;
}

.preview-swiperThumb-container {
  height: 25%;

  .swiper-slide {
    opacity: 0.4;
  }

  /* .hidden {
    opacity: 1;
  } */

  .swiper-slide-thumb-active {
    opacity: 1;
  }
}
</style>
