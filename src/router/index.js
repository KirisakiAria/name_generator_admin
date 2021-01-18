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
        path: '/word',
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
        path: '/word_dictionary',
        component: () => import('@/views/word_dictionary/WordDictionaryList'),
        name: 'WordDictionary',
        meta: {
          id: 4,
          title: '词典管理',
          icon: 'word-dictionary',
        },
      },
      {
        path: '/inspiration',
        component: () => import('@/views/inspiration/InspirationList'),
        name: 'InspirationList',
        meta: {
          id: 5,
          title: '灵感管理',
          icon: 'inspiration',
        },
      },
      {
        path: '/user',
        component: () => import('@/views/user/UserList'),
        name: 'UserList',
        meta: {
          id: 6,
          title: '用户管理',
          icon: 'user',
        },
      },
      {
        path: '/order',
        component: () => import('@/views/order/OrderList'),
        name: 'OrderList',
        meta: {
          id: 7,
          title: '订单管理',
          icon: 'order',
        },
      },
      {
        path: '/key',
        component: () => import('@/views/key/KeyList'),
        name: 'KeyList',
        meta: {
          id: 8,
          title: '订单管理',
          icon: 'key',
        },
      },
      {
        path: '/plan',
        component: () => import('@/views/plan/PlanList'),
        name: 'PlanList',
        meta: {
          id: 9,
          title: '订阅管理',
          icon: 'price',
        },
      },
      {
        path: '/notification',
        component: () => import('@/views/notification/NotificationList'),
        name: 'Notification',
        meta: {
          id: 10,
          title: '通知信息',
          icon: 'notification',
        },
      },
      {
        path: '/app',
        component: () => import('@/views/Application'),
        name: 'Application',
        meta: {
          id: 11,
          title: 'APP信息',
          icon: 'app',
        },
      },
      {
        path: '/service',
        component: () => import('@/views/Service'),
        name: 'Service',
        meta: {
          id: 12,
          title: '服务信息',
          icon: 'service',
        },
      },
      {
        path: '/error',
        component: () => import('@/views/error/ErrorList'),
        name: 'Error',
        meta: {
          id: 13,
          title: '报错管理',
          icon: 'error',
        },
      },
      {
        path: '/feedback',
        component: () => import('@/views/feedback/FeedbackList'),
        name: 'Feedback',
        meta: {
          id: 14,
          title: '反馈管理',
          icon: 'feedback',
        },
      },
      {
        path: '/dictionary',
        component: () => import('@/views/data_dictionary/DataDictionary'),
        name: 'Dictionary',
        meta: {
          id: 15,
          title: '数据字典',
          icon: 'data-dictionary',
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
