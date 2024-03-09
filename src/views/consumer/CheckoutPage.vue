<template>
  <Loading v-model:active="isLoading" :loadingMessage="loadingMessage"></Loading>
  <VForm ref="orderForm" class="col-md-12 mt-3" v-slot="{ errors }" @submit="createOrder">
    <section class="checkout-page container container-title py-3">
      <h2 data-aos="fade-down" data-aos-delay="0" data-aos-duration="900" class="text-center py-3 fw-bold">確認資料</h2>
      <div
        data-aos="fade-up" data-aos-delay="450" data-aos-duration="900"
        class="content-shadow border border-1 bg-white rounded-4 d-flex flex-column align-items-center justify-content-center w-100 p-5">
        <Timeline :active="'consumerCheck'"></Timeline>
        <img class="shopping-img" src="../../assets/image/contact.svg" alt="聯絡人資訊填寫">
        <div class="row pb-4">
          <div class="mb-3 col-6">
            <label for="name" class="form-label required">姓名</label>
            <VField id="name" name="姓名" type="text" class="form-control py-2" :class="{ 'is-invalid': errors['姓名'] }"
              placeholder="請輸入姓名" rules="required" v-model="orderData.user.name"></VField>
            <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3 col-6">
            <label for="tel" class="form-label required">電話號碼</label>
            <VField id="tel" name="電話" type="tel" class="form-control py-2" :class="{ 'is-invalid': errors['電話'] }"
              placeholder="請輸入電話" rules="required|min:8|max:10" v-model="orderData.user.tel"></VField>
            <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3 col-6">
            <label for="email" class="form-label required">電子信箱</label>
            <VField id="email" name="email" type="email" class="form-control py-2"
              :class="{ 'is-invalid': errors['email'] }" placeholder="請輸入 Email" rules="email|required"
              v-model="orderData.user.email"></VField>
            <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3 col-6">
            <label for="address" class="form-label required">配送地址</label>
            <VField id="address" name="地址" type="text" class="form-control py-2" :class="{ 'is-invalid': errors['地址'] }"
              placeholder="請輸入地址" rules="required" v-model="orderData.user.address"></VField>
            <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="col-12">
            <label for="message" class="form-label">備註</label>
            <textarea name="" id="message" class="form-control" rows="6" v-model="orderData.message"></textarea>
          </div>
        </div>
      </div>
    </section>
    <div class="pt-3 pb-4 text-center">
      <button type="submit" class="btn btn-primary rounded-3 py-2 px-5 text-white">
        送出訂單
        <i class="bi bi-caret-right-fill ps-1"></i>
      </button>
    </div>
  </VForm>
</template>

<script>
import { mapActions } from 'pinia'
import { cartStore } from '@/store/Store.js'
import Timeline from '@/components/Timeline.vue'
const { VITE_API, VITE_PATH } = import.meta.env

export default {
  data () {
    return {
      orderData: {
        user: {
          email: '',
          name: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      loadingMessage: '訂單處理中...請稍候',
      isLoading: false
    }
  },
  methods: {
    async createOrder () {
      try {
        this.isLoading = true
        const data = await this.$http.post(`${VITE_API}/api/${VITE_PATH}/order`, { data: this.orderData })
        const { orderId } = data.data
        this.$refs.orderForm.resetForm()
        this.$toast.open({
          message: '訂單已成功送出!',
          type: 'success',
          position: 'top-right',
          duration: 1000
        })
        this.$router.push({ name: 'consumerOrders', query: { orderID: orderId } })
      } catch (error) {
        console.log('error', error)
      } finally {
        this.isLoading = false
        this.cleanCart()
      }
    },
    ...mapActions(cartStore, ['getCart', 'cleanCart'])
  },
  mounted () {
    this.getCart()
  },
  components: {
    Timeline
  }
}
</script>
<style>
.checkout-page label.required::after {
  content: '*';
  padding-left: 2px;
  color: red;
  opacity: .7;
}
</style>
