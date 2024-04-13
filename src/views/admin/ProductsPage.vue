<template>
  <LoadingComponent v-model:active="isLoading" :loadingMessage="loadingMessage"></LoadingComponent>
  <AdminHeader></AdminHeader>
  <div class="admin-product-page container overflow-auto">
    <div class="text-end mt-4 mb-1">
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
          <tr v-for="(item) in products" :key="item.id">
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
              <span v-if="item.imagesUrl?.length > 0" class="text-success fw-bold">
                是
                <i class="bi bi-pencil-fill" @click="openModal('editImage', item)"></i>
              </span>
              <span v-else>
                否
                <i class="bi bi-pencil-fill" @click="openModal('editImage', item)"></i>
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
                <button type="button" class="btn btn-outline-primary btn-sm" @click="openModal('editData', item)">
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
    <AdminProductModal ref="pModal" :temp-Product="tempProduct" @update-temp-product="handleUpdateTempProduct"
      :isNew="isNew"></AdminProductModal>
    <AdminDeleteModal ref="dModal" :type="'產品'" :temp-Product="tempProduct" :deleteProduct="deleteProduct">
    </AdminDeleteModal>
    <AdminMultiImageModal ref="iModal" :temp-Product="tempProduct" @update-temp-product="handleUpdateTempProduct">
    </AdminMultiImageModal>
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
import { checkAdminApi, getAdminProductsApi, deleteProductApi, createProductApi, updateProductApi } from '@/mixin/Api.js'

const { VITE_BASEIMG } = import.meta.env
export default {
  data () {
    return {
      products: [],
      tempProduct: {},
      isNew: false,
      pages: {}
    }
  },
  methods: {
    async checkAdmin () {
      try {
        await checkAdminApi()
        this.getProducts()
      } catch (error) {
        this.$router.push({ name: 'adminLogin' })
      }
    },
    // page參數給分頁組件使用時傳遞頁碼
    async getProducts (page) {
      try {
        this.setLoading(true, '資料載入中...請稍候')
        const res = await getAdminProductsApi(page)
        this.products = res.products
        this.pages = res.pagination
      } catch (error) {
        this.$showNotification('Oops...請稍後嘗試')
      } finally {
        this.setLoading(false, '')
      }
    },
    openModal (status, item) {
      const modalActions = {
        new: () => this.newModalClick(true),
        editData: () => this.editDataModalClick(item, false),
        editImage: () => this.editImageModalClick(item),
        delete: () => this.deleteModalClick(item)
      }
      const action = modalActions[status]
      if (action) {
        action()
      }
    },
    newModalClick (isNew) {
      this.tempProduct = {
        title: '預設標題',
        unit: '個',
        origin_price: 100,
        price: 80,
        imagesUrl: [],
        imageUrl: VITE_BASEIMG,
        category: '貓咪玩具'
      }
      this.isNew = isNew
      this.$refs.pModal.openModal()
    },
    editDataModalClick (item, isNew) {
      this.tempProduct = { ...item }
      if (!Array.isArray(this.tempProduct.imagesUrl)) {
        this.tempProduct.imagesUrl = []
      }
      this.isNew = isNew
      this.$refs.pModal.openModal()
    },
    editImageModalClick (item) {
      this.tempProduct = { ...item }
      this.$refs.iModal.openModal()
    },
    deleteModalClick (item) {
      this.tempProduct = item
      this.$refs.dModal.openModal()
    },
    handleUpdateTempProduct (updatedTempProduct) {
      this.tempProduct = updatedTempProduct
      this.updateProduct()
    },
    async updateProduct () {
      try {
        this.setLoading(true, '資料更新中...請稍候')
        this.$refs.pModal.closeModal()
        let alertMsg
        if (!this.isNew) {
          this.$refs.iModal.closeModal()
          await updateProductApi(this.tempProduct.id, this.tempProduct)
          alertMsg = '商品資料編輯成功'
        } else {
          await createProductApi(this.tempProduct)
          alertMsg = '商品資料新增成功'
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
        await deleteProductApi(this.tempProduct.id)
        this.$showNotification('商品刪除成功')
        this.getProducts()
      } catch (error) {
        this.$showNotification('Oops...請稍後嘗試')
      } finally {
        this.setLoading(false, '')
      }
    },
    ...mapActions(loadingStore, ['setLoading'])
  },
  computed: {
    ...mapState(loadingStore, ['isLoading', 'loadingMessage'])
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
