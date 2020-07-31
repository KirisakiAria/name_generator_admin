import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/WordList',
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
