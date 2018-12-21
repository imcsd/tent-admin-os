<template>
      <nav class="main-header navbar navbar-expand bg-white navbar-light border-bottom">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" @click="toggleSideBar()"><i class="fa fa-bars"></i></a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a href="/" class="nav-link">Home</a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a href="javascript:;" class="nav-link">Contact</a>
      </li>
    </ul>
 
    <!-- SEARCH FORM -->
    <form class="form-inline ml-3">
      <div class="input-group input-group-sm">
        <input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search">
        <div class="input-group-append">
          <button class="btn btn-navbar" type="submit">
            <i class="fa fa-search"></i>
          </button>
        </div>
      </div>
    </form>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">

      <!-- Messages Dropdown Menu -->
      <li class="nav-item dropdown" v-bind:class="{ show: navMenuToggle.message }" @click="toggleNavMenu('message')">
        <a class="nav-link" data-toggle="dropdown" href="javascript:;">
          <i class="fa fa-comments"></i>
          <span class="badge badge-danger navbar-badge">3</span>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right" v-bind:class="{ show: navMenuToggle.message }">
          <a href="javascript:;" class="dropdown-item">
            <!-- Message Start -->
            <div class="media">
              <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTIwMCIgaGVpZ2h0PSIxMjAwIiB2aWV3Qm94PSIwIDAgMTIwMCAxMjAwIj48Zz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2MDAgNjAwKSBzY2FsZSgwLjY5IDAuNjkpIHJvdGF0ZSgwKSB0cmFuc2xhdGUoLTYwMCAtNjAwKSIgc3R5bGU9ImZpbGw6IzAyQkFGRiI+PHN2ZyBmaWxsPSIjMDJCQUZGIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iTGF5ZXIgMSIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHg9IjBweCIgeT0iMHB4Ij48dGl0bGU+dXNyPC90aXRsZT48cGF0aCBkPSJNMCw1MTJINTEyVjBIMFY1MTJaTTI1NiwxMDZhNzEuMzUsNzEuMzUsMCwxLDEtNzEuMzUsNzEuMzVBNzEuNDMsNzEuNDMsMCwwLDEsMjU2LDEwNlpNMTU3LjQsMzA3LjRhMTM5LjQ1LDEzOS40NSwwLDAsMSwyMzgsOTguNkgxMTYuNTVBMTM4LjUzLDEzOC41MywwLDAsMSwxNTcuNCwzMDcuNFoiPjwvcGF0aD48L3N2Zz48L2c+PC9nPjwvc3ZnPg==" alt="User Avatar" class="img-size-50 mr-3 img-circle">
              <div class="media-body">
                <h3 class="dropdown-item-title">
                  Brad Diesel
                  <span class="float-right text-sm text-danger"><i class="fa fa-star"></i></span>
                </h3>
                <p class="text-sm">Call me whenever you can...</p>
                <p class="text-sm text-muted"><i class="fa fa-clock mr-1"></i> 4 Hours Ago</p>
              </div>
            </div>
            <!-- Message End -->
          </a>
          <a href="javascript:;" class="dropdown-item dropdown-footer">See All Messages</a>
        </div>
      </li>

      <!-- Notifications Dropdown Menu -->
      <li class="nav-item dropdown" v-bind:class="{ show: navMenuToggle.notice }" @click="toggleNavMenu('notice')">
        <a class="nav-link" data-toggle="dropdown" href="javascript:;">
          <i class="fa fa-bell"></i>
          <span class="badge badge-warning navbar-badge">15</span>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right" v-bind:class="{ show: navMenuToggle.notice }">
          <span class="dropdown-item dropdown-header">15 Notifications</span>
          <div class="dropdown-divider"></div>
          <a href="javascript:;" class="dropdown-item">
            <i class="fa fa-envelope mr-2"></i> 4 new messages
            <span class="float-right text-muted text-sm">3 mins</span>
          </a>
          <div class="dropdown-divider"></div>
          <a href="javascript:;" class="dropdown-item">
            <i class="fa fa-users mr-2"></i> 8 friend requests
            <span class="float-right text-muted text-sm">12 hours</span>
          </a>
          <div class="dropdown-divider"></div>
          <a href="javascript:;" class="dropdown-item">
            <i class="fa fa-file mr-2"></i> 3 new reports
            <span class="float-right text-muted text-sm">2 days</span>
          </a>
          <div class="dropdown-divider"></div>
          <a href="javascript:;" class="dropdown-item dropdown-footer">See All Notifications</a>
        </div>
      </li>

      <!-- User Action -->
      <li class="nav-item dropdown" v-bind:class="{ show: navMenuToggle.user }" @click="toggleNavMenu('user')">
        <a class="nav-link" data-toggle="dropdown" href="javascript:;">
          <i class="fa fa-user-circle"></i>
        </a>
        <div class="dropdown-menu dropdown-menu-right" v-bind:class="{ show: navMenuToggle.user }">
          <router-link :to="'/manage/user/profile'" class="dropdown-item">
            <i class="fa fa-users mr-2"></i> Profile
          </router-link>
          <div class="dropdown-divider"></div>
          <a href="javascript:;" class="dropdown-item" @click="logout">
            <i class="fa fa-sign-out-alt mr-2"></i> Log out
          </a>
        </div>
      </li>
    </ul>
  </nav>
</template>


<script>
export default {
  data: function() {
    return {
      navMenuToggle: {
        user: false,
        notice: false,
        message: false
      }
    }
  },
  methods: {
    toggleNavMenu(icon) {
      this.navMenuToggle[icon] = !this.navMenuToggle[icon];
    },
    toggleSideBar() {
      let width = screen.width;
      let type = (width > 767) ? 'collapse' : 'open';
      this.$store.commit('sidebarSwitch', type);
    },
    logout() {
      this.$api.oauth.logout()
      .then(response => {
        this.$router.push({
          path: '/login'
        })
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
};
</script>