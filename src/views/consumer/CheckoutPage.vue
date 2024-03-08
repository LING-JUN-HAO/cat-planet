<template>
  <section class="checkout-page container container-title py-3">
    <h2 class="text-center py-3 fw-bold">確認資料</h2>
    <div class="content-shadow border border-1 bg-white rounded-4 d-flex flex-column align-items-center justify-content-center w-100 p-5">
      <Timeline :active="'consumerCheck'"></Timeline>
      <VForm ref="orderForm" class="col-md-12 mt-3" v-slot="{ errors }" @submit="createOrder">
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
            <VField id="email" name="email" type="email" class="form-control py-2" :class="{ 'is-invalid': errors['email'] }"
              placeholder="請輸入 Email" rules="email|required" v-model="orderData.user.email"></VField>
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
        <div class="text-end">
          <button type="submit" class="btn btn-primary text-white">送出訂單</button>
        </div>
      </VForm>
    </div>
  </section>
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
      }
    }
  },
  methods: {
    async createOrder () {
      try {
        this.$http.post(`${VITE_API}/api/${VITE_PATH}/order`, { data: this.orderData })
        this.$refs.orderForm.resetForm()
        this.$showNotification('訂單已成功送出')
        this.cleanCart()
        this.$router.push({ name: 'consumerProducts', query: { category: '所有產品', page: 1 } })
      } catch (error) {
        console.log('error', error)
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
.checkout-page label.required::after{
  content: '*';
  padding-left: 2px;
  color: red;
  opacity: .7;
}
</style>
