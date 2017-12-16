import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: '8591',
      component: () => ({
        component: import ( /* webpackChunkName: "index" */ '_PAGE_/index'),
      }),
      props: {nid: 8591}
    },
    {
      path: '/100',
      name: '100',
      component: () => ({
        component: import ( /* webpackChunkName: "index" */ '_PAGE_/index'),
      }),
      props: {nid: 100}
    },
    {
      path: '/collection/:nid/:cat1?/:cat2?',
      name: 'collection',
      component: () => ({
        component: import ( /* webpackChunkName: "collection" */ '_PAGE_/collection'),
      })
    },
    {
      path: '/questionDetail/:qid',
      name: 'questionDetail',
      component: () => ({
        component: import ( /* webpackChunkName: "questionDetail" */ '_PAGE_/questionDetail'),
      })
    },
    {
      path: '/edit/:nid/:qid',
      name: 'edit',
      component: () => ({
        component: import( /* webpackChunkName: "edit" */ '_PAGE_/edit'),
      })
    },
    {
      path: '/ask/:nid',
      name: 'ask',
      component: () => ({
        component: import( /* webpackChunkName: "edit" */ '_PAGE_/ask'),
      })
    },

  ]
})
