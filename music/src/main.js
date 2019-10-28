import Vue from 'vue'
import App from './App.vue'
import router from './route/index'
import store from './store/index'
import toast from './components/common/toast/index'

import fastclick from 'fastclick';
import lazyload from 'vue-lazyload'

Vue.config.productionTip = false

fastclick.attach(document.body)
Vue.use(lazyload)
Vue.use(toast)

Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
