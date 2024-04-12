<template>
  <swiper :spaceBetween="10" :thumbs="{ swiper: thumbsSwiper }" :modules="modules" class="main-swiperThumb-container">
    <template v-for="(item, index) in product.imagesUrl" :key="index + '123'">
      <swiper-slide>
        <img :src="item" alt="">
      </swiper-slide>
    </template>
  </swiper>
  <swiper @swiper="setThumbsSwiper" :spaceBetween="10" :slidesPerView="4" :freeMode="false" :watchSlidesProgress="true"
    :modules="modules" class="preview-swiperThumb-container swiper-childre py-2">
    <template v-for="(item, index) in product.imagesUrl" :key="index + '123'">
      <swiper-slide>
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
      modules: [FreeMode, Thumbs]
    }
  },
  methods: {
    setThumbsSwiper (swiper) {
      this.thumbsSwiper = swiper
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
  height: 80%;
}

.preview-swiperThumb-container {
  height: 20%;

  .swiper-slide {
    opacity: 0.4;
  }

  .swiper-slide-thumb-active {
    opacity: 1;
  }
}
</style>
