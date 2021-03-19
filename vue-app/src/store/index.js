import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);


const initialState = {
  form: {
    pref: "",
    station: ""
  },
  search_start: 1,
  shop_list: null,
  filtered_shop_list: null,
  err_message: null,
  // server_url: "https://izakaya-search.herokuapp.com/search",
  server_url:   "http://localhost:3000/search",
}



// create store
export default new Vuex.Store({
  state: initialState,
  mutations: {
    setForm(state, form) {
      state.form = form;
    },
    setSearchStart(state, search_start) {
      state.search_start = search_start;
    },
    setShopList(state, shop_list) {
      state.shop_list = shop_list;
    },
    setFilteredShopList(state, filtered_shop_list) {
      state.filtered_shop_list = filtered_shop_list;
    },
    setErrMessage(state, err_message) {
      state.err_message = err_message;
    }
  },
  plugins:[createPersistedState()]
});
