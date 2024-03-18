<template>
  <div class="main-container bg-gray d-flex flex-column">
    <HeaderComponent></HeaderComponent>
    <main>
      <router-view></router-view>
    </main>
    <FooterComponent></FooterComponent>
  </div>
</template>
<script>
import HeaderComponent from '@/components/consumer/HeaderComponent.vue'
import FooterComponent from '@/components/consumer/FooterComponent.vue'

export default {
  components: {
    HeaderComponent, FooterComponent
  }
}
</script>
