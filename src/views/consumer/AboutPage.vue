<template>
  <div class="container container-title mb-6">
    <h2 data-aos="fade-down" data-aos-delay="0" data-aos-duration="900" class="text-center py-6 m-0 fw-bold">喵星球的精神</h2>
    <div v-for="(product, index) in products" :key="index" data-aos="fade-up" data-aos-delay="450"
      data-aos-duration="900" class="row mb-4 mb-lg-0 flex-column-reverse flex-lg-row p-lg-0">
      <div class="col-lg-6 d-flex align-items-center justify-content-center pt-3 pt-lg-0"
        :class="{ 'order-lg-2': index % 2 === 0 }">
        <div class="p-lg-6">
          <h3 class="fw-bold text-center pb-2" style="letter-spacing: .125rem;">{{ product.name }}</h3>
          <p class="fs-5">{{ product.description }}</p>
        </div>
      </div>
      <div class="col-lg-6 p-lg-0" :class="{ 'order-lg-1': index % 2 === 0 }">
        <img class="w-100 object-fit-cover" :src="product.image" :alt="product.name" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import { cartStore } from '@/store/Cart.js'

export default {
  data () {
    return {
      products: [
        {
          name: '專業護理貓抓板',
          description: '結合專業護理和創新設計的貓抓板。不僅提供最優質的抓爬體驗，更為您的貓咪的健康和幸福保駕護航。我們的貓抓板採用環保材質，設計獨特且具美感，絕對是您家貓咪的必備品。',
          image: 'https://images.unsplash.com/photo-1625241589108-d4ceb8dbcc4d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
          name: '獨特設計玩具組合',
          description: '探索無盡樂趣的獨特設計玩具組合。我們精心挑選各式各樣的貓咪玩具，包括智力訓練玩具、互動式玩具等，讓您的貓咪享受豐富多彩的遊戲時光。每個玩具都經過嚴格挑選，確保安全和耐用。',
          image: 'https://images.unsplash.com/photo-1609533440656-68c27fc2862d?q=80&w=2876&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
          name: '關懷貓咪溫暖睡窩',
          description: '貼心關懷，讓愛貓感受到家的溫暖。我們的溫暖睡窩以柔軟舒適的材質打造，設計符合貓咪的睡眠習慣，給予牠們最溫馨的安睡空間。每一款睡窩都是用愛心製作，為您的貓咪帶來無比的舒適。',
          image: 'https://storage.googleapis.com/vue-course-api.appspot.com/antoniovue/1710053615756.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=dUFh%2FRi91n6fKUTqcUMJRLtIqQ41ht%2FOsp%2BFvRychsRfGDrjpli0jICKyZBUy14%2FRU40fAkDJrMZ2xBoaNQFENqnwPfTYhOZNiZK8VXUjkeg3hgVPfS34dwk3tInFjJ4pkkClk1G5JRoo2kxRGjz89WjVD%2Bfc0QL67qd%2BNMPUUYzCLU1eajhSMvQoFP%2FjZOYmve689%2FlT8306yBNERAaUaRC62JE9rMh1HNrRf%2B5zhywOLKjPOYC%2BuU3HBSoUVfZFpZhiGWja18G93fYiRsftugqGE8KuxDb%2FTXzuA3G2J09pvYGXEaFYN9MHOBkBFEIBkCHu0jMqZAzs0Y1MFBI5w%3D%3D'
        },
        {
          name: '社區參與美味零食禮盒',
          description: '品味美味，同時支持社區的動物保護工作。我們精心挑選的美味貓咪零食不僅滿足您貓咪的味蕾，還能支持社區的動物保護事業。每一個禮盒都蘊含著我們對貓咪的愛與關懷。',
          image: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        }
      ]
    }
  },
  methods: {
    ...mapActions(cartStore, ['getCart'])
  },
  mounted () {
    this.getCart()
  }
}
</script>
