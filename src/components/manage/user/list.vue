<template>
    <section>
      <div class="row">
        <div class="col-md-12">
          <div class="card card-info card-outline">
            <div class="card-header">
                <div class="row table-controll">
                  <div class="col-sm-12 col-md-9">
                    <button type="button" class="btn btn-primary" @click="edit()">Add User</button>
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
                    <th>User Name</th>
                    <th>Nickname</th>
                    <th>Last Login</th>
                    <th>Last Login IP</th>
                    <th>Update Time</th>
                    <th>Action</th>
                  </tr>
                  <tr v-for="(item) in table.list" v-bind:key="item.id">
                    <td>{{item.id}}</td>
                    <td>{{item.username}}</td>
                    <td>{{item.nickname}}</td>
                    <td>{{item.last_login_time | timeParser}}</td>
                    <td>{{item.last_login_ip}}</td>
                    <td><span class="tag tag-success">{{item.update_time | timeParser}}</span></td>
                    <td>
                      <button type="button" class="btn btn-sm btn-primary" @click="edit(item)">Edit</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
<el-dialog title="Edit User" :visible.sync="dialog.display">
  <form class="form-horizontal">
    <div class="card-body row">
      <div class="form-group col-md-6">
        <label class="col-sm-12 control-label">User Name</label>
        <div class="col-sm-12">
          <input type="text" class="form-control" v-model="dialog.edit.username" autofocus>
        </div>
      </div>
      <div class="form-group col-md-6">
        <label class="col-sm-12 control-label">Nickname</label>
        <div class="col-sm-12">
          <input type="text" class="form-control" v-model="dialog.edit.nickname" autofocus>
        </div>
      </div>
      <div class="form-group col-md-6">
        <label class="col-sm-12 control-label">Password</label>
        <div class="col-sm-12">
          <input type="password" class="form-control" v-model="dialog.edit.password">
        </div>
      </div>
      <div class="form-group col-md-6">
          <label class="col-sm-12 control-label">Group</label>
        <div class="col-sm-12">
          <select class="form-control" v-model.number="dialog.edit.group">
            <option v-for="item in groupList" :value="item.id" :key="item.id">{{item.name}}</option>
          </select>
        </div>
      </div>
    </div>
  </form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialog.display = false">取 消</el-button>
    <el-button type="primary" @click="saveItem()">确 定</el-button>
  </div>
</el-dialog>
    </section>
</template>

<script>
export default {
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
      groupList: []
    };
  },
  created: function() {
    this.loadList()
    this.dialog.edit = this.newItem();
    // Get group list for select.
    this.$api.admin.group.getList({
      page: 1,
      pageSize: 100
    }).then(response => {
      this.groupList = response.data.list;
    })
  },
  methods: {
    newItem() {
      let emptyItem = {
        username: '',
        nickname: '',
        group: '',
        password: ''
      }
      return emptyItem;
    },
    loadList(page) {
      page == 'next' && this.table.page ++;
      page == 'prev' && this.table.page --;
      (typeof(page) == 'number') && (this.table.page = page);

      this.$api.admin.user.getList({
        page: this.table.page,
        pageSize: this.table.pageSize
      }).then(response => {
        this.table = response.data;
      })
    },
    edit(item) {
      this.dialog.display = true;
      this.dialog.edit = item || this.newItem();
    },
    saveItem() {
      let groupId = this.dialog.edit.id;
      if (groupId == undefined) {
        this.$api.admin.user.createItem(this.dialog.edit)
        .then(response => {
          this.$message('User created!');
          this.loadList();
        })
      } else {
        this.$api.admin.user.edit(groupId, this.dialog.edit)
        .then(response => {
          this.$message('User info saved!');
          this.loadList();
        })
      }
      this.dialog.display = false;
    }
  }
};
</script>