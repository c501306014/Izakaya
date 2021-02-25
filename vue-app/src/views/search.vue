<template>
  <div class="container">
    <main>
      <h1 class="head">居酒屋検索アプリ</h1>
      <section>
        <h2 class="head">概要</h2>
        <p>本アプリは、以下の条件を満たす居酒屋を検索するアプリです｡</p>
        <ul class="overview-list">
          <li>
            指定された都道府県内に存在する駅から半径５００メートル圏内に存在する
          </li>
          <li>設備に「個室」が付いている</li>
        </ul>
      </section>
      <section>
        <h2 class="head">使い方</h2>
        <p>都道府県を選択し､駅名を入力して下さい｡ <br />例：東京都、東京</p>
        <p class="text-danger">駅名末尾に「駅」を含めないでください｡</p>
      </section>
    </main>
    <section>
      <h2 class="head">検索はこちら</h2>
      <b-form @submit="onSubmit">
        <b-form-row>
          <selectPrefecture v-model="l_form.pref" />
          <inputStation v-model="l_form.station" />
        </b-form-row>
        <b-button v-if="!is_loading" type="submit" variant="primary"
          ><b-icon icon="search" /> 検索</b-button
        >
        <myLoading :is_loading="is_loading" :text="'検索中...'" />
      </b-form>
      <div v-if="err_message === '0'">
        <p class="text-danger">
          お探しの駅が見つかりませんでした｡他の駅名で検索してください｡
          <br />ヒント：駅名入力欄に「駅」という文字を含めて検索していませんか？
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import selectPrefecture from "@/components/prefecture.vue";
import inputStation from "@/components/station.vue";
import myLoading from "@/components/loading.vue";

export default {
  name: "search",
  components: {
    selectPrefecture,
    inputStation,
    myLoading,
  },
  data() {
    return {
      paginate: ["paginate-items"],
      l_form: {
        pref: null,
        station: null,
      },
      is_loading: false,
    };
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      this.$store.commit("setForm", this.l_form);
      this.$store.commit("setErrMessage", null);

      this.is_loading = true;

      const url = "https://izakaya-search.herokuapp.com/search";
      // const url = "http://localhost:3000/search";
      const response = await axios
        .get(url, {
          params: {
            station_name: this.$store.state.form.station,
            pref_name: this.$store.state.form.pref,
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
      } else {
        this.$store.commit("setShopList", response.data.shop_list);
        this.$router.push("/result");
      }
    },
  },
  computed: {
    err_message: function () {
      return this.$store.state.err_message;
    },
  },
};
</script>

<style scoped>
.overview-list {
  padding-left: 5.2rem;
}

.overview-list li {
  line-height: 1.5em;
}

.head {
  margin: 1em auto 0.5em auto;
}

h1 {
  font-size: 3.2rem;
  text-align: center;
}

h2 {
  font-size: 2.4rem;
  padding-left: 0.5em;
  border-left: solid 3px #dc3545;
}

h3 {
  font-size: 2rem;
}
</style>