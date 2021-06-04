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
  shop_filter: {
    selectedBudget: null,
    selectedGenre: null,
    isLiked: false,
  },
  liked_shop_list: [],
  err_message: null,
  server_url: "https://izakaya-search.herokuapp.com/search",
  // server_url: "http://localhost:3000/search",
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
    pushLikedShopData(state, shop_data) {

      const alreadyPushed = state.liked_shop_list
        .filter(liked_shop_data => liked_shop_data.id === shop_data);

      if (!alreadyPushed.length) {
        console.log('プッシュされました');
        state.liked_shop_list.push(shop_data);

      } else {
        console.log('プッシュされずに終わりました（既に登録されてますわ）')
      }
    },
    removeLikedShopData(state, shop_data) {
      console.log('削除されました')
      state.liked_shop_list = state.liked_shop_list
        .filter(liked_shop_data => liked_shop_data.id !== shop_data.id);
    },
    // setLikedShopList(state, liked_shop_list) {
    //   if (state.liked_shop_list) {
    //     let temp = [...state.liked_shop_list, ...liked_shop_list]
    //       .reduce((obj, it) => {
    //         obj[it.id] = it;
    //         return obj;
    //       }, {});
    //     state.liked_shop_list = Object.values(temp);
    //   } else {
    //     state.liked_shop_list = liked_shop_list;
    //   }
    // },
    setFilteredShopList(state, filtered_shop_list) {
      state.filtered_shop_list = filtered_shop_list;
    },
    setShopFilterBudget(state, budget) {
      state.shop_filter.budget = budget;
    },
    setShopFilterGenre(state, genre) {
      state.shop_filter.genre = genre;
    },
    setShopFilterLike(state, isLiked) {
      state.shop_filter.isLiked = isLiked;
    },
    setErrMessage(state, err_message) {
      state.err_message = err_message;
    },
  },
  plugins: [createPersistedState({
    key: 'IsakayaSearchApp',
    storage: localStorage
  })]
});
