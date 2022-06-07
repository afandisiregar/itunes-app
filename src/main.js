import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import './App.css';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
