<template>
  <div class="user">
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-input placeholder="请输入内容" class="search-input" v-model="query" @keydown.native.enter="getuserlist">
          <el-button slot="append" icon="el-icon-search" @click="getuserlist"></el-button>
        </el-input>
        <el-button type="success" plain @click="addDialogFormVisible=true">添加用户</el-button>
      </el-col>
    </el-row>
    <el-table :data="userlist" class="margin20" v-loading="loading" border style="width: 100%">
      <el-table-column type="index" width="50">
      </el-table-column>
      <el-table-column prop="username" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="180">
      </el-table-column>
      <el-table-column prop="mobile" label="手机">
      </el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
               <el-switch
          v-model="scope.row.mg_state" @change="changeUserStatus(scope.row)">
        </el-switch>
</template>
    </el-table-column>
      <el-table-column label="操作">
<template slot-scope="scope">
  <el-button size="mini" type="primary" icon="el-icon-edit" plain @click="showEditUser(scope.row)">
  </el-button>
  <el-button size="mini" type="danger" icon="el-icon-delete" plain @click="showDeleteUser(scope.row)"></el-button>
  <el-button size="mini" type="danger" icon="el-icon-check" plain @click="showGrantRoles(scope.row)"></el-button>
</template>
    </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[5, 10, 15, 20]" :page-size="1" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <!-- 添加用户 -->
    <el-dialog title="添加用户" :visible.sync="addDialogFormVisible">
  <el-form :model="addForm" label-width="80px" :rules="rules" ref="addUserForm">
    <el-form-item label="用户名:" prop="username">
      <el-input v-model="addForm.username" auto-complete="off"></el-input>
    </el-form-item>
     <el-form-item label="密码:" prop="password">
      <el-input v-model="addForm.password" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱:" prop="email">
      <el-input v-model="addForm.email" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="电话:" prop="mobile">
      <el-input v-model="addForm.mobile" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addDialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUser('addUserForm')">确 定</el-button>
  </div>
</el-dialog>
<!-- 编辑用户信息 -->
    <el-dialog title="编辑用户" :visible.sync="editDialogFormVisible">
  <el-form :model="editForm" label-width="80px" :rules="rules" ref="editUserForm">
    <el-form-item label="用户名:" prop="username">
      <el-input v-model="editForm.username" auto-complete="off" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="邮箱:" prop="email">
      <el-input v-model="editForm.email" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="电话:" prop="mobile">
      <el-input v-model="editForm.mobile" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editDialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="editUser('editUserForm')">确 定</el-button>
  </div>
</el-dialog>
<!-- 分配角色信息 -->
    <el-dialog title="分配用户角色" :visible.sync="rolesDialogFormVisible">
  <el-form :model="editForm" label-width="120px" >
    <el-form-item label="用户名:" >
    <el-tag type="info">{{rolesUserFrom.username}}</el-tag>
    </el-form-item>
    <el-form-item label="请选择角色:">
        <el-select v-model="rolesId" placeholder="请选择角色">
          <el-option 
          v-for="(item,index) in rolesList"
          :key="index" 
          :label="item.roleName" :value="item.id"></el-option>
    </el-select>
  </el-form-item>
  </el-form>
 
  <div slot="footer" class="dialog-footer">
    <el-button @click="rolesDialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="grantRoles">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>
<script>
  //导入ajax请求方法
  import {
    getUserList,
    changeUserStatus,
    addUser,
    showUserById,
    editUser,
    deleteUser,
    getRoles,
    grantRoles
  } from '@/api/api.js'
  export default {
    data() {
      return {
        loading:true,
        query: '',
        pagenum: 1,
        pagesize: 5,
        userlist: [],
        value3: '',
        total: 0,
        addDialogFormVisible: false,
        addForm: {
          username: '',
          password: '',
          email: '',
          mobile: ''
        },
        editForm: {
          username: '',
          id: 0,
          email: '',
          mobile: ''
        },
        // 添加用户的表单验证
        rules: {
          username: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }],
          email: [{
              required: true,
              message: '请输入邮箱地址',
              trigger: 'blur'
            },
            {
              type: 'email',
              message: '请输入正确的邮箱地址',
              trigger: 'blur,change'
            }
          ],
          mobile: [{
            required: true,
            message: '电话不能为空'
          }]
        },
        editDialogFormVisible: false,
        rolesDialogFormVisible:false,
        rolesUserFrom:{
          username:''
        },
        rolesList:[],
        rolesId:''
      }
    },
    created() {
      this.getuserlist()
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pagesize = val
        this.getuserlist()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pagenum = val
        this.getuserlist()
      },
      //请求用户列表信息
      getuserlist() {
        this.loading=true
        getUserList({
          params: {
            query: this.query,
            pagenum: this.pagenum,
            pagesize: this.pagesize,
          }
        }).then(res => {
          this.loading=false
          this.userlist = res.data.users
          this.total = res.data.total
        })
      },
      //切换用户状态
      changeUserStatus(item) {
        changeUserStatus({
          id: item.id,
          type: item.mg_state
        }).then(res => {
          //刷新列表
          if (res.status === 200) {
            this.$message({
              message: '恭喜你，修改用户状态成功',
              type: 'success'
            });
            this.getuserlist();
          } else {
            this.$message({
              message: '警告哦，修改状态失败',
              type: 'warning'
            });
          }
        })
      },
      //添加用户
      addUser(formName) {
        this.$refs[formName].validate(valide => {
          if (valide) {
            this.addDialogFormVisible = false;
            addUser(this.addForm).then(res => {
              console.log(res);
              if (res.meta.status == 201) {
                this.$message({
                  message: '恭喜你，创建用户状态成功',
                  type: 'success'
                });
                this.getuserlist();
              } else {
                this.$message({
                  message: '警告哦，创建用户失败',
                  type: 'warning'
                });
              }
            })
          }
        })
      },
      //展示编辑用户
      showEditUser(row) {
        this.editDialogFormVisible = true;
        showUserById(row.id).then(res => {
          if (res.meta.status === 200) {
            this.editForm.username = res.data.username
            this.editForm.email = res.data.email
            this.editForm.mobile = res.data.mobile
            this.editForm.id = res.data.id
          }
        })
      },
      //编辑用户信息
      editUser(formName) {
        this.$refs[formName].validate(valide => {
          if (valide) {
            //发起编辑请求
            editUser(this.editForm).then(res => {
              console.log(res);
              if (res.meta.status == 200) {
                this.$message({
                  message: '恭喜你，修改用户信息成功',
                  type: 'success'
                });
                this.editDialogFormVisible = false;
                this.getuserlist()
              }
            })
          }
        })
      },
      //显示删除对话框
      showDeleteUser(row) {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //发起删除请求
          deleteUser(row.id).then(res => {
            console.log(res);
            if (res.meta.status === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getuserlist();
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //显示用户角色设置窗口
      showGrantRoles(row){
        this.rolesDialogFormVisible=true;
        this.rolesUserFrom=row
        //请求角色数据
        getRoles().then(res=>{
          if(res.meta.status===200) {
            this.rolesList=res.data
          }
        })
      },
      //设置角色
      grantRoles(){
        if(!this.rolesId){
           this.$message({
                  message: '警告哦，分配角色不能为空',
                  type: 'warning'
                });
        }else{
          grantRoles({id:this.rolesUserFrom.id,rid:this.rolesId}).then(res=>{
            if(res.meta.status===200) {
               this.$message({
                  message: '恭喜你，分配角色成功',
                  type: 'success'
                });
                this.rolesDialogFormVisible=false;
            }else {
              this.$message({
                  message: '警告哦，分配角色失败',
                  type: res.meta.msg
                });
            }
          })
        }
      }
    },
    components: {}
  }
</script>

<style lang="scss" scoped>
  .user {
    .margin20{
      margin: 20px 0;
    }
    .search-input {
      width: 300px;
    }
    .page {
      padding: 5px 0;
      background-color: #D3DCE6;
    }
  }
</style>