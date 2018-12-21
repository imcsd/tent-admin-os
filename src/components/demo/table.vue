<template>
    <section>
      <div class="row">
        <div class="col-md-12">
          <div class="card card-info card-outline">
            <div class="card-header">
                <div class="row table-controll">
                  <div class="col-sm-12 col-md-9">
                    <button type="button" class="btn btn-primary" @click="add()">Add Item</button>
                  </div>
                  <div class="col-sm-12 col-md-3">
                    <div class="input-group">
                      <input type="text" v-model="search" class="form-control float-right" placeholder="Search">
                      <div class="input-group-append">
                        <button type="button" class="btn btn-default" @click="loadList(1)"><i class="fa fa-search"></i></button>
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
                    <th>Created Time</th>
                    <th>Action</th>
                  </tr>
                  <tr v-for="(item) in table.list" v-bind:key="item.id">
                    <td>{{item.id}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.remark}}</td>
                    <td><span class="tag tag-success">{{item.created_time | timeParser}}</span></td>
                    <td>
                      <button type="button" class="btn btn-sm btn-primary" @click="edit(item)">Edit</button>
                      <button type="button" class="btn btn-sm btn-danger" @click="deleteItem(item)">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="card-footer table-footer clearfix">
              <div class="float-left">共 {{table.totalCount}} 条记录</div>
              <el-pagination
                class="float-right"
                background
                layout="sizes, prev, pager, next"
                :page-size.sync="table.pageSize"
                :current-page.sync="table.page"
                :total="table.totalCount"
                @current-change="loadList">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      table: {
        page: 1,
        pageSize: 20,
        totalCount: 0,
        totalPage: 0,
        list: []
      }
    };
  },
  created: function() {
    this.loadList()
  },
  methods: {
    loadList(page) {
      page == 'next' && this.table.page ++;
      page == 'prev' && this.table.page --;
      (typeof(page) == 'number') && (this.table.page = page);

      let getParam = {
        page: this.table.page,
        pageSize: this.table.pageSize
      }

      this.search != '' && (getParam.search = this.search);

      this.mockList(getParam).then(response => {
        this.table = response.data;
      })
    },
    mockList(getParam) {
      let list = {
        page: getParam.page,
        pageSize: getParam.pageSize,
        totalCount: 221,
        totalPage: 0,
        list: []
      }

      list.totalPage = Math.round(list.totalCount/list.pageSize);

      let startId = (list.page-1)*list.pageSize+1;
      let endId = startId + list.pageSize;
      for(let i = startId; i<endId && i<=list.totalCount; i++) {
        let item = {
          id: i,
          name: "MockData-" + i,
          remark: 'This is fake data!',
          created_time: Math.round(new Date().getTime()/1000)
        }
        list.list.push(item);
      }

      return new Promise(function(resolve, reject) {
        resolve({
          data: list
        });
      });
    }
  }
};
</script>