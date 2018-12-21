<template>
    <section>
      <div class="row">
        <div class="col-md-12">
          <div class="card card-info card-outline">
            <div class="card-header">
                <div class="row table-controll">
                  <div class="col-sm-12 col-md-9">
                    <button type="button" class="btn btn-primary" @click="editGroup()">Add New</button>
                  </div>
                  <div class="col-sm-12 col-md-3">
                    <div class="input-group">
                      <input type="text" name="table_search" class="form-control float-right" placeholder="Search">
                      <div class="input-group-append">
                        <button type="submit" class="btn btn-default"><i class="fa fa-search"></i></button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <div class="card-body">
              <table class="table table-hover table-bordered">
                  <tbody><tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Version</th>
                    <th>Module</th>
                    <th>Controller</th>
                    <th>Remark</th>
                    <th>Create Time</th>
                    <th>Action</th>
                  </tr>
                  <tr v-for="(item) in table.list" v-bind:key="item.id">
                    <td>{{item.id}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.version}}</td>
                    <td>{{item.module}}</td>
                    <td>{{item.controller}}</td>
                    <td>{{item.remark}}</td>
                    <td><span class="tag tag-success">{{item.create_time | timeParser}}</span></td>
                    <td>
                      <button type="button" class="btn btn-sm btn-primary" @click="editGroup(item)">Edit</button>
                      <button type="button" class="btn btn-sm btn-primary" @click="setAuth(item)">API Auth</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
<el-dialog title="Edit Group" :visible.sync="dialog.display">
  <form class="form-horizontal">
    <div class="card-body row">
      <div class="form-group col-md-6">
        <label for="menuName" class="col-sm-3 control-label">API Name</label>
        <div class="col-sm-12">
          <input type="text" class="form-control" v-model="dialog.edit.name" autofocus>
        </div>
      </div>
      <div class="form-group col-md-6">
        <label for="menuName" class="col-sm-3 control-label">Version</label>
        <div class="col-sm-12">
          <input type="text" class="form-control" v-model="dialog.edit.version" autofocus>
        </div>
      </div>
      <div class="form-group col-md-6">
        <label for="menuName" class="col-sm-3 control-label">Module</label>
        <div class="col-sm-12">
          <input type="text" class="form-control" v-model="dialog.edit.module" autofocus>
        </div>
      </div>
      <div class="form-group col-md-6">
        <label for="menuName" class="col-sm-3 control-label">Controller</label>
        <div class="col-sm-12">
          <input type="text" class="form-control" v-model="dialog.edit.controller" autofocus>
        </div>
      </div>
      <div class="form-group col-md-12">
        <label for="routePath" class="col-sm-3 control-label">Remark</label>
        <div class="col-sm-12">
          <input type="text" class="form-control" v-model="dialog.edit.remark">
        </div>
      </div>
    </div>
  </form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialog.display = false">取 消</el-button>
    <el-button type="primary" @click="saveItem()">确 定</el-button>
  </div>
</el-dialog>
    <api-auth v-if="authInfo.show" :data="authInfo"></api-auth>
    </section>
</template>

<script>
import treeview from "@/components/manage/api/auth.vue";

export default {
  components: {
    "api-auth": treeview
  },
  data() {
    return {
      table: {
        page: 1,
        pageSize: 10,
        totalCount: 0,
        totalPage: 0,
        list: []
      },
      dialog: {
        display: false,
        edit: {}
      },
      authInfo: {
        show: false,
        groupId: null,
        apiInfo: null
      }
    };
  },
  created: function() {
    this.loadList()
    this.dialog.edit = this.newItem();
  },
  methods: {
    newItem() {
      let emptyItem = {
        name: '',
        version: 'v3',
        module: '',
        controller: '',
        remark: ''
      }
      return emptyItem;
    },
    loadList(page) {
      page == 'next' && this.table.page ++;
      page == 'prev' && this.table.page --;
      (typeof(page) == 'number') && (this.table.page = page);

      this.$api.admin.api.getList({
        page: this.table.page,
        pageSize: this.table.pageSize
      }).then(response => {
        this.table = response.data;
      })
    },
    editGroup(item) {
      this.dialog.display = true;
      this.dialog.edit = item || this.newItem();
    },
    saveItem() {
      let groupId = this.dialog.edit.id;
      if (groupId == undefined) {
        this.$api.admin.api.createItem(this.dialog.edit)
        .then(response => {
          this.$message('API created!');
          this.loadList();
        })
      } else {
        this.$api.admin.api.edit(groupId, this.dialog.edit)
        .then(response => {
          this.$message('API info saved!');
          this.loadList();
        })
      }
      this.dialog.display = false;
    },
    setAuth(item) {
      this.authInfo.show = true;
      this.authInfo.apiInfo = item;
      this.authInfo.groupId =  this.$route.query.group_id;
    }
  }
};
</script>