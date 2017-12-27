<template>
                          <!-- BEGIN FORM-->
                           <form class="form-horizontal" @submit.prevent="validateBeforeSubmit">
                                            <!-- /.modal -->
                                            <div class="modal fade bs-modal-lg" id="editCustomerModal" tabindex="-1" role="dialog" aria-hidden="true">
                                                <div class="modal-dialog modal-lg">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
															<h4 class="modal-title" v-show="addType"> 添加 新用户 </h4>
                                                            <h4 class="modal-title" v-show="!addType"> {{model.customerName}} </h4>
                                                        </div>
                                                        <div class="modal-body"> 
                                                    <div class="portlet-body form">
                                                            <div class="form-body">
                                                                <div class="form-group" :class="{'has-error': errors.has('customerName')}">
                                                                    <label class="col-md-3 control-label">客户姓名</label>
                                                                    <div class="col-md-6">
                                                                          <div class="input-icon right">
                                                                            <i class="fa fa-warning tooltips" data-original-title="请输入客户姓名!" v-show="errors.has('customerName')"></i>
                                                                            <input v-validate="'required'" name="customerName" type="text" class="form-control input-circle" :class="{'emptyInput':viewType}" :readonly="viewType" placeholder="客户姓名" v-model="form.customerName">
                                                                            <span style="color:red;" v-show="errors.has('companyCode')"  >请输入客户姓名!</span>  
                                                                          </div>
                                                                    </div>
                                                                </div>
																
                                                                <div class="form-group">
                                                                    <label class="col-md-3 control-label">手机电话</label>
                                                                    <div class="col-md-6">
                                                                        <input type="text" class="form-control input-circle" :class="{'emptyInput':viewType}" :readonly="viewType" placeholder="手机电话" v-model="form.mobileNumber"> 
                                                                    </div>
                                                                </div>
																
                                                                <div class="form-group">
                                                                    <label class="col-md-3 control-label">客户类型</label>
                                                                    <div class="col-md-6">
                                                                       		 <select class="form-control input-circle" :class="{'emptyInput':viewType}" :disabled="viewType" v-model="form.customerType" @change="handleTypeChange">
                                                                                       <option v-for="option in typeOptions" v-model="option.value" v-bind:value="option.value">
                                                                                       {{ option.text }}
                                                                                       </option>
                                                                             </select> 
                                                                    </div>
                                                                </div>
																
																<div class="form-group">
                                                                    <label class="col-md-3 control-label">状态 </label>
                                                                    <div class="col-md-6">
																			 <select class="form-control input-circle" :class="{'emptyInput':viewType}" :disabled="viewType" v-model="form.status" @change="handleStatusChange">
                                                                                       <option v-for="option in options" v-model="option.value" v-bind:value="option.value">
                                                                                       {{ option.text }}
                                                                                       </option>
                                                                             </select> 
                                                                    </div>
                                                                </div>


																
                                                                <div class="form-group " v-show='viewType'>
                                                                    <label class="col-md-3 control-label">订单总数 </label>
                                                                    <div class="col-md-6">
                                                                        <span class="form-control-static">  </span>
                                                                    </div>
                                                                </div>

                                                                <div class="form-group last" v-show='viewType'>
                                                                    <label class="col-md-3 control-label">消费总金额 </label>
                                                                    <div class="col-md-6">
                                                                        <span class="form-control-static">  </span>
                                                                    </div>
                                                                </div>
																
                                                            </div>

               
                                                       
                                                    </div>
														</div>
                                                        <div class="modal-footer">
														    <button type="button" class="btn blue" v-show="viewType" @click="changeViewType"><i class="fa fa-pencil"></i> 修改 </button>
                                                            <button type="button" class="btn dark btn-outline" data-dismiss="modal" @click="handleClose"> 关闭 </button>
                                                            <button type="submit" class="btn green" v-show="!viewType" :disabled="actionProgress">
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
import customer from '../models/customer';
import {showNotice} from '../../utils/common.js';
export default {
    name : 'editCustomerModal',
    //通过props来接受从父组件传递过来的值
    props : {
        model : { 
            default : null
        },
        form : { 
            default : null
        },
	    viewType : { 
            default : false
        },
		addType : { 
            default : false
        }
    },
    methods : {
        validateBeforeSubmit(){
        this.$validator.validateAll().then((result) => {
           if (result) {
             this.handleSave();
             return;
           }
           //alert('Correct them errors!');
          });
        },
        handleSave () {
		    if(this.addType){
			   this.handleAdd();
			}else{
			   this.handleEdit();
			}
        },
	    handleAdd () {
		        this.actionProgress = true;
				//提交到API处理
				this.$http.post('/customer',this.form)
				.then( (res) => {
				if(res.status == 200){
				     this.actionProgress = false;
                     showNotice('success','Success!','添加成功!');		
                     this.$emit('refresh');							 
			         $('#editCustomerModal').modal('hide');
                 }
                }, (response) => {
				     this.reSetForm();
				     this.actionProgress = false;
                     showNotice('warning','Error!','远程数据操作失败,请检查网络!');
                });
        },
	    handleEdit () {
		        this.actionProgress = true;
                //父组件通过handleSave方法来处理该请求
                //this.$emit('handleSave', this.model);
				 
				//提交到API处理
				this.setModel();
				this.$http.put('/customer',this.model)
				.then( (res) => {
				if(res.status == 200){
				     this.actionProgress = false;
                     showNotice('success','Success!','修改成功!');					
			         $('#editCustomerModal').modal('hide');
                 }
                }, (response) => {
				     this.reSetForm();
				     this.actionProgress = false;
                     showNotice('warning','Error!','远程数据操作失败,请检查网络!');
                });
        },
		setModel(){
			this.model.customerName = this.form.customerName;
			this.model.customerType = this.form.customerType;
			this.model.mobileNumber = this.form.mobileNumber;
			this.model.status = this.form.status;
		},			
		reSetForm(){
			this.form.customerName = this.model.customerName;
			this.form.customerType = this.model.customerType;
			this.form.mobileNumber = this.model.mobileNumber;
			this.form.status = this.model.status;
		},
		handleStatusChange(){
		    //alert(this.form.status);
        },
		handleClose(){
		   this.reSetForm();
        },
		changeViewType(){
		   this.viewType = false;
		}
    },
    computed : {
    },
    data () {
        return {
           model:null,
		   actionProgress:false,
		   form: {
                   customerId: '',
                   customerLogin: '',
                   customerPassword: '',
		           customerName: '',
                   companyId: '',
		           companyName: '',
                   weChatAccount: '',
		           mobileNumber: '',
                   customerScore: 0,
                   customerType: 0,
                   status: 0,
                   createTime: ''
           },
		   options: [
                { text: ' 正常状态 ', value: '0' },
				{ text: ' 注销 ', value: '1' }
           ],		  
           typeOptions: [
                { text: ' 普通用户 ', value: '0' },
				{ text: ' 公司主用户 ', value: '1' }
           ],
		   viewType: false, //为true显示 view模式，如果为false 则为编辑模式
		   addType: false //为true显示 add模式
        }
    },
	beforeMount(){

    },
    watch : {
    }
}
</script>

<style scoped>
.emptyInput {
  border-style:none;
  background-color:#fff;
}
</style>
