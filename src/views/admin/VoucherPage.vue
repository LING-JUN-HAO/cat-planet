<template>
  <div class="w-100">
    <AdminHeader></AdminHeader>
    <div class="container overflow-hidden">
      <div class="text-end mt-3 mb-1">
        <button class="btn btn-primary text-white" @click="openModal('new')">
          建立新的優惠卷
        </button>
      </div>
      <table class="table table-hover mt-6">
        <thead>
          <tr>
            <th data-field="title" width="200" class="text-center">
              標題
            </th>
            <th data-field="code" width="200" class="text-center">
              識別碼
            </th>
            <th data-field="percent" width="120" class="text-center">
              折扣比例
            </th>
            <th data-field="due_date" width="120" class="text-center">
              到期日期
            </th>
            <th data-field="is_enabled" width="120" class="text-center">
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
      <SpinnerModal ref="sModal" :loadingMessage="loadingMessage"></SpinnerModal>
      <AdminMultiImageModal ref="iModal" :temp-Product="tempProduct" :isMultiImage="isMultiImage"
        @update-temp-product="handleUpdateTempProduct"></AdminMultiImageModal>
    </div>
  </div>
</template>
  
<script>
import Pagination from '@/components/PaginationComponent.vue'
import AdminCouponModal from '@/components/AdminCouponModal.vue'
import SpinnerModal from '@/components/SpinnerModal.vue'
import AdminDeleteModal from '@/components/AdminDeleteModal.vue'
import AdminHeader from '@/components/AdminHeader.vue'
import AdminMultiImageModal from '@/components/AdminMultiImageModal.vue'
import ShowNotification from '@/mixin/Swal.js'
import moment from 'moment'

const { VITE_API, VITE_PATH } = import.meta.env

export default {
  data() {
    return {
      coupons: [],
      tempProduct: {},
      isNew: false,
      isMultiImage: false,
      pages: {},
      loadingMessage: '資料載入中...請稍後'
    }
  },
  methods: {
    async checkAdmin() {
      try {
        await this.$http.post(`${VITE_API}/api/user/check`, this.user)
        this.getCoupons()
      } catch (error) {
        this.$router.push({ name: 'adminLogin' })
      }
    },
    async getCoupons(page = 1) {
      try {
        this.$refs.sModal.openModal()
        const res = await this.$http.get(`${VITE_API}/api/${VITE_PATH}/admin/coupons?page=${page}`)
        this.coupons = res.data.coupons
        this.pages = res.data.pagination
      } catch (error) {
        ShowNotification('商品資料取得發生異常')
      } finally {
        this.$refs.sModal.closeModal()
      }
    },
    openModal(status, item) {
      if (status === 'new') {
        this.tempProduct = {
          'due_date': moment().unix()
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
    handleUpdateTempProduct(updatedTempProduct) {
      this.tempProduct = updatedTempProduct
      this.updateProduct()
    },
    async updateProduct() {
      try {
        this.$refs.pModal.closeModal()
        this.$refs.iModal.closeModal()
        this.$refs.sModal.openModal()
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
        ShowNotification(alertMsg)
        this.getCoupons()
      } catch (error) {
        ShowNotification('優惠卷操作異常')
      } finally {
        this.$refs.sModal.closeModal()
      }
    },
    async deleteCoupon() {
      this.$refs.dModal.closeModal()
      this.$refs.sModal.openModal()
      try {
        await this.$http.delete(`${VITE_API}/api/${VITE_PATH}/admin/coupon/${this.tempProduct.id}`)
        ShowNotification('優惠卷刪除成功')
        this.getCoupons()
      } catch (error) {
        ShowNotification('優惠卷刪除操作異常')
      } finally {
        this.$refs.sModal.closeModal()
      }
    },
    dataFormatter(date) {
      return moment.unix(date).format('YYYY-MM-DD hh:mm:ss');
    }
  },
  mounted() {
    const hexCookie = document.cookie.replace(
      // eslint-disable-next-line no-useless-escape
      /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    this.$http.defaults.headers.common.Authorization = hexCookie
    this.checkAdmin()
  },
  components: {
    Pagination, SpinnerModal, AdminCouponModal, AdminDeleteModal, AdminHeader, AdminMultiImageModal
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
  