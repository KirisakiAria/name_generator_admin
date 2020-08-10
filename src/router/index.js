import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/words',
    name: 'Layout',
    component: () => import('@/views/Layout'),
    children: [
      {
        path: '/words',
        component: () => import('@/views/WordList'),
        name: 'WordList',
        meta: {
          id: 1,
          title: '词语列表',
          icon: 'list',
        },
      },
      {
        path: '/users',
        component: () => import('@/views/UserList'),
        name: 'UserList',
        meta: {
          id: 3,
          title: '用户管理',
          icon: 'user',
        },
      },
      {
        path: '/app',
        component: () => import('@/views/Application'),
        name: 'Application',
        meta: {
          id: 2,
          title: 'APP信息',
          icon: 'app',
        },
      },
      {
        path: '/service',
        component: () => import('@/views/Service'),
        name: 'Service',
        meta: {
          id: 5,
          title: '服务信息',
          icon: 'service',
        },
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/Login'),
  },
]

const router = new VueRouter({
  routes,
})

export default router
