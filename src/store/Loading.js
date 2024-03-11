import { defineStore } from 'pinia'

export const loadingStore = defineStore('loadingStore', {
  state: () => ({
    isLoading: false,
    ZoneLoadingID: '',
    loadingMessage: '資料處理中...請稍候'
  }),
  actions: {
    setLoading (isLoading, loadingMessage) {
      this.isLoading = isLoading
      this.loadingMessage = loadingMessage
    }
  }
})
