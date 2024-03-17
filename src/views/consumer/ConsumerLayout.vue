<template>
  <div class="main-container bg-gray d-flex flex-column">
    <ConsumerHeader></ConsumerHeader>
    <main>
      <router-view></router-view>
    </main>
    <ConsumerFooter></ConsumerFooter>
  </div>
</template>
<script>
import ConsumerHeader from '@/components/ConsumerHeader.vue'
import ConsumerFooter from '@/components/ConsumerFooter.vue'

export default {
  components: {
    ConsumerHeader, ConsumerFooter
  }
}
</script>
