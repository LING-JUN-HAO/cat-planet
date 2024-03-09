<template>
  <Loading v-model:active="isLoading" :loadingMessage="loadingMessage"></Loading>
  <section class="cart-page container container-title py-3">
    <h2 data-aos="fade-down" data-aos-delay="0" data-aos-duration="900" class="text-center py-3 fw-bold">商品確認</h2>
    <div data-aos="fade-up" data-aos-delay="450" data-aos-duration="900" class="content-shadow border border-1 bg-white rounded-4 d-flex p-5 flex-column">
      <Timeline :active="'productCheck'"></Timeline>
      <img class="shopping-img" src="../../assets/image/addCart.svg" alt="購物車檢視">
      <button class="btn btn-outline-danger align-self-end" :disabled="cart.total === 0" type="button"
        @click="deleteCartClick">
        <i class="bi bi-trash"></i>
        清空購物車
      </button>
      <table class="table align-middle">
        <thead>
          <tr>
            <th class="text-center">產品</th>
            <th class="text-center">品名</th>
            <th class="text-center">單價</th>
            <th class="text-center" style="width: 200px">數量/單位</th>
            <th class="text-center">小計</th>
            <th class="text-center"></th>
          </tr>
        </thead>
        <tbody>
          <template v-if="cart.carts">
            <tr v-for="item in cart.carts" :key="item.id">
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
              <td class="text-center">
                <div class="input-group input-group-sm">
                  <div class="input-group my-4">
                    <button type="button" :disabled="item.qty == 1" @click="item.qty--; updateCart(item, item.qty)"
                      class="btn btn-outline-primary">-</button>
                    <input v-model.number="item.qty" min="1" type="number" class="form-control text-center p-0" readonly>
                    <button @click="item.qty++; updateCart(item, item.qty)" type="button"
                      class="btn btn-outline-primary">+</button>
                    <span class="input-group-text" id="basic-addon2">{{ item.product.unit }}</span>
                  </div>
                </div>
              </td>
              <td class="text-center text-pink">
                $ {{ item.final_total.toLocaleString() }}
              </td>
              <td class="text-center">
                <i class="bi bi-trash3-fill delProductItem" @click="removeCartItem(item.id)"></i>
              </td>
            </tr>
          </template>
        </tbody>
        <tfoot>
          <tr class="py-5">
            <td colspan="5" class="text-end py-3">總計</td>
            <td class="text-center text-pink">{{ cart.total.toLocaleString() }}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </section>
  <div class="pt-3 pb-4 text-center">
    <button v-if="cart.carts.length !== 0" class="btn btn-primary rounded-3 py-2 px-5 text-white" type="button"
      @click="routerChange('complete')">
      確認結帳
      <i class="bi bi-caret-right-fill ps-1"></i>
    </button>
    <button v-else type="button" class="btn btn-primary rounded-3 py-2 px-5 text-white" @click="routerChange('back')">
      <i class="bi bi-caret-left-fill pe-1"></i>
      商品頁面
    </button>
  </div>
  <ConsumerCartDeleteModal ref="dModal" :deleteAllCarts="deleteAllCarts"></ConsumerCartDeleteModal>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { cartStore } from '@/store/Store.js'
import ConsumerCartDeleteModal from '@/components/ConsumerCartDeleteModal.vue'
import Timeline from '@/components/Timeline.vue'

const { VITE_API, VITE_PATH } = import.meta.env

export default {
  data () {
    return {
      loadingStatus: {
        loadingItem: ''
      },
      loadingMessage: '商品讀取中...請稍後',
      isLoading: false
    }
  },
  methods: {
    deleteCartClick () {
      this.$refs.dModal.openModal()
    },
    async deleteAllCarts () {
      this.loadingMessage = '商品移除中...請稍後'
      this.isLoading = true
      this.$refs.dModal.closeModal()
      try {
        await this.$http.delete(`${VITE_API}/api/${VITE_PATH}/carts`)
        this.getCart()
        this.$showNotification('購物車已清空')
      } catch (error) {
        this.$showNotification('Oops...請稍後嘗試')
      } finally {
        this.isLoading = false
      }
    },
    async removeCartItem (id) {
      this.loadingMessage = '商品移除中...請稍後'
      this.isLoading = true
      try {
        await this.$http.delete(`${VITE_API}/api/${VITE_PATH}/cart/${id}`)
        this.getCart()
        this.$showNotification('商品已移除購物車')
      } catch (error) {
        this.$showNotification('Oops...請稍後嘗試')
      } finally {
        this.isLoading = false
      }
    },
    async updateCart (data, qty = 1) {
      this.loadingMessage = '資料更改中...請稍後'
      this.isLoading = true
      const cart = {
        product_id: data.product_id,
        qty: qty
      }
      try {
        await this.$http.put(`${VITE_API}/api/${VITE_PATH}/cart/${data.id}`, { data: cart })
        await this.getCart()
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
    },
    ...mapActions(cartStore, ['getCart'])
  },
  computed: {
    ...mapState(cartStore, ['cart'])
  },
  async mounted () {
    this.isLoading = true
    await this.getCart()
    this.isLoading = false
  },
  components: {
    ConsumerCartDeleteModal, Timeline
  }
}
</script>
