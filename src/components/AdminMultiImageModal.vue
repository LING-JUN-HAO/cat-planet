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
                      data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true">
                    </button>
                  </template>
                </div>
                <label for="imageUrl" class="form-label my-2">
                  輪播照片
                  <button class="btn btn-outline-primary" @click="createImg">
                    建立新的輪播照片
                  </button>
                </label>
                <div class="carousel-inner">
                  <template v-if="newTemProduct.imagesUrl">
                    <div v-for="(item, i) in newTemProduct.imagesUrl" :key="i + '123'"
                      class="carousel-item active w-100 object-fit-cover mainImg">
                      <img :src="item" class="d-block w-100" alt="輪播照片">
                    </div>
                  </template>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
            </div>
            <div class="col-6 d-flex flex-column">
              <label for="imageUrl" class="form-label my-2">當前次要圖片</label>
              <template v-if="newTemProduct.imagesUrl">
                <input v-model="this.newTemProduct.imagesUrl[currentImageIndex]" type="text"
                  class="form-control text-truncate mb-2" placeholder="請輸入圖片連結">
              </template>
              <template v-else>
                <input type="text" class="form-control text-truncate mb-2" placeholder="請輸入圖片連結">
              </template>
              <label class="d-flex justify-content-center align-items-center flexItem uploadContainer">
                <div v-if="uploadStatus === true" class="d-flex justify-content-center align-items-center flex-column">
                  <i class="bi bi-card-image fs-1"></i>
                  <div class="fw-normal">照片上傳中...請稍後</div>
                </div>
                <div v-else class="d-flex justify-content-center align-items-center flex-column">
                  <input type="file" @change="handleFileUpload" @click="this.$refs.inputFile.value = null" ref="inputFile"
                    accept="image/*" style="display: none">
                  <i class="bi bi-upload fs-1"></i>
                  <div class="fw-normal">上傳圖片</div>
                  <span>(檔案大小限制3MB以下)</span>
                </div>
              </label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary text-white" @click="updateTempProduct">
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
      this.multiImageModal.hide()
    },
    createImg () {
      this.newTemProduct.imagesUrl = [...this.newTemProduct.imagesUrl, '']
      this.currentImageIndex = this.newTemProduct.imagesUrl.length - 1
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
  flex: 1;
}

.uploadContainer {
  border: 4px dotted;
  cursor: pointer;
}
</style>
