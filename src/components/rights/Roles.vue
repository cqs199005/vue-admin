<template>
  <div class="roles">
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">权限管理</a></el-breadcrumb-item>
          <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-button type="success" plain>添加角色</el-button>
    <el-table class="mt-15" :data="rolesList" border style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
            <el-row v-for="firstChild in scope.row.children" :key="firstChild.id">
              <el-col :span="4">
                <el-tag closable @close="deleteRight(scope.row,firstChild.id)">{{firstChild.authName}}</el-tag>
                <i class="el-icon-arrow-right"></i>
              </el-col>
              <el-col :span="20">
                <el-row v-for="secondChild in firstChild.children" :key="secondChild.id">
                  <el-col :span="4">
                    <el-tag closable type="success" @close="deleteRight(scope.row,secondChild.id)">{{secondChild.authName}}</el-tag>
                     <i class="el-icon-arrow-right"></i>
                    </el-col>
                  <el-col :span="20">
                      <el-tag closable type="danger" @close="deleteRight(scope.row,thirdChild.id)" v-for="thirdChild in secondChild.children" :key="thirdChild.id">{{thirdChild.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row v-if="scope.row.children.length===0">
              <el-col :span="24">该角色没有分配权限,请前往分配</el-col>
            </el-row>
</template>
    </el-table-column>
    <el-table-column
      label="角色名称"
      prop="roleName"
      width="165px">
    </el-table-column>
    <el-table-column
      label="描述"
      prop="roleDesc"
      width="130px">
    </el-table-column>
    <el-table-column
      label="操作">
<template slot-scope="scope">
  <el-button size="mini" type="primary" icon="el-icon-edit" plain>
  </el-button>
  <el-button size="mini" type="danger" icon="el-icon-delete" plain title="删除角色"></el-button>
  <el-button size="mini" type="danger" icon="el-icon-check" title="授权角色" plain @click="showDialog(scope.row)"></el-button>
</template>
    </el-table-column>
  </el-table>
  <!-- 设置权限 -->
  <el-dialog title="授权权限" :visible.sync="rightDialogFormVisible">
    <div class="tree-container">
      <el-tree
        :data="rightList"
        show-checkbox
        node-key="id"
        ref="tree"
        :default-expand-all="true"
        :default-checked-keys="selectRights"
        :props="defaultProps">
      </el-tree>
    </div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="rightDialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="setRight">确 定</el-button>
  </div>
</el-dialog>
 </div>
</template>
<script>
  import {
    getRoles,
    deleteRolesRight,
    grantRolesRight
  } from '@/api/api.js'
  export default {
    data: () => ({
      rolesList: [],
      rightList: [],
      selectRights:[],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      rightDialogFormVisible: false,
      currentRoles:{}
    }),
    created() {
     this.init()
    },
    methods: {
      //初始化数据
      init(){
        getRoles().then(res => {
        console.log(res);
        this.rolesList = res.data
       })
      },
      deleteRight(row, rightId) {
        deleteRolesRight({
          roleId: row.id,
          rightId: rightId
        }).then(res => {
          if (res.meta.status === 200) {
            row.children = res.data
          } else {
          }
        })
      },
      showDialog(row) {
        this.rightDialogFormVisible = true;
        this.currentRoles=row
        //请求授权信息
        getRoles({
          type: 'tree'
        }).then(res => {
          if (res.meta.status === 200) {
            this.rightList = res.data
            console.log(res.data);
          }
        })
        //设置tree默认选中项
        //每次一开始重置选中id
        this.selectRights=[]
        this.currentRoles.children.forEach(first=>{
          if(first.children && first.children.length!==0) {
            first.children.forEach(second=>{
               if(second.children && second.children.length!==0) {
                 second.children.forEach(third=>{
                     this.selectRights.push(third.id)
                 }) 
               }
            })
          }
        })
      },
      //角色授权
      setRight() {
        let rids = this.$refs.tree.getCheckedKeys().join(',')
        grantRolesRight(this.currentRoles.id,{rids:rids}).then(res=>{
          if(res.meta.status===200){
            this.$message({
              type:"success",
              message:res.meta.msg
            })
            this.rightDialogFormVisible=false;
            this.init()
            
          }
        })
      }
    },
    components: {}
  }
</script>
<style lang="scss" scoped>
  .roles {
    .el-tag {
      margin-right: 5px;
      margin-bottom: 5px;
    }
    .tree-container{
      height: 300px;
      overflow: auto;
    }
  }
</style>