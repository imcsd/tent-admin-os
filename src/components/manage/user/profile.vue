<template>
    <section>
      <div class="row">
          <div class="col-md-6">
            <!-- Horizontal Form -->
            <div class="card card-info">
              <div class="card-header">
                <h3 class="card-title">Profile</h3>
              </div>
              <!-- /.card-header -->

            <!-- non-edit -->
            <div v-if="cardView == 'info'" class="card-body">
              <div class="form-group">
                <label class="col-sm-2 control-label">ID</label> <span>{{info.id}}</span>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">User Name</label> <span>{{info.username}}</span>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">Password</label> 
                <span><button @click="cardView='changePasswd'" class="btn btn-sm btn-default">Change Password</button></span>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">Nickname</label> <span>{{info.nickname}}</span>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">Mobile</label> <span>{{info.mobile}}</span>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">E-mail</label> <span>{{info.email}}</span>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">Register Time</label> <span>{{info.create_time | timeParser}}</span>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">Last Login</label> <span>{{info.last_login_time | timeParser}} - {{info.last_login_ip}}</span>
              </div>
            </div>
            
            <!-- Edit info form -->
            <form v-if="cardView == 'editInfo'" class="form-vertical">
              <div class="card-body">
                <div class="form-group">
                  <label class="col-sm-2 control-label">Nickname</label>
                  <div class="col-sm-10">
                    <input v-model="info.nickname" class="form-control" placeholder="Nickname">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">Email</label>
                  <div class="col-sm-10">
                    <input v-model="info.email" class="form-control" placeholder="Email">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">Mobile</label>
                  <div class="col-sm-10">
                    <input v-model="info.mobile" class="form-control" placeholder="Mobile">
                  </div>
                </div>
              </div>
            </form>
            
            <!-- Change password form -->
            <form v-if="cardView == 'changePasswd'" class="form-horizontal">
              <div class="card-body">
                <div class="form-group">
                  <label class="col-sm-4 control-label">Origin Password</label>
                  <div class="col-sm-10">
                    <input type="password" v-model="passwd.origin" class="form-control" placeholder="Origin Password">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-4 control-label">New Password</label>
                  <div class="col-sm-10">
                    <input type="password" v-model="passwd.new" class="form-control" placeholder="New Password">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-4 control-label">Confirm New Password</label>
                  <div class="col-sm-10">
                    <input type="password" v-model="passwd.confirm_new" class="form-control" placeholder="Confirm New Password">
                  </div>
                </div>

                <div v-if="passwd.new != '' && passwd.confirm_new != '' && passwd.new != passwd.confirm_new"
                style="color:red">The two password fields didn't match.</div>

              </div>
            </form>
            
            <div class="card-footer">
              <button v-if="cardView == 'editInfo' || cardView == 'changePasswd'" @click="cardView='info'" class="btn btn-default">Cancel</button>

              <button v-if="cardView == 'info'" @click="cardView='editInfo'" class="btn btn-info float-right">Edit</button>
              <button v-if="cardView == 'editInfo'" @click="saveItem" class="btn btn-success float-right">Save</button>
              <button v-if="cardView == 'changePasswd'"
                @click="savePasswd"
                :disabled="passwd.origin == '' || passwd.new == '' || passwd.confirm_new == '' || passwd.new != passwd.confirm_new"
                class="btn btn-success float-right">Confirm</button>
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
        cardView: 'info', //Optiona: 'editInfo' || 'changePasswd'
        info: {},
        passwd: {
            origin: '',
            new: '',
            confirm_new: ''
        }
    };
  },
  created: function() {
    this.$api.admin.user.getProfile().then(response => {
      this.info = response.data;
    })
  },
  methods: {
    saveItem() {
        this.$api.admin.user.saveProfile({
            'nickname': this.info.nickname, 
            'mobile': this.info.mobile, 
            'email': this.info.email
        })
        .then(response => {
            this.cardView = 'info';
            this.$message('Profile Updated!');
        })
    },
    savePasswd() {
        this.$api.oauth.passwd({
            'origin_passwd': this.passwd.origin,
            'new_passwd': this.passwd.new
        })
        .then(response => {
            this.cardView = 'info';
            this.$message('Password Changed!');
        })
    }
  }
};
</script>