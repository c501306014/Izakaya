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
      <div v-if="err_message">
        <p class="text-danger err-msg">
          {{ err_message }}
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

      this.is_loading = true;
      await this.getStationPos();

      // const url = "https://izakaya-search.herokuapp.com/search";
      const url = "http://localhost:3000/search";
      const response = await axios
        .get(url, { params: this.stationPos })
        .catch((err) => {
          console.log(err.response);
          this.$store.commit(
            "setErrMessage",
            "お店検索機能でエラーが発生しているようです。\n恐れ入りますがしばらく時間がたってからご利用ください。"
          );
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
    getStationPos: async function () {
      // 駅名と都道府県名をURL用に変換
      let station_name = encodeURI(this.l_form.station);
      let pref_name = encodeURI(this.l_form.pref);
      // heartrails APIをたたく
      let RailURL = `http://express.heartrails.com/api/json?method=getStations&name=${station_name}&prefecture=${pref_name}`;
      let RailRes = await axios.get(RailURL).catch((err) => {
        this.$store.commit(
          "setErrMessage",
          "駅検索機能でエラーが発生しているようです。\n恐れ入りますがしばらく時間がたってからご利用ください。"
        );
      });

      if ("error" in RailRes.data["response"]) {
        // 存在しない駅を指定したとき
        if (this.l_form.station.slice(-1) === "駅") {
          // 駅名末尾に「駅」がついていたなら、末尾の「駅」を除いて検索リトライ
          await this.retry_getStationPos();
        } else {
          this.$store.commit(
            "setErrMessage",
            "お探しの駅名は存在しません｡他の駅名で検索してください｡\nヒント：駅名が間違っているかもしれません。"
          );
        }
      } else if (!RailRes.data["response"]["station"].length) {
        // 駅は存在するが選択した都道府県内にはなかったときのエラーメッセージをセット
        this.$store.commit(
          "setErrMessage",
          "選択した都道府県内にお探しの駅が見つかりませんでした｡\nヒント：選択する都道府県が間違っているかもしれません。"
        );
      } else {
        // 駅が存在したときはその座標を取得
        this.stationPos.X = RailRes.data["response"]["station"][0]["x"];
        this.stationPos.Y = RailRes.data["response"]["station"][0]["y"];
      }
    },
    retry_getStationPos: async function () {
      this.l_form.station = this.l_form.station.slice(0, -1);
      this.$store.commit("setForm", this.l_form);

      const station_name = encodeURI(this.l_form.station);
      const pref_name = encodeURI(this.l_form.pref);
      const RailURL = `http://express.heartrails.com/api/json?method=getStations&name=${station_name}&prefecture=${pref_name}`;
      const RailRes = await axios.get(RailURL).catch((err) => {
        this.$store.commit(
          "setErrMessage",
          "駅検索機能でエラーが発生しているようです。\n恐れ入りますがしばらく時間がたってからご利用ください。"
        );
      });
      if ("error" in RailRes.data["response"]) {
        this.$store.commit(
          "setErrMessage",
          "お探しの駅名は存在しません｡他の駅名で検索してください｡\nヒント：駅名が間違っているかもしれません。"
        );
      } else if (!RailRes.data["response"]["station"].length) {
        // 駅は存在するが選択した都道府県内にはなかったときのエラーメッセージをセット
        this.$store.commit(
          "setErrMessage",
          "選択した都道府県内にお探しの駅が見つかりませんでした｡\nヒント：選択する都道府県が間違っているかもしれません。"
        );
      } else {
        // 駅が存在したときはその座標を取得
        this.stationPos.X = RailRes.data["response"]["station"][0]["x"];
        this.stationPos.Y = RailRes.data["response"]["station"][0]["y"];
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