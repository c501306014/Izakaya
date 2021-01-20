<template>
  <div>
    <p>ここは１ページです</p>
    <form action="">
      <span>駅名</span><input v-model="station_name" type="text" />
      <span>都道府県名</span><input v-model="pref_name" type="text" />
      <button @click="post">submit</button>
    </form>
    <div>
      <ul>
        <li v-for="shop_data in shop_list" :key="shop_data.name">
          <p>
            {{ shop_data.name }}
          </p>
          <p>
            {{ shop_data.address }}
          </p>
          <a :href="shop_data.urls.pc">
            {{ shop_data.urls.pc }}
          </a>
          <p>
            {{ shop_data.budget.average }}
          </p>
        </li>
      </ul>
    </div>

    <router-link to="/page2">Go to page2</router-link>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "page1",
  data() {
    return {
      state: null,
      shop_list: null,
      station_name: null,
      pref_name: null,
    };
  },
  methods: {
    async post() {
      const response = await axios.get("http://localhost:3000/test", {
        params: {
          station_name: this.station_name,
          pref_name: this.pref_name,
        },
      });
      this.shop_list = response.data.shop_list;
      console.log(this.shop_list);
    },
    my_func() {},
  },
};
</script>

<style scoped>
</style>
