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
                                <a href="index.html">首页</a>
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
                                                            <i class="fa fa-gift"></i> 查询</div>
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
                                                                    <label class="col-md-2 control-label">公司代码</label>
                                                                    <div class="col-md-3">
                                                                        <input id="companyCode" name="companyCode" type="text" class="form-control input-circle" placeholder="公司代码"  v-model="companyCode">
                                                                    </div>
                                                                </div>
                                                                </div>
                                                            </div>
                                                            <div class="form-actions right">
                                                                <div class="row">
                                                                    <div class="col-md-offset-3 col-md-9">
                                                                        <button id="search" type="button" class="btn btn-circle red" @click="handleSearch"> 查 询 </button>
                                                                        <button id="cancelSearch" type="button" class="btn btn-circle grey-salsa btn-outline" @click="handleCancelSearch"> 取 消 </button>
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
                                            <div class="caption">
                                                <i class="fa fa-cogs"></i> 数据列表 
												<span style="font-size:12px;">
												 共 {{count}} 条 
                                                 第 {{currentPage}} 页
                                                 共 {{totalPages}} 页
												</span>
												<span style="font-size:12px;">每页显示 : 
																			  <select v-model="selected" style="color:#000000;" @change="handleChange">
                                                                                       <option v-for="option in options" v-model="option.value">
                                                                                       {{ option.text }}
                                                                                       </option>
                                                                               </select> 条
												</span>
											</div>
                                            <div class="tools">
                                                <a href="javascript:;" class="collapse"></a>
												<a href="javascript:;" class="reload" @click="handleReload"> </a>
                                            </div>
                                        </div>
                                        <div class="portlet-body">
                                            <div class="table-responsive">
												<div class="col-md-3" v-show="progressBar">
												     <div class="alert alert-info">
                                                     <img src="../../../static/img/loading.gif"> 数据加载中... </div>
												</div>
											
                                                <table class="table" v-if="count">
                                                    <thead>
                                                        <tr>
                                                            <th style="width:5%;"> 序号 </th>
                                                            <th style="width:30%;"> 公司名称 
														<div style="display:inline;position:relative;top:-5px;">
                                                           <a href="javascript:void(0);" @click="handleSort('companyName','desc')">
														   <i class="fa fa-angle-up"></i>
														   </a>
														    <a href="javascript:void(0);" @click="handleSort('companyName','asc')">
														   <i class="fa fa-angle-down" style="position:absolute;z-index:999;margin-top:12px;margin-left:-9px;"></i>
														   </a>
														</div>
                                                            <th style="width:20%;"> 公司代码
														<div style="display:inline;position:relative;top:-5px;">
                                                           <a href="javascript:void(0);" @click="handleSort('companyCode','desc')">
														   <i class="fa fa-angle-up"></i>
														   </a>
														    <a href="javascript:void(0);" @click="handleSort('companyCode','asc')">
														   <i class="fa fa-angle-down" style="position:absolute;z-index:999;margin-top:12px;margin-left:-9px;"></i>
														   </a>
														</div>
															</th>
                                                            <th style="width:10%;"> 开始时间 </th>
                                                            <th style="width:7%;"> 状态 </th>
                                                            <th style="width:8%;"> 服务人数 </th>
                                                            <th style="width:10%;"> 操作 </th>
															<th style="width:10%;">  </th>
                                                        </tr>
                                                    </thead>
													<tbody>

             <tr v-for="(item,index) in items" class="odd gradeX" id="span-item.companyId">
                <td style="width:5%;"> {{Number(index + 1 + (currentPage-1) * selected) }}</td>
                <td style="width:30%;"> <a data-toggle="modal" href="#large" @click="showEditModel(item)">{{item.companyName}}</a> </td>
                <td style="width:20%;">{{item.companyCode}} </td>
                <td style="width:10%;"> {{item.joinTime}}  </td>
                <td style="width:7%;"> {{item.status}} </td>
                <td style="width:8%;">  </td>
                <td style="width:10%;">  <a data-toggle="modal" href="#large" @click="showEditModel(item)"> edit </a> </td>
				<td style="width:10%;">  <a data-toggle="modal" href="#deleteConfirmModel" @click="deleteCompany(item)"> delete </a> </td>
             </tr>

													</tbody>
                                                </table>
												 
												
												
                                            </div>
											

                                             <div id="page" class="pagination">
        <template v-if="count">
		   <vMoPaging :page-index="currentPage" :total="count" :page-size="pageSize" @change="pageChange"></vMoPaging>
        </template>
		
                                            <!-- /.modal -->
                                            <div class="modal fade bs-modal-lg" id="large" tabindex="-1" role="dialog" aria-hidden="true">
                                                <div class="modal-dialog modal-lg">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                                                            <h4 class="modal-title">xxxx</h4>
                                                        </div>
                                                        <div class="modal-body"> 
														<p>1.yyy</p>
														<p>2.zzzz</p>
														</div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn dark btn-outline" data-dismiss="modal">Close</button>
                                                            <button type="button" class="btn green" @click="handleUpdate(model)">Save changes</button>
                                                        </div>
                                                    </div>
                                                    <!-- /.modal-content -->
                                                </div>
                                                <!-- /.modal-dialog -->
                                            </div>
											
											<vConfirmModal :confirmMessage="'确定删除 '" :modalId="'deleteConfirmModel'" :itemId="model.companyId" :itemName="model.companyName" @handleConfirm="handleDelete"></vConfirmModal>

											 </div>

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
            <!-- END CONTENT -->	
        </div>
        <!-- END CONTAINER -->
</template>

<script>
    import company from '../models/company';
    import {APIDOMAIN} from '../../vuex/types.js';
	import vMoPaging from './../Common/Paging';
	import vConfirmModal from './../Common/confirmModal';
	import {formatUnixDate,formatDate,showTip,showNotice} from '../../utils/common.js';
    export default {
        components: {
		    vMoPaging,vConfirmModal
        },
        data () {
            return {
			    progressBar: true, //显示加载条
				loadingDetail: false, //显示详细页加载
			    companyName: '',
				companyCode: '',
				sortColumn: '',
				sortType: '',
				selected: '30',
				options: [
                   { text: ' 30 ', value: '30' },
                   { text: ' 10 ', value: '10' },
				   { text: ' 50 ', value: '50' }
                ],
                pageSize : 30 , //每页显示30条数据
                currentPage : 1, //当前页码
				totalPages : 0,//总页数
                count : 0, //总记录数
                items : [],
				model:company
            }
        },
        methods:{
            //获取数据
            getList () {
			    this.progressBar = true; //显示加载条
				this.$http.get('/companies',{
                params: {
                    conditionsStr: 'companyName::like::' + this.companyName + '$companyCode::like::' + this.companyCode,
                    pageSize: this.pageSize,
                    page: this.currentPage,
					sortColumn: this.sortColumn,
					sortType: this.sortType
                 }
                })
                .then( (res) => {
				    this.progressBar = false;
                    //子组件监听到数据返回变化会自动更新DOM
					if(res.status == 200){
                        this.count = res.data.content.totalSize;
						this.totalPages = res.data.content.totalPageNum;
                        this.items = res.data.content.item;
                    }
                }, (response) => {
                     showTip("异步获取数据错误","远程获取数据错误！");
                     this.progressBar = false;
                     //error callback
                });
            },
			handleSearch(){
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
			handleChange(){
                this.pageSize = this.selected;
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
			handleUpdate(model){

            },
            //从page组件传递过来的当前page
            pageChange (page) {
                this.currentPage = page
                this.getList()
            },
			//处理删除
			handleDelete(id){
			         $('#deleteConfirmModel').modal('hide');
					 this.$http.delete('/company/' + id,{
                     })
					 .then( (res) => {
                       //子组件监听到数据返回变化会自动更新DOM
					   if(res.status == 200){
					    //showTip("Success","删除成功");
                        showNotice('success','Success!','删除成功!');					
						this.getList();
                       }
                     }, (response) => {
                        showTip("异步操作错误","");
                     });  
			},
			//处理删除
			deleteCompany(item){
			   this.model = item;
			},
			showEditModel(item){
		       //this.showUpdateDialog = true;
			   //直接取行数据等于当前model,无需ajax调取，适合简单的数据
			   this.model = item;
			}
        },
        beforeMount(){
            this.getList();
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
