import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './src/App.vue'
import routes from './src/routes'
import stores from './src/stores'

Vue.use(VueRouter)
Vue.use(Vuex)

const router = new VueRouter({
  routes
})

const store = new Vuex.Store(stores)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#root')