<template>
    <el-dialog title="API Authorize" :visible.sync="data.show">
      <div class="form-group col-md-6">
          <label class="col-sm-12 control-label">Authorize Group</label>
          <select class="form-control" v-model.number="data.groupId" @change="loadAuthStatus">
            <option v-for="item in groupList" :value="item.id" :key="item.id">{{item.name}}</option>
          </select>
      </div>
      <div class="form-group col-md-12">
          <label class="col-sm-12 control-label">API Info</label>
          <table class="table table-hover table-bordered">
              <tbody><tr>
                <th>ID</th>
                <th>Name</th>
                <th>Version</th>
                <th>Module</th>
                <th>Controller</th>
                <th>GET</th>
                <th>POST</th>
                <th>PUT</th>
                <th>DELETE</th>
              </tr>
              <tr>
                <td>{{data.apiInfo.id}}</td>
                <td>{{data.apiInfo.name}}</td>
                <td>{{data.apiInfo.version}}</td>
                <td>{{data.apiInfo.module}}</td>
                <td>{{data.apiInfo.controller}}</td>
                <td><input type="checkbox" value="remember-me" v-model="authStatus.GET"></td>
                <td><input type="checkbox" value="remember-me" v-model="authStatus.POST"></td>
                <td><input type="checkbox" value="remember-me" v-model="authStatus.PUT"></td>
                <td><input type="checkbox" value="remember-me" v-model="authStatus.DEL"></td>
              </tr>
            </tbody>
          </table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="data.show = false">取 消</el-button>
        <el-button type="primary" @click="save()">确 定</el-button>
      </div>
    </el-dialog>
</template>

<script>
export default {
  name: 'api-auth',
  componentName: 'api-auth',
  data() {
      return {
          groupList: [],
          authStatus: {}
      }
  },
  props: {
    data: Object
  },
  created: function() {
    this.resetAuthStatus();

    // Get group list for select.
    this.$api.admin.group.getList({
      page: 1,
      pageSize: 100
    }).then(response => {
      this.groupList = response.data.list;
    })

    // Get API authorize status
    this.loadAuthStatus();
  },
  methods: {
    save() {
      let sentData = {
        api_id: this.data.apiInfo.id,
        group_id: this.data.groupId,
        authStatus: this.authStatus
      }

      this.$api.admin.api.setAuth(sentData)
        .then(response => {
          this.$message('API auth saved!');
          this.data.show = false;
        });
    },
    loadAuthStatus() {
      this.$api.admin.api.getAuth(this.data.apiInfo.id, this.data.groupId)
      .then(response => {
        this.authStatus = response.data;
      })
      .catch(error => {
        this.resetAuthStatus();
      })
    },
    resetAuthStatus() {
      this.authStatus = {
              GET: false,
              POST: false,
              PUT: false,
              DEL: false
          }
    }
  }
};
</script>
