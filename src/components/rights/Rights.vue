<template>
 <div>
      <el-row>
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">权限管理</a></el-breadcrumb-item>
          <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
   <el-table
      :data="rightList"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径">
      </el-table-column>
      <el-table-column label="层级">
        <template slot-scope="scope">
          <span>{{scope.row.level | fmtLevel}}</span>
        </template>
      </el-table-column>
    </el-table>
 </div>
</template>
<script>
import {getRights} from '@/api/api.js';
 export default {
   data: ()=>({
       rightList:[]
   }),
   filters:{
       fmtLevel(item){
           if(item==='0'){
               return '一级'
           }else if(item==='1') {
               return '二级'
           }else {
               return '三级'
           }
       }
   },
   mounted(){
       //请求数据
       getRights({type:'list'}).then(res=>{
           if(res.meta.status===200) {
                this.rightList=res.data
           }
       })
   },
   components: {
   }
 }
</script>
<style lang="scss" scoped>
 
</style>