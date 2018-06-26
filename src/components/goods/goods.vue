<template>
    <div class="goods">
        <el-row>
            <el-col :span="24">
                <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
                <el-breadcrumb-item>商品列表</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
     <el-button type="success" plain @click="addGoods">添加商品</el-button>
    </div>
</template>
<script>
 export default {
   data: ()=>({
   }),
   methods:{
       addGoods(){
           this.$router.push({name:'addGoods'})
       }
   },
   components: {
   }
 }
</script>
<style lang="scss" scoped>
 
</style>