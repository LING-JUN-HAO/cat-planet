<template>
  <LoadingComponent v-model:active="isLoading" :loadingMessage="loadingMessage"></LoadingComponent>
  <div class="w-100 loginContainer">
    <div class="container loginBox">
      <div class="row justify-content-center">
        <h1 class="h3 my-3 pb-3 font-normal text-left">會員登入</h1>
        <div class="col-8">
          <form id="form" class="form-group" @submit.prevent="login()">
            <div class="form-floating mb-3">
              <input id="username" type="email" class="form-control" placeholder="請輸入信箱" v-model="user.username"
                required autofocus autocomplete="current-password" />
              <label for="username">請輸入信箱</label>
            </div>
            <div class="form-floating">
              <input id="password" type="password" class="form-control" placeholder="請輸入密碼" v-model="user.password"
                required autocomplete="current-password" />
              <label for="password">請輸入密碼</label>
            </div>
            <button class="btn btn-lg btn-hex w-100 mt-3" type="submit">登入</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'pinia'
import { loadingStore } from '@/store/Loading.js'
import { signInApi } from '@/mixin/Api.js'

export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async login () {
      try {
        this.setLoading(true, '登入中...請稍後')
        const data = await signInApi(this.user)
        const { token, expired } = data
        document.cookie = `hexToken=${token}; expireS=${new Date(expired)};`
        this.$router.push({ name: 'adminProducts' })
      } catch (error) {
        this.$showNotification('Oops...請稍後嘗試')
      } finally {
        this.user.username = ''
        this.user.password = ''
        this.setLoading(false, '')
      }
    },
    ...mapActions(loadingStore, ['setLoading'])
  },
  computed: {
    ...mapState(loadingStore, ['isLoading', 'loadingMessage'])
  }
}
</script>
