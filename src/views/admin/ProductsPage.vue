<template>
  <LoadingComponent v-model:active="isLoading" :loadingMessage="loadingMessage"></LoadingComponent>
  <AdminHeader></AdminHeader>
  <div class="admin-product-page container overflow-auto">
    <div class="text-end mt-3 mb-1">
      <button class="btn btn-primary text-white" @click="openModal('new')">
        建立新的產品
      </button>
    </div>
    <div class="table-container">
      <table class="table table-hover mt-3">
        <thead>
          <tr>
            <th data-field="id" width="80" class="text-center">
              序號
            </th>
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
          <tr v-for="(item) in dataList" :key="item.id">
            <td class="text-center">
              {{ item.num }}
            </td>
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
    </div>
    <Pagination :pages="pages" :get-products="getProducts"></Pagination>
    <!-- Modal -->
    <AdminProductModal ref="pModal" :temp-Product="data" @update-temp-product="handleUpdateTempProduct" :isNew="isNew">
    </AdminProductModal>
    <AdminDeleteModal ref="dModal" :type="'產品'" :temp-Product="data" :deleteProduct="deleteProduct">
    </AdminDeleteModal>
    <AdminMultiImageModal ref="iModal" :temp-Product="data" :isMultiImage="isMultiImage"
      @update-temp-product="handleUpdateTempProduct"></AdminMultiImageModal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import Pagination from '@/components/utils/PaginationComponent.vue'
import AdminHeader from '@/components/admin/AdminHeader.vue'
import AdminProductModal from '@/components/admin/AdminProductModal.vue'
import AdminDeleteModal from '@/components/admin/AdminDeleteModal.vue'
import AdminMultiImageModal from '@/components/admin/AdminMultiImageModal.vue'
import { loadingStore } from '@/store/Loading.js'
import { backendDataListStore } from '@/store/BackendDataList.js'
import { checkAdminApi, getProductsApi, deleteProductApi, createProductApi, updateProductApi } from '@/mixin/Api.js'

export default {
  data () {
    return {
      isMultiImage: false
    }
  },
  methods: {
    // 驗證使用者權杖
    async checkAdmin () {
      try {
        await checkAdminApi()
        this.getProducts()
      } catch (error) {
        this.$router.push({ name: 'adminLogin' })
      }
    },
    async getProducts () {
      try {
        this.setLoading(true, '資料載入中...請稍候')
        const res = await getProductsApi()
        this.setDataList(res.products, res.pagination)
      } catch (error) {
        this.$showNotification('Oops...請稍後嘗試')
      } finally {
        this.setLoading(false, '')
      }
    },
    openModal (status, item) {
      if (status === 'new') {
        this.setData({ imagesUrl: [] })
        this.setIsNew(true)
        this.$refs.pModal.openModal()
      } else if (status === 'edit') {
        this.setData({ ...item })
        if (!Array.isArray(this.data.imagesUrl)) {
          this.data.imagesUrl = []
        }
        this.setIsNew(false)
        this.$refs.pModal.openModal()
      } else if (status === 'delete') {
        this.setData(item)
        this.$refs.dModal.openModal()
      } else if (status === 'singleImage') {
        this.setData({ ...item })
        this.isMultiImage = false
        this.$refs.iModal.openModal()
      } else if (status === 'multiImage') {
        this.setData({ ...item })
        this.isMultiImage = true
        this.$refs.iModal.openModal()
      }
    },
    handleUpdateTempProduct (updatedTempProduct) {
      this.setData(updatedTempProduct)
      this.updateProduct()
    },
    async updateProduct () {
      try {
        this.setLoading(true, '資料更新中...請稍候')
        this.$refs.pModal.closeModal()
        this.$refs.iModal.closeModal()
        let alertMsg = '商品資料新增成功'
        if (!this.isNew) {
          await updateProductApi(this.data.id, this.data)
          alertMsg = '商品資料編輯成功'
        } else {
          await createProductApi(this.data)
        }
        this.$showNotification(alertMsg)
        this.getProducts()
      } catch (error) {
        this.$showNotification('Oops...請稍後嘗試')
      } finally {
        this.setLoading(false, '')
      }
    },
    async deleteProduct () {
      this.setLoading(true, '刪除資料中...請稍候')
      this.$refs.dModal.closeModal()
      try {
        await deleteProductApi(this.data.id)
        this.$showNotification('商品刪除成功')
        this.getProducts()
      } catch (error) {
        this.$showNotification('Oops...請稍後嘗試')
      } finally {
        this.setLoading(false, '')
      }
    },
    ...mapActions(loadingStore, ['setLoading']),
    ...mapActions(backendDataListStore, ['setDataList', 'setData', 'setIsNew'])
  },
  computed: {
    ...mapState(loadingStore, ['isLoading', 'loadingMessage']),
    ...mapState(backendDataListStore, ['data', 'dataList', 'pages', 'isNew'])
  },
  mounted () {
    const hexCookie = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    this.$http.defaults.headers.common.Authorization = hexCookie
    this.checkAdmin()
  },
  components: {
    Pagination, AdminHeader, AdminProductModal, AdminDeleteModal, AdminMultiImageModal
  }
}
</script>
