<template>
                          <!-- BEGIN FORM-->
                           <form class="form-horizontal">
                                            <!-- /.modal -->
                                            <div class="modal fade bs-modal-lg" id="setBackendPermissionModel" tabindex="-1" role="dialog" aria-hidden="true">
                                                <div class="modal-dialog modal-lg">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                                                            <h4 class="modal-title"> {{admin_login}} 的后端权限 </h4>
                                                        </div>
                                                        <div class="modal-body"> 
                                                    <div class="portlet-body form backend-permission-full-page">
                                                            <div class="form-body">

																
                                                                <div class="form-group " v-for="(permission,index) in allPermssions">
                                                                    <label class="col-md-2 control-label" style="text-align:left;">{{permission.name}}: </label>
                                                                    <div class="col-md-9">
                                                                        <span >
														<div class="md-checkbox-inline">			
                                                           <div class="md-checkbox" v-for="(pItem,index) in permission.items">
                                                                <input type="checkbox" :id="pItem.code" class="md-check" :value='pItem.code' v-model='admin_backend_permission'>
                                                                <label :for="pItem.code">
                                                                    <span></span>
                                                                    <span class="check"></span>
                                                                    <span class="box"></span>{{pItem.code}}</label>
                                                            </div>
														</div>
																		</span>
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
import backendPermissions from '../../config/backend_permission'
import {formatUnixDate,formatDate,showTip,showNotice,formatMintuesDate} from '../../utils/common.js';
export default {
    name : 'setBackendPermissionModel',
    //通过props来接受从父组件传递过来的值
    props : {

    },
    methods : {
	    save() {
		        this.actionProgress = true;
				//提交到API处理
				var parasData = {"admin_login":this.admin_login,"admin_backend_permission":this.admin_backend_permission};
				this.$http.put('/adminUser/updateBackendPermissions',parasData)
				.then( (res) => {
				if(res.status == 200){
				     this.actionProgress = false;
					 this.$emit('refresh');		
                     showNotice('success','Success!','修改成功!');					
			         $('#setBackendPermissionModel').modal('hide');
                 }
                }, (response) => {
				     this.actionProgress = false;
                     showNotice('warning','Error!','远程数据操作失败,请检查网络!');
                });
        },
		loadAdminUserBackendPermssions(){
		    //先清空
		    this.admin_backend_permission = [];
		    if(this.admin_backend_permission_str != "" && this.admin_backend_permission_str != null){
			   var permissionArr = this.admin_backend_permission_str.split(',');
			   for(var i in permissionArr){
			     this.admin_backend_permission.push(permissionArr[i]);
			   }
			}
		}
    },
    computed : {
    },
    data () {
        return {
		   actionProgress:false,
		   admin_login:'',
		   admin_backend_permission_str : '',
		   admin_backend_permission:[],
		   allPermssions : backendPermissions
        }
    },
	beforeMount(){
	    //this.loadAdminUserBackendPermssions();
    },
    watch : {
    }
}
</script>

<style>
.backend-permission-full-page {
  overflow-x: hidden;
  padding: 20px;
  height:400px;
  margin-bottom: 20px;
  background-color: #fafafa !important; }

</style>


