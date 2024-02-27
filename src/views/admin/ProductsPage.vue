<template>
  <div class="w-100">
    <AdminHeader></AdminHeader>
    <div class="container overflow-hidden">
      <div class="text-end mt-3 mb-1">
        <button class="btn btn-primary text-white" @click="openModal('new')">
          建立新的產品
        </button>
      </div>
      <table class="table table-hover mt-3">
        <thead>
          <tr>
            <th data-field="category" width="120" class="text-center">
              分類
            </th>
            <th data-field="title" width="200" class="text-center">
              產品名稱
            </th>
            <th data-field="multiImg" width="120" class="text-center">
              多圖
            </th>
            <th data-field="origin_price" width="120" class="text-center">
              原價
            </th>
            <th data-field="price" width="120" class="text-center">
              售價
            </th>
            <th data-field="is_enabled" width="100" class="text-center">
              啟用
            </th>
            <th data-field="id" width="120" class="text-center">
              操作
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item) in products" :key="item.id">
            <td class="text-center">
              {{ item.category }}
            </td>
            <td class="text-center">
              {{ item.title }}
            </td>
            <td class="text-center">
              <span v-if="item.imagesUrl" class="text-success fw-bold">
                是
                <i class="bi bi-pencil-fill" @click="openModal('multiImage', item)"></i>
              </span>
              <span v-else>
                否
                <i class="bi bi-pencil-fill" @click="openModal('singleImage', item)"></i>
              </span>
            </td>
            <td class="text-center">
              {{ item.origin_price }}
            </td>
            <td class="text-center">
              {{ item.price }}
            </td>
            <td class="text-center">
              <span v-if="item.is_enabled" class="text-success fw-bold">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td class="text-center">
              <div class="btn-group">
                <button type="button" class="btn btn-outline-primary btn-sm" @click="openModal('edit', item)">
                  編輯
                </button>
                <button type="button" class="btn btn-outline-danger btn-sm" @click="openModal('delete', item)">
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination :pages="pages" :get-products="getProducts"></Pagination>
      <!-- Modal -->
      <AdminProductModal ref="pModal" :temp-Product="tempProduct" @update-temp-product="handleUpdateTempProduct"
        :isNew="isNew"></AdminProductModal>
      <AdminDeleteModal ref="dModal" :type="'產品'" :temp-Product="tempProduct" :deleteProduct="deleteProduct">
      </AdminDeleteModal>
      <SpinnerModal ref="sModal" :loadingMessage="loadingMessage"></SpinnerModal>
      <AdminMultiImageModal ref="iModal" :temp-Product="tempProduct" :isMultiImage="isMultiImage"
        @update-temp-product="handleUpdateTempProduct"></AdminMultiImageModal>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/PaginationComponent.vue'
import AdminProductModal from '@/components/AdminProductModal.vue'
import SpinnerModal from '@/components/SpinnerModal.vue'
import AdminDeleteModal from '@/components/AdminDeleteModal.vue'
import AdminHeader from '@/components/AdminHeader.vue'
import AdminMultiImageModal from '@/components/AdminMultiImageModal.vue'
import ShowNotification from '@/mixin/Swal.js'
const { VITE_API, VITE_PATH } = import.meta.env

export default {
  data () {
    return {
      // 產品資料格式
      products: [],
      tempProduct: {},
      isNew: false,
      isMultiImage: false,
      pages: {},
      loadingMessage: '資料載入中...請稍後'
    }
  },
  methods: {
    async checkAdmin () {
      try {
        await this.$http.post(`${VITE_API}/api/user/check`, this.user)
        this.getProducts()
      } catch (error) {
        this.$router.push({ name: 'adminLogin' })
      }
    },
    async getProducts (page = 1) {
      try {
        this.$refs.sModal.openModal()
        const res = await this.$http.get(`${VITE_API}/api/${VITE_PATH}/admin/products?page=${page}`)
        this.products = res.data.products
        this.pages = res.data.pagination
      } catch (error) {
        ShowNotification('商品資料取得發生異常')
      } finally {
        this.$refs.sModal.closeModal()
      }
    },
    openModal (status, item) {
      if (status === 'new') {
        this.tempProduct = {
          imagesUrl: []
        }
        this.isNew = true
        this.$refs.pModal.openModal()
      } else if (status === 'edit') {
        this.tempProduct = { ...item }
        if (!Array.isArray(this.tempProduct.imagesUrl)) {
          this.tempProduct.imagesUrl = []
        }
        this.isNew = false
        this.$refs.pModal.openModal()
      } else if (status === 'delete') {
        this.tempProduct = item
        this.$refs.dModal.openModal()
      } else if (status === 'singleImage') {
        this.tempProduct = { ...item }
        this.isMultiImage = false
        this.$refs.iModal.openModal()
      } else if (status === 'multiImage') {
        this.tempProduct = { ...item }
        this.isMultiImage = true
        this.$refs.iModal.openModal()
      }
    },
    handleUpdateTempProduct (updatedTempProduct) {
      this.tempProduct = updatedTempProduct
      this.updateProduct()
    },
    async updateProduct () {
      try {
        this.$refs.pModal.closeModal()
        this.$refs.iModal.closeModal()
        this.$refs.sModal.openModal()
        let httpMethod = 'post'
        let requestUrl = `${VITE_API}/api/${VITE_PATH}/admin/product`
        let alertMsg = '商品資料新增成功'

        if (!this.isNew) {
          httpMethod = 'put'
          requestUrl = `${VITE_API}/api/${VITE_PATH}/admin/product/${this.tempProduct.id}`
          alertMsg = '商品資料編輯成功'
        }
        await this.$http[httpMethod](requestUrl, {
          data: this.tempProduct
        })
        ShowNotification(alertMsg)
        this.getProducts()
      } catch (error) {
        ShowNotification('商品資料編輯異常')
      } finally {
        this.$refs.sModal.closeModal()
      }
    },
    async deleteProduct () {
      this.$refs.dModal.closeModal()
      this.$refs.sModal.openModal()
      try {
        await this.$http.delete(`${VITE_API}/api/${VITE_PATH}/admin/product/${this.tempProduct.id}`)
        ShowNotification('商品刪除成功')
        this.getCoupons()
      } catch (error) {
        ShowNotification('商品刪除操作異常')
      } finally {
        this.$refs.sModal.closeModal()
      }
    }
  },
  mounted () {
    const hexCookie = document.cookie.replace(
      // eslint-disable-next-line no-useless-escape
      /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    this.$http.defaults.headers.common.Authorization = hexCookie
    this.checkAdmin()
  },
  components: {
    Pagination, SpinnerModal, AdminProductModal, AdminDeleteModal, AdminHeader, AdminMultiImageModal
  }
}
</script>

<style lang="scss" scoped>
img {
  object-fit: contain;
  max-width: 100%;
}

.primary-image {
  height: 300px;
}

.images {
  height: 150px;
}

.bi-pencil-fill {
  cursor: pointer;
}
</style>
