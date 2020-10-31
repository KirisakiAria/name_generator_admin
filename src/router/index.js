import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/system',
    name: 'Layout',
    component: () => import('@/views/Layout'),
    children: [
      {
        path: '/system',
        component: () => import('@/views/System'),
        name: 'System',
        meta: {
          id: 1,
          title: '系统信息',
          icon: 'system',
        },
      },
      {
        path: '/words',
        component: () => import('@/views/word/WordList'),
        name: 'WordList',
        meta: {
          id: 2,
          title: '词语列表',
          icon: 'list',
        },
      },
      {
        path: '/couples',
        component: () => import('@/views/word/CouplesList'),
        name: 'CouplesList',
        meta: {
          id: 3,
          title: '情侣词语',
          icon: 'couples',
        },
      },
      {
        path: '/inspiration',
        component: () => import('@/views/inspiration/InspirationList'),
        name: 'InspirationList',
        meta: {
          id: 4,
          title: '灵感管理',
          icon: 'inspiration',
        },
      },
      {
        path: '/users',
        component: () => import('@/views/user/UserList'),
        name: 'UserList',
        meta: {
          id: 5,
          title: '用户管理',
          icon: 'user',
        },
      },
      {
        path: '/notification',
        component: () => import('@/views/notification/NotificationList'),
        name: 'Notification',
        meta: {
          id: 6,
          title: '通知信息',
          icon: 'notification',
        },
      },
      {
        path: '/app',
        component: () => import('@/views/Application'),
        name: 'Application',
        meta: {
          id: 7,
          title: 'APP信息',
          icon: 'app',
        },
      },
      {
        path: '/service',
        component: () => import('@/views/Service'),
        name: 'Service',
        meta: {
          id: 8,
          title: '服务信息',
          icon: 'service',
        },
      },
      {
        path: '/error',
        component: () => import('@/views/error/ErrorList'),
        name: 'Error',
        meta: {
          id: 9,
          title: '报错管理',
          icon: 'error',
        },
      },
      {
        path: '/feedback',
        component: () => import('@/views/feedback/FeedbackList'),
        name: 'Feedback',
        meta: {
          id: 10,
          title: '反馈管理',
          icon: 'feedback',
        },
      },
      {
        path: '/dictionary',
        component: () => import('@/views/dictionary/Dictionary'),
        name: 'Dictionary',
        meta: {
          id: 11,
          title: '数据字典',
          icon: 'dictionary',
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
