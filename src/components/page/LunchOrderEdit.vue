<template>
                          <!-- BEGIN FORM-->
                           <form class="form-horizontal" @submit.prevent="validateBeforeSubmit">
                                            <!-- /.modal -->
                                            <div class="modal fade bs-modal-lg" id="editLunchOrderModal" tabindex="-1" role="dialog" aria-hidden="true">
                                                <div class="modal-dialog modal-lg">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
															<h4 class="modal-title" v-show="addType"> 添加 </h4>
                                                            <h4 class="modal-title" v-show="!addType"> {{model.customerName}} 在 {{formatMintuesDate(model.bookTime)}} 下的订单 </h4>
                                                        </div>
                                                        <div class="modal-body"> 
                                                    <div class="portlet-body form">
                                                            <div class="form-body">
                                                                <div class="form-group" :class="{'has-error': errors.has('customerMobile')}">
                                                                    <label class="col-md-3 control-label">客户电话</label>
                                                                    <div class="col-md-6">
                                                                          <div class="input-icon right">
                                                                            <i class="fa fa-warning tooltips" data-original-title="请输入客户电话!" v-show="errors.has('customerMobile')"></i>
                                                                            <input v-validate="'required'" name="customerMobile" type="text" class="form-control input-circle" :class="{'emptyInput':viewType}" :readonly="viewType" placeholder="" v-model="form.customerMobile">
                                                                            <span style="color:red;" v-show="errors.has('customerMobile')"  >请输入客户电话!</span>  
                                                                          </div>
                                                                    </div>
                                                                </div>
																
                                                                <div class="form-group">
                                                                    <label class="col-md-3 control-label">订单备注</label>
                                                                    <div class="col-md-6">
                                                                        <textarea row="4" class="form-control input-circle" :class="{'emptyInput':viewType}" :readonly="viewType" placeholder="" v-model="form.remark"></textarea> 
                                                                    </div>
                                                                </div>
															
																
																<div class="form-group">
                                                                    <label class="col-md-3 control-label">订单状态 </label>
                                                                    <div class="col-md-6">
																			 <select class="form-control input-circle" :class="{'emptyInput':viewType}" :disabled="viewType" v-model="form.orderStatus">
                                                                                       <option v-for="option in orderStatusOptions" v-model="option.value" v-bind:value="option.value">
                                                                                       {{ option.text }}
                                                                                       </option>
                                                                             </select> 
                                                                    </div>
                                                                </div>

																<div class="form-group">
                                                                    <label class="col-md-3 control-label">付款状态 </label>
                                                                    <div class="col-md-6">
																			 <select class="form-control input-circle" :class="{'emptyInput':viewType}" :disabled="viewType" v-model="form.paymentStatus">
                                                                                       <option v-for="option in paymentStatusOptions" v-model="option.value" v-bind:value="option.value">
                                                                                       {{ option.text }}
                                                                                       </option>
                                                                             </select> 
                                                                    </div>
                                                                </div>
																
                                                                <div class="form-group " v-show='viewType'>
                                                                    <label class="col-md-3 control-label">订单简要 </label>
                                                                    <div class="col-md-6">
                                                                        <span class="form-control-static"> {{model.content}} </span>
                                                                    </div>
                                                                </div>

                                                                <div class="form-group " v-show='viewType'>
                                                                    <label class="col-md-3 control-label">就餐时间 </label>
                                                                    <div class="col-md-6">
                                                                        <span class="form-control-static"> {{formatterDate(model.lunchTime)}} </span>
                                                                    </div>
                                                                </div>

                                                                <div class="form-group last" v-show='viewType'>
                                                                    <label class="col-md-3 control-label">金额 </label>
                                                                    <div class="col-md-6">
                                                                        <span class="form-control-static"> 原始 {{model.originPrice}} / 折扣 {{model.discoutPrice}} / 真实 {{model.realPrice}} </span>
                                                                    </div>
                                                                </div>
																
                                                            </div>

               
                                                       
                                                    </div>
														</div>
                                                        <div class="modal-footer">
														    <button type="button" class="btn blue" v-show="viewType" @click="changeViewType" v-if="$_has('component_order_update')">
															<i class="fa fa-pencil"></i> 修改 
															</button>
                                                            <button type="button" class="btn dark btn-outline" data-dismiss="modal" @click="handleClose"> 关闭 </button>
                                                            <button type="submit" class="btn green" v-show="!viewType" :disabled="actionProgress" v-if="$_has('component_order_update')">
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
import lunchOrder from '../models/lunchOrder';
import {formatUnixDate,formatDate,showTip,showNotice,formatMintuesDate} from '../../utils/common.js';
export default {
    name : 'editLunchOrderModal',
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
        formatMintuesDate(cellValue){
                return formatMintuesDate(cellValue);
        },
        formatterDate(cellValue){
                return formatDate(cellValue);
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
				var url = '/' + this.$store.state.user.operationCenter + '/lunchOrder';
				this.$http.post(url,this.form)
				.then( (res) => {
				if(res.status == 200){
				     this.actionProgress = false;
                     showNotice('success','Success!','添加成功!');		
                     this.$emit('refresh');							 
			         $('#editLunchOrderModal').modal('hide');
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
				var url = '/' + this.$store.state.user.operationCenter + '/lunchOrder';
				this.$http.put(url,this.model)
				.then( (res) => {
				if(res.status == 200){
				     this.actionProgress = false;
                     showNotice('success','Success!','修改成功!');					
			         $('#editLunchOrderModal').modal('hide');
                 }
                }, (response) => {
				     this.reSetForm();
				     this.actionProgress = false;
                     showNotice('warning','Error!','远程数据操作失败,请检查网络!');
                });
        },
		setModel(){
			//this.model = this.form;
            this.model.customerMobile = this.form.customerMobile;
            this.model.remark = this.form.remark;
            this.model.orderStatus = this.form.orderStatus;
            this.model.paymentStatus = this.form.paymentStatus;
		},			
		reSetForm(){
			//this.form = this.model;
            this.form.customerMobile = this.model.customerMobile;
            this.form.remark = this.model.remark;
            this.form.orderStatus = this.model.orderStatus;
            this.form.paymentStatus = this.model.paymentStatus;
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
                      orderId: '',
                      orderNumber: '',
                      distributNumber: '',
		              bookTime: '',
                      lunchTime: '', 
                      customerName: '',
		              customerMobile: '',
                      customerId: '',
		              companyId: '',
                      content: '',
                      dishIds: '',
                      remark: '',
                      originPrice: 0,
                      discoutPrice: 0,
                      realPrice: 0,
                      star: 0,
                      appraise: '',
                      orderStatus: 0,
                      paymentStatus: 0,
                      createTime: ''
           },
		   orderStatusOptions: [
                { text: ' 待确认 ', value: '0' },
				{ text: ' 已确认 ', value: '1' },
				{ text: ' 已取消 ', value: '2' },
				{ text: ' 配送中 ', value: '9' },
				{ text: ' 已完成 ', value: '10' }
           ],		  
           paymentStatusOptions: [
                { text: ' 未付款 ', value: '0' },
				{ text: ' 已付款 ', value: '1' },
                { text: ' 部分付款 ', value: '2' }
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
