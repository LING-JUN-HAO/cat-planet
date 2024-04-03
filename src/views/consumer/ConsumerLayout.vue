<template>
  <div class="main-container bg-gray d-flex flex-column">
    <HeaderComponent></HeaderComponent>
    <main>
      <RouterView />
      <ScrollTop />
    </main>
    <FooterComponent></FooterComponent>
  </div>
</template>
<script>
import { RouterView } from 'vue-router'
import HeaderComponent from '@/components/consumer/HeaderComponent.vue'
import FooterComponent from '@/components/consumer/FooterComponent.vue'
import ScrollTop from '@/components/utils/ScrollTop.vue'

export default {
  components: {
    RouterView, HeaderComponent, FooterComponent, ScrollTop
  }
}
</script>
