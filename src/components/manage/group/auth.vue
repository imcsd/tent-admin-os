<template>
    <section>
      <div class="row">
        <div class="col-md-12">
          <div class="card card-info card-outline">
            <div class="card-header">
                <div class="row table-controll">
                  <div class="col-sm-12 col-md-9">
                    <button type="button" class="btn btn-primary" @click="insertAfter()">Add Menu</button>
                    <button type="button" class="btn btn-primary" @click="setCheckedKeys([ 9, 11, 10])">Add Menu</button>
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
                      </span>
                    </el-tree>
                  </div>
                </div>
            </div>
            <div class="card-footer">
              <button type="submit" class="btn btn-success float-right" @click="saveCheckedMenu()">Save</button>
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
      groupId: null,
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
    this.groupId = this.$route.query.id;
    this.$api.admin.config.getItem('side_menu')
    .then(response => {
      this.sideMenu = JSON.parse(response.data.value);
    })
    .then(() => {
      return this.$api.admin.group.getItem(this.groupId);
    })
    .then(response => {
      let checkKey = JSON.parse(response.data.auth_menu);
      this.setCheckedKeys(checkKey);
    })
  },
  methods: {
    setCheckedKeys(keys) {
      console.log(keys)
      this.$refs.tree.setCheckedKeys(keys, true);
    },
    saveCheckedMenu() {
      let checkedKey = this.$refs.tree.getCheckedKeys(true);
      console.log(checkedKey)
      // Duplicate menu tree array, because `menuTreeFilter` will change children to checked children.
      //let menuTree = JSON.parse(JSON.stringify(this.sideMenu.menuTree));
      // 2018-11-19 11:32:08 Deprecated
      //let checkMenuTree = this.menuTreeFilter(menuTree, checkedKey);
      
      this.$message('Saving!');
      this.$api.admin.group.edit(this.groupId, {
        auth_menu: JSON.stringify(checkedKey),
        //auth_menu_json: JSON.stringify(checkMenuTree)
      }).then(response => {
        this.$message('Menu saved!');
      })
    },
    // 2018-11-19 11:32:08 Deprecated
    // Return auth menu by backend now, just sent checked menu id to backend not menu tree array.
    //menuTreeFilter(menuTree, checkedKey) {
    //  let checkedMenuTree = [];
    //  for(let i in menuTree) {
    //    let item = menuTree[i];
    //    if(item.children != undefined && item.children.length > 0) {
    //      // If has children, loop children.
    //      let children = this.menuTreeFilter(item.children, checkedKey);
    //      // If has checked children, set checked children as children of parent,
    //      // push parent to new menu tree.
    //      if(children.length > 0) {
    //        item.children = children;
    //        checkedMenuTree.push(item);
    //      }
    //    } else {
    //      // If no children, check if node id in checkedKey list.
    //      if (checkedKey.includes(item.id)) {
    //        checkedMenuTree.push(item);
    //      }
    //    }
    //  }
    //  return checkedMenuTree;
    //}
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