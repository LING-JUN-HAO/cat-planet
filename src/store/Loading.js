import { defineStore } from 'pinia'

export const loadingStore = defineStore('loadingStore', {
  state: () => ({
    isLoading: false,
    loadingMessage: '資料處理中...請稍候',
    loadingItem: ''
  }),
  actions: {
    setLoading (isLoading, loadingMessage) {
      this.isLoading = isLoading
      this.loadingMessage = loadingMessage
    },
    setLoadItem (visible) {
      this.loadingItem = visible
    }
  }
})
