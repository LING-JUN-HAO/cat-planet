<template>
    <div class="container">
        <swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="20"
        :autoplay="{
        delay: 3000,
        disableOnInteraction: true
        }"
        >
        <template v-for="(item, index) in products" :key="index + '123'">
            <swiper-slide>
                <div class="swiper-slide position-relative" @click="moreProduct(item.id)">
                    <div class="w-100 swiper-img" :style="{ backgroundImage: `url(${item.imageUrl})` }">
                </div>
                <a class="more position-absolute w-100 bottom-0 text-white text-center bg-hex p-3 text-decoration-none">
                    顯示更多
                </a>
                </div>
            </swiper-slide>
            
        </template>
        </swiper>
    </div>
</template>

<script>
// import Swiper core and required modules
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// Import Swiper styles
export default {
    props: ['products'],
    data () {
        return {
            modules: [Autoplay],
            swiperOption: {
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
        }
    },
    methods: {
        moreProduct (id) {
            this.$router.push({ path: '/consumer/productItem', query: { productID: id } })
        }
    },
    components: {
        Swiper,
        SwiperSlide
    },
};
</script>