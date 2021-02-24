<template>
  <div class="container">
    <section>
      <h1>使い方</h1>
      <p>都道府県を選択し、駅名を入力してください。</p>
      <p>例：東京都、東京</p>
      <p class="text-danger">※駅名の末尾に「駅」を含めないでください。</p>
    </section>
    <div>
      <b-form @submit="onSubmit">
        <b-form-row>
          <selectPrefecture v-model="l_form.pref" />
          <inputStation v-model="l_form.station" />
        </b-form-row>
        <b-button v-if="!is_loading" type="submit" variant="primary"
          >Submit</b-button
        >
        <myLoading :is_loading="is_loading" :text="'検索中...'" />
      </b-form>
    </div>
    <div v-if="err_message === '0'">
      <p class="text-danger">
        お探しの駅が見つかりませんでした。他の駅名で検索してください。
        <br />ヒント：駅名入力欄に「駅」という文字を含めて検索していませんか？
      </p>
    </div>
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

      // const url = "https://izakaya-search.herokuapp.com/search";
      const url = "http://localhost:3000/search";
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
a:hover {
  cursor: pointer;
}

.container {
  margin-top: 60px;
}

section {
  margin: 5rem 0;
}
</style>