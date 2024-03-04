<template>
    <section class="container container-title pt-3 pb-6 category">
        <h2 data-aos="fade-up" data-aos-delay="0" data-aos-duration="900" class="text-center py-3 fw-bold">熱銷商品</h2>
        <div data-aos="fade-up" data-aos-delay="450" data-aos-duration="900" class="content-shadow border border-1 bg-white rounded-4 d-flex p-5 position-relative z-1">
            <div class="col-md-4 d-flex justify-content-center align-items-center flex-column">
                <h3 class="mb-4 hot-product-title fs-2 text-hex">店長五星級推薦商品!!!!</h3>
                <p class="fs-5">想為您的貓咪帶來不一樣的體驗嗎？</p>
                <p class="fs-5">快来看看我们店長為您推薦的新品吧！</p>
            </div>
            <div class="col-md-8">
                <SwiperComponent :products='products' class="w-100"></SwiperComponent>
            </div>
        </div>
    </section>
</template>

<script>
import SwiperComponent from '@/components/SwiperComponent.vue'
export default {
    props: ['products'],
    components: {
        SwiperComponent
    }
}
</script>
