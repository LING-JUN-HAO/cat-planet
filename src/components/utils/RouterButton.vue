<template>
  <div class="pb-6 text-center button-container">
    <button class="btn btn-primary rounded-3 py-2 px-5 text-white" type="button" @click="routerChange()">
      <span v-if="arrowIcon === 'left'">
        <i class="bi bi-caret-left-fill ps-1"></i>
        {{ display }}
      </span>
      <span v-else>
        {{ display }}
        <i class="bi bi-caret-right-fill ps-1"></i>
      </span>
    </button>
  </div>
</template>

<script>
export default {
  props: ['arrowIcon', 'display', 'routerName', 'query'],
  methods: {
    routerChange () {
      this.$router.push({ name: this.routerName, query: this.query })
    }
  }
}
</script>
