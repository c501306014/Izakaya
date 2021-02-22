import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// create store
export default new Vuex.Store({
    state:{
        form:{
            pref: "",
            station: ""
        },
        shop_list: null,
    },
    mutations:{
        setForm(state, form){
            state.form = form;
        },
        setShopList(state, shop_list){
            state.shop_list = shop_list;
        }
    }
});