// src/store/index.js

import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);

const state = {
  accessToken: null,
  userInfo: {},
  authMenu: [],
  uiConfig: {
    sidebar: {
      collapse: false,
      open: false,
      activeTree: null,
      avtiveLink: null,
      openedTree: []
    }
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions
})