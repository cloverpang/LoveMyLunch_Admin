<template>
                                   <!-- BEGIN FORM-->
                                   <form id="companyEditForm" class="form-horizontal" @submit.prevent="validateBeforeSubmit">
                                            <!-- /.modal -->
                                            <div class="modal fade bs-modal-lg" id="editCompanyModal" tabindex="-1" role="dialog" aria-hidden="true">
                                                <div class="modal-dialog modal-lg">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
															<h4 class="modal-title" v-show="addType"> 添加 新公司 </h4>
                                                            <h4 class="modal-title" v-show="!addType"> {{model.companyName}} </h4>
                                                        </div>
                                                        <div class="modal-body"> 
                                                    <div class="portlet-body form">
                                                            <div class="form-body">
                                                                <div class="form-group" :class="{'has-error': errors.has('companyName')}">
                                                                    <label class="col-md-3 control-label">公司名称</label>
                                                                    <div class="col-md-6">
                                                                          <div class="input-icon right">
                                                                          <i class="fa fa-warning tooltips" data-original-title="请输入公司名!" v-show="errors.has('companyName')"></i>
                                                                          <input v-validate="'required'" maxlength="25" name="companyName" type="text" class="form-control input-circle" :class="{'emptyInput':viewType}" :readonly="viewType" placeholder="公司名称" v-model="form.companyName">
                                                                          <span style="color:red;" v-show="errors.has('companyName')"  >请输入公司名!</span>
                                                                          </div>
                                                                    </div>
                                                                </div>
																
                                                                <div class="form-group" :class="{'has-error': errors.has('companyCode')}">
                                                                    <label class="col-md-3 control-label">公司代码</label>
                                                                    <div class="col-md-6">
                                                                       <div class="input-icon right">
                                                                        <i class="fa fa-warning tooltips" data-original-title="请输入公司代码且必须是英文字母!" v-show="errors.has('companyCode')"></i>
                                                                        <input v-validate="'required|alpha_dash'" name="companyCode" type="text" class="form-control input-circle" :class="{'emptyInput':viewType}" :readonly="viewType" placeholder="公司代码" v-model="form.companyCode"> 
                                                                         <span style="color:red;" v-show="errors.has('companyCode')"  >请输入公司代码!</span>
                                                                       </div>
                                                                    </div>
                                                                </div>
																
                                                                <div class="form-group">
                                                                    <label class="col-md-3 control-label">公司地址</label>
                                                                    <div class="col-md-6">
                                                                        <input type="text" class="form-control input-circle" :class="{'emptyInput':viewType}" :readonly="viewType" placeholder="公司地址" v-model="form.companyAddress"> 
                                                                    </div>
                                                                </div>
																
																<div class="form-group">
                                                                    <label class="col-md-3 control-label">状态 </label>
                                                                    <div class="col-md-6">
																			 <select name="status" v-validate="'required'" class="form-control input-circle" :class="{'emptyInput':viewType}" :disabled="viewType" v-model="form.status" @change="handleStatusChange">
                                                                                       <option v-for="option in options" v-model="option.value" v-bind:value="option.value">
                                                                                       {{ option.text }}
                                                                                       </option>
                                                                             </select> 
                                                                             <span style="color:red;" v-show="errors.has('status')"  >状态必须选择!</span>
                                                                    </div>
                                                                </div>


																
                                                                <div class="form-group last" v-show='viewType'>
                                                                    <label class="col-md-3 control-label">服务人数 </label>
                                                                    <div class="col-md-6">
                                                                        <span class="form-control-static">  </span>
                                                                    </div>
                                                                </div>
																
                                                            </div>

                                                        <!-- END FORM-->
                                                    </div>
														</div>
                                                        <div class="modal-footer">
														    <button type="button" class="btn blue" v-show="viewType" @click="changeViewType"><i class="fa fa-pencil"></i> 修改 </button>
                                                            <button type="button" class="btn dark btn-outline" data-dismiss="modal" @click="handleClose"> 关闭 </button>
                                                            <button type="submit" class="btn green" v-show="!viewType" :disabled="actionProgress">
															 保存 <span id="saveCompanyAction" v-show="actionProgress">......</span>
															</button>
                                                        </div>
                                                    </div>
                                                    <!-- /.modal-content -->
                                                </div>
                                                <!-- /.modal-dialog -->
                                            </div>
                           </form>
</template>

<script>
import company from '../models/company';
import {showNotice} from '../../utils/common.js';
export default {
    name : 'editCompanyModal',
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
				this.$http.post('/company',this.form)
				.then( (res) => {
				if(res.status == 200){
				     this.actionProgress = false;
                     showNotice('success','Success!','添加成功!');		
                     this.$emit('refresh');							 
			         $('#editCompanyModal').modal('hide');
                 }
                }, (response) => {
				     this.reSetForm();
				     this.actionProgress = false;
					 //alert(response.message);
                     showNotice('warning','Error!','远程数据操作失败,请检查网络!' + response.message);
                });
        },
	    handleEdit () {
		        this.actionProgress = true;
                //父组件通过handleSave方法来处理该请求
                //this.$emit('handleSave', this.model);
				 
				//提交到API处理
				this.setModel();
				this.$http.put('/company',this.model)
				.then( (res) => {
				if(res.status == 200){
				     this.actionProgress = false;
                     showNotice('success','Success!','修改成功!');					
			         $('#editCompanyModal').modal('hide');
                 }
                }, (response) => {
				     this.reSetForm();
				     this.actionProgress = false;
                     showNotice('warning','Error!','远程数据操作失败,请检查网络!');
                });
        },
		setModel(){
			this.model.companyName = this.form.companyName;
			this.model.companyCode = this.form.companyCode;
			this.model.companyAddress = this.form.companyAddress;
			this.model.status = this.form.status;
		},			
		reSetForm(){
			this.form.companyName = this.model.companyName;
			this.form.companyCode = this.model.companyCode;
			this.form.companyAddress = this.model.companyAddress;
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
               companyId: '',
               companyName: '',
               companyCode: '',
               companyAddress: '',
               companyLogoPath:'',
			   operationCenterCode: '',
               status: 0,
               joinTime: ''
           },
		   options: [
                { text: ' 正常状态 ', value: '0' },
				{ text: ' 注销 ', value: '1' }
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
