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
                            <h1>订单 {{type}}
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
                                <span>订单 {{type}}</span>
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
                                                                            <a data-toggle="modal" href="#customerListPopup" class="btn btn-circle btn-sm red" @click="loadCustomerPopupData"> 选择
                                                                                <span class="fa fa-search"> </span>
                                                                            </a>
                                                                    </div>
                                                                    <div class="col-md-9">

                                      <span style="padding-left:5px;padding-right:5px;" v-for="(name,index) in selectedCustomerNames"> 
                                          <button type="button" @click="deleteSelectedCustomer(name,index)" class="btn btn-circle btn-sm blue-hoki"> 
                                           {{name}} <i class="fa fa-times"></i>
                                          </button>
                                      </span>

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

                                      <span style="padding-left:5px;padding-right:5px;" v-for="(name,index) in selectedCompanyNames"> 
                                          <button type="button" @click="deleteSelectedCompany(name,index)" class="btn btn-circle btn-sm blue-hoki"> 
                                           {{name}} <i class="fa fa-times"></i>
                                          </button>
                                      </span>
                                                                    </div>
                                                                 </div>
                                                                </div>

                                                                <div class="row">
                                                                 <div class="form-group">
                                                                    <label class="col-md-1 control-label">下单时间 </label>

                                                                    <div class="col-md-3">                                                            
                                                                       
                                                                   <datepicker v-model="startDate" class="picker"></datepicker>
                                                                    </div>

                                                                    <label class="col-md-1 control-label" style="text-align:center;">到</label>
                                                                    <div class="col-md-3">
                                                                       <datepicker v-model="endDate" class="picker"></datepicker>
                                                                    </div>
                                                                 </div>
                                                                </div>

                                                                <div class="row">
                                                                 <div class="form-group">
                                                                    <label class="col-md-1 control-label">订单状态</label>
                                                                    <div class="col-md-9">

                                                         <div class="md-checkbox-inline" id="orderStatusCheckbox">
                                                            <div class="md-checkbox" v-for="(item,index) in orderStatusOptions">
                                                                <input type="checkbox" :id="'orderstauts' + item.value" class="md-check" :value='item.value' v-model='selectedOrderStatus'>
                                                                <label :for="'orderstauts' + item.value">
                                                                    <span></span>
                                                                    <span class="check"></span>
                                                                    <span class="box"></span> {{item.text}}</label>
                                                            </div>
                                                         </div>
                                                                    </div>
                                                                 </div>
                                                                </div>

                                                                <div class="row">
                                                                 <div class="form-group">
                                                                    <label class="col-md-1 control-label">付款状态</label>

                                                                    <div class="col-md-9">

                                                         <div class="md-checkbox-inline" id="paymentStatusCheckbox">
                                                            <div class="md-checkbox" v-for="(item,index) in paymentStatusOptions">
                                                                <input type="checkbox" :id="'pay-' + item.value" class="md-check" :value='item.value' v-model='selectedPaymentStatus'>
                                                                <label :for="'pay-' + item.value">
                                                                    <span></span>
                                                                    <span class="check"></span>
                                                                    <span class="box"></span> {{item.text}}</label>
                                                            </div>
                                                         </div>

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

             <tr v-for="(item,index) in items" :id="item.orderId">
                <td style="width:5%;"> {{Number(index + 1 + (currentPage-1) * selected) }}</td>
                <td style="width:11%;"> <a data-toggle="modal" href="#editLunchOrderModal" @click="showEditModel(item,false)">{{item.orderNumber}}</a> </td>
                <td style="width:8%;"> {{item.customerName}} </td>
                <td style="width:30%;">{{item.content}} </td>
                <td style="width:7%;">{{item.realPrice}} </td>
                <td style="width:13%;"> {{formatMintuesDate(item.bookTime)}}  </td>
                <td style="width:7%;" v-html='changeOrderStatus(item.orderStatus)'> </td>
                <td style="width:7%;" v-html='changePaymentStatus(item.paymentStatus)'> </td>
                <td style="width:6%;"> 
				<a data-toggle="modal" href="#editLunchOrderModal" @click="showEditModel(item,true)" class="btn btn-circle btn-xs grey-cascade" v-if="showEditButton">
				<i class="fa fa-pencil"></i> Edit 
				</a>
				</td>
				<td style="width:6%;">  
			    <a data-toggle="modal" href="#deleteConfirmModel" @click="deleteLunchOrder(item)" class="btn btn-circle btn-xs dark" v-if="showDeleteButton">
				<i class="fa fa-times"></i> Delete 
				</a>
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
											
		<vConfirmModal ref="deleteConfirm" :confirmMessage="'确定删除 '" :modalId="'deleteConfirmModel'" :itemId="model.orderId" :itemName="model.customerName + ' 在 ' + formatMintuesDate(model.bookTime)  + ' 下的订单'" @handleConfirm="handleDelete"></vConfirmModal>
           
        <vCompanyListPopup ref="companyListPopup" :loadData=loadCompanyData></vCompanyListPopup>
        <vCustomerListPopup ref="customerListPopup" :loadData=loadCustomerData></vCustomerListPopup>
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
	import vCustomerListPopup from './CustomerListPopup';

	import vLunchOrderEdit from './LunchOrderEdit';
	import {formatUnixDate,formatDate,showTip,showNotice,formatMintuesDate,formatNormalDate,getNowFormatDay,checkPermission} from '../../utils/common.js';

    export default {
        components: {
		    vMoPaging,vPageInfo,vPageSort,vConfirmModal,vLunchOrderEdit,tableDataLoadingProgress,vCompanyListPopup,vCustomerListPopup,datepicker 
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
				  { text: ' 已付款 ', value: '1' },
                  { text: ' 部分付款 ', value: '2' }
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
                customerId:'',
                loadCompanyData:false,
                loadCustomerData:false,
                selectedCompanyNames:[],
                selectedCompanyIds:[],
                selectedCustomerNames:[],
                selectedCustomerIds:[],
                selectedOrderStatus:[],
                selectedPaymentStatus:[],
                startDate : '',
                endDate : '',
				type : this.$route.query.type,
				showEditButton : checkPermission('component_order_update'),
				showDeleteButton : checkPermission('component_order_delete')
            }
        },
        methods:{
		    getStatus (type) {
              this.type = type;
			  if(this.type == "today"){
			     this.startDate = this.getNowFormatDay();
				 this.endDate = this.getNowFormatDay();
				 this.getList();
			  }else{
			     this.handleCancelSearch();
			  }
            },
            getNowFormatDay() {
			    return getNowFormatDay();
            },
            //获取数据
            getList () {
                this.companyId = '';
                var _this = this; 
                 _this.selectedCompanyIds.forEach(function(item) {
                    _this.companyId = _this.companyId + "," + item;
                });
                if(this.companyId != ''){
                    this.companyId = this.companyId.substr(1);
                }

                this.customerId = '';
                var _this = this; 
                 _this.selectedCustomerIds.forEach(function(item) {
                    _this.customerId = _this.customerId + "," + item;
                });
                if(this.customerId != ''){
                    this.customerId = this.customerId.substr(1);
                }

                var orderStatus = '';
                this.selectedOrderStatus.forEach(function(item) {
                    orderStatus = orderStatus + "," + item;
                });
                if(orderStatus != ''){
                    orderStatus = orderStatus.substr(1);
                }

                var paymentStatus = '';
                this.selectedPaymentStatus.forEach(function(item) {
                    paymentStatus = paymentStatus + "," + item;
                });
                if(paymentStatus != ''){
                    paymentStatus = paymentStatus.substr(1);
                }
				
				var start_date = "";
				var end_date = "";
				
				if(this.startDate != ''){
				   start_date = this.startDate + " 00:00:00";
				}
				
				if(this.endDate != ''){
				   end_date = this.endDate + " 23:59:59";
				}

                var conditions = "";
                conditions += 'companyId::=::' + this.companyId;
                conditions += '$customerId::=::' + this.customerId;
                conditions += '$orderStatus::=::' + orderStatus;
                conditions += '$paymentStatus::=::' + paymentStatus;
                if(this.startDate != '' && this.endDate != ''){
                   conditions += '$bookTime::between::' + start_date + ',' + end_date;
                }else{
                   if(this.startDate != ''){
                       conditions += '$bookTime::gt::' + start_date;
                   }

                   if(this.endDate != ''){
                       conditions += '$bookTime::lt::' + end_date;
                   }
                }

			    this.progressBar = true; //显示加载条
				this.$http.get('/lunchOrders',{
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
                this.getList();
            },
			handleCancelSearch(){
                this.startDate = '';
                this.endDate = '';
				this.selectedCompanyIds = [];
                this.selectedCompanyNames = [];
				this.selectedCustomerIds = [];
                this.selectedCustomerNames = [];
                this.selectedOrderStatus = [],
                this.selectedPaymentStatus = [],
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
			         this.$refs.deleteConfirm.actionProgress = true;
					 
					 this.$http.delete('/lunchOrder/' + id,{
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
            formatNormalDate(cellValue){
                return formatNormalDate(cellValue);
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

                //先清空
                this.$refs.companyListPopup.companyNames = [];
                this.$refs.companyListPopup.companyIds = [];
				
                var _this = this; 
                if(this.selectedCompanyNames.length > 0){
                    this.selectedCompanyNames.forEach(function(item){
                      _this.$refs.companyListPopup.companyNames.push(item);
                    });
                }

                if(this.selectedCompanyIds.length > 0){
                    this.selectedCompanyIds.forEach(function(item){
                      _this.$refs.companyListPopup.companyIds.push(item);
                    });
                }
            },
            loadCustomerPopupData(){
                this.loadCustomerData = true;
				
                //先清空
                this.$refs.customerListPopup.customerNames = [];
                this.$refs.customerListPopup.customerIds = [];
 
                var _this = this; 
                if(this.selectedCustomerNames.length > 0){
                    this.selectedCustomerNames.forEach(function(item){
                      _this.$refs.customerListPopup.customerNames.push(item);
                    });
                }

                if(this.selectedCustomerIds.length > 0){
                    this.selectedCustomerIds.forEach(function(item){
                      _this.$refs.customerListPopup.customerIds.push(item);
                    });
                }
            },
            deleteSelectedCompany(name,index){
                   this.selectedCompanyIds.splice(index,1);
                   this.selectedCompanyNames.splice(index,1);
            },
            deleteSelectedCustomer(name,index){
                   this.selectedCustomerIds.splice(index,1);
                   this.selectedCustomerNames.splice(index,1);
            }
        },
		beforeCreate(){

		},
        beforeMount(){
            //this.getList();
        },
		created () {
             console.log(this.getStatus(this.$route.query.type))
        },
        watch: {
		    '$route' (to, from) {
               this.getStatus(this.$route.query.type);
            }
        }
    }
</script>
