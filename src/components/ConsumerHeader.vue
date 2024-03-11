<template>
  <header class="header-container sticky-top">
    <nav class="navbar navbar-expand-lg navbar-dark bg-hex">
      <div class="container-fluid">
        <router-link active-class="active" to="/consumer/home">
          <div class="ms-3">
            <img class="title-icon me-2" src="../assets/image/logo-cat.svg" alt="">
            <img src="../assets/image/favicon-cat.png" height="45px" alt="喵星球" class="ms-4">
          </div>
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
          aria-controls="navbarText" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mb-2 mb-lg-0 w-100 justify-content-end pe-4">
            <li class="nav-item">
              <router-link class="nav-link fs-bold fs-6" active-class="active" to="/consumer/home">
                <i class="bi bi-award me-1 fs-5"></i>
                <span>關於喵星球</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link fs-bold" active-class="active" to="/consumer/products?category=所有產品&page=1">
                <i class="bi bi-shop me-1 fs-5"></i>
                貓咪用品
              </router-link>
            </li>
            <li class="nav-item position-relative">
              <div
                class="position-absolute  text-white fs-6 d-flex align-items-center justify-content-center rounded-circle cartNumber">
                {{ cart.carts.length }}
              </div>
              <router-link class="nav-link fs-bold" active-class="active" to="/consumer/carts">
                <i class="bi bi-cart me-1 fs-5"></i>
                購物車
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
  }
}
</script>
