import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Platform from '@/views/Platform'
import Package from '@/views/Package'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/:platform',
      name: 'platform',
      component: Platform,
    },
    {
      path: '/:platform/:name',
      name: 'package',
      component: Package,
    },
  ],
})
