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
                            <h1>订单 
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
                                <span>订单</span>
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
                                                            <i class="fa fa-search"></i> 筛选 </div>
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
                                                                    <label class="col-md-1 control-label">用户</label>
                                                                    <div class="col-md-1">
                                                                            <a data-toggle="modal" href="#customerListPopup" class="btn btn-circle btn-sm red"> 选择
                                                                                <span class="fa fa-search"> </span>
                                                                            </a>
                                                                    </div>
                                                                    <div class="col-md-9">
                                                                        xx
                                                                    </div>
                                                                 </div>
                                                                </div>

                                                                <div class="row">
                                                                 <div class="form-group">
                                                                    <label class="col-md-1 control-label">公司</label>
                                                                    <div class="col-md-1">
                                                                            <a  data-toggle="modal" href="#companyListPopup" class="btn btn-circle btn-sm red" @click="loadCompanyPopupData"> 选择
                                                                                <span class="fa fa-search"> </span>
                                                                            </a>
                                                                    </div>
                                                                    <div class="col-md-9">
                                                                        xx
                                                                    </div>
                                                                 </div>
                                                                </div>

                                                                <div class="row">
                                                                 <div class="form-group">
                                                                    <label class="col-md-1 control-label">时间</label>
                                                                    <div class="col-md-1">

                                                                    </div>
                                                                    <div class="col-md-9">
                                                                        xx
                                                                    </div>
                                                                 </div>
                                                                </div>

                                                                <div class="row">
                                                                 <div class="form-group">
                                                                    <label class="col-md-1 control-label">订单状态</label>
                                                                    <div class="col-md-1">

                                                                    </div>
                                                                    <div class="col-md-9">
                                                                        xx
                                                                    </div>
                                                                 </div>
                                                                </div>

                                                                <div class="row">
                                                                 <div class="form-group">
                                                                    <label class="col-md-1 control-label">付款状态</label>
                                                                    <div class="col-md-1">

                                                                    </div>
                                                                    <div class="col-md-9">
                                                                        xx
                                                                    </div>
                                                                 </div>
                                                                </div>

                                                            </div>
                                                            <div class="form-actions right">
                                                                <div class="row">
                                                                    <div class="col-md-offset-3 col-md-9">
                                                                        <button type="button" class="btn btn-circle red" @click="handleSearch" :disabled="actionProgress"> 
																		查 询 <span id="searchAction" v-show="actionProgress">......</span>
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
										
                                            <div class="table-responsive">
                                                <tableDataLoadingProgress v-show="progressBar"></tableDataLoadingProgress>
											
                                                <table class="table table-hover" v-if="count">
                                                    <thead>
                                                        <tr>
                                                            <th style="width:5%;"> 序号 </th>
                                                            <th style="width:11%;"> 订单号 
                                                            <vPageSort :sortColumn="'customerName'" @handleSort="handleSort"></vPageSort>
                                                            </th>
                                                            <th style="width:8%;"> 下单人 </th>
                                                            <th style="width:30%;"> 简要
															</th>
                                                            <th style="width:7%;"> 金额
                                                            <vPageSort :sortColumn="'realPrice'" @handleSort="handleSort"></vPageSort>
                                                            </th>
                                                            <th style="width:13%;"> 下单时间 
                                                            <vPageSort :sortColumn="'bookTime'" @handleSort="handleSort"></vPageSort>
                                                            </th>
                                                            <th style="width:7%;"> 订单状态 </th>
                                                            <th style="width:7%;"> 付款状态 </th>
                                                            <th style="width:6%;"> 操作 </th>
															<th style="width:6%;">  </th>
                                                        </tr>
                                                    </thead>
													<tbody>

             <tr v-for="(item,index) in items" id="span-item.orderId">
                <td style="width:5%;"> {{Number(index + 1 + (currentPage-1) * selected) }}</td>
                <td style="width:11%;"> <a data-toggle="modal" href="#editLunchOrderModal" @click="showEditModel(item,false)">{{item.orderNumber}}</a> </td>
                <td style="width:8%;"> {{item.customerName}} </td>
                <td style="width:30%;">{{item.content}} </td>
                <td style="width:7%;">{{item.realPrice}} </td>
                <td style="width:13%;"> {{formatMintuesDate(item.bookTime)}}  </td>
                <td style="width:7%;" v-html='changeOrderStatus(item.orderStatus)'> </td>
                <td style="width:7%;" v-html='changePaymentStatus(item.paymentStatus)'> </td>
                <td style="width:6%;"> 
				<a data-toggle="modal" href="#editLunchOrderModal" @click="showEditModel(item,true)" class="btn btn-circle btn-xs grey-cascade"><i class="fa fa-pencil"></i> Edit </a>
				</td>
				<td style="width:6%;">  
			    <a data-toggle="modal" href="#deleteConfirmModel" @click="deleteLunchOrder(item)" class="btn btn-circle btn-xs dark"><i class="fa fa-times"></i> Delete </a>
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

        <vLunchOrderEdit :model=model :form=form :viewType=viewType :addType=addType @handleSave="handleSaveLunchOrder" @refresh="refresh"></vLunchOrderEdit>
											
		<vConfirmModal :confirmMessage="'确定删除 '" :modalId="'deleteConfirmModel'" :itemId="model.orderId" :itemName="model.customerName + ' 在 ' + formatMintuesDate(model.bookTime)  + ' 下的订单'" @handleConfirm="handleDelete"></vConfirmModal>
           
        <vCompanyListPopup></vCompanyListPopup>
         <!-- END CONTENT -->	
        </div>
        <!-- END CONTAINER -->
</template>

<script>
    import lunchOrder from '../models/lunchOrder';
    import {APIDOMAIN} from '../../vuex/types.js';
	import vMoPaging from './../Common/Paging';
    import vPageInfo from './../Common/PageInfo';
    import vPageSort from './../Common/PageSort';
	import vConfirmModal from './../Common/confirmModal';
    import tableDataLoadingProgress from './../Common/TableDataLoadingProgress';

    import vCompanyListPopup from './CompanyListPopup';
	
	import vLunchOrderEdit from './LunchOrderEdit';
	import {formatUnixDate,formatDate,showTip,showNotice,formatMintuesDate} from '../../utils/common.js';
    export default {
        components: {
		    vMoPaging,vPageInfo,vPageSort,vConfirmModal,vLunchOrderEdit,tableDataLoadingProgress,vCompanyListPopup
        },
        data () {
            return {
			    progressBar: true, //显示加载条
				actionProgress: false, //
				sortColumn: '',
				sortType: '',
				selected: '15',
				options: [
				   { text: ' 15 ', value: '15' },
                   { text: ' 30 ', value: '30' },
				   { text: ' 50 ', value: '50' }
                ],
		        orderStatusOptions: [
                   { text: ' 待确认 ', value: '0' },
				   { text: ' 已确认 ', value: '1' },
				   { text: ' 已取消 ', value: '2' },
				   { text: ' 配送中 ', value: '9' },
				   { text: ' 已完成 ', value: '10' }
                ],		  
                paymentStatusOptions: [
                  { text: ' 未付款 ', value: '0' },
				  { text: ' 已付款 ', value: '1' }
                ],
                pageSize : 15 , //每页显示30条数据
                currentPage : 1, //当前页码
				totalPages : 0,//总页数
                count : 0, //总记录数
                items : [],
				model:lunchOrder,
				form:lunchOrder,
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
				viewType:false,
				addType:false,
                companyId:'',
                customerId:''
            }
        },
        methods:{
            //获取数据
            getList () {
                if(this.companyId == 'undefined' || this.companyId == undefined){
                     this.companyId = '';
                }

                if(this.customerId == 'undefined' || this.customerId == undefined){
                     this.customerId = '';
                }

			    this.progressBar = true; //显示加载条
				this.$http.get('/lunchOrders',{
                params: {
                    conditionsStr: 'companyId::=::' + this.companyId + '$customerId::=::' + this.customerId,
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
			    this.customerName = ''; 
				this.customerLogin = '';
                this.currentPage = 1;
				this.sortColumn = '';
				this.sortType = '';
                this.getList();
            },
			handleCancelSearch(){
			    this.customerId = '';
				this.companyId = '';
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
			handleSaveLunchOrder(model){
				 //$('#editLunchOrderModal').modal('hide');
            },
            //从page组件传递过来的当前page
            pageChange (page) {
                this.currentPage = page
                this.getList()
            },
			//处理删除
			handleDelete(id){
			         $('#deleteConfirmModel').modal('hide');
					 this.$http.delete('/lunchOrder/' + id,{
                     })
					 .then( (res) => {
                       //子组件监听到数据返回变化会自动更新DOM
					   if(res.status == 200){
					    //showTip("Success","删除成功");
                        showNotice('success','Success!','删除成功!');					
						this.getList();
                       }
                     }, (response) => {
                        showNotice('warning','Error!','远程数据操作失败,请检查网络!');
                     });  
			},
			//处理删除
			deleteLunchOrder(item){
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
			   this.setForm();
			},
			showAddModel(){
			    this.addType = true;
				this.viewType = false;
				//this.model = form();
				//this.form = form();
			},
			setForm(){
		      //this.form = this.model;
                this.form.customerMobile = this.model.customerMobile;
                this.form.remark = this.model.remark;
                this.form.orderStatus = this.model.orderStatus;
                this.form.paymentStatus = this.model.paymentStatus;
		    },
		    formatterDate(cellValue){
                return formatDate(cellValue);
            },
            formatMintuesDate(cellValue){
                return formatMintuesDate(cellValue);
            },
			changeOrderStatus(cellValue){
			    var stauts = cellValue;
			    if(cellValue == '0'){
				    stauts = '<span class="badge badge-info"> 待确认 </span>';
				}else if(cellValue == '1'){
				    stauts = '<span class="badge badge-primary"> 已确认 </span>';
				}else if(cellValue == '2'){
				    stauts = '<span class="badge badge-danger"> 已取消 </span>';
				}else if(cellValue == '9'){
				    stauts = '<span class="badge badge-warning"> 配送中 </span>';
				}else if(cellValue == '10'){
				    stauts = '<span class="badge badge-success"> 已完成 </span>';
				}
                return stauts;
            },
			changePaymentStatus(cellValue){
			    var stauts = cellValue;
			    if(cellValue == '0'){
				    stauts = '<span class="badge badge-danger"> 未付款 </span>';
				}else if(cellValue == '1'){
				    stauts = '<span class="badge badge-info"> 已付款 </span>';
				}else if(cellValue == '2'){
				    stauts = '<span class="badge badge-warning"> 部分付款 </span>';
				}
                return stauts;
            },
            loadCompanyPopupData(){
                this.loadCompanyData = true;
                this.$children[5].loadingPopupData = true;
                this.$children[5].getPopupDataList();
            }
        },
		beforeCreate(){

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
