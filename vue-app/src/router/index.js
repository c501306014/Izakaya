import Vue from 'vue'
import Router from 'vue-router'

import search from '@/views/search.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      component: search
    },
  ]
})