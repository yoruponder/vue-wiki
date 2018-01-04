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
      path: '/question/:qid',
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
        component: import( /* webpackChunkName: "ask" */ '_PAGE_/ask'),
      })
    },
    {
      path: '/life',
      name: 'life',
      component: () => ({
        component: import( /* webpackChunkName: "life" */ '_PAGE_/life'),
      })
    },
    {
      path: '/life/collection/:cat1?/:cat2?',
      name: 'lifeCollection',
      component: () => ({
        component: import( /* webpackChunkName: "lifeCollection" */ '_PAGE_/lifeCollection'),
      })
    },
    {
      path: '/notification/publish',
      name: 'notificationPublish',
      component: () => ({
        component: import( /* webpackChunkName: "notificationPublish" */ '_PAGE_/notificationPublish'),
      })
    },
    {
      path: '/notification/detail/:id',
      name: 'notificationDetail',
      component: () => ({
        component: import( /* webpackChunkName: "notificationDetail" */ '_PAGE_/notificationDetail'),
      })
    },
    {
      path: '/notification/:id?',
      name: 'notification',
      component: () => ({
        component: import( /* webpackChunkName: "notification" */ '_PAGE_/notification'),
      })
    },
    {
      path: '/uc/:type?/:id?',
      name: 'usercenter',
      component: () => ({
        component: import( /* webpackChunkName: "usercenter" */ '_PAGE_/usercenter'),
      }),
      beforeEnter: (to, from, next) => {
        if(!store.state.user.uid){
          next('/');
        }else{
          next();
        }
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => ({
        component: import( /* webpackChunkName: "admin" */ '_PAGE_/admin'),
      }),
      children: [
        {
          path: 'score',
          component: () => ({
            component: import( /* webpackChunkName: "admin-sco" */ '_PAGE_/admin/score'),
          })
        },
        {
          path: 'nav',
          component: () => ({
            component: import( /* webpackChunkName: "admin-nav" */ '_PAGE_/admin/nav'),
          })
        },
        {
          path: 'question/:nid?',
          component: () => ({
            component: import( /* webpackChunkName: "admin-que" */ '_PAGE_/admin/question'),
          })
        },
        {
          path: 'answer/:nid?',
          component: () => ({
            component: import( /* webpackChunkName: "admin-ans" */ '_PAGE_/admin/answer'),
          })
        },
        {
          path: 'category/:nid?',
          component: () => ({
            component: import( /* webpackChunkName: "admin-cat" */ '_PAGE_/admin/category'),
          })
        },
        {
          path: 'tag/:nid?',
          component: () => ({
            component: import( /* webpackChunkName: "admin-tag" */ '_PAGE_/admin/tag'),
          })
        },
        {
          path: 'notice',
          component: () => ({
            component: import( /* webpackChunkName: "admin-not" */ '_PAGE_/admin/notice'),
          })
        }
      ],
      beforeEnter: (to, from, next) => {
        if(to.name == 'admin'){
          next('/admin/score');
        }else{
          next();
        }
        //if (!store.state.user.super) {
          //next('/');
        //} else {
          //next();
        //}
      }
    },
  ]
})
