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
                            <h1>私募基金公司
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
                                <span>私募基金公司</span>
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
                                                                    <label class="col-md-1 control-label">关键字</label>
                                                                    <div class="col-md-3">
                                                                        <input id="keyword" name="keyword" type="text" class="form-control input-circle" placeholder="支持 公司名，简称，法人"  v-model="keyword">
                                                                    </div>
                                                                    <label class="col-md-2 control-label">是否有报告</label>
                                                                    <div class="col-md-3">
																	           <select id="hasReport" class="form-control input-circle" name="select">
                                                                                  <option value=""></option>
                                                                                  <option value="Y">有报告</option>
                                                                                  <option value="N">无报告</option>
                                                                               </select>
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
                                                            <th style="width:30%;"> 公司简称 
														<div style="display:inline;position:relative;top:-5px;">
                                                           <a href="javascript:void(0);" @click="handleSort('company_short_name','desc')">
														   <i class="fa fa-angle-up"></i>
														   </a>
														    <a href="javascript:void(0);" @click="handleSort('company_short_name','asc')">
														   <i class="fa fa-angle-down" style="position:absolute;z-index:999;margin-top:12px;margin-left:-9px;"></i>
														   </a>
														</div>
                                                            <th style="width:10%;"> 法人 
														<div style="display:inline;position:relative;top:-5px;">
                                                           <a href="javascript:void(0);" @click="handleSort('company_legal_person','desc')">
														   <i class="fa fa-angle-up"></i>
														   </a>
														    <a href="javascript:void(0);" @click="handleSort('company_legal_person','asc')">
														   <i class="fa fa-angle-down" style="position:absolute;z-index:999;margin-top:12px;margin-left:-9px;"></i>
														   </a>
														</div>
															</th>
                                                            <th style="width:10%;"> 成立时间 </th>
                                                            <th style="width:10%;"> 城市 </th>
                                                            <th style="width:10%;"> 报告 </th>
                                                            <th style="width:25%;"> 查看其他 </th>
                                                        </tr>
                                                    </thead>
													<tbody>

             <tr v-for="(item,index) in items" class="odd gradeX" id="span-item.company_id">
                <td style="width:5%;"> {{Number(index + 1 + (currentPage-1) * selected) }}</td>
                <td style="width:30%;"> <a href="javascript:void();" @click="dialogNewbox(item.company_id)"> {{item.company_short_name}} </a></td>
                <td style="width:10%;"> <a data-toggle="modal" href="#large" @click="dialogLargeModel(item.company_id)"> {{item.company_legal_person}}  </a> </td>
                <td style="width:10%;"> <a data-toggle="modal" href="#full" @click="dialogFullModel(item)"> {{item.company_establish_date}}  </a> </td>
                <td style="width:10%;"> {{item.company_city}} </td>
                <td style="width:10%;">  </td>
                <td style="width:25%;">  </td>
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
                                                            <h4 class="modal-title">{{ model.company_short_name }}</h4>
                                                        </div>
                                                        <div class="modal-body"> 
														<p>1.{{ model.company_name }}</p>
														<p>2.{{ model.company_legal_person }}</p>
														</div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn dark btn-outline" data-dismiss="modal">Close</button>
                                                            <button type="button" class="btn green">Save changes</button>
                                                        </div>
                                                    </div>
                                                    <!-- /.modal-content -->
                                                </div>
                                                <!-- /.modal-dialog -->
                                            </div>
											
                                            <!-- /.modal -->
                                            <div class="modal fade" id="full" tabindex="-1" role="dialog" aria-hidden="true">
                                                <div class="modal-dialog modal-full">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                                                            <h4 class="modal-title">{{ model.company_short_name }}</h4>
                                                        </div>
                                                        <div class="modal-body"> 
														<p>1.{{ model.company_name }}</p>
														<p>2.{{ model.company_registration_address }}</p>

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
    import companyOperationInfo from '../models/companyOperationInfo';
    import {APIDOMAIN} from '../../vuex/types.js';
	import vMoPaging from './../Common/Paging';
	import {formatUnixDate,formatDate,showTip} from '../../utils/common.js';
    export default {
        components: {
		    vMoPaging
        },
        data () {
            return {
			    progressBar: true, //显示加载条
				loadingDetail: false, //显示详细页加载
			    keyword: '',
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
				model:companyOperationInfo
            }
        },
        methods:{
            //获取数据
            getList () {
			    this.progressBar = true; //显示加载条
				this.$http.get('/CompanyOperationInfo/search',{
                params: {
                    keyword: this.keyword,
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
			    this.keyword = '';
                this.currentPage = 1;
				this.sortColumn = '';
				this.sortType = '';
                this.getList();
            },
			handleCancelSearch(){
			    this.keyword = '';
                this.currentPage = 1;
                this.getList();
            },
			handleChange(){
                this.pageSize = this.selected;
                this.getList();
            },
			handleSort(sortColumn,sortType){
			    this.sortColumn = sortColumn;
				this.sortType = sortType;
                this.pageSize = this.selected;
                this.getList();
            },
			handleUpdate(model){
			    model.company_name = "xxxxxx";
				this.model.company_name = "yyyyyy";
				this.model = model;   
                			
				this.$http.get('/CompanyOperationInfo/' + this.model.company_id,{
                })
                .then( (res) => {
                    //子组件监听到数据返回变化会自动更新DOM
					if(res.status == 200){
					    //此处使用jquery的方式关闭modal
					    $('#full').modal('hide');
					    showTip("Success","修改成功");	
                    }
                }, (response) => {
                     showTip("异步获取数据错误","远程获取数据错误！");
                     //error callback
                });
            },
            //从page组件传递过来的当前page
            pageChange (page) {
                this.currentPage = page
                this.getList()
            },
			dialogLargeModel(id){
			    //使用ajax方式获取数据
			    this.model = companyOperationInfo; // 首先初始化为空
			    this.loadingDetail = true; //显示加载条
				this.$http.get('/CompanyOperationInfo/' + id,{
                })
                .then( (res) => {
                    //子组件监听到数据返回变化会自动更新DOM
					this.loadingDetail = false;
					if(res.status == 200){
						this.model = res.data.content;
                    }
                }, (response) => {
                     showTip("异步获取数据错误","远程获取数据错误！");
                     this.loadingDetail = false;
                     //error callback
                });
			},
			dialogFullModel(item){
		       //this.showUpdateDialog = true;
			   //直接取行数据等于当前model,无需ajax调取，适合简单的数据
			   this.model = item;
			},
			dialogNewbox(value){
                bootbox.dialog({
                    message: "I am a custom dialog",
                    title: value,
                    buttons: {
                      success: {
                        label: "Success!",
                        className: "green",
                        callback: function() {
                          alert("great success");
                        }
                      },
                      danger: {
                        label: "Danger!",
                        className: "red",
                        callback: function() {
                          alert("uh oh, look out!");
                        }
                      },
                      main: {
                        label: "Click ME!",
                        className: "blue",
                        callback: function() {
                          alert("Primary button");
                        }
                      }
                    }
                }); 
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
