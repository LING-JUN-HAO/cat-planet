<template>
    <section class="container container-title category mb-6">
        <h2 data-aos="fade-down" data-aos-delay="0" data-aos-duration="900" class="text-center py-6 m-0 fw-bold">貓奴必備
        </h2>
        <div data-aos="fade-up" data-aos-delay="450" data-aos-duration="900"
            class="content-shadow border border-1 bg-white rounded-4 d-flex p-4 p-md-6 position-relative z-1 flex-column flex-md-row ">
            <div class="col-md-4">
                <div class="d-flex justify-content-center align-items-center flex-column pe-2">
                    <h3 class="mb-4 hot-product-title fs-2 text-hex">店長五星級推薦商品!!!!</h3>
                    <p class="fs-5">想為您的貓咪帶來不一樣的體驗嗎？</p>
                    <p class="fs-5">快来看看我们店長為您推薦的新品吧！</p>
                </div>
            </div>
            <div class="col-md-8">
                <SwiperThumb :products='products'></SwiperThumb>
            </div>
        </div>
    </section>
</template>

<script>
import SwiperThumb from '@/components/utils/SwiperThumb.vue'
export default {
  props: ['products'],
  components: {
    SwiperThumb
  }
}
</script>
