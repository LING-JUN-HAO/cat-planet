<template>
  <LoadingComponent v-model:active="isLoading" :loadingMessage="loadingMessage"></LoadingComponent>
  <VForm ref="orderForm" class="col-md-12" v-slot="{ errors }" @submit="createOrder">
    <section class="checkout-page container container-title my-6">
      <div data-aos="fade-up" data-aos-delay="450" data-aos-duration="900"
        class="content-shadow border border-1 bg-white rounded-4 d-flex flex-column align-items-center justify-content-center w-100 p-4 p-md-6">
        <TimelineComponent :active="'consumerCheck'"></TimelineComponent>
        <div class="row py-6">
          <div class="col-12 col-md-6 pb-3 pb-md-0">
            <div class="mb-3 col-12">
              <label for="name" class="form-label required">姓名</label>
              <VField id="name" name="姓名" type="text" class="form-control py-2" :class="{ 'is-invalid': errors['姓名'] }"
                placeholder="請輸入姓名" rules="required" v-model="orderData.user.name"></VField>
              <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="mb-3 col-12">
              <label for="tel" class="form-label required">電話號碼</label>
              <VField id="tel" name="電話" type="tel" class="form-control py-2" :class="{ 'is-invalid': errors['電話'] }"
                placeholder="請輸入電話" rules="required|min:10|numeric:true" v-model="orderData.user.tel"></VField>
              <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="mb-3 col-12">
              <label for="email" class="form-label required">電子信箱</label>
              <VField id="email" name="email" type="email" class="form-control py-2"
                :class="{ 'is-invalid': errors['email'] }" placeholder="請輸入信箱" rules="email|required"
                v-model="orderData.user.email"></VField>
              <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="mb-3 col-12">
              <label for="address" class="form-label required">配送地址</label>
              <VField id="address" name="地址" type="text" class="form-control py-2"
                :class="{ 'is-invalid': errors['地址'] }" placeholder="請輸入地址" rules="required"
                v-model="orderData.user.address"></VField>
              <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="col-12">
              <label for="message" class="form-label">備註</label>
              <textarea name="" id="message" class="form-control" rows="3" v-model="orderData.message"></textarea>
            </div>
          </div>
          <div class="checkout-bg col-12 col-md-6 pt-3 pt-md-0">
            <img class="h-100 w-100 object-fit-cover" src="@/assets/image/contact-bg.jpeg" alt="聯絡資訊背景圖">
          </div>
        </div>
      </div>
    </section>
    <div class="pb-6 text-center">
      <button type="submit" class="btn btn-primary rounded-3 py-2 px-5 text-white">
        完成訂單
        <i class="bi bi-caret-right-fill ps-1"></i>
      </button>
    </div>
  </VForm>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import TimelineComponent from '@/components/utils/TimelineComponent.vue'
import { cartStore } from '@/store/Cart.js'
import { loadingStore } from '@/store/Loading.js'
import { createOrderApi } from '@/mixin/Api.js'

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
      }
    }
  },
  methods: {
    async createOrder () {
      try {
        this.setLoading(true, '訂單處理中...請稍候')
        const data = await createOrderApi(this.orderData)
        const { orderId } = data
        this.$refs.orderForm.resetForm()
        this.$toastNotification('success', '訂單已成功送出')
        this.$router.push({ name: 'consumerOrders', query: { orderID: orderId } })
      } catch (error) {
        this.$showNotification('Oops...請稍後嘗試')
      } finally {
        this.setLoading(false, '')
        this.cleanCart()
      }
    },
    ...mapActions(cartStore, ['getCart', 'cleanCart']),
    ...mapActions(loadingStore, ['setLoading'])
  },
  computed: {
    ...mapState(loadingStore, ['isLoading', 'loadingMessage'])
  },
  mounted () {
    this.getCart()
  },
  components: {
    TimelineComponent
  }
}
</script>
