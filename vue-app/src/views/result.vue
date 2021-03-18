<template>
  <div class="container">
    <main>
      <shopFilter />
      <div v-if="shop_list.length === 0">{{ err_message }}</div>
      <div v-if="shop_list.length !== 0">
        <ul>
          <div class="shop-list" ref="shop_list">
            <li v-for="shop_data in shop_list" :key="shop_data.name">
              <shopInfo :shop_data="shop_data" />
            </li>
            <div v-scroll="infiniteHandler"></div>
          </div>
        </ul>
      </div>
      <myLoading :is_loading="is_loading" :text="'検索中...'" />
      <p v-show="is_complete">これ以上は見つかりませんでした。</p>
      <scrollToTop />
      <p>
        {{ form.pref }} {{ form.station }}駅の検索結果: {{ shop_list.length }}件
      </p>
    </main>
  </div>
</template>

<script>
import axios from "axios";

import scrollToTop from "@/components/scrollToTop.vue";
import shopFilter from "@/components/filter.vue";
import shopInfo from "@/components/shopInfo.vue";
import myLoading from "@/components/loading.vue";

export default {
  name: "result",
  components: {
    scrollToTop,
    shopInfo,
    shopFilter,
    myLoading,
  },
  data() {
    return {
      is_loading: false,
      is_complete: false,
      ShopListElement: null,
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
    this.ShopListElement = this.$refs.shop_list;
  },
  methods: {
    infiniteHandler: function () {
      let clientRect = this.ShopListElement.getBoundingClientRect();

      if (
        clientRect.bottom < innerHeight &&
        !this.is_loading &&
        !this.is_complete
      ) {
        this.getShopList();
      }
    },
    getShopList: async function () {
      this.$store.commit("setSearchStart", this.$store.state.search_start + 36);
      this.is_loading = true;

      const response = await axios
        .get(this.$store.state.server_url, {
          params: {
            station_name: this.$store.state.form.station,
            pref_name: this.$store.state.form.pref,
            search_start: this.$store.state.search_start,
          },
        })
        .catch((err) => {
          console.log(err.response);
          this.$store.commit("setErrMessage", err.response.data["error"]);
        });

      this.is_loading = false;
      if (this.err_message) {
        console.log(this.err_message);
        return;
      } else if (response.data.shop_list.length === 0) {
        this.is_complete = true;
      } else {
        this.$store.commit(
          "setShopList",
          this.$store.state.shop_list.concat(response.data.shop_list)
        );
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