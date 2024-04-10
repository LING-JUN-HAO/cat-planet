<template>
  <section class="category container container-title">
    <h2 data-aos="fade-down" data-aos-delay="0" data-aos-duration="900" class="text-center py-6 m-0 fw-bold">貓咪寶藏</h2>
    <ul data-aos="fade-up" data-aos-delay="450" data-aos-duration="900"
      class="content-shadow border border-1 bg-white rounded-4 p-4 p-md-6 row m-0">
      <li class="category-item col-xs-12 col-sm-6 col-md-6 col-lg-3 py-3 py-md-0">
        <router-link :to="{ path: '/consumer/products', query: { category: '貓咪玩具', page: 1 } }"
          class="text-decoration-none  d-flex justify-content-center align-items-center flex-column">
          <img src="@/assets/image/category-toys.jpeg" class="rounded-4 p-2"  alt="貓咪玩具">
          <h3 class="fw-normal lh-lg text-black text-center">貓爪樂園</h3>
        </router-link>
      </li>
      <li class="category-item col-xs-12 col-sm-6 col-md-6 col-lg-3 pb-3 pb-md-0">
        <router-link :to="{ path: '/consumer/products', query: { category: '美容護理', page: 1 } }"
          class="text-decoration-none  d-flex justify-content-center align-items-center flex-column">
          <img src="@/assets/image/category-care.jpeg" class="rounded-4 p-2" alt="美容護理">
          <h3 class="fw-normal lh-lg text-black text-center">貓咪SPA</h3>
        </router-link>
      </li>
      <li class="category-item col-xs-12 col-sm-6 col-md-6 col-lg-3 pb-3 pb-md-0">
        <router-link :to="{ path: '/consumer/products', query: { category: '飲食用品', page: 1 } }"
          class="text-decoration-none  d-flex justify-content-center align-items-center flex-column">
          <img src="@/assets/image/category-restaurant.jpeg" class="rounded-4 p-2" alt="飲食用品">
          <h3 class="fw-normal lh-lg text-black text-center">美味餐時</h3>
        </router-link>
      </li>
      <li class="category-item col-xs-12 col-sm-6 col-md-6 col-lg-3 pb-3 pb-md-0">
        <router-link :to="{ path: '/consumer/products', query: { category: '貓咪床窩', page: 1 } }"
          class="text-decoration-none  d-flex justify-content-center align-items-center flex-column">
          <img src="@/assets/image/category-chair.jpeg" class="rounded-4 p-2" alt="貓咪床窩">
          <h3 class="fw-normal lh-lg text-black text-center">夢幻貓窩</h3>
        </router-link>
      </li>
    </ul>
  </section>
</template>
