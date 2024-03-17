<template>
  <Loading v-model:active="isLoading" :loadingMessage="loadingMessage"></Loading>
  <section class="order-page container container-title py-3">
    <h2 data-aos="fade-down" data-aos-delay="0" data-aos-duration="900" class="text-center py-3 fw-bold">查詢訂單</h2>
    <div data-aos="fade-up" data-aos-delay="450" data-aos-duration="900"  class="content-shadow border border-1 bg-white rounded-4 d-flex p-5 flex-column">
      <Timeline :active="'orderCheck'"></Timeline>
      <img class="shopping-img" src="../../assets/image/orderFinish.svg" alt="購物完成">
      <div class="order-page-box">
        <h3 class="p-2 mb-3 text-bg position-relative z-1 h4">訂單資訊</h3>
        <div>
          <div class="row p-2 mb-2">
            <div class="col-6 order-text">
              訂單編號：{{ orderInfo.create_at }}
            </div>
            <div class="col-6">
              總金額：{{ orderInfo.total?.toLocaleString() }}
            </div>
          </div>
        </div>
      </div>
      <div class="order-page-box">
        <h3 class="p-2 mb-3 text-bg position-relative z-1 h4">商品資訊</h3>
        <table class="table align-middle">
          <thead>
            <tr>
              <th class="text-center">產品</th>
              <th class="text-center">品名</th>
              <th class="text-center">單價</th>
              <th class="text-center">數量</th>
              <th class="text-center">小計</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="products?.length !== 0">
              <tr v-for="item in products" :key="item.id">
                <td class="text-center">
                  <div @click="routerChange('product', item.product.id)" class="product-img"
                    :style="{ backgroundImage: `url(${item.product.imageUrl})` }"></div>
                </td>
                <td class="text-center">
                  {{ item.product.title }}
                </td>
                <td class="text-center text-pink">
                  $ {{ item.product.price.toLocaleString() }}
                </td>
                <td class="text-center text-pink">
                  {{ item.qty }}
                </td>
                <td class="text-center text-pink">
                  $ {{ item.final_total.toLocaleString() }}
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <div class="order-page-box">
        <h3 class="p-2 mb-3 text-bg position-relative z-1 h4">購物人資訊</h3>
        <div>
          <div class="row p-2 mb-2">
            <div class="col-6 order-text">
              姓名：{{ orderInfo.user?.name }}
            </div>
            <div class="col-6">
              信箱：{{ orderInfo.user?.email }}
            </div>
          </div>
          <div class="row p-2 mb-2">
            <div class="col-6">
              電話：{{ orderInfo.user?.tel }}
            </div>
            <div class="col-6">
              住址：{{ orderInfo.user?.address }}
            </div>
          </div>
          <div class="row p-2 mb-2">
            <div class="col-12">
              備註：{{ orderInfo?.message }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div data-aos="zoom-in-up" data-aos-delay="0" data-aos-duration="900" class="pt-3 pb-4 text-center">
    <button type="button" class="btn btn-primary rounded-3 py-2 px-5 text-white" @click="routerChange('back')">
      <i class="bi bi-caret-left-fill pe-1"></i>
      商品頁面
    </button>
  </div>
</template>

<script>
import Timeline from '@/components/Timeline.vue'
const { VITE_API, VITE_PATH } = import.meta.env

export default {
  data () {
    return {
      loadingMessage: '商品讀取中...請稍後',
      isLoading: false,
      products: [],
      orderInfo: {}
    }
  },
  methods: {
    async getOrder (id) {
      try {
        this.isLoading = true
        const orderInfo = await this.$http.get(`${VITE_API}/api/${VITE_PATH}/order/${id}`)
        this.products = orderInfo.data.order.products
        this.orderInfo = orderInfo.data.order
        console.log('orderInfo', orderInfo)
        console.log('products', this.products)
      } catch (error) {
        this.$showNotification('Oops...請稍後嘗試')
      } finally {
        this.isLoading = false
      }
    },
    routerChange (type = 'back', id) {
      if (type === 'back') {
        this.$router.push({ name: 'consumerProducts', query: { category: '所有產品', page: 1 } })
      } else if (type === 'product') {
        this.$router.push({ name: 'consumerProductItem', query: { productID: id } })
      } else {
        this.$router.push({ name: 'consumerCheckout' })
      }
    }
  },
  async mounted () {
    await this.getOrder(this.$route.query.orderID)
  },
  components: {
    Timeline
  }
}
</script>
<style lang="scss" scoped>
.text-bg:before {
  content: '';
  position: absolute;
  bottom: 0;
  height: 50%;
  width: 100%;
  background: rgba(238, 238, 238, .6);
  z-index: -1;
}
</style>
