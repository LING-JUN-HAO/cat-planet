<template>
  <section class="category container container-title py-3">
    <h2 data-aos="fade-down" data-aos-delay="0" data-aos-duration="900" class="text-center py-3 fw-bold">商品分類</h2>
    <ul data-aos="fade-up" data-aos-delay="450" data-aos-duration="900"
      class="content-shadow border border-1 bg-white rounded-4 p-5 row m-0">
      <li v-for="( categoryItem, index ) in category" :key="index + '123'" class="category-item col-xs-12 col-sm-6 col-md-6 col-lg-3 ">
        <router-link :to="{ path: '/consumer/products', query: { category: '貓咪玩具', page: 1 } }"
          class="text-decoration-none  d-flex justify-content-center align-items-center flex-column">
          <img :src=" `/Vue-week1/src/assets/image/${categoryItem.img}`" :alt="categoryItem.name">
          <h3 class="fw-normal lh-lg text-black text-center">{{ categoryItem.name }}</h3>
        </router-link>
      </li>
    </ul>
  </section>
</template>
<script>
export default {
  data () {
    return {
      category: [
        { name: '貓咪玩具', img: 'category-toys.svg' },
        { name: '美容護理', img: 'category-care.svg' },
        { name: '飲食用品', img: 'category-restaurant.svg' },
        { name: '貓咪床窩', img: 'category-chair.svg' }
      ]
    }
  }
}
</script>
