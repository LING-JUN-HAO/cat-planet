<template>
  <div class="w-100">
    <AdminHeader></AdminHeader>
    <div class="container overflow-hidden">
      <div class="text-end mt-3 mb-1">
        <button class="btn btn-primary" @click="openModal('new')">
          建立新的產品
        </button>
      </div>
      <table class="table table-hover mt-6">
        <thead>
          <tr>
            <th width="120">
              分類
            </th>
            <th width="200">
              產品名稱
            </th>
            <th width="120">
              原價
            </th>
            <th width="120">
              售價
            </th>
            <th width="100">
              啟用
            </th>
            <th width="120" class="text-center">
              編輯
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item) in products" :key="item.id">
            <td>
              {{ item.category }}
            </td>
            <td>
              {{ item.title }}
            </td>
            <td>
              {{ item.origin_price }}
            </td>
            <td>
              {{ item.price }}
            </td>
            <td>
              <span v-if="item.is_enabled" class="text-success">啟用</span>
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
      <pagination-vue :pages="pages" :get-products="getProducts"></pagination-vue>
      <!-- Modal -->
      <product-modal-vue ref="pModal" :temp-Product="tempProduct" @update-temp-product="handleUpdateTempProduct"
        :isNew="isNew"></product-modal-vue>
      <delete-modal-vue ref="dModal" :temp-Product="tempProduct" :deleteProduct="deleteProduct"></delete-modal-vue>
      <spinner-modal-vue ref="sModal" :loadingMessage="loadingMessage"></spinner-modal-vue>
    </div>
  </div>
</template>

<script>
import PaginationVue from '@/components/PaginationComponent.vue'
import ProductModalVue from '@/components/ProductModal.vue'
import SpinnerModalVue from '@/components/SpinnerModal.vue'
import DeleteModalVue from '@/components/DeleteModal.vue'
import AdminHeader from '@/components/AdminHeader.vue'
import ShowNotification from '@/mixin/Swal.js'
const { VITE_API, VITE_PATH } = import.meta.env

export default {
  data () {
    return {
      // 產品資料格式
      products: [],
      tempProduct: {},
      isNew: false,
      pages: {},
      loadingMessage: '資料處理中...請稍後'
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
      }
    },
    handleUpdateTempProduct (updatedTempProduct) {
      this.tempProduct = updatedTempProduct
      this.updateProduct()
    },
    async updateProduct () {
      try {
        this.$refs.pModal.closeModal()
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
        this.getProducts()
      } catch (error) {
        ShowNotification('商品刪除操作異常')
      } finally {
        this.$refs.sModal.closeModal()
      }
    },
    createImages () {
      this.tempProduct.imagesUrl = []
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
    PaginationVue, SpinnerModalVue, ProductModalVue, DeleteModalVue, AdminHeader
  }
}
</script>

<style scoped>
img {
  object-fit: contain;
  max-width: 100%;
}

.primary-image {
  height: 300px;
}

.images {
  height: 150px;
}</style>
