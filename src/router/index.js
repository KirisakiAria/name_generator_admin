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
        component: () => import('@/views/word/WordList'),
        name: 'WordList',
        meta: {
          id: 1,
          title: '词语列表',
          icon: 'list',
        },
      },
      {
        path: '/users',
        component: () => import('@/views/user/UserList'),
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
      {
        path: '/error',
        component: () => import('@/views/error/ErrorList'),
        name: 'Error',
        meta: {
          id: 6,
          title: '报错管理',
          icon: 'error',
        },
      },
      {
        path: '/feedback',
        component: () => import('@/views/feedback/FeedbackList'),
        name: 'Feedback',
        meta: {
          id: 7,
          title: '反馈管理',
          icon: 'feedback',
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
