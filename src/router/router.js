import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

//导入登录页面
import login from '../views/login.vue'
import home from '@/components/home.vue'
import welcome from '@/components/welcom.vue'
import user from '@/components/user/user.vue'
import rights from '@/components/rights/rights.vue'
import roles from '@/components/rights/roles.vue'
import category from '@/components/category/category.vue'
import goods from '@/components/goods/goods.vue'
import addGoods from '@/components/goods/addGoods.vue'


export default new Router({
  routes: [
    { path:'/' ,redirect:"/login"},
    { path: '/login', component: login },
    { path: '/home',name:"home", component: home ,
      children:[
        { path:'welcome',name:'welcome',component:welcome },
        { path:'users',name:"users" , component:user },
        { path:'rights',name:"Rights" , component:rights },
        { path:'roles',name:"Roles" , component:roles },
        { path:'categories',name:"Categories" , component:category },
        { path:'goods',name:"Goods" , component:goods },
        { path:'addGoods',name:"addGoods" , component:addGoods }
      ]},

  ]
})
