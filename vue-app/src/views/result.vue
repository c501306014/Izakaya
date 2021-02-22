<template>
  <div v-if="shop_list != null">
    <ul>
      <paginate name="paginate-items" :list="shop_list" :per="9">
        <div class="shop-list">
          <li
            class=""
            v-for="shop_data in paginated('paginate-items')"
            :key="shop_data.name"
          >
            <a :href="shop_data.urls.pc">
              <img :src="shop_data.photo.pc.l" alt="" />
            </a>
            <p>
              <a :href="shop_data.urls.pc"> {{ shop_data.name }}</a>
            </p>
            <p>
              {{ shop_data.budget.average }}
            </p>
          </li>
        </div>
      </paginate>
    </ul>
    <paginate-links
      for="paginate-items"
      class="pagination"
      :limit="6"
      :show-step-links="true"
      :step-links="{
        next: '>',
        prev: '<',
      }"
      :classes="{
        'ul.paginate-links > li': 'page-item',
        'ul.paginate-links > li > a': 'page-link',
      }"
    >
    </paginate-links>
  </div>
</template>

<script>
export default {
  name: "result",

  data() {
    return {
      paginate: ["paginate-items"],
    };
  },
};
</script>

<style scoped>
.shop-list li {
  margin: 1rem 0;
  min-height: 80px;
}

.shop-list {
  display: flex;
  flex-wrap: wrap;
}
</style>