import Vue from 'vue'
import App from './App'
import router from './router/index.js'
import axios from 'axios'
import 'common/stylus/index.styl'

// Vue.config.productionTip = false
Vue.prototype.$ajax = axios
Vue.prototype.baseUrl = 'http://a.ejiabl.com'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
