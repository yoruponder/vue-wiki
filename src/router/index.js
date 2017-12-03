import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      component: () => ({
        component: import ( /* webpackChunkName: "index" */ '_PAGE_/index'),
      }),
      props: {nid: 1}
    },
    {
      path: '/100',
      component: () => ({
        component: import ( /* webpackChunkName: "index" */ '_PAGE_/index'),
      }),
      props: {nid: 2}
    },
    {
      path: '/collection/:nid/:cat1?/:cat2?',
      component: () => ({
        component: import ( /* webpackChunkName: "index" */ '_PAGE_/collection'),
      })
    },

  ]
})
