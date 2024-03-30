<template>
  <footer class="mt-auto footerContainer object-fit-cover position-relative">
    <div class="footerContent position-absolute top-50 translate-middle-y me-5 d-none d-md-block">
      <h1 class="text-hex fs-2 fw-bold mb-3">訂閱貓咪相關資訊</h1>
      <div class="d-flex">
        <input v-model="email" class="form-control text-truncate me-2" type="email" placeholder="請輸入信箱">
        <button @click="emailSend()" type="button" class="btn btn-primary text-white p-3 fs-6">訂閱</button>
      </div>
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
    }
  }
}
</script>
