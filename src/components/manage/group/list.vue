<template>
    <section>
      <div class="row">
        <div class="col-md-12">
          <div class="card card-info card-outline">
            <div class="card-header">
                <div class="row table-controll">
                  <div class="col-sm-12 col-md-9">
                    <button type="button" class="btn btn-primary" @click="editGroup()">Add Group</button>
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
                    <th>Remark</th>
                    <th>Create Time</th>
                    <th>Action</th>
                  </tr>
                  <tr v-for="(item) in table.list" v-bind:key="item.id">
                    <td>{{item.id}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.remark}}</td>
                    <td><span class="tag tag-success">{{item.create_time | timeParser}}</span></td>
                    <td>
                      <button type="button" class="btn btn-sm btn-primary" @click="editGroup(item)">Edit</button>
                      <router-link class="btn btn-sm btn-primary" :to="{ path: 'auth', query: { id: item.id }}">Set Menu</router-link>
                      <router-link class="btn btn-sm btn-primary" :to="{ path: '/system/api/list', query: { group_id: item.id }}">API Auth</router-link>
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
        <label for="menuName" class="col-sm-3 control-label">Group Name</label>
        <div class="col-sm-12">
          <input type="text" class="form-control" v-model="dialog.edit.name" autofocus>
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
        remark: ''
      }
      return emptyItem;
    },
    loadList(page) {
      page == 'next' && this.table.page ++;
      page == 'prev' && this.table.page --;
      (typeof(page) == 'number') && (this.table.page = page);

      this.$api.admin.group.getList({
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
        this.$api.admin.group.createItem(this.dialog.edit)
        .then(response => {
          this.$message('Group created!');
          this.loadList();
        })
      } else {
        this.$api.admin.group.edit(groupId, this.dialog.edit)
        .then(response => {
          this.$message('Group info saved!');
          this.loadList();
        })
      }
      this.dialog.display = false;
    }
  }
};
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>