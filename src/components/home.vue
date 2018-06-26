<template>
    <div class="home">
        <el-container>
            <el-aside width="auto">
                <div class="logo"></div>
                <el-menu class="el-menu-admin" :unique-opened="true" :router="true" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" :collapse="isCollapse" active-text-color="#ffd04b">
                    <el-submenu :index="item.path" v-for="item in menuList" :key="item.id">
                        <template slot="title">
                             <i class="el-icon-location"></i>
                             <span>{{item.authName}}</span>
                            </template>
                        <el-menu-item  :index="'/home/'+tag.path" v-for="tag in item.children" :key="tag.id">
                            <i class="el-icon-menu"></i>
                            <span slot="title">{{tag.authName}}</span>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header>
                    <i class="myicon myicon-menu toggle-btn" @click="isCollapse=!isCollapse"></i>
                    <div class="system-title">电商后台管理系统</div>
                    <div>
                        <span class="welcome">欢迎您,{{$store.getters.username}}</span>
                        <el-button type="text" @click="outLogin">退出</el-button>
                    </div>
                </el-header>
                <el-main>
                    <!-- 路由显示区域 -->
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
        </div>
</template>
<script>
    import {
        getUserList,
        getMenu
    } from '@/api/api.js'
    export default {
        data: () => ({
            isCollapse: false,
            menuList: []
        }),
        created() {
            getMenu().then(res => {
                if (res.meta.status == 200) {
                    this.menuList = res.data
                }
            })
        },
        mounted() {
            getUserList({
                params: {
                    query: '',
                    pagenum: 1,
                    pagesize: 1
                }
            }).then(res => {
                console.log(res);
            })
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath)
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath)
            },
            //退出登录
            outLogin() {
                //清除登录信息token
                localStorage.removeItem('mytoken')
                //跳转到登录页面
                this.$router.push('/login')
            }
        },
        components: {}
    }
</script>
<style lang="scss" scoped>
    .home {
        height: 100%;
        background-color: #E5E5E5;
        .el-menu-admin:not(.el-menu--collapse) {
            width: 200px;
            min-height: 400px;
        }
        .el-container {
            height: 100%;
        }
        .el-aside {
            background-color: #545c64;
        }
        .el-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #009688;
        }
        .logo {
            height: 60px;
            // background: url(../assets/logo.png);
            background-size: cover;
            background-color: white;
        }
        .toggle-btn {
            padding: 0 10px;
            margin-left: -20px;
            font-size: 36px;
            line-height: 60px;
            color: white;
            cursor: pointer;
            &:hover {
                background-color: #00635a;
            }
        }
        .system-title {
            font-size: 28px;
            color: white;
        }
        .welcome,
        {
            color: white;
        }
    }
</style>