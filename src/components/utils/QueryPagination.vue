<template>
  <nav aria-label="...">
    <ul class="pagination justify-content-end">
      <li class="page-item" :class="{
        disabled: !pages.has_pre
      }">
        <button type="button" class="page-link" @click="this.routerChange(pages.current_page - 1)" tabindex="-1"
          aria-disabled="true">上一頁</button>
      </li>
      <li class="page-item" v-for="page in pages.total_pages" :key="page + 'page'"
        :class="{ active: page === pages.current_page }">
        <button type="button" @click="this.routerChange(page)" class="page-link">{{ page }}</button>
      </li>
      <li class="page-item" :class="{
        disabled: !pages.has_next
      }">
        <button type="button" class="page-link" @click="this.routerChange(pages.current_page - 1)">下一頁</button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['pages'],
  methods: {
    routerChange (page = 1) {
      const { category } = this.$route.query
      this.$router.push({ name: 'consumerProducts', query: { category, page } })
    }
  }
}
</script>
