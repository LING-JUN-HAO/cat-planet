<template>
    <swiper :spaceBetween="10" :thumbs="{ swiper: thumbsSwiper }" :modules="modules" class="mySwiper2">
        <template v-for="(item, index) in products" :key="index + '123'">
            <swiper-slide>
                <img :src="item.imageUrl" alt="">
            </swiper-slide>
        </template>
    </swiper>
    <swiper @swiper="setThumbsSwiper" :spaceBetween="10" :slidesPerView="4" :freeMode="false" :watchSlidesProgress="true"
        :modules="modules" class="mySwiper">
        <template v-for="(item, index) in products" :key="index + '123'">
            <swiper-slide>
                <img :src="item.imageUrl" alt="">
            </swiper-slide>
        </template>
    </swiper>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import { FreeMode, Thumbs } from 'swiper/modules';

export default {
    props: ['products'],
    data () {
        return {
            thumbsSwiper: null,
            modules: [FreeMode, Thumbs],
        }
    },
    methods: {
        setThumbsSwiper (swiper) {
            this.thumbsSwiper = swiper;
        }
    },
    components: {
        Swiper,
        SwiperSlide,
    },
};
</script>

<style scoped>
.swiper {
    width: 100%;
    height: 300px;
    margin-left: auto;
    margin-right: auto;
}

.swiper-slide {
    background-size: cover;
    background-position: center;
}

.mySwiper2 {
    height: 80%;
    width: 100%;
}

.mySwiper {
    height: 20%;
    box-sizing: border-box;
    padding: 10px 0;
}

.mySwiper .swiper-slide {
    width: 25%;
    height: 100%;
    opacity: 0.4;
}

.mySwiper .swiper-slide-thumb-active {
    opacity: 1;
}

.swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>