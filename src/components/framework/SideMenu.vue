<template>
    
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="/" class="brand-link">
      <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTIwMCIgaGVpZ2h0PSIxMjAwIiB2aWV3Qm94PSIwIDAgMTIwMCAxMjAwIj48Zz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2MDAgNjAwKSBzY2FsZSgwLjY5IDAuNjkpIHJvdGF0ZSgwKSB0cmFuc2xhdGUoLTYwMCAtNjAwKSIgc3R5bGU9ImZpbGw6I0U2MDAwMCI+PHN2ZyBmaWxsPSIjRTYwMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWw6c3BhY2U9InByZXNlcnZlIiBzdHlsZT0ic2hhcGUtcmVuZGVyaW5nOmdlb21ldHJpY1ByZWNpc2lvbjt0ZXh0LXJlbmRlcmluZzpnZW9tZXRyaWNQcmVjaXNpb247aW1hZ2UtcmVuZGVyaW5nOm9wdGltaXplUXVhbGl0eTsiIHZpZXdCb3g9IjAgMCAwLjI5MzY2MSAwLjI2MjgzMSIgeD0iMHB4IiB5PSIwcHgiIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIj48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPgogICAKICAgIC5maWwwIHtmaWxsOiNFNjAwMDA7ZmlsbC1ydWxlOm5vbnplcm99CiAgIAogIDwvc3R5bGU+PC9kZWZzPjxnPjxwYXRoIGNsYXNzPSJmaWwwIiBkPSJNMC4xMDMxMzQgMC4xMjQ1NjdsMC4wMjIwNTEyIC0wLjA3NTA4MjcgLTAuMDg4OTQwOSAwLjEzMzQ4OCAwLjA2Njg4OTggLTAuMDU4NDA1NXptMC4wMzg0OTIxIC0wLjA4NjU1NTFsLTAuMDI1MTY1NCAwLjA4NTY4OSAwLjA0MTYxMDIgMC4wMTEwNDcyIC0wLjAxNjQ0NDkgLTAuMDk2NzM2MnptMC4wMDA3NDgwMzEgLTAuMDM4MDExOGwwLjE1MTI4NyAwLjE3MDc0OCAtMC4xMDcwNDMgMC4wOTIwODI3IC0wLjE4NjYxOCAtMC4wNDk1NDcyIDAuMTQyMzc0IC0wLjIxMzI4M3ptMC4wMzQ4MzQ2IDAuMjQ3MzU0bC0wLjAxNjgzMDcgLTAuMDk5MDA3OSAtMC4wNTAxNjkzIC0wLjAxMzMxODkgLTAuMDgzOTc2NCAwLjA3MjI0MDIgMC4xNTA5NzYgMC4wNDAwODY2em0tMC4wMjM4ODU4IC0wLjIxNTQwNmwwLjAxODA3ODcgMC4xMDYzMzkgMC4wOTg3MjgzIDAuMDI2MTEwMiAtMC4xMTY4MDcgLTAuMTMyNDQ5em0wLjAyMDM4NTggMC4xMTk5MzdsMC4wMTU2NDU3IDAuMDkyMDM5NCAwLjA3ODA2NjkgLTAuMDY3MTU3NSAtMC4wOTM3MTI2IC0wLjAyNDg4MTl6Ij48L3BhdGg+PC9nPjwvc3ZnPjwvZz48L2c+PC9zdmc+" alt="TentAdmin Logo" class="brand-image img-circle elevation-3"
           style="opacity: .8">
      <span class="brand-text font-weight-light">TentAdmin</span>
    </a>

    <!-- Sidebar -->
        
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTIwMCIgaGVpZ2h0PSIxMjAwIiB2aWV3Qm94PSIwIDAgMTIwMCAxMjAwIj48Zz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2MDAgNjAwKSBzY2FsZSgwLjY5IDAuNjkpIHJvdGF0ZSgwKSB0cmFuc2xhdGUoLTYwMCAtNjAwKSIgc3R5bGU9ImZpbGw6IzAyQkFGRiI+PHN2ZyBmaWxsPSIjMDJCQUZGIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iTGF5ZXIgMSIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHg9IjBweCIgeT0iMHB4Ij48dGl0bGU+dXNyPC90aXRsZT48cGF0aCBkPSJNMCw1MTJINTEyVjBIMFY1MTJaTTI1NiwxMDZhNzEuMzUsNzEuMzUsMCwxLDEtNzEuMzUsNzEuMzVBNzEuNDMsNzEuNDMsMCwwLDEsMjU2LDEwNlpNMTU3LjQsMzA3LjRhMTM5LjQ1LDEzOS40NSwwLDAsMSwyMzgsOTguNkgxMTYuNTVBMTM4LjUzLDEzOC41MywwLDAsMSwxNTcuNCwzMDcuNFoiPjwvcGF0aD48L3N2Zz48L2c+PC9nPjwvc3ZnPg==" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
          <router-link :to="'/manage/user/profile'" class="d-block">{{userInfo.nickname}}</router-link>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          
          <template v-for="item in sidemenu">

            <!-- Check the top lavel menu type. -->
            <li class="nav-header" v-if="item.type == 'header'" :key="item.id">{{item.label}}</li>
            <treeview v-else-if="item.type == 'treeview'" :data="item" :key="item.id"></treeview>
            <menu-item v-else-if="item.type == 'link'" :data="item" :key="item.id"></menu-item>

            <!-- Check the sub-menu. -->
            <!-- When they exist on the same node, v-for has a higher priority than v-if.
                 We need to separate v-if and v-for into two template to solve some bug. -->
            <template v-if="item.children">
              <template v-for="item in item.children">
                <treeview v-if="item.type == 'treeview'" :data="item" :key="item.id"></treeview>
                <menu-item v-else-if="item.type == 'link'" :data="item" :key="item.id"></menu-item>
              </template>
            </template>

          </template>

        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>

<script>
import treeview from "@/components/framework/menu-tree/treeview.vue";
import MenuItem from "@/components/framework/menu-tree/menu-item.vue";

export default {
  components: {
    "treeview": treeview,
    "menu-item": MenuItem
  },
  computed: {
    sidemenu () {
      return this.$store.state.authMenu
    },
    userInfo () {
      return this.$store.state.userInfo
    }
  }
}
</script>

<style>
.sidebar-dark-primary {
    background-color: #1c2b36;
}
</style>
