import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/japanese_four_word',
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
        path: '/japanese_four_word',
        component: () => import('@/views/JapaneseFourWord'),
        name: 'japaneseFourWord',
        meta: {
          id: 2,
          title: '四字日语',
          icon: 'a',
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
