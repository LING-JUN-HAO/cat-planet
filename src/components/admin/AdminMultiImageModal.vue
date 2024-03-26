<template>
  <div class="modal fade" ref="multiImageModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content border-0">
        <div class="modal-header bg-hex text-white">
          <h5 class="modal-title">
            <span>多圖編輯</span>
          </h5>
          <button type="button" class="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-6">
              <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel" data-bs-interval="false">
                <div class="carousel-indicators">
                  <template v-if="newTemProduct.imagesUrl">
                    <button v-for="(item, i) in newTemProduct.imagesUrl" type="button" :key="i + '123'"
                      data-bs-target="#carouselExampleIndicators" :data-bs-slide-to="i" class="active" aria-current="true"
                      @click="this.currentImageIndex = i">
                    </button>
                  </template>
                </div>
                <label for="imageUrl" class="form-label my-2">
                  輪播照片
                  <button class="btn btn-outline-primary me-2" @click="createImg">
                    創建
                  </button>
                  <button class="btn btn-danger" @click="deleteImg" :class="{ disabled: newTemProduct.imagesUrl?.length === 0 }">
                    刪除
                  </button>
                </label>
                <div class="position-relative">
                  <div class="carousel-inner">
                    <template v-if="newTemProduct.imagesUrl">
                      <div v-for="(item, i) in newTemProduct.imagesUrl" :key="i + '123'"
                        class="carousel-item w-100 object-fit-cover mainImg" :class="{ active: i == currentImageIndex }">
                        <img :src="item" class="d-block w-100 h-100 object-fit-cover" alt="輪播照片">
                      </div>
                    </template>
                  </div>
                  <template v-if="this.newTemProduct.imagesUrl">
                    <button v-if="this.currentImageIndex > 0" class="carousel-control-prev" type="button"
                      data-bs-target="#carouselExampleIndicators" data-bs-slide="prev"
                      @click="this.currentImageIndex = this.currentImageIndex - 1">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Previous</span>
                    </button>
                    <button v-if="this.currentImageIndex < this.newTemProduct.imagesUrl.length - 1"
                      class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                      data-bs-slide="next" @click="this.currentImageIndex = this.currentImageIndex + 1">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Next</span>
                    </button>
                  </template>
                </div>
              </div>
            </div>
            <div class="col-6 d-flex flex-column">
              <label for="imageUrl" class="form-label my-2">編輯圖片</label>
              <template v-if="newTemProduct.imagesUrl?.length > 0">
                <input v-model="this.newTemProduct.imagesUrl[currentImageIndex]" type="text"
                  class="form-control text-truncate mb-2" placeholder="請輸入圖片連結">
              </template>
              <template v-else>
                <input type="text" class="form-control text-truncate mb-2" placeholder="請先創建輪播照片" disabled>
              </template>
              <label class="d-flex justify-content-center align-items-center flexItem uploadContainer">
                <div v-if="uploadStatus === true" class="d-flex justify-content-center align-items-center flex-column">
                  <i class="bi bi-card-image fs-1"></i>
                  <div class="fw-normal">照片上傳中...請稍後</div>
                </div>
                <div v-else class="d-flex justify-content-center align-items-center flex-column">
                  <template v-if="newTemProduct.imagesUrl?.length > 0">
                    <input type="file" @change="handleFileUpload" @click="this.$refs.inputFile.value = null"
                      ref="inputFile" accept="image/*" style="display: none">
                    <i class="bi bi-upload fs-1"></i>
                    <div class="fw-normal">上傳圖片</div>
                    <span>(檔案大小限制3MB以下)</span>
                  </template>
                  <template v-else>
                    <input type="file" @change="handleFileUpload" @click="this.$refs.inputFile.value = null"
                      ref="inputFile" accept="image/*" style="display: none" disabled>
                    <i class="bi bi-box fs-1"></i>
                    <div class="fw-normal">請先創建輪播照片</div>
                  </template>
                </div>
              </label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary text-white" @click="updateTempProduct">
            確認
          </button>
          <button type="button" class="btn btn-outline-secondary" @click="closeModal">
            取消
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ShowNotification from '@/mixin/Swal.js'
const { VITE_API, VITE_PATH } = import.meta.env

export default {
  emits: ['update-temp-product'],
  props: ['tempProduct', 'isMultiImage'],
  data () {
    return {
      multiImageModal: null,
      newTemProduct: {},
      uploadStatus: false,
      currentImageIndex: 0
    }
  },
  methods: {
    openModal () {
      this.multiImageModal.show()
    },
    closeModal () {
      this.currentImageIndex = 0
      this.multiImageModal.hide()
    },
    createImg () {
      this.newTemProduct.imagesUrl = [...this.newTemProduct.imagesUrl, '']
      this.currentImageIndex = this.newTemProduct.imagesUrl.length - 1
    },
    deleteImg () {
      const originLength = this.newTemProduct.imagesUrl.length
      this.newTemProduct.imagesUrl = this.newTemProduct.imagesUrl.filter((item, index) => index !== this.currentImageIndex)
      if (this.currentImageIndex === originLength - 1) {
        this.currentImageIndex = this.currentImageIndex - 1
      }
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
      const formdata = new FormData()
      formdata.append('file-to-upload', file)
      try {
        const result = await this.$http.post(`${VITE_API}/api/${VITE_PATH}/admin/upload`, formdata)
        this.newTemProduct.imagesUrl[this.currentImageIndex] = result.data.imageUrl
      } catch (error) {

      } finally {
        this.uploadStatus = false
      }
    }
  },
  watch: {
    // 在 tempProduct 屬性變化時執行
    tempProduct: function (newVal, oldVal) {
      this.newTemProduct = newVal
      if (!this.newTemProduct.imagesUrl) {
        this.newTemProduct.imagesUrl = []
      }
    }
  },
  mounted () {
    // eslint-disable-next-line no-undef
    this.multiImageModal = new bootstrap.Modal(this.$refs.multiImageModal, {
      keyboard: false,
      backdrop: 'static'
    })
  }
}
</script>
<style scoped>
.mainImg {
  height: 245px;
}

.flexItem {
  height: 213px;
}

.uploadContainer {
  border: 4px dotted;
  cursor: pointer;
}

.carousel-control-prev-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%236c5c53' viewBox='0 0 8 8'%3E%3Cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E") !important;
}

.carousel-control-next-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%236c5c53' viewBox='0 0 8 8'%3E%3Cpath d='M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E") !important;
}
</style>
