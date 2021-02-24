<template>
  <div class="container">
    <main>
      <p>
        {{ form.pref }} {{ form.station }}駅の検索結果: {{ shop_list.length }}件
      </p>
      <paginate-links
        v-if="shop_list.length !== 0"
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
      <div v-if="shop_list == null">{{ err_message }}</div>
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
          v-if="shop_list.length !== 0"
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
      <div class="buttons">
        <b-button variant="primary" @click="push_top">別の駅で探す</b-button>
        <b-button variant="danger" @click="scroll_top">上に戻る</b-button>
      </div>
    </main>
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
    err_message: function () {
      return this.$store.state.err_message;
    },
  },
  methods: {
    push_top: function () {
      this.$router.push("/");
    },
    scroll_top: function () {
      scrollTo(0, 0);
    },
  },
};
</script>

<style scoped>
p {
  padding: 0;
  text-align: center;
}
li {
  padding: 0 1.5rem;
  text-align: center;
}

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

.buttons {
  max-width: 50rem;
  margin: 1rem auto;
  display: flex;
  justify-content: space-around;
}

@media screen and (max-width: 1024px) {
  .shop-list li {
    width: 100%;
  }
}
</style>