<template>
  <div ref="productModal" class="modal fade ModalContainer" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-hex text-white">
          <h5 class="modal-title">
            <span>編輯訂單</span>
          </h5>
          <button type="button" class="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-12">
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="name" class="form-label">姓名</label>
                  <input id="name" type="text" class="form-control text-truncate" v-model="newTemProduct.user.name"
                    placeholder="請輸入姓名">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="tel" class="form-label">電話</label>
                  <input id="tel" type="text" class="form-control text-truncate" v-model="newTemProduct.user.tel"
                    placeholder="請輸入電話">
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="email" class="form-label"> 信箱</label>
                  <input id="email" type="text" min="1" max="99" class="form-control"
                    v-model="newTemProduct.user.email" placeholder="請輸入信箱">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="address" class="form-label">住址</label>
                  <input id="address" type="text" class="form-control" v-model="newTemProduct.user.address" placeholder="請輸入地址">
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-12">
                  <label for="email" class="form-label">備註</label>
                  <textarea id="message" type="text" class="form-control" v-model="newTemProduct.message"
                  placeholder="請輸入訂單備註"></textarea>
                </div>
              </div>

              <div class="mb-3">
                <div class="form-check form-switch">
                  <input id="is_enabled" class="form-check-input" type="checkbox" :true-value="true" :false-value="false"
                    v-model="newTemProduct['is_paid']">
                  <label class="form-check-label" for="is_enabled">是否付款</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary text-white " @click="updateTempProduct">
            確認
          </button>
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  emits: ['update-temp-product'],
  props: ['tempProduct', 'isNew'],
  data () {
    return {
      productModal: null,
      newTemProduct: {
        user: {
          name: '',
          email: '',
          address: '',
          message: ''
        }
      }
    }
  },
  methods: {
    openModal () {
      this.productModal.show()
    },
    closeModal () {
      this.productModal.hide()
    },
    updateTempProduct () {
      this.$emit('update-temp-product', this.newTemProduct)
    }
  },
  watch: {
    tempProduct: function (newVal, oldVal) {
      this.newTemProduct = newVal
    }
  },
  mounted () {
    this.productModal = new bootstrap.Modal(this.$refs.productModal)
  }
}
</script>
