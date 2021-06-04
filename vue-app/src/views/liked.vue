<template>
  <div class="container">
    <main>
      <shopFilter :p_shop_list="p_shop_list" />
      <b-button
        v-if="from_result"
        @click="push_result"
        class="result-btn"
        variant="success"
        >検索結果一覧に戻る</b-button
      >
      <p v-if="shop_list.length === 0">お気に入り登録されたお店がありません</p>

      <div v-if="shop_list.length !== 0">
        <ul>
          <div class="shop-list" ref="shop_list">
            <li v-for="shop_data in shop_list" :key="shop_data.name">
              <shopInfo :shop_data="shop_data" />
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
import myLoading from "@/components/loading.vue";

export default {
  name: "liked",
  components: {
    scrollToTop,
    shopInfo,
    shopFilter,
    myLoading,
  },
  data() {
    return {
      ShopListElement: null,
      p_shop_list: this.$store.state.liked_shop_list,
    };
  },
  props: {
    from_result: Boolean,
  },

  computed: {
    // p_shop_list: function () {
    //   return this.$store.state.liked_shop_list;
    // },
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
    this.$store.commit(
      "setFilteredShopList",
      this.$store.state.liked_shop_list
    );
  },
  methods: {
    push_result: function () {
      this.$router.push("/result");
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

.result-btn {
  display: block;
  margin: auto;
  max-width: 30rem;
  width: 100%;
}
</style>