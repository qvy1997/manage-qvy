import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('../views/login.vue')
    },
    {
      path: '/Creation',
      name: 'Creation',
      component: () => import('../views/addSubject.vue')
    },
    {
      path: '/delete',
      name: 'Delete',
      component: () => import('../views/deleteSubject.vue')
    },
    {
      path: '/search',
      name: 'Search',
      component: () => import('../views/search.vue')
    }
  ]
})
