// src/store/mutations.js

export default {
  sidebarSwitch (state, type) {
    state.uiConfig.sidebar[type] = !state.uiConfig.sidebar[type]
  },
  setActiveTree (state, id) {
    state.uiConfig.sidebar.activeTree = id
  },
  setAvtiveLink (state, id) {
    state.uiConfig.sidebar.avtiveLink = id
  },
  toggleMenu (state, id) {
    let openedTree = state.uiConfig.sidebar.openedTree;
    var index = openedTree.indexOf(id);
    (index > -1) ? openedTree.splice(index, 1) : openedTree.push(id);
  },
  setAuthToken (state, token) {
    state.accessToken = token
  },
  setUserInfo (state, userInfo) {
    state.userInfo = userInfo
  },
  setAuthMenu (state, authMenu) {
    state.authMenu = authMenu
  }
};