<template>
  <AdminHeader></AdminHeader>
  <LoadingComponent v-model:active="isLoading" :loadingMessage="loadingMessage"></LoadingComponent>
  <div class="container table-container">
    <table class="table table-hover mt-6">
      <thead>
        <tr>
          <th data-field="num" width="80" class="text-center">
            序號
          </th>
          <th data-field="name" width="120" class="text-center">
            姓名
          </th>
          <th data-field="tel" width="200" class="text-center">
            電話
          </th>
          <th data-field="email" width="200" class="text-center">
            信箱
          </th>
          <th data-field="message" width="80" class="text-center">
            備註
          </th>
          <th data-field="create_at" width="200" class="text-center">
            時間
          </th>
          <th data-field="productDetail" width="120" class="text-center">
            產品明細
          </th>
          <th data-field="total" width="120" class="text-center">
            總額
          </th>
          <th data-field="is_paid" width="100" class="text-center">
            付款
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
            {{ item.user.name }}
          </td>
          <td class="text-center">
            {{ item.user.tel }}
          </td>
          <td class="text-center">
            {{ item.user.email }}
          </td>
          <td class="text-center">
            <i class="bi bi-stickies"></i>
          </td>
          <td class="text-center">
            {{ this.dataFormatter(item.create_at) }}
          </td>
          <td class="text-center">
            <i class="bi bi-pencil-fill" @click="openModal('singleImage', item)"></i>
          </td>
          <td class="text-center">
            {{ item.total.toLocaleString() }}
          </td>
          <td class="text-center">
            <span v-if="item.is_paid" class="text-success fw-bold">已付款</span>
            <span v-else>未付款</span>
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
    <Pagination :pages="pages" :get-products="getOrders"></Pagination>
    <!-- Modal -->
    <AdminOrderModal ref="pModal" :temp-Product="tempProduct" @update-temp-product="handleUpdateTempProduct"
      :isNew="isNew"></AdminOrderModal>
    <AdminDeleteModal ref="dModal" :type="'訂單'" :temp-Product="tempProduct" :deleteProduct="deleteProduct">
    </AdminDeleteModal>
    <AdminMultiImageModal ref="iModal" :temp-Product="tempProduct" :isMultiImage="isMultiImage"
      @update-temp-product="handleUpdateTempProduct"></AdminMultiImageModal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import moment from 'moment'
import Pagination from '@/components/PaginationComponent.vue'
import AdminOrderModal from '@/components/AdminOrderModal.vue'
import AdminDeleteModal from '@/components/AdminDeleteModal.vue'
import AdminMultiImageModal from '@/components/AdminMultiImageModal.vue'
import AdminHeader from '@/components/admin/AdminHeader.vue'
import { loadingStore } from '@/store/Loading.js'
const { VITE_API, VITE_PATH } = import.meta.env

export default {
  data () {
    return {
      // 產品資料格式
      products: [],
      tempProduct: {},
      isNew: false,
      isMultiImage: false,
      pages: {}
    }
  },
  methods: {
    async checkAdmin () {
      try {
        await this.$http.post(`${VITE_API}/api/user/check`, {})
        this.getOrders()
      } catch (error) {
        this.$router.push({ name: 'adminLogin' })
      }
    },
    async getOrders (page = 1) {
      try {
        this.setLoading(true, '資料載入中...請稍候')
        const res = await this.$http.get(`${VITE_API}/api/${VITE_PATH}/admin/orders?page=${page}`)
        this.products = res.data.orders
        this.pages = res.data.pagination
      } catch (error) {
        this.$showNotification('Oops...請稍後嘗試')
      } finally {
        this.setLoading(false, '')
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
        this.tempProduct = { ...item }
        this.tempProduct.title = item.user.name
        this.$refs.dModal.openModal()
        console.log('temProduct', this.tempProduct)
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
        this.setLoading(true, '資料更新中...請稍候')
        this.$refs.pModal.closeModal()
        this.$refs.iModal.closeModal()
        const httpMethod = 'put'
        const requestUrl = `${VITE_API}/api/${VITE_PATH}/admin/order/${this.tempProduct.id}`
        const alertMsg = '訂單資料編輯成功'
        await this.$http[httpMethod](requestUrl, {
          data: this.tempProduct
        })
        this.$showNotification(alertMsg)
        this.getOrders()
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
        await this.$http.delete(`${VITE_API}/api/${VITE_PATH}/admin/order/${this.tempProduct.id}`)
        this.getOrders()
      } catch (error) {
        this.$showNotification('Oops...請稍後嘗試')
      } finally {
        this.setLoading(false, '')
      }
    },
    dataFormatter (date) {
      return moment.unix(date).format('YYYY-MM-DD hh:mm:ss')
    },
    ...mapActions(loadingStore, ['setLoading'])
  },
  computed: {
    ...mapState(loadingStore, ['isLoading', 'loadingMessage'])
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
    Pagination, AdminOrderModal, AdminDeleteModal, AdminMultiImageModal, AdminHeader
  }
}
</script>

<style lang="scss" scoped>
.table-container{
  white-space: nowrap;
  overflow: auto;
}
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
