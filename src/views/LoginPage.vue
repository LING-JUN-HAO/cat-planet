<template>
  <div class="w-100 loginContainer">
    <div class="container loginBox">
      <div class="row justify-content-center">
        <h1 class="h3 my-3 pb-3 font-weight-normal text-left">會員登入</h1>
        <div class="col-8">
          <form id="form" class="form-signin" @submit.prevent="login()">
            <div class="form-floating mb-3">
              <input type="email" autocomplete="current-password" class="form-control" id="username" placeholder="Account" v-model="user.username"
                required autofocus />
              <label for="username">Account</label>
            </div>
            <div class="form-floating">
              <input type="password" autocomplete="current-password" class="form-control" id="password" placeholder="Password" v-model="user.password"
                required />
              <label for="password">Password</label>
            </div>
            <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">登入</button>
          </form>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <spinner-Modal ref="sModal" :loadingMessage="loadingMessage"></spinner-Modal>
  </div>
</template>
<script>
import SpinnerModal from '../components/SpinnerModal.vue'

export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      url: 'https://ec-course-api.hexschool.io',
      loadingMessage: '登入中...請稍後'
    }
  },
  methods: {
    async login () {
      this.$refs.sModal.openModal()
      try {
        const res = await this.$http.post(`${this.url}/v2/admin/signin`, this.user)
        const data = res.data
        const { token, expired } = data
        document.cookie = `hexToken=${token}; expireS=${new Date(expired)};`
        this.$refs.sModal.closeModal()
        this.$router.push('/products')
      } catch (error) {
        this.user.username = ''
        this.user.password = ''
        this.$refs.sModal.closeModal()
        this.$swal.fire({
          title: '登入失敗',
          heightAuto: false,
          timer: 1000
        })
      }
    }
  },
  components: {
    SpinnerModal
  }
}
</script>
<style scoped>
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
}

.loginContainer {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("https://picsum.photos/2400/1600/?random=55") no-repeat center center /cover;
}

.loginContainer h1 {
  border-bottom: 1px solid rgb(0, 0, 0, 0.6);
}
</style>
