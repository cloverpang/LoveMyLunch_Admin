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
                            <h1>{{companyName}} 用户 
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
                                <span>{{companyName}} 用户</span>
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
                                                                    <label class="col-md-1 control-label">用户姓名</label>
                                                                    <div class="col-md-2">
                                                                        <input id="customerName" name="customerName" type="text" class="form-control input-circle" placeholder="用户姓名"  v-model="customerName">
                                                                    </div>
                                                                    <label class="col-md-1 control-label">登陆账号</label>
                                                                    <div class="col-md-2">
                                                                        <input id="customerLogin" name="customerLogin" type="text" class="form-control input-circle" placeholder="登陆账号"  v-model="customerLogin">
                                                                    </div>
                                                                 </div>
                                                                </div>

                                                               <div class="row">
                                                                 <div class="form-group">
                                                                    <label class="col-md-1 control-label">公司</label>
                                                                    <div class="col-md-2">
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
                                                            <th style="width:20%;"> 用户名 
                                                            <vPageSort :sortColumn="'customerName'" @handleSort="handleSort"></vPageSort>
                                                            </th>
                                                            <th style="width:20%;"> 登陆账号
                                                            <vPageSort :sortColumn="'customerLogin'" @handleSort="handleSort"></vPageSort>
															</th>
                                                            <th style="width:12%;"> 注册时间 </th>
                                                            <th style="width:10%;"> 类型 </th>
                                                            <th style="width:8%;"> 状态 </th>
                                                            <th style="width:10%;"> 订单总数 </th>
                                                            <th style="width:7%;"> 操作 </th>
															<th style="width:8%;">  </th>
                                                        </tr>
                                                    </thead>
													<tbody>

             <tr v-for="(item,index) in items" :id="item.customerId">
                <td style="width:5%;"> {{Number(index + 1 + (currentPage-1) * selected) }}</td>
                <td style="width:20%;"> <a data-toggle="modal" href="#editCustomerModal" @click="showEditModel(item,false)">{{item.customerName}}</a> </td>
                <td style="width:20%;">{{item.customerLogin}} </td>
                <td style="width:12%;"> {{formatterDate(item.createTime)}}  </td>
                <td style="width:10%;" v-html='changeType(item.customerType)'> </td>
                <td style="width:8%;" v-html='changeStatus(item.status)'> </td>
                <td style="width:10%;">  </td>
                <td style="width:7%;"> 
				<a data-toggle="modal" href="#editCustomerModal" @click="showEditModel(item,true)" class="btn btn-circle btn-xs grey-cascade"><i class="fa fa-pencil"></i> Edit </a>
				</td>
				<td style="width:8%;">  
			    <a data-toggle="modal" href="#deleteConfirmModel" @click="deleteCustomer(item)" class="btn btn-circle btn-xs dark"><i class="fa fa-times"></i> Delete </a>
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

        <vCustomerEdit :model=model :form=form :viewType=viewType :addType=addType @handleSave="handleSaveCompany" @refresh="refresh"></vCustomerEdit>
											
		<vConfirmModal :confirmMessage="'确定删除 '" :modalId="'deleteConfirmModel'" :itemId="model.customerId" :itemName="model.customerName" @handleConfirm="handleDelete"></vConfirmModal>

        <vCompanyListPopup ref="companyListPopup" :loadData=loadCompanyData></vCompanyListPopup>
            <!-- END CONTENT -->	
        </div>
        <!-- END CONTAINER -->
</template>

<script>
    import customer from '../models/customer';
    import {APIDOMAIN} from '../../vuex/types.js';
	import vMoPaging from './../Common/Paging';
    import vPageInfo from './../Common/PageInfo';
    import vPageSort from './../Common/PageSort';
	import vConfirmModal from './../Common/confirmModal';
    import tableDataLoadingProgress from './../Common/TableDataLoadingProgress';
	
	import vCustomerEdit from './customerEdit';
    import vCompanyListPopup from './CompanyListPopup';

	import {formatUnixDate,formatDate,showTip,showNotice} from '../../utils/common.js';
    export default {
        components: {
		    vMoPaging,vPageInfo,vPageSort,vConfirmModal,vCustomerEdit,tableDataLoadingProgress,vCompanyListPopup
        },
        data () {
            return {
			    progressBar: true, //显示加载条
				actionProgress: false, //
			    customerName: '',
				customerLogin: '',
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
				model:customer,
				form:customer,
				form: {
                   customerId: '',
                   customerLogin: '',
                   customerPassword: '',
		           customerName: '',
                   companyId: '',
		           companyName: '',
                   weChatAccount: '',
		           mobileNumber: '',
                   customerScore: 0,
                   customerType: 0,
                   status: 0,
                   createTime: ''
                },
				viewType:false,
				addType:false,
                companyId:this.$route.query.id,
                companyName:this.$route.query.name,
                loadCompanyData:false,
                selectedCompanyNames:[],
                selectedCompanyIds:[],
            }
        },
        methods:{
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

			    this.progressBar = true; //显示加载条
				this.$http.get('/customers',{
                params: {
                    conditionsStr: 'companyId::=::' + this.companyId + '$customerName::like::' + this.customerName + '$customerLogin::like::' + this.customerLogin,
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
			    this.customerName = '';
				this.customerLogin = '';
				this.selectedCompanyIds = [];
                this.selectedCompanyNames = [];
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
				 //$('#editCustomerModal').modal('hide');
            },
            //从page组件传递过来的当前page
            pageChange (page) {
                this.currentPage = page
                this.getList()
            },
			//处理删除
			handleDelete(id){
			         $('#deleteConfirmModel').modal('hide');
					 this.$http.delete('/customer/' + id,{
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
			deleteCustomer(item){
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
		      this.form.customerName = this.model.customerName;
			  this.form.mobileNumber = this.model.mobileNumber;
              this.form.customerType = this.model.customerType;
			  this.form.status = this.model.status;
		    },
		    formatterDate(cellValue){
                return formatDate(cellValue);
            },
			changeStatus(cellValue){
			    var stauts = cellValue;
			    if(cellValue == '0'){
				    stauts = '<span class="badge badge-info"> 正常 </span>';
				}else if(cellValue == '1'){
				    stauts = '<span class="badge badge-danger"> 注销 </span>';
				}
                return stauts;
            },
			changeType(cellValue){
			    var type = cellValue;
			    if(cellValue == '0'){
				    type = '<span > 普通用户 </span>';
				}else if(cellValue == '1'){
				    type = '<span > 公司主用户 </span>';
				}
                return type;
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
            deleteSelectedCompany(name,index){
                   this.selectedCompanyIds.splice(index,1);
                   this.selectedCompanyNames.splice(index,1);
            }
        },
		beforeCreate(){

		},
        beforeMount(){
           if(this.companyId != 'undefined' && this.companyId != undefined){
                this.selectedCompanyIds.push(this.companyId);
           }
           if(this.companyName != 'undefined' && this.companyName != undefined){
                this.selectedCompanyNames.push(this.companyName);
           }

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
