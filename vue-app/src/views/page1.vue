<template>
  <div class="container">
    <div>
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-row>
          <b-form-group
            id="input-pref"
            class="col-md-6"
            label="都道府県名"
            label-for="pref-name"
          >
            <b-form-select
              id="pref-name"
              v-model="form.pref"
              :options="prefectures"
              required
            ></b-form-select>
          </b-form-group>
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
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </div>

    <div v-if="shop_list != null" class="col s12" id="main-content">
      <ul>
        <paginate name="paginate-items" :list="shop_list" :per="9">
          <div class="row shop-list">
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

export default {
  name: "page1",
  data() {
    return {
      shop_list: null,
      paginate: ["paginate-items"],
      form: {
        pref: null,
        station: null,
      },
      prefectures: [
        { text: "都道府県を選択してください", value: null },
        "北海道",
        "青森県",
        "岩手県",
        "宮城県",
        "秋田県",
        "山形県",
        "福島県",
        "茨城県",
        "栃木県",
        "群馬県",
        "埼玉県",
        "千葉県",
        "東京都",
        "神奈川県",
        "新潟県",
        "富山県",
        "石川県",
        "福井県",
        "山梨県",
        "長野県",
        "岐阜県",
        "静岡県",
        "愛知県",
        "三重県",
        "滋賀県",
        "京都府",
        "大阪府",
        "兵庫県",
        "奈良県",
        "和歌山県",
        "鳥取県",
        "島根県",
        "岡山県",
        "広島県",
        "山口県",
        "徳島県",
        "香川県",
        "愛媛県",
        "高知県",
        "福岡県",
        "佐賀県",
        "長崎県",
        "熊本県",
        "大分県",
        "宮崎県",
        "鹿児島県",
        "沖縄県",
      ],
    };
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      const url = "https://izakaya-search.herokuapp.com/test";
      // const url = "http://localhost:3000/test";
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
    },
    onReset(event) {
      event.preventDefault();
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

button {
  /* margin-left: auto; */
}

#main-content {
  min-height: 100vh;
}
</style>
