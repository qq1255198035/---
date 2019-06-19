// ie polyfill
import '@babel/polyfill'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import i18n from './lang'
import { VueAxios } from './utils/request'
// mock

import bootstrap from './core/bootstrap'
import './core/use'
import './permission' // permission control
import './utils/filter' // global filter

Vue.config.productionTip = false;
// 设置服务器地址
Vue.prototype.$host = 'http://192.168.0.129/'
// mount axios Vue.$http and this.$http
Vue.use(VueAxios)
/* eslint-disable */
new Vue({
  router,
  store,
  i18n,
  created() {
    bootstrap()
  },
  render: h => h(App)
}).$mount('#app')
