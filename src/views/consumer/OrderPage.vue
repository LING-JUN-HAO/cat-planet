<template>
  <LoadingComponent v-model:active="isLoading" :loadingMessage="loadingMessage"></LoadingComponent>
  <section class="order-page container container-title">
    <h2 data-aos="fade-down" data-aos-delay="0" data-aos-duration="900" class="text-center py-6 m-0 fw-bold">查詢訂單</h2>
    <div data-aos="fade-up" data-aos-delay="450" data-aos-duration="900"
      class="content-shadow border border-1 bg-white rounded-4 d-flex p-4 p-md-6 flex-column">
      <TimelineComponent :active="'orderCheck'"></TimelineComponent>
      <img class="shopping-img d-none d-md-block" src="../../assets/image/orderFinish.svg" alt="購物完成">
      <div class="order-page-box pt-4">
        <h3 class="p-2 mb-4 text-bg position-relative z-1 h4">訂單資訊</h3>
        <div>
          <div class="row mb-0 mb-md-4">
            <div class="col-12 col-md-6 pb-4 pb-md-0">
              訂單編號：{{ orderInfo.id }}
            </div>
            <div class="col-12 col-md-6">
              總金額：{{ orderInfo.total?.toLocaleString() }}
            </div>
          </div>
        </div>
      </div>
      <div class="order-page-box pt-4">
        <h3 class="p-2 mb-4 text-bg position-relative z-1 h4">商品資訊</h3>
        <div style="overflow: auto; white-space: nowrap;">
          <table class="table align-middle">
            <thead>
              <tr>
                <th class="text-center d-none d-lg-block">產品</th>
                <th class="text-left">品名</th>
                <th class="text-left">單價</th>
                <th class="text-left">數量</th>
                <th class="text-left">小計</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="products?.length !== 0">
                <tr v-for="item in products" :key="item.id">
                  <td class="text-left d-none d-lg-block">
                    <div @click="routerChange('product', item.product.id)" class="product-img"
                      :style="{ backgroundImage: `url(${item.product.imageUrl})` }"></div>
                  </td>
                  <td class="text-left">
                    {{ item.product.title }}
                  </td>
                  <td class="text-left text-pink">
                    $ {{ item.product.price.toLocaleString() }}
                  </td>
                  <td class="text-left text-pink">
                    {{ item.qty }}
                  </td>
                  <td class="text-left text-pink">
                    $ {{ item.final_total.toLocaleString() }}
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
      <div class="order-page-box pt-4">
        <h3 class="p-2 mb-4 text-bg position-relative z-1 h4">購物人資訊</h3>
        <div class="text-break">
          <div class="row mb-0 mb-md-4">
            <div class="col-12 col-md-6 pb-4 pb-md-0">
              姓名：{{ orderInfo.user?.name }}
            </div>
            <div class="col-12 col-md-6 pb-4 pb-md-0">
              信箱：{{ orderInfo.user?.email }}
            </div>
          </div>
          <div class="row mb-0 mb-md-4">
            <div class="col-12 col-md-6 pb-4 pb-md-0">
              電話：{{ orderInfo.user?.tel }}
            </div>
            <div class="col-12 col-md-6 pb-4 pb-md-0">
              住址：{{ orderInfo.user?.address }}
            </div>
          </div>
          <div class="row mb-0 mb-md-4">
            <div class="col-12">
              備註：{{ orderInfo?.message }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="py-6 text-center">
    <RouterButton :arrowIcon="'left'" :routerName="'consumerProducts'" :query="{ category: '所有產品', page: 1 }"
      :display="'商品頁面'"></RouterButton>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import TimelineComponent from '@/components/utils/TimelineComponent.vue'
import RouterButton from '@/components/utils/RouterButton.vue'
import { loadingStore } from '@/store/Loading.js'
import { getOrderApi } from '@/mixin/Api.js'

export default {
  data () {
    return {
      products: [],
      orderInfo: {}
    }
  },
  methods: {
    async getOrder (id) {
      try {
        this.setLoading(true, '商品讀取中...請稍後')
        const orderInfo = await getOrderApi(id)
        this.products = orderInfo.order.products
        this.orderInfo = orderInfo.order
      } catch (error) {
        this.$showNotification('Oops...請稍後嘗試')
      } finally {
        this.setLoading(false, '')
      }
    },
    routerChange (type = 'back', id) {
      if (type === 'back') {
        this.$router.push({ name: 'consumerProducts', query: { category: '所有產品', page: 1 } })
      } else if (type === 'product') {
        this.$router.push({ name: 'consumerProductItem', query: { productID: id } })
      }
    },
    ...mapActions(loadingStore, ['setLoading'])
  },
  computed: {
    ...mapState(loadingStore, ['isLoading', 'loadingMessage'])
  },
  async mounted () {
    await this.getOrder(this.$route.query.orderID)
  },
  components: {
    TimelineComponent, RouterButton
  }
}
</script>
