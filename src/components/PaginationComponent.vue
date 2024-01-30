<template>
  <nav aria-label="...">
    <ul class="pagination">
      <li class="page-item" :class="{
        disabled: !pages.has_pre
      }">
        <button type="button" class="page-link" @click="getProducts(pages.current_page - 1)" tabindex="-1"
          aria-disabled="true">Previous</button>
      </li>
      <li class="page-item" v-for="page in pages.total_pages" :key="page + 'page'"
        :class="{ active: page === pages.current_page }">
        <button type="button" class="page-link" @click="getProducts(page)">{{ page }}</button>
      </li>
      <li class="page-item" :class="{
        disabled: !pages.has_next
      }">
        <button type="button" @click="getProducts(pages.current_page + 1)" class="page-link">Next</button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['pages', 'getProducts']
}
</script>
