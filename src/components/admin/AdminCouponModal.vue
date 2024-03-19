<template>
  <div ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
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
                  <input id="title" type="text" class="form-control text-truncate" v-model="newTemProduct.title"
                    placeholder="請輸入標題">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="code" class="form-label">識別碼</label>
                  <input id="code" type="text" class="form-control text-truncate" v-model="newTemProduct.code"
                    placeholder="請輸入識別碼">
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-4">
                  <label for="percent" class="form-label">折扣比例</label>
                  <input id="percent" type="number" min="1" max="99" class="form-control" v-model="newTemProduct.percent"
                    placeholder="請輸入折扣比例">
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
    // 在 tempProduct 屬性變化時執行
    tempProduct: function (newVal, oldVal) {
      this.newTemProduct = newVal
      this.due_date = this.dataFormatter(newVal.due_date, 'date')
      this.due_time = this.dataFormatter(newVal.due_date, 'time')
    }
  },
  mounted () {
    // eslint-disable-next-line no-undef
    this.productModal = new bootstrap.Modal(this.$refs.productModal)
  }
}
</script>
