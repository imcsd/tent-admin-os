import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/components/framework/Layout'

Vue.use(Router)

const routes = [{
  path: '/',
  component: Layout,
  meta: {
    title: 'DashBoard',
    keep_alive: true
  },
  children: [
      {
        path: '/',
        title: 'DashBoard',
        component: () => import('@/components/dashboard/index')
      }
    ]
  },
  {
    path: '/manage',
    component: Layout,
    children: [
      {
        path: 'group/list',
        meta: {
          title: 'Group List',
        },
        component: () => import('@/components/manage/group/list')
      },
      {
        path: 'group/auth',
        meta: {
          title: 'Group Auth',
        },
        component: () => import('@/components/manage/group/auth')
      },
      {
        path: 'user/list',
        meta: {
          title: 'User List',
        },
        component: () => import('@/components/manage/user/list')
      },
      {
        path: 'user/profile',
        meta: {
          title: 'User Profile',
        },
        component: () => import('@/components/manage/user/profile')
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    children: [
      {
        path: '/system/side-menu',
        meta: {
          title: 'Side Menu Setting',
        },
        component: () => import('@/components/framework/system/SideMenu')
      },
      {
        path: '/system/api/list',
        meta: {
          title: 'API List',
        },
        component: () => import('@/components/manage/api/list')
      }
    ]
  },
  {
    path: '/demo',
    component: Layout,
    children: [
      {
        path: 'table',
        meta: {
          title: 'List Demo',
        },
        component: () => import('@/components/demo/table')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/components/framework/Login.vue'),
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/error/404',
    component: () => import('@/components/framework/error404.vue'),
    meta: {
      title: 'Page not found'
    }
  },
  {
    path: '*',
    component: () => import('@/components/framework/error404.vue'),
    meta: {
      title: 'Page not found'
    }
  }
];


const router = new Router({
  routes,
  mode: 'history',
  base: '/admin/',
  //scrollBehavior: (to, from, savedPosition) => {
  //  //This function controll the route-view scroll.
  //  console.log(savedPosition);
  //  let routeViewEl = document.querySelector('#router-container');
  //  if (savedPosition && to.meta.scrollTop) {
  //    routeViewEl.scrollTop = to.meta.scrollTop;
  //  } else {
  //    routeViewEl.scrollTop = 0;
  //  }
  //}
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + ' - Tent Admin';
  }

  // save keep-alive component scrollTop.
  //if (from.meta.keep_alive) {
  //  let routeViewEl = document.querySelector('#router-container');
  //  from.meta.scrollTop = routeViewEl.scrollTop;
  //  console.log(from.meta);
  //}

  next();
})

export default router;