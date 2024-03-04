<template>
  <div>
    <ConsumerHeader></ConsumerHeader>
    <router-view></router-view>
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
