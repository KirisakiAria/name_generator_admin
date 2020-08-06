import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/words',
    component: () => import('@/views/Layout'),
    children: [
      {
        path: '/words',
        component: () => import('@/views/WordList'),
        name: 'wordList',
        meta: {
          id: 1,
          title: '词语列表',
          icon: 'list',
        },
      },
      {
        path: '/users',
        component: () => import('@/views/UserList'),
        name: 'userList',
        meta: {
          id: 3,
          title: '用户管理',
          icon: 'user',
        },
      },
      {
        path: '/app',
        component: () => import('@/views/Application'),
        name: 'application',
        meta: {
          id: 2,
          title: 'APP信息',
          icon: 'app',
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
