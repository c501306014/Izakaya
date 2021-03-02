<template>
  <div class="container">
    <main>
      <p>
        {{ form.pref }} {{ form.station }}駅の検索結果: {{ shop_list.length }}件
      </p>

      <div class="filtering-wrapper">
        <div class="buttons">
          <b-button
            v-b-toggle.filtering
            variant="primary"
            @click="showFilter = !showFilter"
          >
            <span v-show="!showFilter"><b-icon icon="caret-down" /></span
            ><span v-show="showFilter"><b-icon icon="caret-up" /></span
            >条件を絞る
          </b-button>

          <b-button variant="danger" @click="push_top">別の駅で探す</b-button>
        </div>
        <b-collapse id="filtering" class="mt-2">
          <b-card>
            <b-form name="filterForm">
              <b-form-select
                v-model="selectedBudget"
                @change="goToFirstPage"
                :options="budgetOptions"
              />
              <b-form-select
                v-model="selectedGenre"
                @change="goToFirstPage"
                :options="genreOptions"
              />
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
      <div v-if="shop_list.length === 0">{{ err_message }}</div>
      <div v-if="shop_list.length !== 0">
        <ul>
          <paginate
            ref="paginator"
            name="paginate-items"
            :list="shop_list"
            :per="9"
          >
            <div class="shop-list">
              <li
                v-for="shop_data in paginated('paginate-items')"
                :key="shop_data.name"
              >
                <a class="shop_img" :href="shop_data.urls.pc">
                  <img :src="shop_data.photo.pc.l" alt="" />
                </a>
                <a class="shop_link" :href="shop_data.urls.pc">
                  {{ shop_data.name }}
                </a>
                <span class="shop_info_head">カテゴリ</span>
                <span class="shop_info_content">
                  {{ shop_data.genre.name }}
                </span>
                <span class="shop_info_head">予算</span>
                <span class="shop_info_content">
                  {{ shop_data.budget.name }}
                </span>
                <span class="shop_info_head">最大人数</span>
                <span class="shop_info_content">
                  {{ shop_data.party_capacity }}人
                </span>
                <span class="shop_info_head">コース</span>
                <span class="shop_info_content">
                  <span
                    class="course-info bg-warning"
                    v-show="shop_data.free_drink.match(/あり/)"
                  >
                    飲み放題有
                  </span>
                  <span
                    class="course-info bg-warning"
                    variant="warning"
                    v-show="shop_data.free_food.match(/あり/)"
                    >食べ放題有</span
                  >
                </span>
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
      <scrollToTop />
    </main>
  </div>
</template>

<script>
import scrollToTop from "@/components/scrollToTop.vue";

export default {
  name: "result",
  components: {
    scrollToTop,
  },
  data() {
    return {
      paginate: ["paginate-items"],
      showFilter: false,
      selectedBudget: null,
      selectedGenre: null,
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
    };
  },

  computed: {
    shop_list: function () {
      let l_shopList = this.$store.state.shop_list;
      if (this.selectedBudget) {
        l_shopList = l_shopList.filter(
          (l_shopList) => l_shopList.budget.name === this.selectedBudget
        );
      }

      if (this.selectedGenre) {
        l_shopList = l_shopList.filter(
          (l_shopList) => l_shopList.genre.name === this.selectedGenre
        );
      }
      return l_shopList;
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
  },
  methods: {
    push_top: function () {
      this.$router.push("/");
      scrollTo(0, 0);
    },
    scroll_top: function () {
      scrollTo(0, 0);
    },
    reset_filter: function () {
      this.selectedGenre = null;
      this.selectedBudget = null;
      document.filterForm.reset();
      this.goToFirstPage();
    },
    goToFirstPage: function () {
      if (this.$refs.paginator) {
        this.$refs.paginator.goToPage(1);
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
}

.pagination {
  margin-top: 0.8rem;
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
  justify-content: center;
}
.shop-list li {
  display: grid;
  grid-template-columns: 3rem 7.6rem 1fr;
  grid-template-rows: auto auto auto auto auto;
  margin: 1rem 0;
  min-height: 80px;
  list-style: none;
  width: 32rem;
}

.shop_img {
  grid-column: 1/4;
}

.shop_link {
  grid-column: 1/4;
}

.shop_info_head {
  grid-column: 2/3;
  text-align: left;
}
.shop_info_content {
  text-align: left;
}

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

.course-info {
  display: inline-block;
  padding: 0.4rem 0.6rem;
  border-radius: 3px;
  font-size: 1.2rem;
}
.course-info:hover {
  cursor: default;
}
</style>