<template>
  <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>{{ product.title }}</span>
          </h5>
          <button type="button" class="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-6">
              <img class="img-fluid" :src="product.imageUrl" alt="">
            </div>
            <div class="col-sm-6">
              <span class="badge bg-primary rounded-pill">{{ product.category }}</span>
              <p class="my-3">商品描述：{{ product.description }}</p>
              <p class="my-3">商品內容：{{ product.content }}</p>
              <div class="h5" v-if="!product.price">{{ product.origin_price }} 元</div>
              <del class="h6 my-3" v-if="product.price">原價 {{ product.origin_price }} 元</del>
              <div class="h5 my-3" v-if="product.price">現在只要 {{ product.price }} 元</div>
              <div>
                <div class="input-group">
                  <select class="form-select" v-model.number="qty">
                    <option v-for="i in 20" :key="i" :value="i" selected >{{ i }}</option>
                  </select>
                  <button type="button" class="btn btn-primary"
                    @click="$emit('add-to-cart', product.id, qty)">加入購物車</button>
                </div>
              </div>
            </div>
            <!-- col-sm-6 end -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product'],
  data () {
    return {
      qty: '',
      modal: null
    }
  },
  methods: {
    openModal () {
      this.qty = 1
      this.modal.show()
    },
    hideModal () {
      this.modal.hide()
    }
  },
  mounted () {
    // eslint-disable-next-line no-undef
    this.modal = new bootstrap.Modal(this.$refs.modal, {
      keyboard: false,
      backdrop: 'static'
    })
  }
}
</script>
