import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Platform from '@/views/Platform'
import Project from '@/views/Project'

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
      path: '/:platform/:project',
      name: 'project',
      component: Project,
    },
  ],
})
