<template>
  <transition
    enter-active-class="animated tada"
    leave-active-class="slideInUp animated"
  >
  <div class="login-container text-center">
    <form class="form-signin">
      <h1 class="h1 mb-1 font-weight-normal">Tent Admin SYS</h1>
      <h3 class="h3 mb-3 font-weight-normal">Please sign in</h3>
      <label class="sr-only">User name</label>
      <input type="text" class="form-control" v-model="username" placeholder="User name" required autofocus>
      <label class="sr-only">Password</label>
      <input type="password" class="form-control" v-model="password" placeholder="Password" required>
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" v-model="remember_login"> Remember me
        </label>
      </div>
      <button type="button" class="btn btn-lg btn-primary btn-block" @click="login()">Sign in</button>
      <p class="mt-5 mb-3 text-muted">Tent by SNRC &copy; 2018</p>
    </form>
  </div>
  </transition>
</template>

<script>
import System from '@/common/module/System';

export default {
  data: function() {
    return {
      username: '',
      password: '',
      remember_login: true
    }
  },
  methods: {
    login() {
      //Check input
      if(this.username == '' || this.password == '') {
          this.$message('User name or password can not be empty.');
          return false;
      }

      this.$api.oauth.login(this.username, this.password)
      .then(response => {
        let token = response.data.access_token;
        this.$store.commit('setAuthToken', token);
        localStorage.setItem('token', token);
      })
      .then(() => {
        return System.loadInfo(true);
      })
      .then(() => {
        this.$router.push({
          path: '/'
        })
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>


<style scoped>
.login-container {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-align: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
  height: 100%;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
