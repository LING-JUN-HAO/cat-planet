<template>
  <div ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
    <VForm ref="createProductForm" v-slot="{ errors }" class="modal-dialog modal-xl" @submit="updateTempProduct">
      <div class="modal-content border-0">
        <div class="modal-header bg-hex text-white">
          <h5 class="modal-title">
            <span v-if="isNew === true">新增優惠卷</span>
            <span v-else>編輯優惠卷</span>
          </h5>
          <button type="button" class="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-12">
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="title" class="form-label">標題</label>
                  <VField id="title" name="標題" type="text" :class="{ 'is-invalid': errors['標題'] }" class="form-control text-truncate" v-model="newTemProduct.title"
                    placeholder="請輸入標題" rules="required"></VField>
                    <ErrorMessage name="標題" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="mb-3 col-md-6">
                  <label for="code" class="form-label">識別碼</label>
                  <VField id="code" name="識別碼" type="text" :class="{ 'is-invalid': errors['識別碼'] }" class="form-control text-truncate" v-model="newTemProduct.code"
                    placeholder="請輸入識別碼" rules="required"></VField>
                  <ErrorMessage name="識別碼" class="invalid-feedback"></ErrorMessage>
                </div>
              </div>
              <div class="row">
                <div class="mb-3 col-md-4">
                  <label for="percent" class="form-label">折扣比例</label>
                  <VField id="percent" name="折扣比例" :class="{ 'is-invalid': errors['折扣比例'] }" type="number" min="1" max="99" class="form-control" v-model="newTemProduct.percent"
                    placeholder="請輸入折扣比例" rules="numeric|required"></VField>
                  <ErrorMessage name="折扣比例" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="mb-3 col-md-4">
                  <label for="due_date" class="form-label">到期日期</label>
                  <input id="due_date" type="date" class="form-control" v-model="due_date" placeholder="請輸入日期">
                </div>
                <div class="mb-3 col-md-4">
                  <label for="due_date" class="form-label">到期時間</label>
                  <input id="due_date" type="time" class="form-control" v-model="due_time" placeholder="請輸入日期">
                </div>
              </div>
              <div class="mb-3">
                <div class="form-check form-switch">
                  <input id="is_enabled" class="form-check-input" type="checkbox" :true-value="1" :false-value="0"
                    v-model="newTemProduct['is_enabled']">
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-primary text-white">
            確認
          </button>
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
        </div>
      </div>
    </VForm>
  </div>
</template>
<script>
import * as bootstrap from 'bootstrap'
import moment from 'moment'

export default {
  emits: ['update-temp-product'],
  props: ['tempProduct', 'isNew'],
  data () {
    return {
      productModal: null,
      newTemProduct: {},
      due_date: '',
      due_time: ''
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
      this.newTemProduct.due_date = moment(`${this.due_date} ${this.due_time}`).unix()
      this.newTemProduct.percent = parseInt(this.newTemProduct.percent)
      this.$emit('update-temp-product', this.newTemProduct)
    },
    dataFormatter (date, type) {
      if (type === 'date') {
        return moment.unix(date).format('YYYY-MM-DD')
      } else if (type === 'time') {
        return moment.unix(date).format('HH:mm')
      }
    }
  },
  watch: {
    tempProduct: function (newVal, oldVal) {
      this.newTemProduct = newVal
      this.due_date = this.dataFormatter(newVal.due_date, 'date')
      this.due_time = this.dataFormatter(newVal.due_date, 'time')
    }
  },
  mounted () {
    this.productModal = new bootstrap.Modal(this.$refs.productModal)
  }
}
</script>
