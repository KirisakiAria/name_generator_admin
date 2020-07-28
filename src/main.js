import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//公共组件
import SideBar from './components/SideBar.vue'
import HeaderBar from './components/HeaderBar.vue'
//axios配置
import './request/requestConfig'
//elui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//引入自定义样式
import './assets/css/base.less'
import './assets/css/iconfont.css'

Vue.use(ElementUI)

Vue.component('SideBar', SideBar)
Vue.component('HeaderBar', HeaderBar)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
