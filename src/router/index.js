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
        path: '/edit',
        component: () => import('@/views/EditWord'),
        name: 'editWord',
        meta: {
          id: 1,
          title: '编辑词语',
          icon: 'edit',
        },
      },
      {
        path: '/words',
        component: () => import('@/views/WordList'),
        name: 'wordList',
        meta: {
          id: 2,
          title: '词语列表',
          icon: 'list',
        },
      },
      {
        path: '/app',
        component: () => import('@/views/Application'),
        name: 'application',
        meta: {
          id: 3,
          title: 'APP信息',
          icon: 'app',
        },
      },
      {
        path: '/users',
        component: () => import('@/views/UserList'),
        name: 'userList',
        meta: {
          id: 4,
          title: '用户管理',
          icon: 'user',
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
