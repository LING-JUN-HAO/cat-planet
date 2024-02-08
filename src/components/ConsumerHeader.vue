<template>
  <header class="sticky-top ">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link class="navbar-brand ps-4" active-class="active" to="/admin/products">前台使用介面</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
          aria-controls="navbarText" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mb-2 mb-lg-0 w-100 justify-content-end pe-4">
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" to="/consumer/products">貓咪用品</router-link>
            </li>
            <li class="nav-item position-relative">
              <div class="position-absolute  text-white fs-6 d-flex align-items-center justify-content-center rounded-circle cartNumber">{{ cart.carts.length }}</div>
              <router-link class="nav-link" active-class="active" to="/consumer/carts">購物車</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
<script>
import { mapState } from 'pinia'
import { cartStore } from '@/store/Store.js'

export default {
  computed: {
    ...mapState(cartStore, ['cart'])
  }
}
</script>
<style>
.cartNumber{
  background-color: #ca7658;
  left: 78%;
  height: 20px;
  width: 20px;
}
</style>
