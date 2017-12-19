<template>
    <div class="login-wrap">
        <!--<div class="ms-title">深圳供电局活动中心后台</div>-->
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login">
            <div class="ms-login-logo">
                <h3 class="title">系统登录</h3>
                <!--<img src="/static/img/login-logo.png" alt="">-->
            </div>
            <div class="ms-login-form">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                    <el-form-item prop="username">
                        <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                    </el-form-item>
                    <div class="login-btn">
                        <el-button type="success" @click="submitForm('ruleForm')">登录</el-button>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import * as types from '../../vuex/types';
    export default {
        data: function(){
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                const self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                    self.$http.post('/auth/token', {
                        account: self.ruleForm.username,
                        password: self.ruleForm.password,
                        userType: "admin"
                      })
                      .then(function (response) {
                        if(response.data.statusCode == 200){
	                        var jsonData = JSON.parse(response.data.responseString);
                            localStorage.setItem('ms_username',self.ruleForm.username);
                            localStorage.setItem('ms_token',jsonData.token);
                            let result = {
                                username:self.ruleForm.username,
                                token:jsonData.token
                            };
                            self.$store.commit(types.LOGIN, result);
                            //self.$http.defaults.headers.Authorization = jsonData.token;
                            self.$router.push('/default');
				        }else{
				            self.$message({
                              showClose: true,
                              message: '用户名或密码错误！',
                              type: 'error'
                            });
                        }
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -200px;
        text-align: center;
        font-size:24px;
        color: #fff;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:280px;
        height:300px;
        margin:-150px 0 0 -190px;
        padding:20px;
        border-radius: 5px;
        background: #fff;
    }
    .ms-login-logo{
        text-align:center;
    }
    .ms-login-form{
        margin-top:20px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
    .title{
        margin-top:25px;
        color: #505458;
    }
</style>