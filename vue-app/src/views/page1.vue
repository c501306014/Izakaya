<template>
  <div class="container">
    <div class="row">
      <form class="col s12" @submit.prevent="post">
        <div class="row">
          <div class="input-field col m6 s12">
            <select id="pref-name" v-model="pref_name">
              <option value="北海道">北海道</option>
              <option value="青森県">青森県</option>
              <option value="岩手県">岩手県</option>
              <option value="宮城県">宮城県</option>
              <option value="秋田県">秋田県</option>
              <option value="山形県">山形県</option>
              <option value="福島県">福島県</option>
              <option value="茨城県">茨城県</option>
              <option value="栃木県">栃木県</option>
              <option value="群馬県">群馬県</option>
              <option value="埼玉県">埼玉県</option>
              <option value="千葉県">千葉県</option>
              <option value="東京都">東京都</option>
              <option value="神奈川県">神奈川県</option>
              <option value="新潟県">新潟県</option>
              <option value="富山県">富山県</option>
              <option value="石川県">石川県</option>
              <option value="福井県">福井県</option>
              <option value="山梨県">山梨県</option>
              <option value="長野県">長野県</option>
              <option value="岐阜県">岐阜県</option>
              <option value="静岡県">静岡県</option>
              <option value="愛知県">愛知県</option>
              <option value="三重県">三重県</option>
              <option value="滋賀県">滋賀県</option>
              <option value="京都府">京都府</option>
              <option value="大阪府">大阪府</option>
              <option value="兵庫県">兵庫県</option>
              <option value="奈良県">奈良県</option>
              <option value="和歌山県">和歌山県</option>
              <option value="鳥取県">鳥取県</option>
              <option value="島根県">島根県</option>
              <option value="岡山県">岡山県</option>
              <option value="広島県">広島県</option>
              <option value="山口県">山口県</option>
              <option value="徳島県">徳島県</option>
              <option value="香川県">香川県</option>
              <option value="愛媛県">愛媛県</option>
              <option value="高知県">高知県</option>
              <option value="福岡県">福岡県</option>
              <option value="佐賀県">佐賀県</option>
              <option value="長崎県">長崎県</option>
              <option value="熊本県">熊本県</option>
              <option value="大分県">大分県</option>
              <option value="宮崎県">宮崎県</option>
              <option value="鹿児島県">鹿児島県</option>
              <option value="沖縄県">沖縄県</option>
            </select>
            <label for="pref-name">都道府県名</label>
          </div>
          <div class="input-field col m6 s12">
            <i class="material-icons prefix">train</i>
            <input
              id="station-name"
              type="text"
              class="validate"
              v-model="station_name"
            />
            <label for="station-name">駅名</label>
          </div>
        </div>
        <div class="row">
          <div class="col s12">
            <button class="btn waves-effect waves-light" type="submit">
              Submit
              <i class="material-icons right">send</i>
            </button>
          </div>
        </div>
      </form>
    </div>

    <div>
      message:
      {{ message }}
    </div>

    <div v-if="shop_list != null" class="col s12">
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
      state: null,
      shop_list: null,
      station_name: null,
      pref_name: null,
      paginate: ["paginate-items"],
      message: null,
      is_ios: false,
    };
  },
  methods: {
    async post() {
      // const url = "https://izakaya-search.herokuapp.com/test";
      const url = "http://localhost:3000/test";
      const response = await axios
        .get(url, {
          params: {
            station_name: this.station_name,
            pref_name: this.pref_name,
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
    check_os: function () {
      const userAgent = window.navigator.userAgent.toLowerCase();
      if (
        userAgent.indexOf("iphone") !== -1 ||
        userAgent.indexOf("ipad") !== -1
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  mounted() {
    M.AutoInit();
    this.is_ios = this.check_os();
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
</style>
