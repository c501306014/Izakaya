import Vue from 'vue'
import Router from 'vue-router'

import search from '@/views/search.vue'
import result from '@/views/result.vue'
import liked from '@/views/liked.vue'


Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [{
    path: '/',
    component: search,
  },
  {
    path: '/result',
    component: result,
  },
  {
    path: '/liked',
    component: liked,
    name: 'Liked',
    props: true
  }
  ]
})