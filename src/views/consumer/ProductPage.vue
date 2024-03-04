<template>
  <div>
    <main class="bg-gray">
      <section class="container container-title py-3 category">
        <h2 class="text-center py-3 fw-bold">各項精美商品</h2>
        <div class="row">
          <div class="col-3">
            <ul class="text-center">
              <li class="p-2 category-container"
                :class="{ active: $route.query.category === '所有產品' || !$route.query.category }">
                <router-link :to="{ path: '/consumer/products', query: { category: '所有產品', page: 1 } }"
                  class="category-title text-decoration-none">
                  所有產品
                </router-link>
              </li>
              <li class="p-2 category-container" :class="{ active: $route.query.category === '貓咪玩具' }">
                <router-link :to="{ path: '/consumer/products', query: { category: '貓咪玩具', page: 1 } }"
                  class="category-title text-decoration-none">
                  貓咪玩具
                </router-link>
              </li>
              <li class="p-2 category-container" :class="{ active: $route.query.category === '美容護理' }">
                <router-link :to="{ path: '/consumer/products', query: { category: '美容護理', page: 1 } }"
                  class="category-title text-decoration-none">
                  美容護理
                </router-link>
              </li>
              <li class="p-2 category-container" :class="{ active: $route.query.category === '飲食用品' }">
                <router-link :to="{ path: '/consumer/products', query: { category: '飲食用品', page: 1 } }"
                  class="category-title text-decoration-none">
                  飲食用品
                </router-link>
              </li>
              <li class="p-2 category-container" :class="{ active: $route.query.category === '貓咪床窩' }">
                <router-link :to="{ path: '/consumer/products', query: { category: '貓咪床窩', page: 1 } }"
                  class="category-title text-decoration-none">
                  貓咪床窩
                </router-link>
              </li>
            </ul>
          </div>
          <div class="col-9 row">
              <div v-for="item in products" :key="item.id" class="col-4 mb-4 text-center">
                <div class="border border-1 border-hex pb-4 rounded-1">
                  <div class="overflow-hidden" @click="productItemOnclick(item.id)">
                    <img :src="item.imageUrl" :alt="item.id" class="w-100 object-fit-cover productImg ">
                  </div>
                  <div class="container">
                    <h3 class="fs-5 fw-bold my-3">{{ item.title }}</h3>
                    <p>
                      <span class="fs-5">NT{{ item.price }}</span>
                      <span class="text-decoration-line-through ps-3 fs-6">原價: {{ item.origin_price }}</span>
                    </p>
                    <div class="btn-group w-100">
                      <button type="button" class="btn btn-outline-danger py-2" @click="productItemOnclick(item.id)">
                        <i class="bi bi-heart-fill fs-4"></i>
                      </button>
                      <button type="button" class="btn btn-outline-hex py-2" @click="addToCart(item.id)"
                        :disabled="loadingStatus.loadingItem === item.id || !item.is_enabled">
                        <i class="fas fa-spinner fa-pulse" v-if="loadingStatus.loadingItem === item.id"></i>
                        <i class="bi bi-cart-fill fs-4" v-else></i>
                      </button>
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
      loadingStatus: {
        loadingItem: ''
      },
      products: []
    }
  },
  methods: {
    async getProducts (category, page = 1) {
      try {
        let productsInfo
        if (category === '所有產品') {
          productsInfo = await this.$http.get(`${VITE_API}/api/${VITE_PATH}/products?page=${page}`)
        } else {
          productsInfo = await this.$http.get(`${VITE_API}/api/${VITE_PATH}/products?category=${category}&page=${page}`)
        }
        this.products = productsInfo.data.products
      } catch (error) {
        this.$showNotification('Oops...請稍後嘗試')
      }
    },
    productItemOnclick(id){
      this.$router.push({ name: 'consumerProductItem', query: { 'productID': id} })
    },
    async addToCart (id, qty = 1) {
      this.loadingStatus.loadingItem = id
      const cart = {
        product_id: id,
        qty
      }
      try {
        await this.$http.post(`${VITE_API}/api/${VITE_PATH}/cart`, { data: cart })
        this.getCart()
        this.$showNotification('商品已加入購物車')
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
    const { category, page } = query
    this.getProducts(category, page)
    this.getCart()
  },
  watch: {
    '$route.query': function (newVal, oldVal) {
      const query = this.$route.query
      const { category, page } = query
      this.getProducts(category, page)
    }
  }
}
</script>
<style lang="scss" scoped>
.content-shadow {
  box-shadow: 0 0 30px #ccc;
}
.category-title {
  color: #6c5c53;
}
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
.category-container {
  cursor: pointer;
}
.category-container:hover,
.category-container.active {
  background-color: #6c5c53;
}
.category-container:hover .category-title,
.category-container.active .category-title {
  color: white;
}
// 產品圖片
.productImg {
  height: 250px;
  transition: all ease .3s;
}

.productImg:hover {
  cursor: pointer;
  scale: 1.1;
}
</style>
