<template>
    <div class="addGoods">
        <el-row>
            <el-col :span="24">
                <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
                <el-breadcrumb-item>添加商品</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <el-steps :active="active" finish-status="success">
            <el-step title="步骤 1"></el-step>
            <el-step title="步骤 2"></el-step>
            <el-step title="步骤 3"></el-step>
            <el-step title="步骤 4"></el-step>
            <el-step title="步骤 5"></el-step>
        </el-steps>
        <!-- tab-position="left"这个设置选项卡的放置位置 -->
         <el-tabs v-model="activeName" @tab-click="handleClick" class="mt-15" tab-position="left">
            <el-tab-pane label="基本信息" name="first">用户管理</el-tab-pane>
            <el-tab-pane label="商品参数" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="商品属性" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="商品图片" name="fourth">
                <el-upload
                class="upload-demo"
                action="http://localhost:8888/api/private/v1/upload"
                :headers="setHeader()"
                :on-success="successHandle"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-tab-pane>
            <el-tab-pane label="商品内容" name="fifth">定时任务补偿</el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
 export default {
   data: ()=>({
       active:0,
       activeName:'first'
   }),
   methods:{
     handleClick(tab, event){
         switch (tab.name) {
             case 'first':
                 this.active=0
                 break;
             case 'second':
                 this.active=1
                 break;
             case 'third':
                 this.active=2
                 break;
             case 'fourth':
                 this.active=3
                 break;
             case 'fifth':
                 this.active=4
                 break;
         
             default:
                this.active=0
                 break;
         }
     },
     handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      setHeader(){
          let token = localStorage.getItem('mytoken')
          return {Authorization:token}
      },
      successHandle(response, file, fileList){
          if(response.meta.status===200) {
              this.$message({
                  type:"success",
                  message:response.meta.msg
              })
          }
      }
   },
   components: {
   }
 }
</script>
<style lang="scss" scoped>
 
</style>