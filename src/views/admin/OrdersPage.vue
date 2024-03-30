<template>
  <AdminHeader></AdminHeader>
  <LoadingComponent v-model:active="isLoading" :loadingMessage="loadingMessage"></LoadingComponent>
  <div class="admin-order-page container table-container">
    <div class="table-container">
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
    </div>
    <Pagination :pages="pages" :get-products="getOrders"></Pagination>
    <!-- Modal -->
    <AdminOrderModal ref="pModal" :temp-Product="tempProduct" @update-temp-product="handleUpdateTempProduct"
      :isNew="isNew"></AdminOrderModal>
    <AdminDeleteModal ref="dModal" :type="'訂單'" :temp-Product="tempProduct" :deleteProduct="deleteProduct">
    </AdminDeleteModal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import moment from 'moment'
import Pagination from '@/components/utils/PaginationComponent.vue'
import AdminOrderModal from '@/components/admin/AdminOrderModal.vue'
import AdminDeleteModal from '@/components/admin/AdminDeleteModal.vue'
import AdminHeader from '@/components/admin/AdminHeader.vue'
import { checkAdminApi, getOrdersApi, deleteOrderApi, updateOrdersApi } from '@/mixin/Api.js'
import { loadingStore } from '@/store/Loading.js'

export default {
  data () {
    return {
      // 產品資料格式
      products: [],
      tempProduct: {},
      isNew: false,
      pages: {}
    }
  },
  methods: {
    async checkAdmin () {
      try {
        await checkAdminApi({})
        this.getOrders()
      } catch (error) {
        this.$router.push({ name: 'adminLogin' })
      }
    },
    async getOrders (page) {
      try {
        this.setLoading(true, '資料載入中...請稍候')
        const res = await getOrdersApi(page)
        this.products = res.orders
        this.pages = res.pagination
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
        await updateOrdersApi(this.tempProduct.id, this.tempProduct)
        this.$showNotification('訂單資料編輯成功')
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
        await deleteOrderApi(this.tempProduct.id)
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
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    this.$http.defaults.headers.common.Authorization = hexCookie
    this.checkAdmin()
  },
  components: {
    Pagination, AdminOrderModal, AdminDeleteModal, AdminHeader
  }
}
</script>
