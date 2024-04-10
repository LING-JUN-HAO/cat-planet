<template>
  <footer class="mt-auto footerContainer object-fit-cover position-relative">
    <div class="footerContent position-absolute top-50 translate-middle-y me-5">
      <h1 class="fs-2 fw-bold mb-3">訂閱獲取貓咪優惠資訊</h1>
      <VForm ref="creditCardForm" class="col-md-12" v-slot="{ errors }" @submit="emailSend">
        <div class="d-flex">
          <VField id="email" name="email" type="email" class="form-control text-truncate me-2"
            :class="{ 'is-invalid': errors['email'] }" placeholder="請輸入信箱" rules="email|required" v-model="email">
          </VField>
          <button type="submit" class="btn btn-primary text-white p-3 fs-6">訂閱</button>
        </div>
        <ErrorMessage name="email" class="invalid-feedback d-block"></ErrorMessage>
      </VForm>
    </div>
  </footer>
</template>
<script>
import { SendMsg } from '@/mixin/Email.js'

export default {
  data () {
    return {
      email: ''
    }
  },
  methods: {
    emailSend () {
      SendMsg(this.email)
      this.$toastNotification('success', '已寄出會員邀請信')
      this.email = ''
      this.$refs.creditCardForm.resetForm()
    }
  }
}
</script>
