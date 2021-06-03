<template>
  <div class="filtering-wrapper">
    <div class="buttons">
      <b-button
        v-b-toggle.filtering
        variant="primary"
        @click="showFilter = !showFilter"
      >
        <span v-show="!showFilter"><b-icon icon="caret-down" /></span>
        <span v-show="showFilter"><b-icon icon="caret-up" /></span>
        条件を絞る
      </b-button>
      <b-button variant="danger" @click="push_top">別の駅で探す</b-button>
    </div>
    <!-- 条件を絞るボタン押下で表示 -->
    <b-collapse id="filtering" class="mt-2">
      <b-card>
        <b-form name="filterForm">
          <b-form-select v-model="budget" :options="budgetOptions" />
          <b-form-select v-model="genre" :options="genreOptions" />
          <b-form-checkbox
            class="checkbox"
            size="lg"
            v-model="isLiked"
            :value="true"
            :unchecked-value="false"
            >お気に入りのみ表示</b-form-checkbox
          >
          <div class="reset-btn-wrapper">
            <b-button @click="reset_filter"> 条件をリセット </b-button>
          </div>
        </b-form>
      </b-card>
    </b-collapse>
    <p class="text-danger" v-show="!shop_list.length">
      条件に合うお店は見つかりませんでした。条件を変更してみてください。
    </p>
  </div>
</template>

<script>
export default {
  name: "shop_filter",

  data: function () {
    return {
      showFilter: false,
      budgetOptions: [
        { value: null, text: "予算を選んでください" },
        { value: "～500円", text: "～500円" },
        { value: "501～1000円", text: "501～1000円" },
        { value: "1001～1500円", text: "1001～1500円" },
        { value: "1501～2000円", text: "1501～2000円" },
        { value: "2001～3000円", text: "2001～3000円" },
        { value: "3001～4000円", text: "3001～4000円" },
        { value: "4001～5000円", text: "4001～5000円" },
        { value: "5001～7000円", text: "5001～7000円" },
        { value: "7001～10000円", text: "7001～10000円" },
        { value: "10001～15000円", text: "10001～15000円" },
        { value: "15001～20000円", text: "15001～20000円" },
        { value: "20001～30000円", text: "20001～30000円" },
        { value: "30001円～", text: "30001円～" },
      ],
      genreOptions: [
        { value: null, text: "ジャンルを選んでください" },
        { value: "居酒屋", text: "居酒屋" },
        { value: "ダイニングバー・バル", text: "ダイニングバー・バル" },
        { value: "創作料理", text: "創作料理" },
        { value: "和食", text: "和食" },
        { value: "洋食", text: "洋食" },
        { value: "イタリアン・フレンチ", text: "イタリアン・フレンチ" },
        { value: "中華", text: "中華" },
        { value: "焼肉・ホルモン", text: "焼肉・ホルモン" },
        { value: "韓国料理", text: "韓国料理" },
        { value: "アジア・エスニック料理", text: "アジア・エスニック料理" },
        { value: "カラオケ・パーティ", text: "カラオケ・パーティ" },
        { value: "バー・カクテル", text: "バー・カクテル" },
        { value: "その他グルメ", text: "その他グルメ" },
      ],
      isLiked: false,
    };
  },
  methods: {
    reset_filter: function () {
      this.$store.commit("setShopFilterBudget", null);
      this.$store.commit("setShopFilterGenre", null);
      this.isLiked = false;
      document.filterForm.reset();
    },
    push_top: function () {
      this.$router.push("/");
      scrollTo(0, 0);
    },
  },
  mounted() {
    this.reset_filter();
  },
  computed: {
    budget: {
      get() {
        return this.$store.state.shop_filter.budget;
      },
      set(value) {
        this.$store.commit("setShopFilterBudget", value);
      },
    },
    genre: {
      get() {
        return this.$store.state.shop_filter.genre;
      },
      set(value) {
        this.$store.commit("setShopFilterGenre", value);
      },
    },
    shop_list: function () {
      let l_shopList = this.$store.state.shop_list;

      if (this.isLiked) {
        l_shopList = this.$store.state.shop_list.filter(
          (l_shopList) => l_shopList.isLiked === true
        );
      }

      if (this.budget) {
        l_shopList = l_shopList.filter(
          (l_shopList) => l_shopList.budget.name === this.budget
        );
      }

      if (this.genre) {
        l_shopList = l_shopList.filter(
          (l_shopList) => l_shopList.genre.name === this.genre
        );
      }
      this.$store.commit("setFilteredShopList", l_shopList);
      return l_shopList;
    },
  },
};
</script>

<style scoped>
.buttons {
  max-width: 50rem;
  margin: 1rem auto;
  display: flex;
  justify-content: space-around;
}

.card {
  max-width: 50rem;
  margin: auto;
}

.reset-btn-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 0.8rem;
}

.checkbox {
  margin: 1em 0;
  line-height: 1.5em;
}
</style>