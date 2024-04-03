<template>
  <div class="main-container bg-gray d-flex flex-column">
    <HeaderComponent></HeaderComponent>
    <main>
      <RouterView />
    </main>
    <FooterComponent></FooterComponent>
  </div>
</template>
<script>
import { RouterView } from 'vue-router'
import HeaderComponent from '@/components/consumer/HeaderComponent.vue'
import FooterComponent from '@/components/consumer/FooterComponent.vue'

export default {
  components: {
    RouterView, HeaderComponent, FooterComponent
  }
}
</script>
