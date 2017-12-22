<template>
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
                                                        <!-- BEGIN FORM-->
                                                        <form class="form-horizontal">
                                                            <div class="form-body">
                                                                <div class="form-group">
                                                                    <label class="col-md-3 control-label">公司名称</label>
                                                                    <div class="col-md-6">
                                                                        <input type="text" class="form-control input-circle" :class="{'emptyInput':viewType}" :readonly="viewType" placeholder="公司名称" v-model="form.companyName">
                                                                    </div>
                                                                </div>
																
                                                                <div class="form-group">
                                                                    <label class="col-md-3 control-label">公司代码</label>
                                                                    <div class="col-md-6">
                                                                        <input type="text" class="form-control input-circle" :class="{'emptyInput':viewType}" :readonly="viewType" placeholder="公司代码" v-model="form.companyCode"> 
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
																			 <select class="form-control input-circle" :class="{'emptyInput':viewType}" :disabled="viewType" v-model="form.status" @change="handleStatusChange">
                                                                                       <option v-for="option in options" v-model="option.value" v-bind:value="option.value">
                                                                                       {{ option.text }}
                                                                                       </option>
                                                                             </select> 
                                                                    </div>
                                                                </div>


																
                                                                <div class="form-group last" v-show='viewType'>
                                                                    <label class="col-md-3 control-label">服务人数 </label>
                                                                    <div class="col-md-6">
                                                                        <span class="form-control-static">  </span>
                                                                    </div>
                                                                </div>
																
                                                            </div>

                                                        </form>
                                                        <!-- END FORM-->
                                                    </div>
														</div>
                                                        <div class="modal-footer">
														    <button type="button" class="btn blue" v-show="viewType" @click="changeViewType"><i class="fa fa-pencil"></i> 修改 </button>
                                                            <button type="button" class="btn dark btn-outline" data-dismiss="modal" @click="handleClose"> 关闭 </button>
                                                            <button type="button" class="btn green" v-show="!viewType" @click="handleSave" :disabled="actionProgress">
															 保存 <span id="saveCompanyAction" v-show="actionProgress">......</span>
															</button>
                                                        </div>
                                                    </div>
                                                    <!-- /.modal-content -->
                                                </div>
                                                <!-- /.modal-dialog -->
                                            </div>
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
                     showNotice('warning','Error!','远程数据操作失败,请检查网络!');
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
