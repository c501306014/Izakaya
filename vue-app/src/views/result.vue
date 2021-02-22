<template>
  <div>
    <p>
      {{ form.pref }} {{ form.station }}駅の検索結果: {{ shop_list.length }}件
    </p>
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
  computed: {
    shop_list: function () {
      return this.$store.state.shop_list;
    },
    form: function () {
      return this.$store.state.form;
    },
  },
};
</script>

<style scoped>
.pagination {
  justify-content: center;
}

.page-link:hover {
  cursor: pointer;
}

.page-link:active {
  background-color: #343a40;
}

.shop-list {
  display: flex;
  flex-wrap: wrap;
}
.shop-list li {
  margin: 1rem 0;
  min-height: 80px;
  list-style: none;
  width: 33%;
}

@media screen and (max-width: 1024px) {
  .shop-list li {
    width: 100%;
  }
}
</style>