// src/main.js
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './common/style/adminlte.css'
//import 'bootstrap/dist/css/bootstrap.css' // -> Remove bootstrap import because adminlte dist css file contain bootstrap.
import '@fortawesome/fontawesome-free/css/all.css'
import 'animate.css/animate.css'
import './common/style/customize.css'

import router from './router'
import store from './store'
import App from './App'
import System from './common/module/System'

// Register global utility filters.
import * as filters from './filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// Hock api object to Vue Prototype.
import api from './api'
Vue.prototype.$api = api;
Vue.use(ElementUI)

/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  router,
  store,
  ...App,
  created: function() {
    System.init();
  }
});