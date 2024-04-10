<template>
  <LoadingComponent v-model:active="isLoading" :loadingMessage="loadingMessage"></LoadingComponent>
  <div v-if="isDefault === true">
    <section v-if="cart.carts.length !== 0" class="cart-page container container-title my-6">
      <div data-aos="fade-up" data-aos-delay="450" data-aos-duration="900"
        class="content-shadow border border-1 bg-white rounded-4 d-flex p-4 p-md-6 flex-column">
        <TimelineComponent :active="'productCheck'"></TimelineComponent>
        <button class="btn btn-outline-danger align-self-end mt-4 mb-0 mb-md-4" :disabled="cart.total === 0"
          type="button" @click="deleteCartClick">
          <i class="bi bi-trash"></i>
          清空購物車
        </button>
        <MobileHint></MobileHint>
        <div class="table-container">
          <table class="table align-middle mt-4 mb-0">
            <thead>
              <tr>
                <th class="text-center d-none d-lg-block">產品</th>
                <th class="text-left text-lg-center">品名</th>
                <th class="text-left text-lg-center">單價</th>
                <th class="text-left text-lg-center" style="width: 200px">數量/單位</th>
                <th class="text-left text-lg-center">小計</th>
                <th class="text-left text-lg-center"></th>
              </tr>
            </thead>
            <tbody>
              <template v-if="cart.carts">
                <tr v-for="item in cart.carts" :key="item.id">
                  <td class="text-center d-none d-lg-block">
                    <div @click="routerChange('consumerProductItem', { productID: item.product.id })"
                      class="product-img object-fit w-100"
                      :style="{ backgroundImage: `url(${item.product.imageUrl})` }">
                    </div>
                  </td>
                  <td class="text-left text-lg-center">
                    {{ item.product.title }}
                  </td>
                  <td class="text-left text-lg-center text-pink">
                    $ {{ item.product.price.toLocaleString() }}
                  </td>
                  <td class="text-left text-lg-center" style="width: 200px">
                    <div class="input-group my-4">
                      <button type="button" :disabled="item.qty == 1 || loadingItem === item.id"
                        @click="item.qty--; updateCart(item, item.qty)" class="btn btn-outline-primary">-</button>
                      <input v-model.number="item.qty" min="1" type="number" class="form-control text-center p-0"
                        readonly>
                      <button :disabled="loadingItem === item.id" @click="item.qty++; updateCart(item, item.qty)"
                        type="button" class="btn btn-outline-primary">
                        <span v-if="loadingItem === item.id"><i class="fas fa-spinner fa-pulse"></i></span>
                        <span v-else>+</span>
                      </button>
                      <span class="input-group-text" id="basic-addon2">{{ item.product.unit }}</span>
                    </div>
                  </td>
                  <td class="text-left text-lg-center text-pink">
                    $ {{ item.final_total.toLocaleString() }}
                  </td>
                  <td class="text-left text-lg-center">
                    <i class="bi bi-trash3-fill delProductItem" @click="removeCartItem(item.id)"></i>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
          <div class="total-container align-items-center py-4">
            <h3 class="mb-4 text-bg position-relative z-1 h4">配送方式</h3>
            <div class="row mx-0 mb-4">
              <ul class="col-12 w-100 d-flex flex-column flex-md-row px-2">
                <li class="col-12 col-md-6 pb-3 pe-0 pe-md-3" @click="setShippingMethod('超商')">
                  <div :class="{ active: this.shippingMethod === '超商' }" class="purchase-container py-3 px-4 rounded-3">
                    <span class="purchase-content position-relative ps-5">超商</span>
                  </div>
                </li>
                <li class="col-12 col-md-6 pb-3" @click="setShippingMethod('宅配')">
                  <div :class="{ active: this.shippingMethod === '宅配' }" class="purchase-container py-3 px-4 rounded-3">
                    <span class="purchase-content position-relative ps-5">宅配</span>
                  </div>
                </li>
              </ul>
            </div>
            <h3 class="mb-4 text-bg position-relative z-1 h4">請選擇超商</h3>
            <div class="row mx-0 mb-4">
              <ul class="col-12 w-100 d-flex flex-column flex-md-row px-2">
                <li class="col-12 col-md-6 pb-3 pe-0 pe-md-3" @click="setShippingMethod('7-11取貨')">
                  <div :class="{ active: this.shippingMethod === '7-11取貨' }"
                    class="purchase-container py-3 px-4 rounded-3">
                    <span class="purchase-content position-relative ps-5">7-11取貨</span>
                  </div>
                </li>
                <li class="col-12 col-md-6 pb-3" @click="setShippingMethod('全家取貨')">
                  <div :class="{ active: this.shippingMethod === '全家取貨' }"
                    class="purchase-container py-3 px-4 rounded-3">
                    <span class="purchase-content position-relative ps-5">全家取貨</span>
                  </div>
                </li>
                <li class="col-12 col-md-6 pb-3 pe-0 pe-md-3" @click="setShippingMethod('OK取貨')">
                  <div :class="{ active: this.shippingMethod === 'OK取貨' }"
                    class="purchase-container py-3 px-4 rounded-3">
                    <span class="purchase-content position-relative ps-5">OK取貨</span>
                  </div>
                </li>
                <li class="col-12 col-md-6 pb-3" @click="setShippingMethod('萊爾富取貨')">
                  <div :class="{ active: this.shippingMethod === '萊爾富取貨' }"
                    class="purchase-container py-3 px-4 rounded-3">
                    <span class="purchase-content position-relative ps-5">萊爾富取貨</span>
                  </div>
                </li>
              </ul>
            </div>
            <h3 class="mb-4 text-bg position-relative z-1 h4">請選擇配送區域</h3>
            <div class="row mx-0 mb-4">
              <ul class="col-12 w-100 d-flex flex-column flex-md-row px-2">
                <li class="col-12 col-md-6 pb-3 pe-0 pe-md-3" @click="setShippingMethod('台灣本島')">
                  <div :class="{ active: this.shippingMethod === '台灣本島' }"
                    class="purchase-container py-3 px-4 rounded-3">
                    <span class="purchase-content position-relative ps-5">台灣本島</span>
                  </div>
                </li>
                <li class="col-12 col-md-6 pb-3" @click="setShippingMethod('台灣離島')">
                  <div :class="{ active: this.shippingMethod === '台灣離島' }"
                    class="purchase-container py-3 px-4 rounded-3">
                    <span class="purchase-content position-relative ps-5">台灣離島</span>
                  </div>
                </li>
              </ul>
            </div>
            <h3 class="mb-4 text-bg position-relative z-1 h4">請選擇物流</h3>
            <div class="row mx-0 mb-4">
              <ul class="col-12 w-100 d-flex flex-column flex-md-row px-2">
                <li class="col-12 col-md-6 pb-3 pe-0 pe-md-3" @click="setShippingMethod('黑貓宅急便')">
                  <div :class="{ active: this.shippingMethod === '黑貓宅急便' }"
                    class="purchase-container py-3 px-4 rounded-3">
                    <span class="purchase-content position-relative ps-5">黑貓宅急便</span>
                  </div>
                </li>
              </ul>
            </div>
            <h3 class="mb-4 text-bg position-relative z-1 h4">付款方式</h3>
            <div class="row">
              <ul class="col-12 w-100 d-flex flex-column flex-md-row flex-wrap px-2">
                <li class="col-12 col-md-6 pb-3 pe-0 pe-md-3" @click="setShippingMethod('信用卡')">
                  <div :class="{ active: this.shippingMethod === '信用卡' }"
                    class="purchase-container py-3 px-4 rounded-3">
                    <span class="purchase-content position-relative ps-5">信用卡</span>
                  </div>
                </li>
                <li class="col-12 col-md-6 pb-3" @click="setShippingMethod('ATM轉帳')">
                  <div :class="{ active: this.shippingMethod === 'ATM轉帳' }"
                    class="purchase-container py-3 px-4 rounded-3">
                    <span class="purchase-content position-relative ps-5">ATM轉帳</span>
                  </div>
                </li>
                <li class="col-12 col-md-6 pb-3 pe-0 pe-md-3" @click="setShippingMethod('LinePay')">
                  <div :class="{ active: this.shippingMethod === 'LinePay' }"
                    class="purchase-container py-3 px-4 rounded-3">
                    <span class="purchase-content position-relative ps-5">LinePay</span>
                  </div>
                </li>
                <li class="col-12 col-md-6 pb-3 " @click="setShippingMethod('貨到付款')">
                  <div :class="{ active: this.shippingMethod === '貨到付款' }"
                    class="purchase-container py-3 px-4 rounded-3">
                    <span class="purchase-content position-relative ps-5">貨到付款</span>
                  </div>
                </li>
              </ul>
            </div>
            <h3 class="mb-4 text-bg position-relative z-1 h4">信用卡資訊</h3>
            <VForm ref="creditCardForm" class="col-md-12" v-slot="{ errors }">
              <div class="row">
                <div class="mb-3 col-12">
                  <label for="name" class="form-label required">卡號</label>
                  <VField id="name" name="卡號" type="text" class="form-control py-2"
                    :class="{ 'is-invalid': errors['卡號'] }" placeholder="請輸入卡號" rules="required"></VField>
                  <ErrorMessage name="卡號" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="mb-3 col-12 col-md-6">
                  <label for="period" class="form-label required">卡片有效年月</label>
                  <VField id="period" name="卡片有效年月" type="text" class="form-control py-2"
                    :class="{ 'is-invalid': errors['卡片有效年月'] }" placeholder="請輸入卡片有效年月" rules="required"></VField>
                  <ErrorMessage name="卡片有效年月" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="mb-3 col-12 col-md-6">
                  <label for="checkCode" class="form-label required">檢查碼</label>
                  <VField id="checkCode" name="檢查碼" type="text" class="form-control py-2"
                    :class="{ 'is-invalid': errors['檢查碼'] }" placeholder="請輸入檢查碼" rules="required"></VField>
                  <ErrorMessage name="檢查碼" class="invalid-feedback"></ErrorMessage>
                </div>
              </div>
            </VForm>
            <div class="row pt-3">
              <div class="col-6 col-md-3">
                <span v-if="isVoucher != true" @click="this.isVoucher = true"
                  class="voucher-text text-decoration-none text-pink">使用優惠券</span>
                <div v-if="isVoucher === true" class="input-group">
                  <input placeholder="請輸入love_888" type="text" class="form-control" v-model="couponCode">
                  <button @click="this.getCoupons()" class="btn btn-primary text-white p-2 fs-6">
                    <span v-if="loadingItem === 'spinner'"><i class="fas fa-spinner fa-pulse"></i></span>
                    <span v-else>使用</span>
                  </button>
                </div>
              </div>
              <div v-if="cart.total !== cart.final_total" class="col-6 col-md-9  text-end text-pink">
                總計<span class="text-decoration-line-through">${{ cart.total.toLocaleString() }}</span>/
                <span>${{ cart.final_total.toLocaleString() }}</span>
              </div>
              <div v-else class="col-6 col-md-9 text-end text-pink">
                總計 ${{ cart.total.toLocaleString() }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <EmptyComponent v-if="cart.carts.length === 0">
    </EmptyComponent>
    <RouterButton v-if="cart.carts.length !== 0" :arrowIcon="'right'" :routerName="'consumerCheckout'" :display="'下一步'"
      :type="'button'"></RouterButton>
    <RouterButton v-else :arrowIcon="'left'" :routerName="'consumerProducts'" :query="{ category: '所有產品', page: 1 }"
      :display="'繼續逛逛'"></RouterButton>
  </div>
  <CartDeleteModal ref="dModal" :deleteAllCarts="deleteAllCarts"></CartDeleteModal>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import MobileHint from '@/components/utils/MobileHint.vue'
import CartDeleteModal from '@/components/consumer/cartPage/CartDeleteModal.vue'
import EmptyComponent from '@/components/consumer/cartPage/EmptyComponent.vue'
import TimelineComponent from '@/components/utils/TimelineComponent.vue'
import RouterButton from '@/components/utils/RouterButton.vue'
import { cartStore } from '@/store/Cart.js'
import { loadingStore } from '@/store/Loading.js'
import { updateCartApi, removeCartItemApi, deleteCartsApi, useCouponsApi } from '@/mixin/Api.js'

export default {
  data () {
    return {
      isDefault: false,
      isVoucher: false,
      couponCode: ''
    }
  },
  methods: {
    async getCoupons () {
      this.setLoadItem('spinner')
      try {
        await useCouponsApi(this.couponCode)
        this.getCart()
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
      console.log('this.shippingMethod', this.shippingMethod)
      this.setLoading(true, '商品移除中...請稍後')
      try {
        await removeCartItemApi(id)
        this.getCart()
        this.$showNotification('商品已移除購物車')
      } catch (error) {
        this.$showNotification('Oops...請稍後嘗試')
      } finally {
        this.setLoading(false, '')
      }
    },
    async updateCart (data, qty = 1) {
      this.setLoadItem(data.id)
      const cart = {
        product_id: data.product_id,
        qty
      }
      try {
        await updateCartApi(data.id, cart)
        this.getCart()
      } catch (error) {
        this.$showNotification('Oops...請稍後嘗試')
      } finally {
        this.setLoadItem('')
        this.$toastNotification('success', '已更新購物車數量')
      }
    },
    routerChange (routerName, query) {
      this.$router.push({ name: routerName, query })
    },
    ...mapActions(cartStore, ['getCart', 'setShippingMethod']),
    ...mapActions(loadingStore, ['setLoading', 'setLoadItem'])
  },
  computed: {
    ...mapState(cartStore, ['cart', 'shippingMethod']),
    ...mapState(loadingStore, ['isLoading', 'loadingMessage', 'loadingItem'])
  },
  async mounted () {
    this.setLoading(true, '購物車資料載入中')
    await this.getCart()
    this.isDefault = true
    this.setLoading(false, '')
  },
  components: {
    CartDeleteModal, TimelineComponent, EmptyComponent, RouterButton, MobileHint
  }
}
</script>
