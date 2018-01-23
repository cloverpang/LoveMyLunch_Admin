<template>
            <!-- BEGIN HEADER TOP -->
            <div class="page-header-top">
                <div class="container">
                    <!-- BEGIN LOGO -->
                    <div class="page-logo" style="padding-top:10px;">
                            <img src="../../../static/img/logo1.jpg" alt="logo" style="width:200px;height:60px;">
                    </div>
                    <!-- END LOGO -->
                    <!-- BEGIN RESPONSIVE MENU TOGGLER -->
                    <a href="javascript:;" class="menu-toggler"></a>
                    <!-- END RESPONSIVE MENU TOGGLER -->
                    <!-- BEGIN TOP NAVIGATION MENU -->
                    <div class="top-menu">
                        <ul class="nav navbar-nav pull-right">
                            <!-- BEGIN USER LOGIN DROPDOWN -->
                            <li class="dropdown dropdown-user dropdown-dark">
                                <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                                   
                                    <span class="username username-hide-mobile">
									 <i class="fa fa-user"></i>
									
									{{operationCenterCode}} / {{username}}
									
                                        <a href="javascript:void(0);" @click="logout">
                                            <i class="fa fa-sign-out"></i> 退出
										</a>
									
									</span>

                                </a>
                                <ul class="dropdown-menu dropdown-menu-default">
                                    <li>
                                        <a href="javascript:void(0);" v-show="false">
                                            <i class="icon-user"></i> 我的资料
										</a>
                                    </li>
                                    <li class="divider" v-show="false"> </li>
                                    <li>
                                        <a href="javascript:void(0);" @click="logout">
                                            <i class="fa fa-sign-out"></i> 退出 
										</a>
                                    </li>
                                </ul>
                            </li>
                            <!-- END USER LOGIN DROPDOWN -->
                        </ul>
                    </div>
                    <!-- END TOP NAVIGATION MENU -->
                </div>
            </div>
            <!-- END HEADER TOP -->
</template>

<script>
    import * as types from '../../vuex/types';
	
	import {showTip,showNotice} from '../../utils/common.js';
	
    export default {
        data() {
            return {
                name: '',
				operationCenterCode:this.$store.state.user.operationCenter
            }
        },
        computed:{
            username(){
                let username = this.$store.state.user.username;
                return username ? username : this.name;
            }
        },
        methods: {
		   logout(){
		      this.removeToken();
		      //this.$store.commit(types.LOGOUT);
              this.$router.push('/login');
		   },
		   removeToken(){
				    const self = this;
                    self.$http.put('/auth/remove-token', {
                      })
                      .then(function (response) {
                        if(response.data.statusCode == 200){
							//alert(response.data.responseString);
							showNotice('info','Success!','成功退出!');
				        }else{
						    showNotice('warning','Error!','操作失败!');
                        }
                      })
                      .catch(function (error) {
                        console.log(error);
						showNotice('warning','Error!','操作失败,网络异常!');
                      });
		   }
        }
    }
</script>
