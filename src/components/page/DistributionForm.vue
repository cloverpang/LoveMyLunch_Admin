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
                            <h1>配送单 
							
							<a data-toggle="modal" href="#allArriveConfirmModel" class="btn dark btn-outline" v-if="$_has('component_distributionForm_mark_all_arrived')">
							标记所有配送单已到达
							</a>
							
							<a data-toggle="modal" href="#generateDistributionForm" class="btn dark btn-outline" @click="setGenerateDistributionForm" v-if="$_has('component_distributionForm_generate')">
							手工生成配送单
							</a>
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
                                <span>配送单</span>
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
                                                <table class="table table-hover" v-if="count">
                                                    <thead>
                                                        <tr>
                                                            <th style="width:5%;"> 序号 </th>
                                                            <th style="width:20%;"> 配送单单号 
															<vPageSort :sortColumn="'formNumber'" @handleSort="handleSort"></vPageSort>
                                                            </th>
                                                            <th style="width:15%;"> 公司名称
															</th>
														    <th style="width:20%;"> 配送地址
                                                            <vPageSort :sortColumn="'companyAddress'" @handleSort="handleSort"></vPageSort>
															</th>
                                                            <th style="width:15%;"> 生成时间 </th>
                                                            <th style="width:9%;"> 状态 </th>
                                                            <th style="width:8%;"> 配送员 </th>
															<th style="width:8%;"> 操作 </th>
                                                        </tr>
                                                    </thead>
													<tbody>

             <tr v-for="(item,index) in items" :id="item.distributionFormId">
                <td style="width:5%;"> {{Number(index + 1 + (currentPage-1) * selected) }}</td>
                <td style="width:20%;word-wrap:break-word;word-break:break-all;"> <a data-toggle="modal" href="#distributionFormDetailModel" @click="showDetailModel(item.distributionFormId)">{{item.formNumber}}</a> </td>
                <td style="width:15%;word-wrap:break-word;word-break:break-all;">{{item.companyName}} </td>
                <td style="width:20%;word-wrap:break-word;word-break:break-all;">{{item.companyAddress}}</td>
                <td style="width:15%;"> {{formatMintuesDate(item.createTime)}} </td>
                <td style="width:9%;"> 
				 <template v-if="item.status == '0'">
				 <a data-toggle="modal" href="#arriveConfirmModel" @click="arriveDistributionForm(item)" class="btn btn-circle btn-xs red" v-if="showMarkButton">
				 未送达<i class="fa fa-question"></i>  
				 </a>
				 </template>
			     <template v-if="item.status == '1'">
				 <span class="badge badge-info"> 已送达 </span>
				 </template>
				</td>
                <td style="width:8%;"> 
				 <template v-if="item.distributerId == '' || item.distributerId == null">
				 <a data-toggle="modal" href="#distributerListPopup" class="btn btn-circle btn-xs blue" @click="loadDistributerPopupData(item)" v-if="showSelectDistrbuterButton">
				 <i class="fa fa-pencil"></i> 分配配送员
				 </a>
				 </template>
				 <template v-if="item.distributerId != ''">
				 <span> {{item.distributerName}} </span>
				 </template>
				</td>
				<td style="width:8%;">  
			    <a data-toggle="modal" href="#deleteConfirmModel" @click="deleteDistributionForm(item)" class="btn btn-circle btn-xs dark" v-if="showDeleteButton">
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

        <vDistributerListPopup ref="distributerListPopup" :loadData=loadDistributerData :distributionFormId=model.distributionFormId @handleSelect='handleSelectDistributer'></vDistributerListPopup>
		<vGenerateDistributionForm ref="generateDistributionForm"></vGenerateDistributionForm>
		<vDistributionFormDetailPopup ref="distributionFormDetailPopup"></vDistributionFormDetailPopup>
			
		<vConfirmModal :confirmMessage="'确定删除 配送单'" :modalId="'deleteConfirmModel'" :itemId="model.distributionFormId" :itemName="model.formNumber" @handleConfirm="handleDelete"></vConfirmModal>
		<vConfirmModal :confirmMessage="'确定该配送单 已到达 - '" :modalId="'arriveConfirmModel'" :itemId="model.distributionFormId" :itemName="model.formNumber" @handleConfirm="handleArrvied"></vConfirmModal>
		<vConfirmModal :confirmMessage="'确定当前所有配送单已到达'" :modalId="'allArriveConfirmModel'"  @handleConfirm="handleAllArrvied"></vConfirmModal>
            <!-- END CONTENT -->	
        </div>
        <!-- END CONTAINER -->
</template>

<script>
    import distributionForm from '../models/distributionForm';
    import {APIDOMAIN} from '../../vuex/types.js';
    import vPageInfo from './../Common/PageInfo';
	import vConfirmModal from './../Common/confirmModal';
	
	import vDistributerListPopup from './DistributerListPopup';
	import vGenerateDistributionForm from './GenerateDistributionForm';
	import vDistributionFormDetailPopup from './DistributionFormDetailPopup';

	import {formatUnixDate,formatDate,showTip,showNotice,formatMintuesDate,formatNormalDate,getNowFormatDay,checkPermission} from '../../utils/common.js';
    export default {
        components: {
		    vPageInfo,vConfirmModal,vDistributerListPopup,vGenerateDistributionForm,vDistributionFormDetailPopup,datepicker
        },
        data () {
            return {
			    progressBar: false, //显示加载条
				actionProgress: false, //
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
				model:distributionForm,
				form:distributionForm,
				form: {
                     distributionFormId: '',
                     formNumber: '',
                     companyId: '',
		             companyName: '',
		             companyAddress: '',
		             lastArriveTime: '',
		             distributerId: '',
		             distributerName: '',
		             orderIds: '',
                     status: 0,
                     createTime: ''
                },
				viewType:false,
				addType:false,
			    startDate : this.getNowFormatDay(),
                endDate : this.getNowFormatDay(),
				loadDistributerData : false,
				showMarkButton : checkPermission('component_distributionForm_mark_arrived'),
				showSelectDistrbuterButton : checkPermission('component_distributionForm_select_dirstributer'),
				showDeleteButton : checkPermission('component_distributionForm_delete')
            }
        },
        methods:{
            //获取数据
            getList () {
			    //this.progressBar = true; //显示加载条
				
				var start_date = "";
				var end_date = "";
				
				if(this.startDate != ''){
				   start_date = this.startDate + " 00:00:00";
				}
				
				if(this.endDate != ''){
				   end_date = this.endDate + " 23:59:59";
				}

                var conditions = "";
                conditions += 'companyAddress::=::';
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
				
				this.$loading('数据加载中 ...');
				var url = '/' + this.$store.state.user.operationCenter + '/distributionForms';
				this.$http.get(url,{
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
			getNowFormatDay() {
			    return getNowFormatDay();
            },
			formatterDate(cellValue){
                return formatDate(cellValue);
            },
			formatMintuesDate(cellValue){
                return formatMintuesDate(cellValue);
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
                this.currentPage = 1;
				this.sortColumn = '';
				this.sortType = '';
                this.getList();
            },
			handleCancelSearch(){
			    this.startDate = '';
                this.endDate = '';
				this.sortColumn = '';
				this.sortType = '';
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
			         $('#deleteConfirmModel').modal('hide');
					 var url = '/' + this.$store.state.user.operationCenter + '/distributionForm/' + id;
					 this.$http.delete(url,{
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
			deleteDistributionForm(item){
			   this.model = item;
			},
			//处理标记到达
			arriveDistributionForm(item){
			   this.model = item;
			},
			showDetailModel(id){
			   //加载详细数据
			   this.$refs.distributionFormDetailPopup.loadingPopupData = true;
			   this.$refs.distributionFormDetailPopup.distributionFormId = id;
			   this.$refs.distributionFormDetailPopup.getPopupDetailList();
			},
			setForm(){
		      //this.form = this.model;
		      this.form.customerName = this.model.customerName;
			  this.form.mobileNumber = this.model.mobileNumber;
              this.form.customerType = this.model.customerType;
			  this.form.status = this.model.status;
		    },
            handleArrvied(id){
			         $('#arriveConfirmModel').modal('hide');
					 var url = '/' + this.$store.state.user.operationCenter + '/distributionForm/markArrived/' + id;
					 this.$http.put(url,{
                     })
					 .then( (res) => {
                       //子组件监听到数据返回变化会自动更新DOM
					   if(res.status == 200){
                        showNotice('success','Success!','标记成功!');					
						this.getList();
                       }
                     }, (response) => {
                        showNotice('warning','Error!','远程数据操作失败,请检查网络!');
                     });  
			},
			handleAllArrvied(){
					$('#allArriveConfirmModel').modal('hide');
					var url = '/' + this.$store.state.user.operationCenter + '/distributionForm/markAllArrived';
					 this.$http.put(url,{
                     })
					 .then( (res) => {
                       //子组件监听到数据返回变化会自动更新DOM
					   if(res.status == 200){
                        showNotice('success','Success!','标记成功!');					
						this.getList();
                       }
                     }, (response) => {
                        showNotice('warning','Error!','远程数据操作失败,请检查网络!');
                     });  
			},
			loadDistributerPopupData(item){
			   this.model = item;
			   this.loadDistributerData = true;
			   this.$refs.distributerListPopup.tipMessage = '';
			   this.$refs.distributerListPopup.selectedDistributerName = '';
			   this.$refs.distributerListPopup.selectedDistributerId = '';
			},
			handleSelectDistributer(formId,distributerId,distributerName){
			   if(distributerId != '' && distributerName != ''){
				  var url = '/' + this.$store.state.user.operationCenter + '/distributionForm/selectDistributer/' + formId;
				  var parasData = {"distributerId":distributerId,"distributerName":distributerName};
				  this.$http.put(url,parasData)
				  .then( (res) => {
				  if(res.status == 200){
				     this.actionProgress = false;
                     showNotice('success','Success!','设置成功!');	
                     this.refresh();					 
			         $('#distributerListPopup').modal('hide');
                   }
                   }, (response) => {
				     this.actionProgress = false;
                     showNotice('warning','Error!','远程数据操作失败,请检查网络!');
                  });
			   }else{
			         showNotice('warning','Warning!','您还没有选择配送员!');
			   }
			},
			setGenerateDistributionForm(){
			    this.$refs.generateDistributionForm.tipMessage = '';
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
