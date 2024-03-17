<template>
  <section class="category container container-title py-3">
    <h2 data-aos="fade-down" data-aos-delay="0" data-aos-duration="900" class="text-center py-3 fw-bold">商品分類</h2>
    <ul data-aos="fade-up" data-aos-delay="450" data-aos-duration="900"
      class="content-shadow border border-1 bg-white rounded-4 p-5 row m-0">
      <li class="category-item col-xs-12 col-sm-6 col-md-6 col-lg-3 ">
        <router-link :to="{ path: '/consumer/products', query: { category: '貓咪玩具', page: 1 } }"
          class="text-decoration-none  d-flex justify-content-center align-items-center flex-column">
          <img src="@/assets/image/category-toys.svg" alt="貓咪玩具">
          <h3 class="fw-normal lh-lg text-black text-center">貓咪玩具</h3>
        </router-link>
      </li>
      <li class="category-item col-xs-12 col-sm-6 col-md-6 col-lg-3 ">
        <router-link :to="{ path: '/consumer/products', query: { category: '美容護理', page: 1 } }"
          class="text-decoration-none  d-flex justify-content-center align-items-center flex-column">
          <img src="@/assets/image/category-care.svg" alt="美容護理">
          <h3 class="fw-normal lh-lg text-black text-center">美容護理</h3>
        </router-link>
      </li>
      <li class="category-item col-xs-12 col-sm-6 col-md-6 col-lg-3 ">
        <router-link :to="{ path: '/consumer/products', query: { category: '飲食用品', page: 1 } }"
          class="text-decoration-none  d-flex justify-content-center align-items-center flex-column">
          <img src="@/assets/image/category-restaurant.svg" alt="飲食用品">
          <h3 class="fw-normal lh-lg text-black text-center">飲食用品</h3>
        </router-link>
      </li>
      <li class="category-item col-xs-12 col-sm-6 col-md-6 col-lg-3 ">
        <router-link :to="{ path: '/consumer/products', query: { category: '貓咪床窩', page: 1 } }"
          class="text-decoration-none  d-flex justify-content-center align-items-center flex-column">
          <img src="@/assets/image/category-chair.svg" alt="貓咪床窩">
          <h3 class="fw-normal lh-lg text-black text-center">貓咪床窩</h3>
        </router-link>
      </li>
    </ul>
  </section>
</template>
