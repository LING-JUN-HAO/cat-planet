<template>
  <div class="productList-container col-12 col-xl-9 row pe-0">
    <!-- <div class="col-12 d-flex justify-content-end py-2" style="height: 3.5em;">
      <label for="search" class="form-label pe-2 mt-auto">搜尋</label>
      <input name="search" type="text" class="form-control" style="width: 250px;" @input="$emit('searchValue', $event.target.value)">
    </div> -->
    <div v-for="item in products" :key="item.id" class="card-container col-12 col-sm-6 col-lg-4 mb-4 text-center pe-0">
      <div class="image-container border border-1 border-secondary rounded-1" @click="this.$router.push({ name: 'consumerProductItem', query: { productID: item.id } })">
        <div class="overflow-hidden position-relative">
          <img :src="item.imageUrl" :alt="item.id" class="w-100 object-fit-cover productImg ">
          <div class="w-100 position-absolute top-50 translate-middle-y">
            <button type="button" class="btn btn-danger p-3 rounded-2 me-4"
              @click="this.$router.push({ name: 'consumerProductItem', query: { productID: item.id } })">
              <i class="bi bi-search fs-4"></i>
            </button>
            <button type="button" class="btn btn-hex p-3 rounded-2" @click.stop="addToCart(item.id)"
              :disabled="loadingItem === item.id || !item.is_enabled">
              <i class="fas fa-spinner fa-pulse" v-if="loadingItem === item.id"></i>
              <i class="bi bi-cart fs-4" v-else></i>
            </button>
          </div>
        </div>
        <div class="container py-3">
          <h3 class="fs-5 fw-bold my-3">{{ item.title }}</h3>
          <p>
            <span class="fs-5 text-pink fw-bold">NT{{ item.origin_price }}</span>
            <span class="text-decoration-line-through ps-3 fs-6">原價 : NT {{ item.price }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { cartStore } from '@/store/Cart.js'
import { loadingStore } from '@/store/Loading.js'

export default {
  props: ['products'],
  methods: {
    ...mapActions(cartStore, ['addToCart'])
  },
  computed: {
    ...mapState(loadingStore, ['loadingItem'])
  }
}
</script>
