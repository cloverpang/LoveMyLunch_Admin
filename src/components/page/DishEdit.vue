<template>
                          <!-- BEGIN FORM-->
                           <form class="form-horizontal" @submit.prevent="validateBeforeSubmit">
                                            <!-- /.modal -->
                                            <div class="modal fade bs-modal-lg" id="editDishModal" tabindex="-1" role="dialog" aria-hidden="true">
                                                <div class="modal-dialog modal-lg">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
															<h4 class="modal-title" v-show="addType"> 添加 新 {{changeDishType(dishType)}} </h4>
                                                            <h4 class="modal-title" v-show="!addType"> {{model.dishName}} </h4>
                                                        </div>
                                                        <div class="modal-body"> 
                                                    <div class="portlet-body form">
                                                            <div class="form-body">
                                                                <div class="form-group" :class="{'has-error': errors.has('dishName')}">
                                                                    <label class="col-md-1 control-label">名称</label>
                                                                    <div class="col-md-7">
                                                                          <div class="input-icon right">
                                                                            <i class="fa fa-warning tooltips" data-original-title="请输入名称!" v-show="errors.has('dishName')"></i>
                                                                            <input v-validate="'required'" maxlength="20" id="dishInputName" name="dishName" type="text" class="form-control input-circle" :class="{'emptyInput':viewType}" :readonly="viewType" placeholder="" v-model="form.dishName">
                                                                            <span style="color:red;" v-show="errors.has('dishName')"  >请输入名称!</span>  
                                                                          </div>
                                                                    </div>
                                                                </div>
																
                                                                <div class="form-group">
                                                                    <label class="col-md-1 control-label">风格</label>
                                                                    <div class="col-md-7">
                                                                        <input type="text" class="form-control input-circle" :class="{'emptyInput':viewType}" :readonly="viewType" placeholder="" v-model="form.dishStyle"> 
                                                                    </div>
                                                                </div>

                                                                <div class="form-group" v-if="dishType=='dish'">
                                                                    <label class="col-md-1 control-label">组成</label>
                                                                    <div class="col-md-7">
                                                                        <input type="text" class="form-control input-circle" :class="{'emptyInput':viewType}" :readonly="viewType" placeholder="" v-model="form.component"> 
                                                                    </div>
                                                                </div>

																
                                                                <div class="form-group">
                                                                    <label class="col-md-1 control-label">价格</label>
                                                                    <div class="col-md-3">
                                                                       		 <select class="form-control input-circle" :class="{'emptyInput':viewType}" :disabled="viewType" v-model="form.dishPrice">
                                                                                       <option v-for="option in priceOptions" v-model="option.value" v-bind:value="option.value">
                                                                                       {{ option.text }}
                                                                                       </option>
                                                                             </select> 
                                                                    </div>


                                                                   <label class="col-md-1 control-label">状态</label>
                                                                    <div class="col-md-3">
																			 <select class="form-control input-circle" :class="{'emptyInput':viewType}" :disabled="viewType" v-model="form.status">
                                                                                       <option v-for="option in statusOptions" v-model="option.value" v-bind:value="option.value">
                                                                                       {{ option.text }}
                                                                                       </option>
                                                                             </select> 
                                                                    </div>

                                                                   <label class="col-md-1 control-label">辣度</label>
                                                                    <div class="col-md-3">
																			 <select class="form-control input-circle" :class="{'emptyInput':viewType}" :disabled="viewType" v-model="form.pepper">
                                                                                       <option v-for="option in pepperOptions" v-model="option.value" v-bind:value="option.value">
                                                                                       {{ option.text }}
                                                                                       </option>
                                                                             </select> 
                                                                    </div>
                                                                </div>

                                                                <div class="form-group">
                                                                    <label class="col-md-1 control-label">小图</label>
                                                                    <div class="col-md-3">
                                                                        <input type="text" class="form-control input-circle" :class="{'emptyInput':viewType}" :readonly="viewType" placeholder="" v-model="form.dishImageSmall"> 
                                                                    </div>

                                                                    <label class="col-md-1 control-label">中图</label>
                                                                    <div class="col-md-3">
                                                                        <input type="text" class="form-control input-circle" :class="{'emptyInput':viewType}" :readonly="viewType" placeholder="" v-model="form.dishImageMiddle"> 
                                                                    </div>

                                                                    <label class="col-md-1 control-label">大图</label>
                                                                    <div class="col-md-3">
                                                                        <input type="text" class="form-control input-circle" :class="{'emptyInput':viewType}" :readonly="viewType" placeholder="" v-model="form.dishImageLarge"> 
                                                                    </div>

                                                                </div>
																
																<div class="form-group">

                                                                </div>

                                                            </div>

               
                                                       
                                                    </div>
														</div>
                                                        <div class="modal-footer">
														    <button type="button" class="btn blue" v-show="viewType" @click="changeViewType" v-if="$_has('component_dish_update')">
															<i class="fa fa-pencil"></i> 修改 
															</button>
                                                            <button type="button" class="btn dark btn-outline" data-dismiss="modal" @click="handleClose"> 关闭 </button>
                                                            <button type="submit" class="btn green" v-show="!viewType" :disabled="actionProgress" v-if="$_has('component_dish_update')">
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
import axios from 'axios'
import dish from '../models/dish';
import {showNotice} from '../../utils/common.js';

export default {
    components: {

    },
    name : 'editDishModal',
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
				   { text: ' 开放中 ', value: '0' },
                   { text: ' 不开放 ', value: '1' }
                ]
        },
        //选项集合
        priceOptions : {
            default : [
				  { text: ' 1元 ', value: '1' },
                  { text: ' 3元 ', value: '3' },
				  { text: ' 5元 ', value: '5' },
                  { text: ' 7元 ', value: '7' },
                  { text: ' 9元 ', value: '9' },
                  { text: ' 11元 ', value: '11' }
                ]
        },
        //选项集合
        pepperOptions : {
            default : [
				   { text: ' 无 ', value: '0' },
                   { text: ' 1度 ', value: '1' },
                   { text: ' 2度 ', value: '2' },
                   { text: ' 3度 ', value: '3' },
                   { text: ' 4度 ', value: '4' },
                   { text: ' 5度 ', value: '5' }
                ]
        },
		dishType : { 
            default : ''
        },
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
                this.form.dishType = this.dishType;
				//提交到API处理
				var url = '/' + this.$store.state.user.operationCenter + '/dish';
				this.$http.post(url,this.form)
				.then( (res) => {
				if(res.status == 200){
				     this.actionProgress = false;
                     showNotice('success','Success!','添加成功!');		
                     this.$emit('refresh');							 
			         $('#editDishModal').modal('hide');
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
				var url = '/' + this.$store.state.user.operationCenter + '/dish';
				this.$http.put(url,this.model)
				.then( (res) => {
				if(res.status == 200){
				     this.actionProgress = false;
                     showNotice('success','Success!','修改成功!');					
			         $('#editDishModal').modal('hide');
                 }
                }, (response) => {
				     this.reSetForm();
				     this.actionProgress = false;
                     showNotice('warning','Error!','远程数据操作失败,请检查网络!');
                });
        },
		setModel(){
			this.model.dishName = this.form.dishName;
			this.model.dishPrice = this.form.dishPrice;
			this.model.dishImageSmall = this.form.dishImageSmall;
			this.model.dishImageMiddle = this.form.dishImageMiddle;
			this.model.dishImageLarge = this.form.dishImageLarge;
			this.model.dishStyle = this.form.dishStyle;
			this.model.component = this.form.component;
			this.model.pepper = this.form.pepper;
			this.model.status = this.form.status;
		},			
		reSetForm(){
			this.form.dishName = this.model.dishName;
			this.form.dishPrice = this.model.dishPrice;
			this.form.dishImageSmall = this.model.dishImageSmall;
			this.form.dishImageMiddle = this.model.dishImageMiddle;
			this.form.dishImageLarge = this.model.dishImageLarge;
			this.form.dishStyle = this.model.dishStyle;
			this.form.component = this.model.component;
			this.form.pepper = this.model.pepper;
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
		},
        changeDishType(type){
               var t = type;
               if(type == "dish"){
                   t = "菜品";
               }

               if(type == "soup"){
                   t = "汤品";
               }

               if(type == "staplefood"){
                   t = "主食";
               }

               return t;
       }
    },
    computed : {
    },
    data () {
        return {
           model:null,
		   actionProgress:false,
		   form: {
                    dishId: "",
                    dishName: "",
                    dishType: "dish",
		            dishPrice: 1,
                    status: 0,
		            dishImageSmall: "",
                    dishImageMiddle: "",
		            dishImageLarge: "",
                    dishStyle: "",
                    component: "",
                    pepper: 0,
                    createTime: ""
           },
		   viewType: false, //为true显示 view模式，如果为false 则为编辑模式
		   addType: false, //为true显示 add模式,
		   uploadUrl: axios.defaults.baseURL + '/file/upload',
		   src_small:'' //默认图片地址
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
