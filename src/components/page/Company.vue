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
                            <h1>客户公司
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
                                <span>客户公司</span>
                            </li>
                        </ul>
                        <!-- END PAGE BREADCRUMBS -->
                        <!-- BEGIN PAGE CONTENT INNER -->
                        <div class="page-content-inner">
                            <div class="row">
                                <div class="col-md-12">
									<!-- START search from -->
                                    <div class="portlet box red">
                                                    <div class="portlet-title">
                                                        <div class="caption">
                                                            <i class="fa fa-search"></i> 查询</div>
                                                        <div class="tools">
                                                            <a href="javascript:;" class="collapse"> </a>
                                                        </div>
                                                    </div>
                                                    <div class="portlet-body form">
                                                        <!-- BEGIN FORM-->
                                                        <form id="form" class="form-horizontal">
                                                            <div class="form-body">
                                                                <div class="row">
                                                                <div class="form-group">
                                                                    <label class="col-md-1 control-label">公司名</label>
                                                                    <div class="col-md-3">
                                                                        <input id="companyName" name="companyName" type="text" class="form-control input-circle" placeholder="公司名"  v-model="companyName">
                                                                    </div>
                                                                    <label class="col-md-1 control-label">公司代码</label>
                                                                    <div class="col-md-3">
                                                                        <input id="companyCode" name="companyCode" type="text" class="form-control input-circle" placeholder="公司代码"  v-model="companyCode">
                                                                    </div>
                                                                </div>
                                                                </div>
                                                            </div>
                                                            <div class="form-actions right">
                                                                <div class="row">
                                                                    <div class="col-md-offset-3 col-md-9">
                                                                        <button type="button" class="btn btn-circle red" @click="handleSearch" :disabled="actionProgress">
																		查 询 <span id="searchCompanyAction" v-show="actionProgress">......</span>
																		</button>
                                                                        <button type="button" class="btn btn-circle grey-salsa btn-outline" @click="handleCancelSearch"> 取 消 </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                        <!-- END FORM-->
                                                    </div>
                                                </div>
                                    <!-- END search from -->
									<!-- BEGIN SAMPLE TABLE PORTLET-->
                                    <div class="portlet box red">
                                        <div class="portlet-title">

                                            <vPageInfo :currentPage="currentPage" :totalPages="totalPages" :count="count" :selected="selected" :options="options"  @handleChange="handleChange"></vPageInfo>

                                            <div class="tools">
                                                <a href="javascript:;" class="collapse"></a>
												<a href="javascript:;" class="reload" @click="handleReload"> </a>
                                            </div>
                                        </div>
                                        <div class="portlet-body">
                                            <div class="table-toolbar">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="btn-group" v-if="$_has('component_company_add')">
                                                            <a data-toggle="modal" href="#editCompanyModal" class="btn btn-outline dark" @click="showAddModel()"> 添加新公司
                                                                <i class="fa fa-plus"></i>
                                                            </a>
                                                        </div>
                                                        <div class="btn-group" v-if="$_has('component_company_batch_delete')">
                                                            <a class="btn btn-outline dark" @click="batchDelete()"> 批量删除
                                                                <i class="fa fa-times"></i>
                                                            </a>

                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="btn-group pull-right">
                                                            <button class="btn green  btn-outline dropdown-toggle" data-toggle="dropdown">Tools
                                                                <i class="fa fa-angle-down"></i>
                                                            </button>
                                                            <ul class="dropdown-menu pull-right">
                                                                <li>
                                                                    <a href="javascript:;">
                                                                        <i class="fa fa-print"></i> Print </a>
                                                                </li>
                                                                <li>
                                                                    <a href="javascript:;">
                                                                        <i class="fa fa-file-pdf-o"></i> Save as PDF </a>
                                                                </li>
                                                                <li>
                                                                    <a href="javascript:;">
                                                                        <i class="fa fa-file-excel-o"></i> Export to Excel </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="table-responsive">
                                                <table class="table table-hover" v-if="count">
                                                    <thead>
                                                        <tr>
                                                            <th style="width:5%;">
				                                           <div class="md-checkbox">
                                                                <input type="checkbox" id="checkAllCompany" class="md-check" v-model='checkAll' v-on:click='checkedAll'>
                                                                <label for="checkAllCompany">
                                                                    <span></span>
                                                                    <span class="check"></span>
                                                                    <span class="box"></span> </label>
                                                            </div>
                                                            </th>
                                                            <th style="width:5%;"> 序号 </th>
                                                            <th style="width:24%;"> 公司名称
                                                            <vPageSort :sortColumn="'companyName'" @handleSort="handleSort"></vPageSort>
                                                            </th>
                                                            <th style="width:15%;"> 公司代码
                                                            <vPageSort :sortColumn="'companyCode'" @handleSort="handleSort"></vPageSort>
															                             </th>
                                                            <th style="width:12%;"> 开始时间 </th>
                                                            <th style="width:8%;"> 状态 </th>
                                                            <th style="width:8%;"> 服务人数 </th>
                                                            <th style="width:8%;"> 默认配送人 </th>
                                                            <th style="width:7%;"> 操作 </th>
															                              <th style="width:8%;">  </th>
                                                        </tr>
                                                    </thead>
													<tbody>

             <tr v-for="(item,index) in items" :id="item.companyId">
                <td style="width:5%;">
				                                           <div class="md-checkbox">
                                                                <input type="checkbox" :id="'company-' + item.companyId" class="md-check" :value='item.companyId' v-model='checkboxModel'>
                                                                <label :for="'company-' + item.companyId">
                                                                    <span></span>
                                                                    <span class="check"></span>
                                                                    <span class="box"></span> </label>
                                                            </div>

                </td>
                <td style="width:5%;"> {{Number(index + 1 + (currentPage-1) * selected) }}</td>
                <td style="width:24%;"> <a data-toggle="modal" href="#editCompanyModal" @click="showEditModel(item,false)">{{item.companyName}}</a> </td>
                <td style="width:15%;">{{item.companyCode}} </td>
                <td style="width:12%;"> {{formatterDate(item.joinTime)}}  </td>
                <td style="width:8%;" v-html='changeStatus(item.status)'> </td>
                <td style="width:8%;">
                    <router-link :to="{path:'customer',query: {id:item.companyId,name:item.companyName}}" target="_blank"> {{item.companyCustomerQuantity}} </router-link>
                    <!-- <router-link :to="{name:'customer',params: { id:item.companyId }}" target="_blank"> 公司人员 </router-link>-->
               </td>
               <td style="width:8%;">{{item.distributerName}} </td>
                <td style="width:7%;">
				<a data-toggle="modal" href="#editCompanyModal" @click="showEditModel(item,true)" class="btn btn-circle btn-xs grey-cascade" v-if="showEditButton"><i class="fa fa-pencil"></i> Edit </a>
				</td>
				<td style="width:8%;">
			    <a data-toggle="modal" href="#deleteConfirmModel" @click="deleteCompany(item)" class="btn btn-circle btn-xs dark" v-if="showDeleteButton"><i class="fa fa-times"></i> Delete </a>
				</td>
             </tr>

													</tbody>
                                                </table>



                                            </div>



        <template v-if="count">
		   <vMoPaging :page-index="currentPage" :total="count" :page-size="pageSize" @change="pageChange"></vMoPaging>
        </template>


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

        <vCompanyEdit ref="editForm" :model=model :form=form :viewType=viewType :addType=addType @handleSave="handleSaveCompany" @refresh="refresh"></vCompanyEdit>
        <vDistributerListPopupForCompany ref="distributerListPopupForCompany" :loadData=loadDistributerData @handleSelect='selectedDistributer'></vDistributerListPopupForCompany>

		<vConfirmModal ref="deleteConfirm"  :name="DeleteConfirmModal" :confirmMessage="'确定删除 '" :modalId="'deleteConfirmModel'" :itemId="model.companyId" :itemName="model.companyName" @handleConfirm="handleDelete"></vConfirmModal>
        <vConfirmModal ref="batchDeleteConfirm" :name="BatchDeleteConfirmModal" :confirmMessage="'确定批量删除 '" :modalId="'batchDeleteConfirmModel'" @handleConfirm="handleBatchDelete"></vConfirmModal>
            <!-- END CONTENT -->
        </div>
        <!-- END CONTAINER -->
</template>

<script>
    import company from '../models/company';
    import {APIDOMAIN} from '../../vuex/types.js';
    import vPageInfo from './../Common/PageInfo';
	import vConfirmModal from './../Common/confirmModal';
  import vDistributerListPopupForCompany from './DistributerListPopupForCompany';

	import vCompanyEdit from './companyEdit';
	import {formatUnixDate,formatDate,showTip,showNotice,checkPermission} from '../../utils/common.js';
    export default {
        components: {
		    vPageInfo,vConfirmModal,vCompanyEdit,vDistributerListPopupForCompany
        },
        data () {
            return {
			    progressBar: false, //显示加载条
				actionProgress: false, //
			    companyName: '',
				companyCode: '',
				sortColumn: '',
				sortType: '',
				selected: '15',
				options: [
				   { text: ' 15 ', value: '15' },
                   { text: ' 30 ', value: '30' },
				   { text: ' 50 ', value: '50' }
                ],
                pageSize : 15 , //每页显示30条数据
                currentPage : 1, //当前页码
				totalPages : 0,//总页数
                count : 0, //总记录数
                items : [],
				model:company,
				form:company,
				form: {
                    companyId: '',
                    companyName: '',
                    companyCode: '',
                    companyAddress: '',
                    companyLogoPath:'',
					          operationCenterCode: '',
                    distributerId:'',
                    distributerName:'',
                    status: 0,
                    joinTime: ''
                },
				viewType:false,
				addType:false,
        checkboxModel:[],
        checkAll:false,
        loadDistributerData : true,
				showEditButton : checkPermission('component_company_update'),
				showDeleteButton : checkPermission('component_company_delete')
            }
        },
        methods:{
            //获取数据
            getList () {
			    //this.progressBar = true; //显示加载条
				this.$loading('数据加载中 ...');
				var url = '/' + this.$store.state.user.operationCenter + '/companyExtends';
				this.$http.get(url,{
                params: {
                    conditionsStr: 'companyName::like::' + this.companyName + '$companyCode::like::' + this.companyCode,
                    pageSize: this.pageSize,
                    page: this.currentPage,
					sortColumn: this.sortColumn,
					sortType: this.sortType
                 }
                })
                .then( (res) => {
				    this.actionProgress = false;
				    //this.progressBar = false;
					this.$loading.end();
                    //子组件监听到数据返回变化会自动更新DOM
					if(res.status == 200){
                        this.count = res.data.content.totalSize;
						this.totalPages = res.data.content.totalPageNum;
                        this.items = res.data.content.item;
                    }
                }, (response) => {
                     //showTip("Error","远程获取数据错误！");
					 showNotice('warning','Error!','远程获取数据错误,请检查网络!');
					 this.actionProgress = false;
                     //this.progressBar = false;
					 this.$loading.end();
                     //error callback
                });
            },
			handleSearch(){
				this.actionProgress = true;
                this.currentPage = 1;
                this.getList();
            },
			refresh(){
                this.currentPage = 1;
                this.getList();
            },
			handleReload(){
			    this.companyName = '';
				this.companyCode = '';
                this.currentPage = 1;
				this.sortColumn = '';
				this.sortType = '';
                this.getList();
            },
			handleCancelSearch(){
			    this.companyName = '';
				this.companyCode = '';
                this.currentPage = 1;
                this.getList();
            },
			//处理页面显示数量选择
			handleChange(selected){
                this.pageSize = selected;
                this.selected = selected;
                this.getList();
            },
			//处理排序
			handleSort(sortColumn,sortType){
			    this.sortColumn = sortColumn;
				this.sortType = sortType;
                this.pageSize = this.selected;
                this.getList();
            },
			//处理修改
			handleSaveCompany(model){
			     //this.model.companyName = model.companyName + 'xxxx';
				 //this.model.companyCode = 'yyyy';
				 //$('#editCompanyModal').modal('hide');
            },
            //从page组件传递过来的当前page
            pageChange (page) {
                this.currentPage = page
                this.getList()
            },
			//处理删除
			handleDelete(id){
			         this.$refs.deleteConfirm.actionProgress = true;

					 var url = '/' + this.$store.state.user.operationCenter + '/company/' + id;
					 this.$http.delete(url,{
                     })
					 .then( (res) => {
                       //子组件监听到数据返回变化会自动更新DOM
					   if(res.status == 200){
					    this.$refs.deleteConfirm.actionProgress = false;
					    $('#deleteConfirmModel').modal('hide');
                        showNotice('success','Success!','删除成功!');
						this.getList();
                       }
                     }, (response) => {
					    this.$refs.deleteConfirm.actionProgress = false;
					    $('#deleteConfirmModel').modal('hide');
                        showNotice('warning','Error!','远程数据操作失败,请检查网络!');
                     });
			},
			//处理删除
			deleteCompany(item){
			   this.model = item;
			},
			showEditModel(item,isEdit){
			   //直接取行数据等于当前model,无需ajax调取，适合简单的数据
			   if(isEdit){
			     this.viewType = false;
			   }else{
			     this.viewType = true;
			   }
			   this.addType = false;
			   this.model = item;
         this.form.companyName = this.model.companyName;
         this.form.companyCode = this.model.companyCode;
         this.form.companyAddress = this.model.companyAddress;
         this.form.status = this.model.status;
         this.form.distributerId = this.model.distributerId;
         this.form.distributerName = this.model.distributerName;
			   this.setForm();
			},
			showAddModel(){
			    this.addType = true;
				this.viewType = false;
        this.form.companyName = '';
        this.form.companyCode = '';
        this.form.companyAddress = '';
        this.form.status = '0';
        this.form.distributerId = '';
        this.form.distributerName = '';
				//this.model = form();
				//this.form = form();
			},
			setForm(){
		      //this.form = this.model;
		      this.form.companyName = this.model.companyName;
			  this.form.companyCode = this.model.companyCode;
			  this.form.companyAddress = this.model.companyAddress;
			  this.form.status = this.model.status;
		    },
		    formatterDate(cellValue){
                return formatDate(cellValue);
            },
			changeStatus(cellValue){
			    var stauts = cellValue;
			    if(cellValue == '0'){
				    stauts = '<span class="label label-sm label-info"> 正常 </span>';
				}else if(cellValue == '1'){
				    stauts = '<span class="label label-sm label-danger"> 注销 </span>';
				}
                return stauts;
            },
            //选中所有
            checkedAll(){
                   var _this = this;
                   if (!this.checkAll) {
                    this.checkboxModel = [];
                   }else{
                    _this.checkboxModel = [];
                    _this.items.forEach(function(item) {
                    _this.checkboxModel.push(item.companyId);
                    });
                  }
            },
            batchDelete(){
                if(this.checkboxModel.length == 0){
                    showNotice('warning','警告!','您没有选中任何数据!');
                    return;
                }else{
                    $('#batchDeleteConfirmModel').modal('show');
                }
            },
            //批量删除
            handleBatchDelete(){
                if(this.checkboxModel.length == 0){
                    showNotice('warning','警告!','您没有选中任何数据!');
                    return;
                }

				//this.$loading('操作执行中...');
				this.$refs.batchDeleteConfirm.actionProgress = true;

                var _this = this;
                var ids = "";
                 _this.checkboxModel.forEach(function(item) {
                    ids = ids + "," + item;
                });

				var url = '/' + this.$store.state.user.operationCenter + '/companies/' + ids;
				this.$http.delete(url,{
                })
				.then( (res) => {
                //子组件监听到数据返回变化会自动更新DOM
			    if(res.status == 200){
				   //this.$loading.end();
				   this.$refs.batchDeleteConfirm.actionProgress = false;
				   $('#batchDeleteConfirmModel').modal('hide');
                   showNotice('success','Success!','批量删除成功!');
                   this.checkAll = false;
                   this.checkboxModel = [];
				   this.getList();
                 }
                }, (response) => {
				   //this.$loading.end();
				   this.$refs.batchDeleteConfirm.actionProgress = false;
				   $('#batchDeleteConfirmModel').modal('hide');
                   showNotice('warning','Error!','远程数据操作失败,请检查网络!');
                });
            }
        },
    selectedDistributer(distributerId,distributerName){
          alert(1);
          // this.form.distributerId = distributerId;
          // this.form.distributerName = distributerName;
          alert(2);
          $('#distributerListPopup').modal('hide');
    },
		beforeCreate(){

		},
        beforeMount(){
            this.getList();
        },
        computed: {
        },
        watch: {
            model: {
                handler: function (newVal) {
                    console.log(newVal)
                },
                deep: true
            }
        }
    }
</script>
