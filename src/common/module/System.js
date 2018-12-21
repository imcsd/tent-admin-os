import store from '@/store'
import router from '@/router'
import api from '@/api'

let System = {
  cacheInfo: true, // Save User Info and Auth Menu to localStorage, load those info from localStorage next time.
  init: function() {
    // Get & check access token
    let token = localStorage.getItem('token');
    if(token == null || token == "") {
      this.toLogin()
    } else {
      store.commit('setAuthToken', token);
      this.loadInfo(true);
    }
  },
  toLogin: function() {
    router.push({
      path: '/login',
      query: {
          redirect: router.currentRoute.fullPath
      }
    });
  },
  /**
   * Road user info and auth menu
   * @param {boolean} nocache 
   * @returns {Promise}
   */
  loadInfo: function(nocache = false) {
    let loadInfoMethod = nocache ? this.loadInfoFromServer : this.loadInfoFromLocal;
    return new Promise((resolve, rejects) => {
      loadInfoMethod()
      .then(result => {
        let userInfo = result[0];
        let authMenu = result[1];
        
        // Commit to Vuex Store
        store.commit('setUserInfo', userInfo);
        store.commit('setAuthMenu', authMenu);

        // Cache info in localStorage
        if(this.cacheInfo) {
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
          localStorage.setItem('authMenu', JSON.stringify(authMenu));
        }

        resolve();
      })
    })
  },
  loadInfoFromServer: function() {
    let getUserInfo = api.admin.user.getProfile();
    let getAuthMenu = api.admin.config.getAuthMenu();

    return new Promise(function(resolve, rejects) {
      Promise.all([
        getUserInfo.catch(error => { return error }),
        getAuthMenu.catch(error => { return error })
      ]).then(result => {
        result[0] = result[0].data;
        result[1] = result[1].data;
        resolve(result);
      })
    })
  },
  loadInfoFromLocal: function() {
    let getUserInfo = localStorage.getItem('userInfo');
    let getAuthMenu = localStorage.getItem('authMenu');

    return new Promise(function(resolve, rejects) {
      resolve([JSON.parse(getUserInfo), JSON.parse(getAuthMenu)]);
    })
  }
}

export default System;