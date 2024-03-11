<template>
  <section>
    <div class="banner-container object-fit-cover position-relative">
      <div class="banner-content text-white fw-normal position-absolute top-50 left-50 translate-middle-y lh-lg me-5">
        <p class="fs-5 fs-md-2 mt-2 rounded-5 p-4">
          探索貓咪的奇幻天地!專注呵護您家中的小貓貓,我們提供精選的貓咪用品,從玩耍到美容,滿足每一隻貓咪的需求。讓您的毛小孩擁有尊榮的生活,點擊探索貓咪的專屬天堂! 🐾🐾🐾🐾🐾🐾
        </p>
        <router-link :to="{ path: '/consumer/products', query: { category: '所有產品', page: 1 } }"
          class="text-center fw-bold fs-3 border border-2 border-white rounded-5 d-block text-decoration-none">
          開始探索
        </router-link>
      </div>
    </div>
  </section>
</template>
