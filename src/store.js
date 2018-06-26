import Vue from 'vue'
import Vuex from 'vuex'

//注册vuex
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        username:''
    },
    mutations:{
        //存储用户名
        setUsername(state,username){
            state.username = username
            localStorage.setItem('username',username)
        }
    },
    getters:{
        username(state){
            return localStorage.getItem('username')
        }
    }
})