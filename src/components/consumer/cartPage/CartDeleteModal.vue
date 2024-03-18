<template>
  <div ref="delCartModal" class="modal fade" tabindex="-1" aria-labelledby="delCartModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delCartModalLabel" class="modal-title">
            <span>清空購物車</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          清空購物車刪除後將無法恢復
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="deleteAllCarts">
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['deleteAllCarts'],
  data () {
    return {
      delCartModal: null
    }
  },
  methods: {
    openModal () {
      this.delCartModal.show()
    },
    closeModal () {
      this.delCartModal.hide()
    }
  },
  mounted () {
    // eslint-disable-next-line no-undef
    this.delCartModal = new bootstrap.Modal(this.$refs.delCartModal)
  }
}
</script>
