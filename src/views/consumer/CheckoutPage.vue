<template>
  <div>
    <div class="d-flex flex-column align-items-center justify-content-center w-100">
      <VForm ref="orderForm" class="col-md-6 mt-3" v-slot="{ errors }" @submit="createOrder">
        <div class="row">
          <div class="mb-3 col-4">
            <label for="name" class="form-label">姓名</label>
            <VField id="name" name="姓名" type="text" class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
              placeholder="請輸入姓名" rules="required" v-model="orderData.user.name"></VField>
            <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3 col-4">
            <label for="tel" class="form-label">電話號碼</label>
            <VField id="tel" name="電話" type="tel" class="form-control" :class="{ 'is-invalid': errors['電話'] }"
              placeholder="請輸入電話" rules="required|min:8|max:10" v-model="orderData.user.tel"></VField>
            <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3 col-4">
            <label for="email" class="form-label">電子信箱</label>
            <VField id="email" name="email" type="email" class="form-control" :class="{ 'is-invalid': errors['email'] }"
              placeholder="請輸入 Email" rules="email|required" v-model="orderData.user.email"></VField>
            <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
          </div>
        </div>

        <div class="mb-3">
          <label for="address" class="form-label">配送地址</label>
          <VField id="address" name="地址" type="text" class="form-control" :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入地址" rules="required" v-model="orderData.user.address"></VField>
          <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <textarea name="" id="message" class="form-control" cols="15" rows="10" v-model="orderData.message"></textarea>
        </div>
        <div class="text-end">
          <button type="submit" class="btn btn-danger">送出訂單</button>
        </div>
      </VForm>
    </div>
  </div>
</template>

<script>
import { cartStore } from '@/store/Store.js'
import ShowNotification from '@/mixin/Swal.js'
const { VITE_API, VITE_PATH } = import.meta.env

export default {
  data () {
    return {
      cartStore: cartStore(),
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
        ShowNotification('訂單已成功送出')
        this.cartStore.cleanCart()
        await this.cartStore.getCart()
        this.$router.push({ name: 'consumerProducts' })
      } catch (error) {
        console.log('error', error)
      }
    }
  }
}
</script>
