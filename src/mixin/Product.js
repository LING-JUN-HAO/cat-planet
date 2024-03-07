export const cartMixin = {
  methods: {
    async addToCart (id, qty = 1) {
      this.loadingStatus.loadingItem = id // 使用組件中的 data 屬性
      // 其他程式碼...
    }
  }
}
