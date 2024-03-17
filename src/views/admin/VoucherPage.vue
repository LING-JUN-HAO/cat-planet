<template>
  <Loading v-model:active="isLoading" :loadingMessage="loadingMessage"></Loading>
  <div class="w-100">
    <AdminHeader></AdminHeader>
    <div class="container overflow-hidden">
      <div class="text-end mt-3 mb-1">
        <button class="btn btn-primary text-white" @click="openModal('new')">
          建立新的優惠卷
        </button>
      </div>
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
      <Pagination :pages="pages" :get-products="getCoupons"></Pagination>
      <!-- Modal -->
      <AdminCouponModal ref="pModal" :temp-Product="tempProduct" @update-temp-product="handleUpdateTempProduct"
        :isNew="isNew"></AdminCouponModal>
      <AdminDeleteModal ref="dModal" :type="'優惠卷'" :temp-Product="tempProduct" :deleteProduct="deleteCoupon">
      </AdminDeleteModal>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/PaginationComponent.vue'
import AdminCouponModal from '@/components/AdminCouponModal.vue'
import AdminDeleteModal from '@/components/AdminDeleteModal.vue'
import AdminHeader from '@/components/AdminHeader.vue'
import moment from 'moment'

const { VITE_API, VITE_PATH } = import.meta.env

export default {
  data () {
    return {
      coupons: [],
      tempProduct: {},
      isNew: false,
      pages: {},
      loadingMessage: '資料載入中...請稍後',
      isLoading: false
    }
  },
  methods: {
    async checkAdmin () {
      try {
        await this.$http.post(`${VITE_API}/api/user/check`, this.user)
        this.getCoupons()
      } catch (error) {
        this.$router.push({ name: 'adminLogin' })
      }
    },
    async getCoupons (page = 1) {
      try {
        this.isLoading = true
        const res = await this.$http.get(`${VITE_API}/api/${VITE_PATH}/admin/coupons?page=${page}`)
        this.coupons = res.data.coupons
        this.pages = res.data.pagination
      } catch (error) {
        this.$showNotification('Oops...請稍後嘗試')
      } finally {
        this.isLoading = false
      }
    },
    openModal (status, item) {
      if (status === 'new') {
        this.tempProduct = {
          due_date: moment().unix()
        }
        this.isNew = true
        this.$refs.pModal.openModal()
      } else if (status === 'edit') {
        this.tempProduct = { ...item }
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
        this.loadingMessage = '資料更新中...請稍候'
        this.isLoading = true
        let httpMethod = 'post'
        let requestUrl = `${VITE_API}/api/${VITE_PATH}/admin/coupon`
        let alertMsg = '優惠卷新增成功'
        if (!this.isNew) {
          httpMethod = 'put'
          requestUrl = `${VITE_API}/api/${VITE_PATH}/admin/coupon/${this.tempProduct.id}`
          alertMsg = '優惠卷編輯成功'
        }
        await this.$http[httpMethod](requestUrl, {
          data: this.tempProduct
        })
        this.$showNotification(alertMsg)
        this.getCoupons()
      } catch (error) {
        this.$showNotification('Oops...請稍後嘗試')
      } finally {
        this.isLoading = false
      }
    },
    async deleteCoupon () {
      this.$refs.dModal.closeModal()
      this.loadingMessage = '優惠卷刪除中...請稍候'
      this.isLoading = true
      try {
        await this.$http.delete(`${VITE_API}/api/${VITE_PATH}/admin/coupon/${this.tempProduct.id}`)
        this.$showNotification('優惠卷刪除成功')
        this.getCoupons()
      } catch (error) {
        this.$showNotification('Oops...請稍後嘗試')
      } finally {
        this.isLoading = false
      }
    },
    dataFormatter (date) {
      return moment.unix(date).format('YYYY-MM-DD hh:mm:ss')
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
    Pagination, AdminCouponModal, AdminDeleteModal, AdminHeader
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
