import Vue from 'vue'
import App from './App.vue'
import VueRouter from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.config.productionTip = false

new Vue({
  VueRouter,
  render: h => h(App),
}).$mount('#app')
