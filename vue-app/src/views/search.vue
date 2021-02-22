<template>
  <div class="container">
    <section>
      <h1>使い方</h1>
      <p>都道府県を選択し、駅名を入力してください。</p>
      <p>例：東京都、東京</p>
      <p>※駅名の末尾に「駅」を含めないでください。</p>
    </section>
    <div>
      <b-form @submit="onSubmit">
        <b-form-row>
          <selectPrefecture v-model="l_form.pref" />
          <inputStation v-model="l_form.station" />
        </b-form-row>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import selectPrefecture from "@/components/prefecture.vue";
import inputStation from "@/components/station.vue";

export default {
  name: "search",
  components: {
    selectPrefecture,
    inputStation,
  },
  data() {
    return {
      paginate: ["paginate-items"],
      l_form: {
        pref: null,
        station: null,
      },
    };
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      this.$store.commit("setForm", this.l_form);
      // const url = "https://izakaya-search.herokuapp.com/test";
      const url = "http://localhost:3000/test";
      const response = await axios
        .get(url, {
          params: {
            station_name: this.$store.state.form.station,
            pref_name: this.$store.state.form.pref,
          },
        })
        .catch((err) => {
          console.log(err.response);
          this.message = err.response.data["error"];
          alert(err.response.data["error"]);
        });
      this.$store.commit("setShopList", response.data.shop_list);
      this.$router.push("/result");
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