import Vue from 'vue'
import axios from 'axios'
import router from '../router'
import { Loading } from 'element-ui'

axios.defaults.baseURL = process.env.VUE_APP_BASE_API

if (localStorage.getItem('token')) {
  axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
}

let loading

axios.interceptors.request.use(config => {
  loading = Loading.service({
    lock: true,
    spinner: 'iconfont icon-loader',
    text: '加载中',
  })
  return config
})

//返回码非1000统一处理
axios.interceptors.response.use(
  res => {
    loading.close()
    if (res.data.code == '3007' || res.data.code == '3008') {
      router.push('/login')
    }
    if (res.data.code != '1000') {
      Vue.prototype.$message({
        showClose: true,
        message: res.data.message,
        type: 'error',
      })
    }
    return res
  },
  error => {
    loading.close()
    Vue.prototype.$message({
      showClose: true,
      message: '发生错误，请稍后重试',
      type: 'error',
    })
    return Promise.reject(error)
  },
)

Vue.prototype.$axios = axios
Vue.prototype.$get = axios.get
Vue.prototype.$post = axios.post
Vue.prototype.$put = axios.put
Vue.prototype.$delete = axios.delete
