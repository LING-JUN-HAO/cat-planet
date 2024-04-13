<template>
  <LoadingComponent v-model:active="isLoading" :loadingMessage="loadingMessage"></LoadingComponent>
  <AdminHeader></AdminHeader>
  <div class="admin-voucher-page container overflow-auto">
    <div class="text-end mt-4 mb-1">
      <button class="btn btn-primary text-white" @click="openModal('new')">
        建立新的優惠卷
      </button>
    </div>
    <div class="table-container">
      <table class="table table-hover mt-3">
        <thead>
          <tr>
            <th data-field="id" width="80" class="text-center">
              序號
            </th>
            <th data-field="title" width="200" class="text-center">
              標題
            </th>
            <th data-field="code" width="120" class="text-center">
              識別碼
            </th>
            <th data-field="percent" width="120" class="text-center">
              折扣比例
            </th>
            <th data-field="due_date" width="120" class="text-center">
              到期日期
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
          <tr v-for="(item) in coupons" :key="item.id">
            <td class="text-center">
              {{ item.num }}
            </td>
            <td class="text-center">
              {{ item.title }}
            </td>
            <td class="text-center">
              {{ item.code }}
            </td>
            <td class="text-center">
              {{ item.percent }} %
            </td>
            <td class="text-center">
              {{ this.dataFormatter(item.due_date) }}
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
    <Pagination :pages="pages" :get-products="getCoupons"></Pagination>
    <!-- Modal -->
    <AdminCouponModal ref="pModal" :temp-Product="tempProduct" @update-temp-product="handleUpdateTempProduct"
      :isNew="isNew"></AdminCouponModal>
    <AdminDeleteModal ref="dModal" :type="'優惠卷'" :temp-Product="tempProduct" :deleteProduct="deleteCoupon">
    </AdminDeleteModal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import moment from 'moment'
import Pagination from '@/components/utils/PaginationComponent.vue'
import AdminHeader from '@/components/admin/AdminHeader.vue'
import AdminCouponModal from '@/components/admin/AdminCouponModal.vue'
import AdminDeleteModal from '@/components/admin/AdminDeleteModal.vue'
import { loadingStore } from '@/store/Loading.js'
import { checkAdminApi, getCouponsApi, deleteCouponApi, createCouponApi, updateCouponApi } from '@/mixin/Api.js'

export default {
  data () {
    return {
      coupons: [],
      tempProduct: {},
      isNew: false,
      pages: {}
    }
  },
  methods: {
    async checkAdmin () {
      try {
        await checkAdminApi()
        this.getCoupons()
      } catch (error) {
        this.$router.push({ name: 'adminLogin' })
      }
    },
    async getCoupons (page) {
      try {
        this.setLoading(true, '資料載入中...請稍候')
        const res = await getCouponsApi(page)
        this.coupons = res.coupons
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
        edit: () => this.editModalClick(item, false),
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
        code: 'love_888',
        is_enabled: 0,
        due_date: moment().unix()
      }
      this.isNew = isNew
      this.$refs.pModal.openModal()
    },
    editModalClick (item, isNew) {
      this.tempProduct = { ...item }
      this.isNew = isNew
      this.$refs.pModal.openModal()
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
          await updateCouponApi(this.tempProduct.id, this.tempProduct)
          alertMsg = '優惠卷編輯成功'
        } else {
          await createCouponApi(this.tempProduct)
          alertMsg = '優惠卷新增成功'
        }
        this.$showNotification(alertMsg)
        this.getCoupons()
      } catch (error) {
        this.$showNotification('Oops...請稍後嘗試')
      } finally {
        this.setLoading(false, '')
      }
    },
    async deleteCoupon () {
      this.$refs.dModal.closeModal()
      this.setLoading(true, '優惠卷刪除中...請稍候')
      try {
        await deleteCouponApi(this.tempProduct.id)
        this.$showNotification('優惠卷刪除成功')
        this.getCoupons()
      } catch (error) {
        this.$showNotification('Oops...請稍後嘗試')
      } finally {
        this.setLoading(false, '優惠卷刪除中...請稍候')
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
    Pagination, AdminCouponModal, AdminDeleteModal, AdminHeader
  }
}
</script>
