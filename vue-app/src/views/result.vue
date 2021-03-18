<template>
  <div class="container">
    <main>
      <p>
        {{ form.pref }} {{ form.station }}駅の検索結果: {{ shop_list.length }}件
      </p>
      <shopFilter />
      <div v-if="shop_list.length === 0">{{ err_message }}</div>
      <div v-if="shop_list.length !== 0">
        <ul>
          <div class="shop-list">
            <li v-for="shop_data in shop_list" :key="shop_data.name">
              <shopInfo :shop_data="shop_data" />
              <div v-scroll="infiniteHandler"></div>
            </li>
          </div>
        </ul>
      </div>
      <scrollToTop />
    </main>
  </div>
</template>

<script>
import scrollToTop from "@/components/scrollToTop.vue";
import shopFilter from "@/components/filter.vue";
import shopInfo from "@/components/shopInfo.vue";

export default {
  name: "result",
  components: {
    scrollToTop,
    shopInfo,
    shopFilter,
  },
  data() {
    return {
      startScrollYOffset: 0,
    };
  },

  computed: {
    shop_list: function () {
      return this.$store.state.filtered_shop_list;
    },

    form: function () {
      return this.$store.state.form;
    },
    err_message: function () {
      return this.$store.state.err_message;
    },
  },
  mounted() {
    scrollTo(0, 0);
    this.startScrollYOffset = Math.floor(innerHeight / 3);
  },
  methods: {
    scroll_top: function () {
      scrollTo(0, 0);
    },

    infiniteHandler() {
      if (pageYOffset >= this.startScrollYOffset) {
        this.startScrollYOffset = innerHeight + pageYOffset;
      }
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
  list-style: none;
}

.shop-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.shop-list li div {
  display: grid;
  grid-template-columns: 3rem 7.6rem 1fr;
  grid-template-rows: auto auto auto auto auto;
  margin: 1rem 0;
  min-height: 80px;
  list-style: none;
  width: 32rem;
}
</style>