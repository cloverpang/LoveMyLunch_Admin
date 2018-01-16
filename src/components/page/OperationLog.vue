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
                            <h1>系统日志
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
                                <span>系统日志</span>
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
                                                                    <label class="col-md-1 control-label">时间 </label>

                                                                    <div class="col-md-3">                                                            
                                                                       
                                                                   <datepicker v-model="startDate" class="picker"></datepicker>
                                                                    </div>

                                                                    <label class="col-md-1 control-label" style="text-align:center;">到</label>
                                                                    <div class="col-md-3">
                                                                       <datepicker v-model="endDate" class="picker"></datepicker>
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
                                                        <div class="btn-group">
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
                                               <tableDataLoadingProgress v-show="progressBar"></tableDataLoadingProgress>
											
                                                <table class="table table-hover" v-if="count" >
                                                    <thead>
                                                        <tr>
                                                            <th style="width:5%;"> 
				                                           <div class="md-checkbox">
                                                                <input type="checkbox" id="checkAllLog" class="md-check" v-model='checkAll' v-on:click='checkedAll'>
                                                                <label for="checkAllLog">
                                                                    <span></span>
                                                                    <span class="check"></span>
                                                                    <span class="box"></span> </label>
                                                            </div>
                                                            </th>
                                                            <th style="width:5%;"> 序号 </th>
                                                            <th style="width:20%;"> URL 
                                                            <vPageSort :sortColumn="'operationUrl'" @handleSort="handleSort"></vPageSort>
                                                            </th>
                                                            <th style="width:8%;"> 运行
                                                            <vPageSort :sortColumn="'runTime'" @handleSort="handleSort"></vPageSort>
															</th>
                                                            <th style="width:15%;"> 操作时间 </th>
                                                            <th style="width:7%;"> 操作人 </th>
															<th style="width:15%;"> 目标 </th>
															<th style="width:20%;"> 返回结果 </th>
                                                            <th style="width:5%;"> 操作 </th>
                                                        </tr>
                                                    </thead>
													<tbody>

             <tr v-for="(item,index) in items" :id="item.operationId">
                <td style="width:5%;"> 
				                                           <div class="md-checkbox">
                                                                <input type="checkbox" :id="'operationLog-' + item.operationId" class="md-check" :value='item.operationId' v-model='checkboxModel'>
                                                                <label :for="'operationLog-' + item.operationId">
                                                                    <span></span>
                                                                    <span class="check"></span>
                                                                    <span class="box"></span> </label>
                                                            </div>
															
                </td>
                <td style="width:5%;"> {{Number(index + 1 + (currentPage-1) * selected) }}</td>
                <td style="width:20%;word-wrap:break-word;word-break:break-all;"  ><a data-toggle="modal" href="#showOperationLogModal" @click="showViewModel(item,false)"> {{limitStringLength(item.operationUrl,60)}} </a> </td>
                <td style="width:8%;">{{item.runTime}} ms</td>
                <td style="width:15%;"> {{formatMintuesDate(item.createTime)}}  </td>
                <td style="width:7%;"> 
                    {{item.operationUser}}
                </td>
				<td style="width:15%;"> 
                    {{item.operationName}}
                </td>
				<td style="width:20%;"> 
                    {{limitStringLength(item.operationReturn,20)}}
                </td>
				<td style="width:5%;">  
			    <a data-toggle="modal" href="#deleteConfirmModel" @click="deleteOperationLog(item)" class="btn btn-circle btn-xs dark"><i class="fa fa-times"></i> Delete </a>
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

        <vOperationLogView :model=model :viewType=viewType :addType=addType ></vOperationLogView>
											
		<vConfirmModal ref="deleteConfirm" :name="DeleteConfirmModal" :confirmMessage="'确定删除 '" :modalId="'deleteConfirmModel'" :itemId="model.operationId" :itemName="'该条log'" @handleConfirm="handleDelete"></vConfirmModal>
        <vConfirmModal ref="batchDeleteConfirm" :name="BatchDeleteConfirmModal" :confirmMessage="'确定批量删除 '" :modalId="'batchDeleteConfirmModel'" @handleConfirm="handleBatchDelete"></vConfirmModal>
            <!-- END CONTENT -->	
        </div>
        <!-- END CONTAINER -->
</template>

<script>
    import operationLog from '../models/operationLog';
    import {APIDOMAIN} from '../../vuex/types.js';
	import vMoPaging from './../Common/Paging';
    import vPageInfo from './../Common/PageInfo';
    import vPageSort from './../Common/PageSort';
	import vConfirmModal from './../Common/confirmModal';
    import tableDataLoadingProgress from './../Common/TableDataLoadingProgress';
	
	import vOperationLogView from './OperationLogView';
	import {formatUnixDate,formatMintuesDate,showTip,showNotice,limitStringLength} from '../../utils/common.js';
    export default {
        components: {
		    vMoPaging,vPageInfo,vPageSort,vConfirmModal,vOperationLogView,tableDataLoadingProgress,datepicker
        },
        data () {
            return {
			    progressBar: true, //显示加载条
				actionProgress: false, //
			    operationLogName: '',
				operationLogCode: '',
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
				model:operationLog,
				form:operationLog,
				form: {
                    operationId: '',
		            operationUrl: '',
                    operationName: '',
		            requestParameters: '',
                    operationReturn: '',
                    operationException: '',
                    operationUser: '',
                    operationToken: '',
		            createTime: ''
                },
				viewType:false,
				addType:false,
                checkboxModel:[],
                checkAll:false,
				startDate : '',
                endDate : ''
            }
        },
        methods:{
            //获取数据
            getList () {
			    this.progressBar = true; //显示加载条
				var start_date = "";
				var end_date = "";
				
				if(this.startDate != ''){
				   start_date = this.startDate + " 00:00:00";
				}
				
				if(this.endDate != ''){
				   end_date = this.endDate + " 23:59:59";
				}
				
				var conditions = "";
                if(this.startDate != '' && this.endDate != ''){
                   conditions += '$createTime::between::' + start_date + ',' + end_date;
                }else{
                   if(this.startDate != ''){
                       conditions += '$createTime::gt::' + start_date;
                   }

                   if(this.endDate != ''){
                       conditions += '$createTime::lt::' + end_date;
                   }
                }

				
				this.$http.get('/operationLogs',{
                params: {
                    conditionsStr: conditions,
                    pageSize: this.pageSize,
                    page: this.currentPage,
					sortColumn: this.sortColumn,
					sortType: this.sortType
                 }
                })
                .then( (res) => {
				    this.actionProgress = false;
				    this.progressBar = false;
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
                     this.progressBar = false;
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
			    this.operationLogName = ''; 
				this.operationLogCode = '';
                this.currentPage = 1;
				this.sortColumn = '';
				this.sortType = '';
                this.getList();
            },
			handleCancelSearch(){
			    this.operationLogName = '';
				this.operationLogCode = '';
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
            //从page组件传递过来的当前page
            pageChange (page) {
                this.currentPage = page
                this.getList()
            },
			//处理删除
			handleDelete(id){
			         this.$refs.deleteConfirm.actionProgress = true;
			         
					 this.$http.delete('/operationLog/' + id,{
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
			deleteOperationLog(item){
			   this.model = item;
			},
			showViewModel(item,isEdit){
			   //直接取行数据等于当前model,无需ajax调取，适合简单的数据
			   if(isEdit){
			     this.viewType = false;
			   }else{
			     this.viewType = true;
			   }
			   this.addType = false;
			   this.model = item;
			},
		    formatMintuesDate(cellValue){
                return formatMintuesDate(cellValue);
            },
            //选中所有
            checkedAll(){
                   var _this = this;
                   if (!this.checkAll) {
                    this.checkboxModel = [];
                   }else{
                    _this.checkboxModel = [];
                    _this.items.forEach(function(item) {
                    _this.checkboxModel.push(item.operationId);
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
			limitStringLength(cellValue,len){
			     return limitStringLength(cellValue,len);
			},
            //批量删除
            handleBatchDelete(){
                if(this.checkboxModel.length == 0){
                    showNotice('warning','警告!','您没有选中任何数据!');
                    return;
                }

				this.$refs.batchDeleteConfirm.actionProgress = true;
                
                //alert(this.checkboxModel.length);
                var _this = this; 
                var ids = "";
                 _this.checkboxModel.forEach(function(item) {
                    ids = ids + "," + item;
                });

				this.$http.delete('/operationLogs/' + ids,{
                })
				.then( (res) => {
                //子组件监听到数据返回变化会自动更新DOM
			    if(res.status == 200){
				   this.$refs.batchDeleteConfirm.actionProgress = false;
				   $('#batchDeleteConfirmModel').modal('hide');
                   showNotice('success','Success!','批量删除成功!');
                   this.checkAll = false;
                   this.checkboxModel = [];					
				   this.getList();
                 }
                }, (response) => {
				   $('#batchDeleteConfirmModel').modal('hide');
				   this.$refs.batchDeleteConfirm.actionProgress = false;
                   showNotice('warning','Error!','远程数据操作失败,请检查网络!');
                });  
            }
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
