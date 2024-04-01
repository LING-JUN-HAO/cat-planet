<template>
  <header class="header-container sticky-top">
    <nav class="navbar navbar-expand-lg navbar-dark bg-hex">
      <div class="container-fluid">
        <div class="nav-brand-container ms-3 py-1">
          <img class="title-icon me-3" src="@/assets/image/logo-cat.svg" alt="喵星球">
          <img class="title-content ms-4" src="@/assets/image/favicon-cat.png" alt="喵星球">
        </div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
          aria-controls="navbarText" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText" ref="navbar">
          <ul class="navbar-nav mb-2 mb-lg-0 w-100 justify-content-end pe-4">
            <li class="nav-item" @click="toggleNavbar">
              <router-link class="nav-link fs-bold fs-6" active-class="active" to="/consumer/home">
                <i class="bi bi-award me-1 fs-4"></i>
                <span class="fs-6">關於喵星球</span>
              </router-link>
            </li>
            <li class="nav-item" @click="toggleNavbar">
              <router-link class="nav-link fs-bold" active-class="active" to="/consumer/products?category=所有產品&page=1">
                <i class="bi bi-shop me-1 fs-4"></i>
                <span class="fs-6">貓咪用品</span>
              </router-link>
            </li>
            <li class="nav-item position-relative" @click="toggleNavbar">
              <div v-if="cart.carts.length !== 0" class="position-absolute text-white text-center rounded-circle cartNumber">
                {{ cart.carts.length }}
              </div>
              <router-link class="nav-link fs-bold" active-class="active" to="/consumer/carts">
                <i class="bi bi-cart me-1 fs-4"></i>
                <span class="fs-6">購物車</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapState } from 'pinia'
import { cartStore } from '@/store/Cart.js'

export default {
  computed: {
    ...mapState(cartStore, ['cart'])
  },
  methods: {
    toggleNavbar () {
      if (this.$refs.navbar.classList.contains('show')) {
        this.$refs.navbar.classList.remove('show')
      }
    }
  }
}
</script>
