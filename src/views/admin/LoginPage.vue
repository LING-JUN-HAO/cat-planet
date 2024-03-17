<template>
  <Loading v-model:active="isLoading" :loadingMessage="loadingMessage"></Loading>
  <div class="w-100 loginContainer">
    <div class="container loginBox">
      <div class="row justify-content-center">
        <h1 class="h3 my-3 pb-3 font-normal text-left">會員登入</h1>
        <div class="col-8">
          <form id="form" class="form-group" @submit.prevent="login()">
            <div class="form-floating mb-3">
              <input id="username" type="email" class="form-control" placeholder="Email address" v-model="user.username"
                required autofocus autocomplete="current-password" />
              <label for="username">Email address</label>
            </div>
            <div class="form-floating">
              <input id="password" type="password" class="form-control" placeholder="Password" v-model="user.password"
                required autocomplete="current-password" />
              <label for="password">Password</label>
            </div>
            <button class="btn btn-lg btn-hex w-100 mt-3" type="submit">登入</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const { VITE_API } = import.meta.env

export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      loadingMessage: '登入中...請稍後',
      isLoading: false
    }
  },
  methods: {
    async login () {
      try {
        this.isLoading = true
        const res = await this.$http.post(`${VITE_API}/admin/signin`, this.user)
        const data = res.data
        const { token, expired } = data
        document.cookie = `hexToken=${token}; expireS=${new Date(expired)};`
        this.$router.push({ name: 'adminProducts' })
      } catch (error) {
        this.user.username = ''
        this.user.password = ''
        this.$showNotification('Oops...請稍後嘗試')
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.loginContainer {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("../../assets/image/login-background.jpg") no-repeat center center /cover;

  .loginBox {
    width: 40vw;
    max-width: 550px;
    background-color: rgb(255, 255, 255, 0.6);
    backdrop-filter: blur(5px);
    border: 10px solid white;
    border-radius: 20px;
    box-shadow: 0 0 50px #000;
    padding: 0 15px 30px 15px;
    text-align: center;
    letter-spacing: .125em;
  }

  h1 {
    border-bottom: 1px solid rgb(0, 0, 0, 0.6);
  }
}
</style>
