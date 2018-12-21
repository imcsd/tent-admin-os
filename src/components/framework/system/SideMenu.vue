<template>
    <section>
      <div class="row">
        <div class="col-md-12">
          <div class="card card-info card-outline">
            <div class="card-header">
                <div class="row table-controll">
                  <div class="col-sm-12 col-md-9">
                    <button type="button" class="btn btn-primary" @click="insertAfter()">Add Menu</button>
                    <button type="button" class="btn btn-primary" @click="getCheckedNode()">getCheckedNode</button>
                    <button type="button" class="btn btn-primary" @click="getCheckedKey()">getCheckedKey</button>
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
                <div class="custom-tree-container">
                  <div class="block">
                    <el-tree
                      ref="tree"
                      :data="sideMenu.menuTree"
                      show-checkbox
                      node-key="id"
                      default-expand-all
                      :expand-on-click-node="false">
                      <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span>{{ node.label }}</span>
                        <span>
                          <el-button
                            type="text"
                            size="mini"
                            @click="() => append(data)">
                            Append
                          </el-button>
                          <el-button
                            type="text"
                            size="mini"
                            @click="() => editMenu(node.key, data)">
                            Edit
                          </el-button>
                          <el-button
                            type="text"
                            size="mini"
                            @click="() => remove(node, data)">
                            Delete
                          </el-button>
                        </span>
                      </span>
                    </el-tree>
                  </div>
                </div>
            </div>
            <div class="card-footer">
              <button type="submit" class="btn btn-success float-right" @click="saveMenu()">Save</button>
            </div>
          </div>
        </div>
      </div>
      
<el-dialog title="Edit Menu Info" :visible.sync="dialog.display">
  <form class="form-horizontal">
    <div class="card-body row">
      <div class="form-group col-md-6">
        <label for="menuName" class="col-sm-3 control-label">Menu Name</label>
        <div class="col-sm-12">
          <input type="text" class="form-control" v-model="dialog.edit.data.label" autofocus>
        </div>
      </div>
      <div class="form-group col-md-6">
        <label for="menuName" class="col-sm-3 control-label">Icon</label>
        <div class="col-sm-12">
          <input type="text" class="form-control" v-model="dialog.edit.data.icon">
        </div>
      </div>
      <div class="form-group col-md-12">
        <label for="menuName" class="col-sm-3 control-label">Type</label>
        <div class="row col-md-6 col-sm-12">
          <div class="col-md-3 form-check">
            <input class="form-check-input" type="radio" value="header" v-model="dialog.edit.data.type">
            <label class="form-check-label">header</label>
          </div>
          <div class="col-md-3 form-check">
            <input class="form-check-input" type="radio" value="treeview" v-model="dialog.edit.data.type">
            <label class="form-check-label">treeview</label>
          </div>
          <div class="col-md-3 form-check">
            <input class="form-check-input" type="radio" value="link" v-model="dialog.edit.data.type">
            <label class="form-check-label">link</label>
          </div>
        </div>
      </div>
      <div class="form-group col-md-12">
        <label for="routePath" class="col-sm-3 control-label">Route Path</label>
        <div class="col-sm-12">
          <input type="text" class="form-control" v-model="dialog.edit.data.path">
        </div>
      </div>
      <div class="form-group col-md-12">
        <div class="col-sm-offset-2 col-sm-10">
          <div class="form-check">
            <input type="checkbox" class="form-check-input" v-model="dialog.edit.data.show">
            <label class="form-check-label" for="exampleCheck2">Show in side menu</label>
          </div>
        </div>
      </div>
    </div>
  </form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialog.display = false">取 消</el-button>
    <el-button type="primary" @click="saveRouteInfo()">确 定</el-button>
  </div>
</el-dialog>
    </section>
</template>

<script>
export default {
  data() {
    // Menu tree example, reload from server after created.
    const menuTreeExample = [
      {
        id: 1,
        label: "ADMIN MANAGE",
        type: "header",
        children: [
          {
            id: 2,
            label: "User & Auth",
            type: "treeview",
            show: true,
            children: [
              {
                id: 3,
                label: "User",
                type: "link",
                show: true,
                path: "fsdg5d1/fdg4vf"
              }
            ]
          }
        ]
      }
    ];
    return {
      sideMenu: {
        incId: 5,
        menuTree: menuTreeExample
      },
      dialog: {
        display: false,
        edit: {
          key: null,
          data: {
            id: null,
            label: "",
            icon: "",
            type: "link",
            show: true,
            path: ""
          }
        }
      }
    };
  },
  created: function() {
    this.$api.admin.config.getItem('side_menu').then(response => {
      this.sideMenu = JSON.parse(response.data.value);
    })
  },
  methods: {
    createNewChild() {
      const newChild = {
        id: this.sideMenu.incId++,
        label: "",
        icon: "",
        type: "link",
        show: true,
        path: ""
      };
      return newChild;
    },
    insertAfter() {
      let newChild = this.createNewChild();
      this.$refs.tree.insertAfter(
        newChild,
        this.sideMenu.menuTree[this.sideMenu.menuTree.length - 1]
      );
      this.editMenu(newChild.id, newChild);
    },
    append(data) {
      if (!data.children) {
        this.$set(data, "children", []);
      }
      let newChild = this.createNewChild();
      data.children.push(newChild);
      this.editMenu(newChild.id, newChild);
    },
    editMenu(id, data) {
      this.dialog.edit.key = id;
      this.dialog.edit.data = data;
      this.dialog.display = true;
    },
    saveRouteInfo() {
      this.dialog.display = false;
      console.log(this.sideMenu);
      console.log(JSON.stringify(this.sideMenu));
    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    saveMenu() {
      this.$api.admin.config.edit('side_menu', {
        value: this.sideMenu
      }).then(response => {
        this.$message('Menu saved!');
      })
    },
    getChecked() {
      console.log(this.$refs.tree.getCheckedNodes());
    },
    getCheckedKey() {
      console.log(this.$refs.tree.getCheckedKeys());
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