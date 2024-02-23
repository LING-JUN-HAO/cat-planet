<template>
  <div ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-hex text-white">
          <h5 class="modal-title">
            <span>新增產品</span>
          </h5>
          <button type="button" class="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="imageUrl" class="form-label">主要圖片</label>
                <input v-model="newTemProduct.imageUrl" type="text" class="form-control text-truncate mb-2"
                  placeholder="請輸入圖片連結">
                <img class="w-100 object-fit-cover mainImg" :src="newTemProduct.imageUrl" alt="主要圖片">
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input id="title" type="text" class="form-control text-truncate" v-model="newTemProduct.title" placeholder="請輸入標題">
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <select id="category" class="form-select" v-model.number="newTemProduct.category" placeholder="請輸入分類">
                    <option v-for="i in options" :key="i + '123'" :value="i" selected >{{ i }}</option>
                  </select>
                </div>
                <div class="mb-3 col-md-6">
                  <label for="unit" class="form-label">單位</label>
                  <input id="unit" type="text" class="form-control" v-model="newTemProduct.unit" placeholder="請輸入單位">
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input id="origin_price" type="number" min="0" class="form-control" v-model="newTemProduct.origin_price"
                    placeholder="請輸入原價">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input id="price" type="number" min="0" class="form-control" v-model="newTemProduct.price"
                    placeholder="請輸入售價">
                </div>
              </div>
              <hr>

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea id="description" type="text" class="form-control" v-model="newTemProduct.description"
                  placeholder="請輸入產品描述"></textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea id="content" type="text" class="form-control" v-model="newTemProduct.content"
                  placeholder="請輸入說明內容"></textarea>
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
export default {
  emits: ['update-temp-product'],
  props: ['tempProduct', 'isNew'],
  data () {
    return {
      productModal: null,
      newTemProduct: {},
      options: ['貓咪玩具', '美容護理', '飲食用品', '貓咪床窩']
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
    // 在 tempProduct 屬性變化時執行
    tempProduct: function (newVal, oldVal) {
      this.newTemProduct = newVal
    }
  },
  mounted () {
    // eslint-disable-next-line no-undef
    this.productModal = new bootstrap.Modal(this.$refs.productModal)
  }
}
</script>
<style scoped>
.mainImg{
  height: 250px;
}
</style>
