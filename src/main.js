// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router.js'

//导入Vuex状态管理
import store from './store.js'

//导入element-ui 包
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//导入自定义全局样式文件
import './styles/index.scss'

//定义全局路由守卫,用来判断用户登录没有,如果没有登录,则跳转到登录页面
router.beforeEach((to,from,next)=>{
  //先从本地提取登录标识token
  let token = localStorage.getItem('mytoken')
  //如果已经登录,就继续跳转,为登录则跳转到登录页面
  if(token){
    next()
  }else if(to.path != '/login') {
    next({path:'/login'})
  }else {
    next()
  }
})



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  // render:c=>c(App)  上面的相当于这个
  store
})
