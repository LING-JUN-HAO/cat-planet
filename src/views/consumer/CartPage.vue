<template>
  <LoadingComponent v-model:active="isLoading" :loadingMessage="loadingMessage"></LoadingComponent>
  <section v-if="cart.carts.length !== 0" class="cart-page container container-title py-3">
    <h2 data-aos="fade-down" data-aos-delay="0" data-aos-duration="900" class="text-center py-3 fw-bold">確認商品</h2>
    <div data-aos="fade-up" data-aos-delay="450" data-aos-duration="900"
      class="content-shadow border border-1 bg-white rounded-4 d-flex p-5 flex-column">
      <TimelineComponent :active="'productCheck'"></TimelineComponent>
      <img class="shopping-img my-4" src="../../assets/image/addCart.svg" alt="購物車檢視">
      <button class="btn btn-outline-danger align-self-end" :disabled="cart.total === 0" type="button"
        @click="deleteCartClick">
        <i class="bi bi-trash"></i>
        清空購物車
      </button>
      <div style="overflow: auto; white-space: nowrap;">
        <table class="table align-middle">
          <thead>
            <tr>
              <th class="text-center d-none d-lg-block">產品</th>
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
                <td class="text-center d-none d-lg-block">
                  <div @click="routerChange('product', item.product.id)" class="product-img object-fit w-100"
                    :style="{ backgroundImage: `url(${item.product.imageUrl})` }"></div>
                </td>
                <td class="text-center">
                  {{ item.product.title }}
                </td>
                <td class="text-center text-pink">
                  $ {{ item.product.price.toLocaleString() }}
                </td>
                <td class="text-center" style="width: 200px">
                  <div class="input-group my-4">
                    <button type="button" :disabled="item.qty == 1" @click="item.qty--; updateCart(item, item.qty)"
                      class="btn btn-outline-primary">-</button>
                    <input v-model.number="item.qty" min="1" type="number" class="form-control text-center p-0"
                      readonly>
                    <button @click="item.qty++; updateCart(item, item.qty)" type="button"
                      class="btn btn-outline-primary">+</button>
                    <span class="input-group-text" id="basic-addon2">{{ item.product.unit }}</span>
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
        </table>
        <div class="total-container row align-items-center py-3">
          <div class="col-5 col-md-3 ps-3">
            <span v-if="isVoucher != true" @click="this.isVoucher = true"
              class="voucher-text text-decoration-none text-pink">使用優惠券</span>
            <div v-if="isVoucher === true" class="input-group">
              <input placeholder="請輸入love_888" type="text" class="form-control" v-model="couponCode">
              <button @click="this.getCoupons()" class="btn btn-primary text-white p-2 fs-6">
                <span v-if="loadingItem !== ''"><i class="fas fa-spinner fa-pulse"></i></span>
                <span v-else>使用</span>
              </button>
            </div>
          </div>
          <div v-if="!isCoupon" class="col-5 col-md-9 text-end text-pink">總計 ${{ cart.total.toLocaleString() }}</div>
          <div v-if="isCoupon" class="col-5 col-md-9 text-end text-pink">總計 ${{ this.finalTotal }}/<span
              class="text-decoration-line-through">${{ cart.total.toLocaleString() }}</span></div>
        </div>
      </div>
    </div>
  </section>
  <EmptyComponent v-if="cart.carts.length === 0 && isDefault === true" :cart="cart" :isDefault="isDefault">
  </EmptyComponent>
  <div v-if="isDefault === true" class="pt-3 pb-4 text-center">
    <button v-if="cart.carts.length !== 0" class="btn btn-primary rounded-3 py-2 px-5 text-white" type="button"
      @click="routerChange('complete')">
      填寫聯絡資訊
      <i class="bi bi-caret-right-fill ps-1"></i>
    </button>
    <button v-else type="button" class="btn btn-primary rounded-3 py-2 px-5 text-white" @click="routerChange('back')">
      <i class="bi bi-caret-left-fill pe-1"></i>
      商品頁面
    </button>
  </div>
  <CartDeleteModal ref="dModal" :deleteAllCarts="deleteAllCarts"></CartDeleteModal>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import CartDeleteModal from '@/components/consumer/cartPage/CartDeleteModal.vue'
import EmptyComponent from '@/components/consumer/cartPage/EmptyComponent.vue'
import TimelineComponent from '@/components/utils/TimelineComponent.vue'
import { cartStore } from '@/store/Cart.js'
import { loadingStore } from '@/store/Loading.js'
import { updateCartApi, removeCartItemApi, deleteCartsApi, useCouponsApi } from '@/mixin/Api.js'

export default {
  data () {
    return {
      isDefault: false,
      isVoucher: false,
      isCoupon: false,
      finalTotal: '',
      couponCode: ''
    }
  },
  methods: {
    async getCoupons () {
      this.setLoadItem('spinner')
      try {
        const data = await useCouponsApi(this.couponCode)
        this.finalTotal = data.data.final_total
        this.isCoupon = true
        this.$toastNotification('success', '已套用優惠卷')
      } catch (error) {
        this.$toastNotification('error', '查無此優惠卷')
      } finally {
        this.setLoadItem('')
      }
    },
    deleteCartClick () {
      this.$refs.dModal.openModal()
    },
    async deleteAllCarts () {
      this.setLoading(true, '商品移除中...請稍後')
      this.$refs.dModal.closeModal()
      try {
        await deleteCartsApi()
        this.getCart()
        this.$showNotification('購物車已清空')
      } catch (error) {
        this.$showNotification('Oops...請稍後嘗試')
      } finally {
        this.setLoading(false, '')
      }
    },
    async removeCartItem (id) {
      this.setLoading(true, '商品移除中...請稍後')
      try {
        await removeCartItemApi(id)
        this.$showNotification('商品已移除購物車')
      } catch (error) {
        this.$showNotification('Oops...請稍後嘗試')
      } finally {
        this.getCart()
        this.setLoading(false, '')
      }
    },
    async updateCart (data, qty = 1) {
      const cart = {
        product_id: data.product_id,
        qty
      }
      try {
        await updateCartApi(data.id, cart)
      } catch (error) {
        this.$showNotification('Oops...請稍後嘗試')
      } finally {
        this.getCart()
        this.$toastNotification('success', '已更新購物車數量')
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
    ...mapActions(cartStore, ['getCart']),
    ...mapActions(loadingStore, ['setLoading', 'setLoadItem'])
  },
  computed: {
    ...mapState(cartStore, ['cart']),
    ...mapState(loadingStore, ['isLoading', 'loadingMessage', 'loadingItem'])
  },
  async mounted () {
    this.setLoading(true, '購物車資料載入中')
    await this.getCart()
    this.isDefault = true
    this.setLoading(false, '')
  },
  components: {
    CartDeleteModal, TimelineComponent, EmptyComponent
  }
}
</script>
