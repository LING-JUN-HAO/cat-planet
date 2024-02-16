<template>
  <div>
    <div class="container">
      <div class="text-end my-3">
        <button class="btn btn-outline-danger" :disabled="cart.total === 0" type="button" @click="deleteCartClick">清空購物車
        </button>
      </div>
      <table class="table align-middle">
        <thead>
          <tr>
            <th></th>
            <th class="text-center">品名</th>
            <th class="text-center" style="width: 200px">數量/單位</th>
            <th class="text-center">單價</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="cart.carts">
            <tr v-for="item in cart.carts" :key="item.id">
              <td>
                <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCartItem(item.id)"
                  :disabled="loadingStatus.loadingItem === item.id">
                  <i class="fas fa-spinner fa-pulse" v-if="loadingStatus.loadingItem === item.id"></i>
                  x
                </button>
              </td>
              <td class="text-center">
                {{ item.product.title }}
                <div class="text-success" v-if="item.coupon">
                  已套用優惠券
                </div>
              </td>
              <td>
                <div class="input-group input-group-sm">
                  <div class="input-group mb-3">
                    <button type="button" :disabled="item.qty == 1" @click="item.qty--; updateCart(item, item.qty)"
                      class="btn btn-outline-primary">-</button>
                    <input v-model.number="item.qty" :disabled="loadingStatus.loadingItem === item.id" min="1"
                      type="number" class="form-control text-center" readonly>
                    <button @click="item.qty++; updateCart(item, item.qty)" type="button"
                      class="btn btn-outline-primary">+</button>
                    <span class="input-group-text" id="basic-addon2">{{ item.product.unit }}</span>
                  </div>
                </div>
              </td>
              <td class="text-center">
                <small v-if="cart.final_total !== cart.total" class="text-success">折扣價：</small>
                {{ item.final_total }}
              </td>
            </tr>
          </template>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-end">總計</td>
            <td class="text-end">{{ cart.total }}</td>
          </tr>
          <tr v-if="cart.final_total !== cart.total">
            <td colspan="3" class="text-end text-success">折扣價</td>
            <td class="text-end text-success">{{ cart.final_total }}</td>
          </tr>
        </tfoot>
      </table>
      <div class="text-end my-3">
        <button class="btn btn-outline-primary" :disabled="cart.carts.length === 0" type="button"
          @click="checkConfirm">確認結帳</button>
      </div>
    </div>
    <!-- Modal -->
    <spinner-modal ref="sModal" :loadingMessage="loadingMessage"></spinner-modal>
    <consumer-cart-delete-modal ref="dModal" :deleteAllCarts="deleteAllCarts"></consumer-cart-delete-modal>
  </div>
</template>
<script>
import { mapState } from 'pinia'
import ConsumerCartDeleteModal from '@/components/ConsumerCartDeleteModal.vue'
import SpinnerModal from '@/components/SpinnerModal.vue'
import ShowNotification from '@/mixin/Swal.js'
import { cartStore } from '@/store/Store.js'

const { VITE_API, VITE_PATH } = import.meta.env

export default {
  data () {
    return {
      cartStore: cartStore(),
      loadingStatus: {
        loadingItem: ''
      },
      loadingMessage: '資料操作中...請稍後'
    }
  },
  methods: {
    deleteCartClick () {
      this.$refs.dModal.openModal()
    },
    async deleteAllCarts () {
      this.$refs.dModal.closeModal()
      this.$refs.sModal.openModal()
      try {
        await this.$http.delete(`${VITE_API}/api/${VITE_PATH}/carts`)
        this.cartStore.getCart()
        ShowNotification('購物車已清空')
      } catch (error) {
        ShowNotification('Oops...請稍後嘗試')
      } finally {
        this.$refs.sModal.closeModal()
      }
    },
    async removeCartItem (id) {
      this.loadingStatus.loadingItem = id
      try {
        await this.$http.delete(`${VITE_API}/api/${VITE_PATH}/cart/${id}`)
        this.loadingStatus.loadingItem = ''
        this.cartStore.getCart()
        ShowNotification('商品已移除購物車')
      } catch (error) {
        ShowNotification('Oops...請稍後嘗試')
      } finally {
        this.$refs.sModal.closeModal()
      }
    },
    async updateCart (data, qty = 1) {
      this.loadingStatus.loadingItem = data.id
      const cart = {
        product_id: data.product_id,
        qty: qty
      }
      try {
        await this.$http.put(`${VITE_API}/api/${VITE_PATH}/cart/${data.id}`, { data: cart })
        this.loadingStatus.loadingItem = ''
        this.cartStore.getCart()
      } catch (error) {
        ShowNotification('Oops...請稍後嘗試')
      } finally {
        this.loadingStatus.loadingItem = ''
      }
    },
    checkConfirm () {
      this.$router.push({ name: 'consumerCheckout' })
    }
  },
  computed: {
    ...mapState(cartStore, ['cart'])
  },
  mounted () {
    this.cartStore.getCart()
  },
  components: {
    SpinnerModal, ConsumerCartDeleteModal
  }
}
</script>
