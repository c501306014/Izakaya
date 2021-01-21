import Vue from 'vue'
import Router from 'vue-router'

import page1 from '@/views/page1.vue'


Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      component: page1
    },
  ]
})