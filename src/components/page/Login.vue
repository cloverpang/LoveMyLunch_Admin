<template>
    <div class="login">

        <!-- BEGIN : LOGIN PAGE 5-1 -->
        <div class="user-login-5">
            <div class="row bs-reset">
                <div class="col-md-6 bs-reset">
                    <div class="login-bg" style="background-image:url(../../../static/img/login/bg1.jpg)">
                        <img class="login-logo" src="../../../static/img/login/logo.png" /> </div>
                </div>
                <div class="col-md-6 login-container bs-reset">
                    <div class="login-content">
                        <h1>家里饭 后台管理 LOGIN </h1>
                        <p> 家里饭 后台管理系统 使用vue2.0构建 </p>
                        <form action="javascript:;" class="login-form" method="post">
                            <div class="alert alert-danger display-hide">
                                <button class="close" data-close="alert"></button>
                                <span>Enter any username and password. </span>
                            </div>
                            <div class="row">
                                <div class="col-xs-6">
                                    <input class="form-control form-control-solid placeholder-no-fix form-group" type="text" autocomplete="off" placeholder="Username" name="username" v-model="ruleForm.username" required/> </div>
                                <div class="col-xs-6">
                                    <input class="form-control form-control-solid placeholder-no-fix form-group" type="password" autocomplete="off" placeholder="Password" name="password" v-model="ruleForm.password" required/> </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-4">
                                    <div class="rem-password">

                                    </div>
                                </div>
                                <div class="col-sm-8 text-right">
                                    <div class="forgot-password">
                                        <a href="javascript:;" id="forget-password" class="forget-password">Forgot Password?</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
										<span  v-show="actionProgress" style="color:#000000;font-size:14px;"><img src="../../../static/img/loading.gif"> 登录中...</span>
                                    </div>
                                    <button class="btn green" type="button" :disabled="actionProgress" @click="submitForm()">Sign In</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="login-footer">
                        <div class="row bs-reset">
                            <div class="col-xs-5 bs-reset">

                            </div>
                            <div class="col-xs-7 bs-reset">
                                <div class="login-copyright text-right">
                                    <p>Copyright &copy; Clover 2017-2018</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- END : LOGIN PAGE 5-1 -->
	
    </div>
</template>

<script>
    import * as types from '../../vuex/types';
	
	import {showTip,showNotice} from '../../utils/common.js';
	
    export default {
        data: function(){
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
				actionProgress: false,
				returnPath : this.$route.query.redirect
            }
        },
        methods: {
		    getStatus (returnPath) {
              this.returnPath = returnPath;
			  this.$store.commit(types.LOGOUT);
            },
            submitForm() {
			        this.actionProgress = true;
				    const self = this;
                    self.$http.post('/auth/token', {
                        account: self.ruleForm.username,
                        password: self.ruleForm.password,
                        userType: "admin"
                      })
                      .then(function (response) {
					    self.actionProgress = false;
                        if(response.data.statusCode == 200){
	                        var jsonData = JSON.parse(response.data.responseString);
                            localStorage.setItem('ms_username',self.ruleForm.username);
                            localStorage.setItem('ms_token',jsonData.token);
							//alert(response.data.responseString);
							//alert(jsonData.token);
                            let result = {
                                username:self.ruleForm.username,
                                token:jsonData.token
                            };
                            self.$store.commit(types.LOGIN, result);
							
                            //self.$http.defaults.headers.Authorization = jsonData.token;
                            //self.$router.push('/default');
							if(self.returnPath == undefined || self.returnPath == "" || self.returnPath == "/login"){
							   self.$router.push('/default');
							}else{
							   self.$router.push(self.returnPath);
							}
				        }else{
						    showNotice('warning','Error!','登录失败!请检查用户名和密码.');
                        }
                      })
                      .catch(function (error) {
                        console.log(error);
						self.actionProgress = false;
						showNotice('warning','Error!','登录失败,网络异常!');
                      });
            }
        },
		created () {
             console.log(this.getStatus(this.$route.query.redirect))
        },
        watch: {
		    '$route' (to, from) {
               this.getStatus(this.$route.query.redirect);
            }
        }
    }
</script>

<style scoped>
.user-login-5 {
  min-height: 100vh; }
  .user-login-5 .bs-reset {
    margin: 0;
    padding: 0; }
  .user-login-5 .text-right {
    text-align: right; }
  .user-login-5 .login-bg {
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    min-height: 100vh; }
  .user-login-5 .login-logo {
    position: absolute;
    top: 2.5em;
    left: 2.5em; }
    .user-login-5 .login-logo.login-6 {
      top: 80px;
      left: 80px; }
  .user-login-5 .login-container {
    position: relative;
    min-height: 100vh; }
    .user-login-5 .login-container > .login-content,
    .user-login-5 .login-container .login-social,
    .user-login-5 .login-container .login-copyright {
      padding: 0 80px; }
    .user-login-5 .login-container > .login-content {
      margin-top: 35%; }
      .user-login-5 .login-container > .login-content > h1 {
        font-size: 30px;
        font-weight: 300;
        color: #4e5a64; }
      .user-login-5 .login-container > .login-content p {
        color: #a0a9b4;
        font-size: 15px;
        line-height: 22px; }
      .user-login-5 .login-container > .login-content > .login-form {
        margin-top: 80px;
        color: #a4aab2;
        font-size: 13px; }
        .user-login-5 .login-container > .login-content > .login-form .form-control {
          width: 100%;
          padding: 10px 0;
          border: none;
          border-bottom: 1px solid;
          border-color: #a0a9b4;
          color: #868e97;
          font-size: 14px;
          margin-bottom: 30px; }
          .user-login-5 .login-container > .login-content > .login-form .form-control:focus {
            outline: 0; }
        .user-login-5 .login-container > .login-content > .login-form .forgot-password,
        .user-login-5 .login-container > .login-content > .login-form .login-button {
          display: inline-block; }
        .user-login-5 .login-container > .login-content > .login-form .rem-password {
          margin-top: 10px; }
          .user-login-5 .login-container > .login-content > .login-form .rem-password > p {
            margin: 0; }
          .user-login-5 .login-container > .login-content > .login-form .rem-password > .rem-checkbox {
            border-color: #a4aab2; }
        .user-login-5 .login-container > .login-content > .login-form .forgot-password {
          margin-right: 1em; }
          .user-login-5 .login-container > .login-content > .login-form .forgot-password > a {
            color: #a4aab2; }
            .user-login-5 .login-container > .login-content > .login-form .forgot-password > a:hover {
              color: #337ab7;
              text-decoration: none; }
            .user-login-5 .login-container > .login-content > .login-form .forgot-password > a:focus {
              color: #a4aab2;
              text-decoration: none; }
    .user-login-5 .login-container > .login-footer {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding-bottom: 10px; }
      .user-login-5 .login-container > .login-footer .login-social {
        padding-right: 0; }
        .user-login-5 .login-container > .login-footer .login-social li {
          display: inline-block;
          list-style: none;
          margin-right: 1em; }
        .user-login-5 .login-container > .login-footer .login-social a {
          color: #a9b5be;
          font-size: 18px; }
          .user-login-5 .login-container > .login-footer .login-social a:hover {
            color: #337ab7;
            text-decoration: none; }
          .user-login-5 .login-container > .login-footer .login-social a:focus {
            color: #a9b5be; }
      .user-login-5 .login-container > .login-footer .login-copyright {
        padding-left: 0;
        margin-top: 6px; }
        .user-login-5 .login-container > .login-footer .login-copyright > p {
          margin: 0;
          font-size: 13px;
          color: #a9b5be; }
  .user-login-5 .alert {
    margin-top: -60px; }
  .user-login-5 .form-group.has-error {
    border-bottom: 2px solid #ed6b75 !important; }
  .user-login-5 .form-group.valid {
    border-bottom: 1px solid #a0a9b4 !important; }

@media (max-width: 1365px) {
  .user-login-5 .login-logo.login-6 {
    top: 40px;
    left: 40px; }
  .user-login-5 .login-container > .login-content,
  .user-login-5 .login-container .login-social,
  .user-login-5 .login-container .login-copyright {
    padding: 0 40px; }
  .user-login-5 .login-container .login-social {
    padding-right: 0; }
  .user-login-5 .login-container .login-copyright {
    padding-left: 0; } }

@media (max-width: 1023px) {
  .user-login-5 {
    min-height: 50vh; }
    .user-login-5 .login-bg {
      min-height: 50vh; }
    .user-login-5 .login-logo.login-6 {
      position: relative;
      margin: 0 0 40px 0; }
    .user-login-5 .login-container {
      min-height: 50vh; }
      .user-login-5 .login-container > .login-content {
        margin-top: 60px; }
        .user-login-5 .login-container > .login-content .login-form {
          margin-top: 40px; }
      .user-login-5 .login-container .rem-password {
        margin-bottom: 1em; }
      .user-login-5 .login-container > .login-footer {
        position: relative;
        margin-top: 40px;
        padding-bottom: 0; }
        .user-login-5 .login-container > .login-footer .login-social li {
          margin-right: 0.5em; }
    .user-login-5 .alert {
      margin-top: -20px; } }

@media (max-width: 640px) {
  .user-login-5 .login-container > .login-content .text-right {
    text-align: left; } }

</style>
