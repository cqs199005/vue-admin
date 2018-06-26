<template>
    <div class="login">
        <el-form class="container" :model="form" :rules="rules" ref="form">
            <div class="avatar">
                <img src="../assets/avatar.jpg" alt="">
            </div>
            <el-form-item prop="username">
                <el-input v-model="form.username" placeholder="账号" prefix-icon="myicon myicon-user"></el-input>
            </el-form-item>
            <el-form-item prop="password" >
                <el-input v-model="form.password" placeholder="密码" prefix-icon="myicon myicon-key" @keydown.native.enter="submitForm('form')"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="login-btn" @click="submitForm('form')">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    //导入登录请求组件
    import {
        checkLogin
    } from '@/api/api.js'
    export default {
        data: () => ({
            form: {
                username: '',
                password: ''
            },
            rules: {
                username: {
                    required: true,
                    message: '请输入用户名',
                    trigger: 'blur'
                },
                password: {
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                }
            }
        }),
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        checkLogin(this.form).then(res => {
                            console.log(res);
                            if (res.meta.status == 200) {
                                //把token登录信息保存到本地
                                localStorage.setItem('mytoken',res.data.token)
                                this.$store.commit('setUsername',res.data.username)
                                //这是使用路由编程式导航跳转的
                                this.$router.push({
                                    name: "welcome"
                                })
                            } else {
                                //用ui框架提示错误信息
                                this.$message({
                                    message: res.meta.msg,
                                    type: 'warning'
                                });
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
        components: {}
    }
</script>
<style lang="scss" scoped>
    .login {
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: #2f4050;
        .container {
            position: absolute;
            left: 0;
            right: 0;
            width: 400px;
            padding: 0px 40px 15px 40px;
            margin: 200px auto;
            background: white;
            .avatar {
                position: relative;
                left: 50%;
                width: 120px;
                height: 120px;
                margin-left: -60px;
                margin-top: -45px;
                box-sizing: border-box;
                border-radius: 50%;
                border: 10px solid #fff;
                box-shadow: 0 1px 5px #ccc;
                overflow: hidden;
                margin-bottom: 20px;
            }
            .login-btn {
                width: 100%;
            }
        }
    }
</style>