import { defineStore } from 'pinia'

export const backendDataListStore = defineStore('backendDataListStore', {
  state: () => ({
    data: {},
    dataList: [],
    pages: {},
    isNew: false
  }),
  actions: {
    setDataList (dataList, pages) {
      this.dataList = dataList
      this.pages = pages
    },
    setData (data) {
      this.data = data
    },
    setIsNew (status) {
      this.isNew = status
    }
  }
})
