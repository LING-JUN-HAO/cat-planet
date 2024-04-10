<template>
  <a href="#" class="scrollTopContainer position-fixed bg-primary rounded-3 text-center d-flex align-items-center justify-content-center"
    :class="scrollYValue < 20 ? 'd-none' : ''" @click.prevent="scrollTop">
    <i class="bi bi-arrow-up-circle text-white"></i>
  </a>
</template>

<script>
export default {
  data () {
    return {
      scrollYValue: ''
    }
  },
  methods: {
    scrollTop () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    scrollWatch () {
      this.scrollYValue = window.scrollY
    }
  },
  mounted () {
    window.addEventListener('scroll', this.scrollWatch)
  }
}
</script>
