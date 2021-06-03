<template>
  <div class="container">
    <main>
      <section>
        <h2 class="head">居酒屋の検索はこちら</h2>
        <b-form @submit="onSubmit">
          <b-form-row>
            <selectPrefecture v-model="l_form.pref" />
            <inputStation v-model="l_form.station" />
          </b-form-row>
          <b-button
            id="search-btn"
            v-if="!is_loading"
            type="submit"
            variant="primary"
            ><b-icon icon="search" /> 検索</b-button
          >
          <myLoading :is_loading="is_loading" :text="'検索中...'" />
        </b-form>
        <div v-if="err_message">
          <p class="text-danger err-msg">
            {{ err_message }}
          </p>
        </div>
      </section>
      <section>
        <h2 class="head">概要</h2>
        <p>
          <strong
            >大人数での飲み会を企画したい。大事な人とゆったり過ごしたい。</strong
          ><br />
          そんなあなたのお店探しをお手伝いします！
        </p>
        <p>
          本アプリは、以下の条件を満たす居酒屋をホットペッパーグルメから検索するアプリです｡
        </p>
        <ul class="overview-list">
          <li>
            指定された都道府県内に存在する駅から半径５００メートル圏内に存在する
          </li>
          <li>設備に「個室」が付いている</li>
        </ul>
        <p>
          細かい検索設定をしなくても駅近で個室付のお店をいい感じにピックアップします！<br />
          お店の候補出し等にご利用ください(^^♪
        </p>
      </section>
      <section>
        <h2 class="head">こんな方にお勧め！</h2>
        <ul class="overview-list">
          <li>飲み会の幹事をされる方</li>
          <li>個室でまったり飲みたい方</li>
          <li>居酒屋の候補をある程度絞りたい方</li>
        </ul>
      </section>
      <section>
        <h2 class="head">使い方</h2>
        <p>都道府県・駅名を入力後、検索ボタンを押して下さい｡</p>
      </section>
      <scrollToTop />
    </main>
  </div>
</template>

<script>
import axios from "axios";
import selectPrefecture from "@/components/prefecture.vue";
import inputStation from "@/components/station.vue";
import myLoading from "@/components/loading.vue";
import scrollToTop from "@/components/scrollToTop.vue";

export default {
  name: "search",
  components: {
    selectPrefecture,
    inputStation,
    myLoading,
    scrollToTop,
  },
  data() {
    return {
      paginate: ["paginate-items"],
      l_form: {
        pref: null,
        station: null,
      },
      is_loading: false,
      stationPos: {
        X: null,
        Y: null,
      },
    };
  },
  methods: {
    onSubmit: async function (event) {
      event.preventDefault();
      this.$store.commit("setForm", this.l_form);
      this.$store.commit("setErrMessage", null);
      this.$store.commit("setSearchStart", 1);

      this.is_loading = true;

      const response = await axios
        .get(this.$store.state.server_url, {
          params: {
            station_name: this.l_form.station,
            pref_name: this.l_form.pref,
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
      } else {
        response.data.shop_list.map((shop_data) => (shop_data.isLiked = false));

        this.$store.commit("setShopList", response.data.shop_list);
        this.$store.commit("setFilteredShopList", response.data.shop_list);
        this.l_form.station = response.data.station;
        this.$store.commit("setForm", this.l_form);
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

.err-msg {
  white-space: pre-line;
}
</style>