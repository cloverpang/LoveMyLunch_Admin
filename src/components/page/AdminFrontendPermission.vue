<template>
                          <!-- BEGIN FORM-->
                           <form class="form-horizontal">
                                            <!-- /.modal -->
                                            <div class="modal fade bs-modal-lg" id="setFrontendPermissionModel" tabindex="-1" role="dialog" aria-hidden="true">
                                                <div class="modal-dialog modal-lg">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                                                            <h4 class="modal-title"> {{admin_login}} 的前端显示控制 </h4>
                                                        </div>
                                                        <div class="modal-body"> 
                                                    <div class="portlet-body form frontend-permission-full-page">
                                                            <div class="form-body">

                                                <div class="panel panel-default" v-for="(masterItem,index) in allFrontPermssions">
												    <div class="panel-heading">
													
                                                           <div class="md-checkbox">
                                                                <input type="checkbox" :id="masterItem.code" class="md-check" :value='masterItem.code' v-model='admin_frontend_permission'>
                                                                <label :for="masterItem.code">
                                                                    <span></span>
                                                                    <span class="check"></span>
                                                                    <span class="box"></span>{{masterItem.name}}:</label>
                                                            </div>
															
													</div>
													
													<div class="panel-body" v-if="masterItem.components">
													
													      <div class="md-checkbox-inline">			
                                                           <div class="md-checkbox" v-for="(component,index) in masterItem.components">
                                                                <input type="checkbox" :id="component.code" class="md-check" :value='component.code' v-model='admin_frontend_permission'>
                                                                <label :for="component.code">
                                                                    <span></span>
                                                                    <span class="check"></span>
                                                                    <span class="box"></span>{{component.name}}</label>
                                                            </div>
														</div>
													
													</div>
													

                                                     <div class="panel-body" v-if="masterItem.items">
                                                          <div class="panel panel-default" v-for="(subItem,index) in masterItem.items">
														   	  <div class="panel-heading">
															  
                                                               <div class="md-checkbox">
                                                                 <input type="checkbox" :id="subItem.code" class="md-check" :value='subItem.code' v-model='admin_frontend_permission'>
                                                                 <label :for="subItem.code">
                                                                     <span></span>
                                                                     <span class="check"></span>
                                                                     <span class="box"></span>{{subItem.name}}:</label>
                                                               </div>
															   
													          </div>
															  
													      <div class="panel-body" v-if="subItem.components">
													
													        <div class="md-checkbox-inline">			
                                                             <div class="md-checkbox" v-for="(component,index) in subItem.components">
                                                                <input type="checkbox" :id="component.code" class="md-check" :value='component.code' v-model='admin_frontend_permission'>
                                                                <label :for="component.code">
                                                                    <span></span>
                                                                    <span class="check"></span>
                                                                    <span class="box"></span>{{component.name}}</label>
                                                             </div>
														    </div>
															
													      </div>
														  
														  </div>
													 </div>

                                                </div>
																
							
                                                            </div>

               
                                                       
                                                    </div>
														</div>
                                                        <div class="modal-footer">
														    
                                                            <button type="button" class="btn dark btn-outline" data-dismiss="modal"> 关闭 </button>
                                                            <button type="submit" class="btn green" :disabled="actionProgress" @click="save">
															 保存 <span id="saveCustomerAction" v-show="actionProgress">......</span>
															</button>
                                                        </div>
                                                    </div>
                                                    <!-- /.modal-content -->
                                                </div>
                                                <!-- /.modal-dialog -->
                                            </div>
                           <!-- END FORM-->
                          </form>
</template>

<script>
import menuConfig from '../../config/menu'
import {formatUnixDate,formatDate,showTip,showNotice,formatMintuesDate} from '../../utils/common.js';
export default {
    name : 'setFrontendPermissionModel',
    //通过props来接受从父组件传递过来的值
    props : {

    },
    methods : {
	    save() {
		        this.actionProgress = true;
				//根据设置的前端权限重新设定后端权限
				this.loadAdminUserBackendPermssions();
				//提交到API处理
				var parasData = {"admin_login":this.admin_login,"admin_frontend_permission":this.admin_frontend_permission,"admin_backend_permission":this.admin_backend_permission};
				this.$http.put('/adminUser/updateFrontendPermissions',parasData)
				.then( (res) => {
				if(res.status == 200){
				     this.actionProgress = false;
					 this.$emit('refresh');		
                     showNotice('success','Success!','修改成功!');					
			         $('#setFrontendPermissionModel').modal('hide');
                 }
                }, (response) => {
				     this.actionProgress = false;
                     showNotice('warning','Error!','远程数据操作失败,请检查网络!');
                });
        },
		loadAdminUserFrontendPermssions(){
		    //先清空
		    this.admin_frontend_permission = [];
		    if(this.admin_frontend_permission_str != "" && this.admin_frontend_permission_str != null){
			   var permissionArr = this.admin_frontend_permission_str.split(',');
			   for(var i in permissionArr){
			     this.admin_frontend_permission.push(permissionArr[i]);
			   }
			}
			
			//加载完前端权限后再根据前端权限 初始化 后端权限
			this.loadAdminUserBackendPermssions();
		},
		loadAdminUserBackendPermssions(){
		    //先清空
		    this.admin_backend_permission = [];
			
			var _this = this;
			_this.admin_frontend_permission.forEach(function(p) {
			    var permissionCode = _this.findPermissionCode(p);
				if(null != permissionCode && permissionCode != ''){
                   _this.admin_backend_permission.push(permissionCode);
				}
			});
		},
		findPermissionCode(path){
				var permission = '';
				var _this = this;

				this.allFrontPermssions.forEach(function(p){

				    if(p.code == path){
					    permission = p.permission;
					}else if(null != p.components){
				      p.components.forEach(function(item){
					     if(path == item.code){
						     permission = item.permission;
						 }
					  });
					}else if(null != p.items){
				      p.items.forEach(function(item){
					     if(path == item.code){
						     permission = item.permission;
						 }else if(null != item.components){
				               item.components.forEach(function(item){
					           if(path == item.code){
						           permission = item.permission;
						       } });
						 }
					  });
					}
				});
				
				return permission;
		}
    },
    computed : {
    },
    data () {
        return {
		   actionProgress:false,
		   admin_login:'',
		   admin_frontend_permission_str : '',
		   admin_frontend_permission:[],

		   admin_backend_permission:[],
		   allFrontPermssions : menuConfig
        }
    },
	beforeMount(){
	    //this.loadAdminUserFrontendPermssions();
    },
    watch : {
    }
}
</script>

<style>
.frontend-permission-full-page {
  overflow-x: hidden;
  padding: 20px;
  height:400px;
  margin-bottom: 20px;
  background-color: #fafafa !important; }

</style>

