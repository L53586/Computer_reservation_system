// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:3000'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(Vuex);

Vue.prototype.$axios=axios

// const store = new  Vuex.Store({
//   state:{
//   username:'' 
//   },
  
//   mutations:{
//     setusername(state,username){
//       state.username = username
//     },
//     getters:{
//       username: state => state.username
//     }
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  components: { App },
  template: '<App/>',
  render: h => h(App)
  
})
