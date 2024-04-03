<template>
  <div ref="productModal" class="modal fade ModalContainer" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <VForm ref="createProductForm" v-slot="{ errors }" class="modal-content border-0" @submit="updateTempProduct">
        <div class="modal-header bg-hex text-white">
          <h5 class="modal-title">
            <span v-if="isNew === true">新增產品</span>
            <span v-else>編輯產品</span>
          </h5>
          <button type="button" class="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4 d-flex flex-column">
              <div class="flexItem mb-3">
                <label for="imageUrl" class="form-label">主要圖片</label>
                <input v-model="newTemProduct.imageUrl" type="text" class="form-control text-truncate mb-2"
                  placeholder="請輸入圖片連結">
                <img class="w-100 object-fit-cover mainImg" :src="newTemProduct.imageUrl" alt="主要圖片">
              </div>
              <label class="d-flex justify-content-center align-items-center flexItem uploadContainer">
                <div v-if="uploadStatus === true" class="d-flex justify-content-center align-items-center flex-column">
                  <i class="bi bi-card-image fs-1"></i>
                  <div class="fw-normal">照片上傳中...請稍後</div>
                </div>
                <div v-else class="d-flex justify-content-center align-items-center flex-column">
                  <input type="file" @change="handleFileUpload" @click="this.$refs.inputFile.value = null"
                    ref="inputFile" accept="image/*" style="display: none">
                  <i class="bi bi-upload fs-1"></i>
                  <div class="fw-normal">上傳圖片</div>
                  <span class="text-center">(檔案大小限制3MB以下)</span>
                </div>
              </label>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <VField id="title" name="標題" type="text" class="form-control text-truncate" :class="{ 'is-invalid': errors['標題'] }" v-model="newTemProduct.title" placeholder="請輸入標題"
                  rules="required"></VField>
                <ErrorMessage name="標題" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <select id="category" class="form-select" v-model.number="newTemProduct.category" placeholder="請輸入分類">
                    <option v-for="i in options" :key="i + '123'" :value="i" selected>{{ i }}</option>
                  </select>
                </div>
                <div class="mb-3 col-md-6">
                  <label for="unit" class="form-label">單位</label>
                  <VField id="unit" name="單位" type="text" class="form-control" v-model="newTemProduct.unit"
                    placeholder="請輸入單位" :class="{ 'is-invalid': errors['單位'] }" rules="required"></VField>
                  <ErrorMessage name="單位" class="invalid-feedback"></ErrorMessage>
                </div>
              </div>
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <VField id="origin_price" name="原價" type="number" min="0" class="form-control"
                    v-model="newTemProduct.origin_price" placeholder="請輸入原價" :class="{ 'is-invalid': errors['原價'] }"
                    rules="min_value:1|numeric|required"></VField>
                  <ErrorMessage name="原價" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <VField id="price" name='售價' type="number" min="0" class="form-control" v-model="newTemProduct.price"
                    placeholder="請輸入售價" :class="{ 'is-invalid': errors['售價'] }"
                    rules="min_value:1|numeric|required">
                  </VField>
                  <ErrorMessage name="售價" class="invalid-feedback"></ErrorMessage>
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
          <button type="submit" class="btn btn-primary text-white">
            確認
          </button>
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
        </div>
      </VForm>
    </div>
  </div>
</template>
<script>
import ShowNotification from '@/mixin/Swal.js'
import { uploadImgApi } from '@/mixin/Api.js'

export default {
  emits: ['update-temp-product'],
  props: ['tempProduct', 'isNew'],
  data () {
    return {
      productModal: null,
      newTemProduct: {},
      options: ['貓咪玩具', '美容護理', '飲食用品', '貓咪床窩'],
      uploadStatus: false
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
    },
    async handleFileUpload (event) {
      this.uploadStatus = true
      const file = event.target.files[0]
      if (!file) return
      if (file.size > 3 * 1024 * 1024) {
        ShowNotification('檔案大小超過3MB限制')
        return
      }
      const formData = new FormData()
      formData.append('file-to-upload', file)
      try {
        const result = await uploadImgApi(formData)
        this.newTemProduct.imageUrl = result.imageUrl
      } catch (error) {
      } finally {
        this.uploadStatus = false
      }
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
