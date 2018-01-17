<template>
        <!-- BEGIN CONTAINER -->
        <div class="page-container">
            <!-- BEGIN CONTENT -->
            <div class="page-content-wrapper">
                <!-- BEGIN CONTENT BODY -->
                <!-- BEGIN PAGE HEAD-->
                <div class="page-head">
                    <div class="container">
                        <!-- BEGIN PAGE TITLE -->
                        <div class="page-title">
                            <h1>系统管理员
                            </h1>
							
                        </div>
                        <!-- END PAGE TITLE -->
                    </div>
                </div>
                <!-- END PAGE HEAD-->
                <!-- BEGIN PAGE CONTENT BODY -->
                <div class="page-content">
                    <div class="container">
                        <!-- BEGIN PAGE BREADCRUMBS -->
                        <ul class="page-breadcrumb breadcrumb">
                            <li>
                                <router-link :to="{path:'default'}" > 首页 </router-link>
                                <i class="fa fa-circle"></i>
                            </li>
                            <li>
                                <span>系统管理员</span>
                            </li>
                        </ul>
                        <!-- END PAGE BREADCRUMBS -->
                        <!-- BEGIN PAGE CONTENT INNER -->
                        <div class="page-content-inner">
                            <div class="row">
                                <div class="col-md-12">
			
								<tableDataLoadingProgress v-show="progressBar"></tableDataLoadingProgress>

									<!-- BEGIN SAMPLE TABLE PORTLET-->
                                                <div class="panel panel-default" v-for="(item,index) in items" :id="item.admin_id">
                                                    <div class="panel-body">
													 
                                                                 <div class="form-group">
                                                                    <div class="col-md-2 control-label">
																	<h4 class="" style="color:#333333;">{{item.admin_login}}</h4>
																	</div>

																	<div class="col-md-2 control-label">
                                                                       <h4 class="" style="color:#333333;">{{item.admin_name}}</h4>
                                                                    </div>
																	
                                                                    <div class="col-md-2 control-label">    
                                                                      <h4 class="" style="color:#333333;">
																	  <a data-toggle="modal"  href="#deleteConfirmModel" @click="selectedAdminUser(item)"> 删除 </a>
																	  </h4>															
                                                                    </div>
																	
																    <div class="col-md-2 control-label">    
                                                                      <h4 class="" style="color:#333333;">
																	  <a data-toggle="modal"  href="#updatePasswordModel" @click="updatePassword(item)"> 修改密码 </a>
																	  </h4>															
                                                                    </div>

																	<div class="col-md-2 control-label">    
                                                                      <h4 class="" style="color:#333333;">
																	  <a data-toggle="modal"  href="#setFrontendPermissionModel" @click="selectedAdminUserFrontendPermission(item)"> 显示权限 </a>
																	  </h4>															
                                                                    </div>
																	
																    <div class="col-md-2 control-label">    
                                                                      <h4 class="" style="color:#333333;">
																	  <a data-toggle="modal"  href="#setBackendPermissionModel" @click="selectedAdminUserBackendPermission(item)"> 后端权限 </a>
																	  </h4>															
                                                                    </div>
																	
                                                                 </div>
													 
													</div>
                                                </div>
                                    <!-- END SAMPLE TABLE PORTLET-->
                                </div>
                            </div>
                        </div>
                        <!-- END PAGE CONTENT INNER -->
                    </div>
                </div>
                <!-- END PAGE CONTENT BODY -->
                <!-- END CONTENT BODY -->
            </div>
			
			<vConfirmModal :confirmMessage="'确定删除 '" :modalId="'deleteConfirmModel'" :itemId="model.admin_id" :itemName="model.admin_login" @handleConfirm="handleDelete"></vConfirmModal>

                                            <div id="updatePasswordModel" class="modal fade" tabindex="-1" role="dialog" v-bind:aria-labelledby="modalId" aria-hidden="true" style="padding-top:200px;">
                                                <div class="modal-dialog">
                                                    <div class="modal-content">
													    <div class="modal-header">
                                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                                                            <h4 class="modal-title">为 {{model.admin_login}} 修改密码</h4>
                                                        </div>
                                                        <div class="modal-body">
														      <div class="form-body">
															<form id="form" class="form-horizontal">
                                                                <div class="row">
															      <div class="form-group">
                                                                    <label class="col-md-3 control-label">旧密码 </label>

                                                                    <div class="col-md-6">                                                            
                                                                         <input type="password" class="form-control input-circle" placeholder=""  v-model="oldPassword">
                                                                    </div>
                                                                 </div>
																 
															      <div class="form-group">
                                                                    <label class="col-md-3 control-label">新密码 </label>

                                                                    <div class="col-md-6">                                                            
                                                                         <input type="password" class="form-control input-circle" placeholder=""  v-model="newPassword">
                                                                    </div>
                                                                 </div>
															  </div>
                                                           </form>
                                                           </div>
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button class="btn default" data-dismiss="modal" aria-hidden="true">关闭</button>
                                                            <button class="btn blue" @click="handleUpdatePassword(model.admin_login)" :disabled="actionProgress">保存修改
															<span id="saveCompanyAction" v-show="actionProgress">......</span>
															</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
			
			<vAdminBackendPermission ref="backendPermission" @refresh="refresh"></vAdminBackendPermission>
			<vAdminFrontendPermission ref="frontendPermission" @refresh="refresh"></vAdminFrontendPermission>
            <!-- END CONTENT -->	
        </div>
        <!-- END CONTAINER -->
</template>

<script>
    import adminUser from '../models/adminUser';
    import {APIDOMAIN} from '../../vuex/types.js';
	import vConfirmModal from './../Common/confirmModal';
    import tableDataLoadingProgress from './../Common/TableDataLoadingProgress';
	import vAdminBackendPermission from './adminBackendPermission';
	import vAdminFrontendPermission from './adminFrontendPermission';

	import {formatUnixDate,formatDate,showTip,showNotice,formatMintuesDate,formatNormalDate,getNowFormatDay,getTomorrowFormatDay} from '../../utils/common.js';
    export default {
        components: {
		    vConfirmModal,tableDataLoadingProgress,vAdminBackendPermission,vAdminFrontendPermission
        },
        data () {
            return {
			    model: adminUser,
			    progressBar: true, //显示加载条
				actionProgress: false, //
                count : 0, //总记录数
                items : [],
				oldPassword : '',
				newPassword : '',
            }
        },
        methods:{
            //获取数据
            getList () {
			    this.progressBar = true; //显示加载条
				
				var url = '/adminUsers';
				this.$http.get(url,{
                params: {
                 }
                })
                .then( (res) => {
				    this.progressBar = false;
                    //子组件监听到数据返回变化会自动更新DOM
					if(res.status == 200){
                        this.count = res.data.content.length;
                        this.items = res.data.content;
                    }
                }, (response) => {
                     //showTip("Error","远程获取数据错误！");
					 showNotice('warning','Error!','远程获取数据错误,请检查网络!');
                     this.progressBar = false;
                     //error callback
                });
            },
			selectedAdminUser(item){
			   this.model = item;
			},
			selectedAdminUserBackendPermission(item){
			   this.$refs.backendPermission.admin_login = item.admin_login;
			   this.$refs.backendPermission.admin_backend_permission_str = item.backend_permissions;
			   this.$refs.backendPermission.loadAdminUserBackendPermssions();
			},
			selectedAdminUserFrontendPermission(item){
			   this.$refs.frontendPermission.admin_login = item.admin_login;
			   this.$refs.frontendPermission.admin_backend_permission_str = item.backend_permissions;
			   this.$refs.frontendPermission.loadAdminUserBackendPermssions();
			},
			updatePassword(item){
			   this.model = item;
			   this.oldPassword = item.admin_password;
			},
			handleDelete(id){
			         $('#deleteConfirmModel').modal('hide');
					 this.$http.delete('/adminUser/' + id,{
                     })
					 .then( (res) => {
                       //子组件监听到数据返回变化会自动更新DOM
					   if(res.status == 200){
					    //showTip("Success","删除成功");
                        showNotice('success','Success!','删除成功!');					
						this.getList();
                       }
                     }, (response) => {
                        showNotice('warning','Error!','远程数据操作失败,请检查网络!');
                     });  
			},
			handleUpdatePassword(login){
		        this.actionProgress = true;

				var url = '/adminUser/updatePassword';
				var parasData = {"adminLogin":login,"adminPassword":this.oldPassword,"newAdminPassword":this.newPassword};
				
				this.$http.put(url,parasData)
				.then( (res) => {
				if(res.status == 200){
				     this.actionProgress = false;
				     if(res.data.content == true){
                       showNotice('success','Success!','修改成功!');
                       this.getList();					   
			           $('#updatePasswordModel').modal('hide');
					 }else{
					   showNotice('error','Error!','修改失败,请检查原密码!');
					 }
                 }
                }, (response) => {
				     this.actionProgress = false;
                     showNotice('warning','Error!','远程数据操作失败,请检查网络!');
                });
			},
			refresh(){
                this.getList();
            },
        },
		beforeCreate(){

		},
        beforeMount(){
            this.getList();
        },
		created () {

        },
        watch: {

        }
    }
</script>
