<template>
  <div class="container">
    <div class="swiper">
      <div class="swiper-wrapper">
        <template v-for="(item, index) in products" :key="index + '123'">
          <div class="swiper-slide">
            <div class="w-100 swiper-img" :style="{ backgroundImage: `url(${item.imageUrl})` }"></div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
// core version + navigation, pagination modules:
import Swiper from 'swiper'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
// import Swiper and modules styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default {
  props: ['products'],
  mounted () {
    // eslint-disable-next-line no-new
    new Swiper('.swiper', {
      modules: [Autoplay, Navigation, Pagination],
      // Optional parameters
      loop: true,
      slidesPerView: '3',
      spaceBetween: 20,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      }
    })
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
.swiper-img:hover{
  transform: scale(1.03) translateY(-10px);
  box-shadow: 4px 1px 10px #555;
}
</style>
