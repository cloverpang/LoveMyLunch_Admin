<template>
                          <!-- BEGIN FORM-->
                           <form class="form-horizontal" @submit.prevent="validateBeforeSubmit">
                                            <!-- /.modal -->
                                            <div class="modal fade bs-modal-lg" id="editDistributerModal" tabindex="-1" role="dialog" aria-hidden="true">
                                                <div class="modal-dialog modal-lg">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
															<h4 class="modal-title" v-show="addType"> 添加 新 的配送员 </h4>
                                                            <h4 class="modal-title" v-show="!addType"> {{model.distributerName}} </h4>
                                                        </div>
                                                        <div class="modal-body"> 
                                                    <div class="portlet-body form">
                                                            <div class="form-body">
                                                                <div class="form-group" v-if="addType" :class="{'has-error': errors.has('distributerName')}">
                                                                    <label class="col-md-1 control-label">姓名</label>
                                                                    <div class="col-md-7">
                                                                          <div class="input-icon right">
                                                                            <i class="fa fa-warning tooltips" data-original-title="请输入姓名!" v-show="errors.has('distributerName')"></i>
                                                                            <input v-validate="'required'" maxlength="20" id="distributerName" name="distributerName" type="text" class="form-control input-circle" :class="{'emptyInput':viewType}" :readonly="viewType" placeholder="" v-model="form.distributerName">
                                                                            <span style="color:red;" v-show="errors.has('distributerName')"  >请输入姓名</span>  
                                                                          </div>
                                                                    </div>
                                                                </div>
																
                                                                <div class="form-group">
                                                                    <label class="col-md-1 control-label">手机</label>
                                                                    <div class="col-md-7">
                                                                        <input type="text" class="form-control input-circle" :class="{'emptyInput':viewType}" :readonly="viewType" placeholder="" v-model="form.mobile"> 
                                                                    </div>
                                                                </div>

                                                                <div class="form-group">
                                                                    <label class="col-md-1 control-label">图片</label>
                                                                    <div class="col-md-7">
                                                                        <input type="text" class="form-control input-circle" :class="{'emptyInput':viewType}" :readonly="viewType" placeholder="" v-model="form.photoPath"> 
                                                                    </div>
                                                                </div>

																
                                                                <div class="form-group">
                                                                    <label class="col-md-1 control-label">状态</label>
                                                                    <div class="col-md-7">
                                                                              <select class="form-control input-circle" :class="{'emptyInput':viewType}" style="color:#000000;display:inline;" v-model="form.status">
                                                                                       <option v-for="option in statusOptions" v-model="option.value" v-bind:value="option.value">
                                                                                       {{ option.text }}
                                                                                       </option>
                                                                              </select> 
                                                                    </div>
                                                                </div>

                                                                <div class="form-group" v-show='viewType'>
                                                                    <label class="col-md-1 control-label">配送</label>
                                                                    <div class="col-md-7">
                                                                        <input type="text" class="form-control input-circle" :class="{'emptyInput':viewType}" readonly placeholder="" v-model="form.distributerTimes"> 
                                                                    </div>
                                                                </div>
																
																<div class="form-group">
 
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
import distributer from '../models/distributer';
import {showNotice} from '../../utils/common.js';
export default {
    name : 'editDistributerModal',
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
        },
        //选项集合
        statusOptions : {
            default : [
				   { text: ' 正常 ', value: '0' },
                   { text: ' 已注销 ', value: '1' }
                ]
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
				this.$http.post('/distributer',this.form)
				.then( (res) => {
				if(res.status == 200){
				     this.actionProgress = false;
                     showNotice('success','Success!','添加成功!');		
                     this.$emit('refresh');							 
			         $('#editDistributerModal').modal('hide');
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
				this.$http.put('/distributer',this.model)
				.then( (res) => {
				if(res.status == 200){
				     this.actionProgress = false;
                     showNotice('success','Success!','修改成功!');					
			         $('#editDistributerModal').modal('hide');
                 }
                }, (response) => {
				     this.reSetForm();
				     this.actionProgress = false;
                     showNotice('warning','Error!','远程数据操作失败,请检查网络!');
                });
        },
		setModel(){
                
			    this.model.distributerName = this.form.distributerName;
			    this.model.mobile = this.form.mobile;
			    this.model.photoPath = this.form.photoPath;
				this.model.distributerTimes = this.form.distributerTimes;
				this.model.status = this.form.status;
		},			
		reSetForm(){
                
			    this.form.distributerName = this.model.distributerName;
			    this.form.mobile = this.model.mobile;
			    this.form.photoPath = this.model.photoPath;
				this.form.distributerTimes = this.model.distributerTimes;
				this.form.status = this.model.status;
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
                    distributerId: '',
                    distributerName: '',
                    mobile: '',
		            photoPath: '',
                    status: 0,
					distributerTimes: 0,
                    createTime: ""
           },
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
