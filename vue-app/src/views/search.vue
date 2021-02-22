<template>
  <div class="container">
    <div>
      <b-form @submit="onSubmit">
        <b-form-row>
          <selectPrefecture v-model="form.pref" />
          <inputStation v-model="form.station" />
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
      shop_list: null,

      paginate: ["paginate-items"],
      form: {
        pref: null,
        station: null,
      },
    };
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      // const url = "https://izakaya-search.herokuapp.com/test";
      const url = "http://localhost:3000/test";
      const response = await axios
        .get(url, {
          params: {
            station_name: this.form.station,
            pref_name: this.form.pref,
          },
        })
        .catch((err) => {
          console.log(err.response);
          this.message = err.response.data["error"];
          alert(err.response.data["error"]);
        });
      this.shop_list = response.data.shop_list;
      console.log(this.shop_list);
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
</style>
