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
                            <h1>配送员
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
                                <span> 配送员 </span>
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
                                                                    <label class="col-md-1 control-label">姓名</label>
                                                                    <div class="col-md-3">
                                                                        <input id="distributerName" name="distributerName" type="text" class="form-control input-circle" placeholder=""  v-model="distributerName">
                                                                    </div>
                                                                    <label class="col-md-1 control-label">状态</label>
                                                                    <div class="col-md-3">
                                                                        	  <select v-model="statusSelected" class="form-control input-circle" style="color:#000000;display:inline;">
                                                                                       <option v-for="option in statusOptions" v-model="option.value" v-bind:value="option.value">
                                                                                       {{ option.text }}
                                                                                       </option>
                                                                              </select> 
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
                                            <vPageInfo :currentPage="currentPage" :totalPages="totalPages" :count="count" :selected="pageSelected" :options="pageOptions"  @handleChange="handleChange"></vPageInfo>

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
                                                            <a data-toggle="modal" href="#editDistributerModal" class="btn btn-outline dark" @click="showAddModel()" v-if="$_has('component_distributer_add')"> 
															    添加新的配送员
                                                                <i class="fa fa-plus"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="btn-group pull-right">

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                           <div class="mt-element-card mt-card-round mt-element-overlay">
                                               <tableDataLoadingProgress v-show="progressBar"></tableDataLoadingProgress>

                                               <div class="row">
                                                    <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12" v-for="(item,index) in items" :id="item.dishId">
                                                        <div class="mt-card-item">
                                                            <div class="mt-card-avatar mt-overlay-1">
                                                                <img :src="item.photoPath" />
                                                                <div class="mt-overlay">
                                                                    <ul class="mt-info">
                                                                        <li>
                                                                            <a class="btn default btn-outline" data-toggle="modal" href="#editDistributerModal" @click="showEditModel(item,false)">
                                                                                <i class="icon-magnifier"></i>
                                                                            </a>
                                                                        </li>
                                                                        <li v-if="showEditButton">
                                                                           <a class="btn default btn-outline" data-toggle="modal" href="#editDistributerModal" @click="showEditModel(item,true)">
                                                                                <i class="icon-link"></i>
                                                                            </a>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div class="mt-card-content">
                                                                <h3 class="mt-card-name"><a data-toggle="modal" href="#editDistributerModal" @click="showEditModel(item,false)">{{item.distributerName}}</a> </h3>
                                                                <span class="mt-card-desc font-grey-mint" v-html='changeStatus(item.status)' style="padding-right:5px;"></span> 
                                                                <span class="badge badge-info"> {{item.distributerTimes}}  </span>
																<span> {{item.mobile}} </span>
                                                                <div class="mt-card-social">
                                                                    <ul>
                                                                        <li v-if="showEditButton">
                                                                            <a data-toggle="modal" href="#editDistributerModal" @click="showEditModel(item,true)">
                                                                                <i class="fa fa-pencil"></i>
                                                                            </a>
                                                                        </li>
                                                                        <li v-if="showDeleteButton">
                                                                            <a data-toggle="modal" href="#deleteConfirmModel" @click="deleteDistributer(item)">
                                                                                <i class="fa fa-times"></i>
                                                                            </a>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                               </div>
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

        <vDistributerEdit :model=model :form=form :viewType=viewType :statusOptions=statusOptions :addType=addType @handleSave="handleSaveProduct" @refresh="refresh"></vDistributerEdit>
											
		<vConfirmModal :confirmMessage="'确定删除 '" :modalId="'deleteConfirmModel'" :itemId="model.distributerId" :itemName="model.distributerName" @handleConfirm="handleDelete"></vConfirmModal>
            <!-- END CONTENT -->	
        </div>
        <!-- END CONTAINER -->
</template>

<script>
    import distributer from '../models/distributer';
    import {APIDOMAIN} from '../../vuex/types.js';
	import vMoPaging from './../Common/Paging';
    import vPageInfo from './../Common/PageInfo';
    import vPageSort from './../Common/PageSort';
	import vConfirmModal from './../Common/confirmModal';
    import tableDataLoadingProgress from './../Common/TableDataLoadingProgress';
	
	import vDistributerEdit from './DistributerEdit';
	import {formatUnixDate,formatDate,showTip,showNotice,checkPermission} from '../../utils/common.js';
    export default {
        components: {
		    vMoPaging,vPageInfo,vPageSort,vConfirmModal,vDistributerEdit,tableDataLoadingProgress
        },
        data () {
            return {
			    progressBar: true, //显示加载条
				actionProgress: false, //
			    distributerName: '',
				customerLogin: '',
				sortColumn: '',
				sortType: '',
				pageSelected: '8',
				pageOptions: [
				   { text: ' 8 ', value: '8' },
                   { text: ' 12 ', value: '12' },
				   { text: ' 16 ', value: '16' }
                ],
                statusSelected: '',
                statusOptions: [
				   { text: ' 正常 ', value: '0' },
                   { text: ' 已注销 ', value: '1' }
                ],
                pageSize : 8 , //每页显示30条数据
                currentPage : 1, //当前页码
				totalPages : 0,//总页数
                count : 0, //总记录数
                items : [],
				model:distributer,
				form:distributer,
		        form: {
                    distributerId: '',
                    distributerName: '',
                    mobile: '',
		            photoPath: '',
                    status: 0,
					distributerTimes: 0,
                    createTime: ""
                },
				viewType:false,
				addType:false,
				showEditButton : checkPermission('component_distributer_update'),
				showDeleteButton : checkPermission('component_distributer_delete')
            }
        },
        methods:{
            //获取数据
            getList () {
			    this.progressBar = true; //显示加载条
				var url = '/' + this.$store.state.user.operationCenter + '/distributers';
				this.$http.get(url,{
                params: {
                    conditionsStr: 'distributerName::like::' + this.distributerName + '$status::=::' + this.statusSelected,
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
			    this.distributerName = ''; 
                this.statusSelected = '';
				this.sortColumn = '';
				this.sortType = '';
                this.getList();
            },
			handleCancelSearch(){
			    this.distributerName = '';
                this.statusSelected = '';
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
			handleSaveProduct(model){
				 //$('#editDistributerModal').modal('hide');
            },
            //从page组件传递过来的当前page
            pageChange (page) {
                this.currentPage = page
                this.getList()
            },
			//处理删除
			handleDelete(id){
			         $('#deleteConfirmModel').modal('hide');
					 var url = '/' + this.$store.state.user.operationCenter + '/distributer/' + id;
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
			deleteDistributer(item){
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
                this.form.distributerId = this.model.distributerId;
			    this.form.distributerName = this.model.distributerName;
			    this.form.mobile = this.model.mobile;
			    this.form.photoPath = this.model.photoPath;
				this.form.distributerTimes = this.model.distributerTimes;
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
				    stauts = '<span class="badge badge-danger"> 已注销 </span>';
				}
                return stauts;
            }
        },
		beforeCreate(){

		},
        beforeMount(){
            this.getList();
        },
        created () {
             
        },
        watch: {

        }
    }
</script>
