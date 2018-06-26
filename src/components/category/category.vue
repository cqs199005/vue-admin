<template>
 <div class="category">
     <el-row>
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
          <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
     <el-button type="success" plain @click="addCategory">添加分类</el-button>
     <TreeGrid
      :treeStructure="true"
      :columns="columns"
      :data-source="dataSource"
      @deleteCate="deleteCategory"
      @editCate="editCategory"
    >
    </TreeGrid>
    <div class="page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 20, 30, 40]" :page-size="1" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
     <!-- 添加分类 -->
    <el-dialog title="添加分类" :visible.sync="addDialogFormVisible">
  <el-form :model="addForm" label-width="120px" :rules="rules" ref="addCateForm">
    <el-form-item label="分类名称:" prop="cat_name">
      <el-input v-model="addForm.cat_name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="父级名称:" >
         <el-cascader
            :options="options"
            v-model="selectedOptions"
            @change="handleChange"
            :props="props"
            >
        </el-cascader>
    </el-form-item>

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addDialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addCate('addCateForm')">确 定</el-button>
  </div>
</el-dialog>
 </div>
</template>
<script>
//导入树组件
import TreeGrid from '@/components/TreeGrid/TreeGrid.vue'
import { getCategory,addCategory } from '@/api/api.js'
 export default {
   data: ()=>({
       options:[],//级联选择器数据源
       selectedOptions:[] , //选择结果数组
       props:{
           value:'cat_id',
           label:'cat_name'
       },
       total:1,
       addForm:{
           cat_name:'',
           cat_pid:0,
           cat_level:0
       },
       addDialogFormVisible:false,
        dataSource: [],
        pagenum:1,
        pagesize:10,
        columns: [{
        text: '分类名称',
        dataIndex: 'cat_name',
        width: ''
        }, {
        text: '是否有效',
        dataIndex: 'cat_deleted',
        width: ''
        }, {
        text: '排序',
        dataIndex: 'cat_level',
        width: ''
        }],
        rules:{
            cat_name:{ required: true, message: '请输入分类名称',trigger: 'blur'}
        }
    }),
    created(){
        this.init()
    },
   methods: {
    deleteCategory (cid) {
        console.log(cid)
    },
    editCategory (cid) {
        console.log(cid)
    },
     handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pagesize=val
        this.init()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pagenum=val
        this.init()
        
      },
      //级联选择器改变事件
      handleChange(value){
          console.log(value);
      },
      init(){
          getCategory({type:'3',pagenum:this.pagenum,pagesize:this.pagesize}).then(res=>{
              if(res.meta.status===200){
                  this.total=res.data.total
                  this.dataSource=res.data.result
              }
          })
      },
      addCategory(){
          this.addDialogFormVisible=true;
          //请求2级数据
          getCategory({type:"2"}).then(res=>{
              console.log(res);
              if(res.meta.status===200){
              this.options=res.data
              }
          })
      },
      //添加分类
      addCate(name){
          //先进行表单校验,看分类名称是否填写
          this.$refs[name].validate(valid=>{
              if(valid){
                  //如果未选择父级名称,则说明是一级分类
                  if(this.selectedOptions.length===0){
                      this.addForm.cat_pid=0
                      this.addForm.cat_level=0
                  }else if(this.selectedOptions.length===1){
                      //如果是二级分类
                      this.addForm.cat_level=1
                      this.addForm.cat_pid=this.selectedOptions[0]
                  }else if(this.selectedOptions.length===2){
                      this.addForm.cat_level=2
                      this.addForm.cat_pid=this.selectedOptions[1]
                  }
                  //发起请求
                  addCategory(this.addForm).then(res=>{

                      if(res.meta.status===201){
                          this.$message({
                              type:"success",
                              message:res.meta.msg
                          })
                          this.addDialogFormVisible=false
                          this.init()
                      }
                  })
              }
          })
      }
    },
   components: {
       TreeGrid
   }
 }
</script>
<style lang="scss" scoped>
 .page{
      padding: 5px 0;
      background-color: #D3DCE6;
 }
</style>