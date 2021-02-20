<template>
  <div class="container">
    <div>
      <b-form @submit="onSubmit">
        <b-form-row>
          <selectPrefecture v-model="form.pref" />
          <b-form-group
            id="input-station"
            class="col-md-6"
            label="駅名"
            label-for="station-name"
          >
            <b-form-input
              id="station-name"
              v-model="form.station"
              type="text"
              placeholder="駅名を入力してください"
              required
            >
            </b-form-input>
          </b-form-group>
        </b-form-row>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </div>

    <p>pref: {{ form.pref }}</p>

    <div v-if="shop_list != null">
      <ul>
        <paginate name="paginate-items" :list="shop_list" :per="9">
          <div class="shop-list">
            <li
              class=""
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
                {{ shop_data.budget.average }}
              </p>
            </li>
          </div>
        </paginate>
      </ul>
      <paginate-links
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
  </div>
</template>

<script>
import axios from "axios";
import selectPrefecture from "@/components/prefecture.vue";

export default {
  name: "page1",
  components: {
    selectPrefecture,
  },
  data() {
    return {
      shop_list: null,
      perPage: 3,
      currentPage: 1,
      rows: 1,

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
      this.rows = this.shop_list.length;
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

.shop-list li {
  margin: 1rem 0;
  min-height: 80px;
}

.shop-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
