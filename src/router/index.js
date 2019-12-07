import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Creation',
      component: () => import('../views/addSubject.vue')
    },
    {
      path: '/update',
      name: 'Update',
      component: () => import('../views/updateSubject.vue')
    },
    {
      path: '/delete',
      name: 'Delete',
      component: () => import('../views/deleteSubject.vue')
    }
  ]
})
