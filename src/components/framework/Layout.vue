<template>
<div class="wrapper hold-transition sidebar-mini" :class="{'sidebar-collapse' : uiConfig.sidebar.collapse, 'sidebar-open' : uiConfig.sidebar.open}">
  <!-- Navbar -->
    <nav-bar></nav-bar>
  <!-- /.navbar -->

  <!-- Main Sidebar Container -->
  <side-menu></side-menu>

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">{{currentRoute.meta.title}}</h1>
          </div><!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
              <li class="breadcrumb-item active">{{currentRoute.meta.title}}</li>
            </ol>
          </div><!-- /.col -->
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <div class="content">
      <div class="container-fluid">
        <keep-alive>
          <router-view v-if="$route.meta.keep_alive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keep_alive"></router-view>
      </div>
    </div>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->

  <!-- Main Footer -->
  <footer class="main-footer">
    <!-- To the right -->
    <div class="float-right d-none d-sm-block-down">
      Anything you want
    </div>
    <!-- Default to the left -->
    <strong>Copyright &copy; 2018 <a href="https://icsd.ml">TentAdmin</a>.</strong> All rights reserved.
  </footer>
  <div id="sidebar-overlay" v-if="uiConfig.sidebar.open" @click="uiConfig.sidebar.open = false"></div>
</div>
</template>

<script>
import NavBar from "@/components/framework/NavBar.vue";
import SideMenu from "@/components/framework/SideMenu.vue";

export default {
  components: {
    "nav-bar": NavBar,
    "side-menu": SideMenu
  },
  computed: {
    uiConfig () {
      return this.$store.state.uiConfig
    },
    currentRoute () {
      return this.$route;
    }
  }
};
</script>