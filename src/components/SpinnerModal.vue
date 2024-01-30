<template>
  <div ref="spinnerModal" class="modal fade spinnerModal" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered d-flex align-items-center justify-content-center text-white">
      <div class="text-center">
        <div class="spinner-border" role="status">
          <span class="sr-only"></span>
        </div>
        <div>{{ loadingMessage }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['loadingMessage'],
  data () {
    return {
      spinnerModal: null
    }
  },
  methods: {
    openModal () {
      this.spinnerModal.show()
    },
    closeModal () {
      this.spinnerModal.hide()
    }
  },
  mounted () {
    // eslint-disable-next-line no-undef
    this.spinnerModal = new bootstrap.Modal(this.$refs.spinnerModal)
  }
}
</script>
<style scoped>
.spinnerModal .modal-dialog {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100% - 56px);
}
</style>
