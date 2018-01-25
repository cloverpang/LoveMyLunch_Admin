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
                            <h1>菜品预定汇总  {{startDate}} - {{endDate}} {{type}}
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
                                <span>汇总</span>
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
                                                            <i class="fa fa-search"></i> 汇总 (按照进餐时间汇总)</div>
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
																		生成汇总<span id="searchAction" v-show="actionProgress">......</span>
																		</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                        <!-- END FORM-->
                                                    </div>
                                                </div>
												
                                    <!-- END search from -->
									<!-- BEGIN SAMPLE TABLE PORTLET-->
									<template v-if="!count">
									            <div class="panel panel-default">
                                                    <div class="panel-body">
													 
                                                                 <div class="form-group">


																	<div class="col-md-6 control-label">
                                                                       <h1 class="" style="color:#333333;"><b>该时间段内尚无订单数据!</b></h1>
                                                                    </div>
																	
 

                                                                 </div>
													 
													</div>
                                                </div>
									</template>
												
                                                <div class="panel panel-default" v-for="(item,index) in items" :id="item.orderId">
                                                    <div class="panel-body">
													 
                                                                 <div class="form-group">
                                                                    <div class="col-md-3 control-label">
																	<img :src="item.dishImageSmall" style="width:160px;height:160px;"/>
																	</div>

																	<div class="col-md-3 control-label">
                                                                       <h1 class="" style="color:#333333;"><b>{{item.dishName}}</b></h1>
                                                                    </div>
																	
                                                                    <div class="col-md-3 control-label">    
                                                                       <h1 class="" style="color:#333333;"><b>{{item.dishQuantity}}</b>份</h1>																	
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
    import {APIDOMAIN} from '../../vuex/types.js';
	import vConfirmModal from './../Common/confirmModal';

	import {formatUnixDate,formatDate,showTip,showNotice,formatMintuesDate,formatNormalDate,getNowFormatDay,getTomorrowFormatDay} from '../../utils/common.js';
    export default {
        components: {
		    vConfirmModal,datepicker
        },
        data () {
            return {
			    progressBar: false, //显示加载条
				actionProgress: false, //
                count : 0, //总记录数
                items : [],
			    startDate : this.getTomorrowFormatDay(),
                endDate : this.getTomorrowFormatDay(),
				type : this.$route.query.type
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
			  	 this.startDate = this.getTomorrowFormatDay();
				 this.endDate = this.getTomorrowFormatDay();
				 this.getList();
			  }
            },
            //获取数据
            getList () {
			    //this.progressBar = true; //显示加载条
				
				if(this.startDate == '' || this.endDate == ''){
				   showNotice('warning','Error!','查询汇总必须选择日期!');
				   return;
				}
				
				this.$loading('数据加载中 ...');
				var url = '/' + this.$store.state.user.operationCenter + '/summary?startDate=' + this.startDate + '&endDate=' + this.endDate;
				this.$http.get(url,{
                params: {
                 }
                })
                .then( (res) => {
				    this.actionProgress = false;
				    //this.progressBar = false;
					this.$loading.end();
                    //子组件监听到数据返回变化会自动更新DOM
					if(res.status == 200){
                        this.count = res.data.content.length;
                        this.items = res.data.content;
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
			getTomorrowFormatDay() {
			    return getTomorrowFormatDay();
            },
			formatterDate(cellValue){
                return formatDate(cellValue);
            },
			formatMintuesDate(cellValue){
                return formatMintuesDate(cellValue);
            },
			handleSearch(){
                this.getList();
            },
			refresh(){
                this.getList();
            },
			handleReload(){
                this.getList();
            },
			handleCancelSearch(){
                this.getList();
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
