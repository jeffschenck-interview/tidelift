import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Platform from '@/views/Platform'
import Project from '@/views/Project'
import Search from '@/views/Search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
    },
    {
      path: '/:platform',
      name: 'platform',
      component: Platform,
    },
    {
      path: '/:platform/:project',
      name: 'project',
      component: Project,
    },
  ],
})
