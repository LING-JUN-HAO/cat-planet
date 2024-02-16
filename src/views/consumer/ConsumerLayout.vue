<template>
  <div>
    <consumer-header></consumer-header>
    <router-view></router-view>
  </div>
</template>
<script>
import ConsumerHeader from '@/components/ConsumerHeader.vue'

export default {
  components: {
    ConsumerHeader
  }
}
</script>
