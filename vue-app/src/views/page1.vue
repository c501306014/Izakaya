<template>
  <div>
    <div class="row">
      <form class="col s12">
        <div class="row">
          <div class="input-field col m6 s12">
            <i class="material-icons prefix">train</i>
            <input type="text" class="validate" v-model="station_name" />
            <label for="station-name">駅名</label>
          </div>
          <div class="input-field col m6 s12">
            <i class="material-icons prefix">map</i>
            <input type="text" class="validate" v-model="pref_name" />
            <label for="pref-name">都道府県名</label>
          </div>
        </div>
        <div class="row">
          <div class="col s12">
            <button
              class="btn waves-effect waves-light"
              type="submit"
              name="action"
              @click="post"
            >
              Submit
              <i class="material-icons right">send</i>
            </button>
          </div>
        </div>
      </form>
    </div>

    <div v-if="shop_list != null" class="col s12">
      <ul>
        <paginate name="paginate-items" :list="shop_list" :per="10">
          <div class="row">
            <li
              class="col l4 m6 s12"
              v-for="shop_data in paginated('paginate-items')"
              :key="shop_data.name"
            >
              <a :href="shop_data.urls.pc">
                <img :src="shop_data.photo.pc.l" alt="" />
              </a>
              <p>
                <a :href="shop_data.urls.pc"> {{ shop_data.name }}</a>
              </p>
              <p>
                {{ shop_data.address }}
              </p>

              <p>
                {{ shop_data.budget.average }}
              </p>
            </li>
          </div>
        </paginate>
      </ul>
      <paginate-links
        for="paginate-items"
        class="pagination"
        :limit="3"
        :show-step-links="true"
        :step-links="true"
        :classes="{
          'ul.paginate-links > li': 'waves-effect',
        }"
      >
      </paginate-links>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import M from "materialize-css";

export default {
  name: "page1",
  data() {
    return {
      state: null,
      shop_list: null,
      station_name: null,
      pref_name: null,
      paginate: ["paginate-items"],
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
  mounted() {
    M.AutoInit();
  },
};
</script>

<style scoped>
a:hover {
  cursor: pointer;
}
</style>
