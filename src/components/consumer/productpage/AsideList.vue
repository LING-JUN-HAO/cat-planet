<template>
  <div class="col-3">
    <ul class="text-center">
      <li v-for="( categoryItem, index ) in category" :key="index + '123'">
        <router-link :to="{ path: '/consumer/products', query: { category: categoryItem, page: 1 } }"
          class="p-2 category-container text-decoration-none w-100 d-block"
          :class="{ active: $route.query.category === categoryItem || !$route.query.category }">
          {{ categoryItem }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      category: ['所有產品', '貓咪玩具', '美容護理', '飲食用品', '貓咪床窩']
    }
  }
}
</script>
