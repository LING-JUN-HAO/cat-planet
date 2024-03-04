<template>
  <div>
    <main class="bg-gray">
      <section class="container container-title py-3 category">
        <h2 class="text-center py-3 fw-bold">商品分類</h2>
        <div class="content-shadow border border-1 bg-white rounded-4 d-flex p-5">
          <div style="flex: 1;">
            <img :src="product.imageUrl" alt="主要圖片" class="w-100 object-fit-cover">
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-6">
                <img class="img-fluid" :src="product.imageUrl" :alt="product.id">
              </div>
              <div class="col-sm-6">
                <h5 class="modal-title" id="exampleModalLabel">
                  <span>{{ product.title }}</span>
                </h5>
                <span class="badge bg-primary rounded-pill">{{ product.category }}</span>
                <p class="my-3">商品描述：{{ product.description }}</p>
                <p class="my-3">商品內容：{{ product.content }}</p>
                <div class="h5" v-if="!product.price">{{ product.origin_price }} 元</div>
                <del class="h6 my-3" v-if="product.price">原價 {{ product.origin_price }} 元</del>
                <div class="h5 my-3" v-if="product.price">現在只要 {{ product.price }} 元</div>
                <div>
                  <div class="input-group">
                    <select class="form-select" v-model.number="qty">
                      <option v-for="i in 20" :key="i" :value="i" selected>{{ i }}</option>
                    </select>
                    <button type="button" class="btn btn-primary"
                      @click="$emit('add-to-cart', product.id, qty)">加入購物車</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { cartStore } from '@/store/Store.js'
import { mapActions } from 'pinia'
const { VITE_API, VITE_PATH } = import.meta.env

export default {
  data () {
    return {
      product: {}
    }
  },
  methods: {
    async getProduct (id) {
      try {
        const productInfo = await this.$http.get(`${VITE_API}/api/${VITE_PATH}/product/${id}`)
        this.product = productInfo.data.product
      } catch (error) {
        this.$showNotification('Oops...請稍後嘗試')
      } finally {
        this.loadingStatus.loadingItem = ''
      }
    },
    ...mapActions(cartStore, ['getCart'])
  },
  mounted () {
    const query = this.$route.query
    const { productID } = query
    this.getProduct(productID)
    this.getCart()
  },
}
</script>

<style lang="scss" scoped>
// 共用
.container-title>h2 {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #6c5c53;
}

.container-title>h2::before,
.container-title>h2::after {
  content: '';
  height: 5px;
  width: 40px;
  background-color: #6c5c53;
}

.container-title>h2::before {
  margin-right: 10px;
}

.container-title>h2::after {
  margin-left: 10px;
}

.content-shadow {
  box-shadow: 0 0 30px #ccc;
}
</style>
