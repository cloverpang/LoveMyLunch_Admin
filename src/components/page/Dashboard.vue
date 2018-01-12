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
                            <h1>统计
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
                                <i class="fa fa-circle"> </i> 统计 
                            </li>
                            <li>

                            </li>
                        </ul>
                        <!-- END PAGE BREADCRUMBS -->
                        <!-- BEGIN PAGE CONTENT INNER -->
                        <div class="page-content-inner">
						
                            <div class="row">
                                <div class="col-md-12" v-show="!summaryLoadDone">
								               <div class="panel panel-default">
                                                    <div class="panel-body"> 
                                                        <img src="../../../static/img/loading.gif"> 汇总数据加载中...
													</div>
                                                </div>
                                </div>
								
                                <div class="col-md-12" v-show="!orderChartLoadDone">
								               <div class="panel panel-default">
                                                    <div class="panel-body"> 
                                                        <img src="../../../static/img/loading.gif"> 订单图表加载中...
													</div>
                                                </div>
                                </div>
								
                                <div class="col-md-12" v-show="!customerChartLoadDone">
								               <div class="panel panel-default">
                                                    <div class="panel-body"> 
                                                        <img src="../../../static/img/loading.gif"> 用户图表加载中...
													</div>
                                                </div>
                                </div>
                            </div>
 
                            <div class="row" v-show="summaryLoadDone">
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 margin-bottom-10">
                                    <div class="dashboard-stat blue">
                                        <div class="visual">
                                            <i class="fa fa-briefcase fa-icon-medium"></i>
                                        </div>
                                        <div class="details">
                                            <div class="number"> RMB {{totalIncome}} </div>
                                            <div class="desc"> 总订单应收 </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="dashboard-stat red">
                                        <div class="visual">
                                            <i class="fa fa-shopping-cart"></i>
                                        </div>
                                        <div class="details">
                                            <div class="number"> {{orderQuantity}} </div>
                                            <div class="desc"> 订单数 </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
							
                            <div class="row" v-show="summaryLoadDone">
                                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 margin-bottom-10">
                                    <div class="dashboard-stat blue">
                                        <div class="visual">
                                            <i class="fa fa-briefcase fa-icon-medium"></i>
                                        </div>
                                        <div class="details">
                                            <div class="number"> {{dishQuantity}} </div>
                                            <div class="desc"> 菜品数 </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                    <div class="dashboard-stat green">
                                        <div class="visual">
                                            <i class="fa fa-group fa-icon-medium"></i>
                                        </div>
                                        <div class="details">
                                            <div class="number"> RMB {{averageOrderPrice}} </div>
                                            <div class="desc"> 平均单价 </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                    <div class="dashboard-stat red">
                                        <div class="visual">
                                            <i class="fa fa-shopping-cart"></i>
                                        </div>
                                        <div class="details">
                                            <div class="number"> {{companyQuantity}} </div>
                                            <div class="desc"> 客户公司数 </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                    <div class="dashboard-stat green">
                                        <div class="visual">
                                            <i class="fa fa-group fa-icon-medium"></i>
                                        </div>
                                        <div class="details">
                                            <div class="number"> {{customerQuantity}} </div>
                                            <div class="desc"> 用户数 </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
							
                            <div class="row">
                                <div class="col-md-12">
								               <div class="panel panel-primary">
                                                    <div class="panel-heading">
                                                        <h3 class="panel-title">选择日期范围</h3>
                                                    </div>
                                                    <div class="panel-body form"> 
													
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
                                                                        <button type="button" class="btn btn-circle red" @click="generateNewChart" :disabled="actionProgress"> 
																		生成图表 <span id="searchAction" v-show="actionProgress">......</span>
																		</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                        <!-- END FORM-->
																 
													</div>
                                                </div>
                                </div>
                            </div>
							
							
                            <div class="row" v-show="orderChartLoadDone">
                                <div class="col-md-12">
                                    <!-- BEGIN Portlet PORTLET-->
                                    <div class="panel panel-primary">

										
										<div class="panel-body">

										<div id="chartContainer" style="min-width: 310px; height: 400px; margin: 0 auto">
										    <highcharts-component ref="orderChart"></highcharts-component>
										</div>
										
                                        </div>
										
                                    </div>
                                    <!-- END Portlet PORTLET-->
                                </div>
                            </div>
							
							
                            <div class="row" v-show="customerChartLoadDone">
                                <div class="col-md-12">
                                    <!-- BEGIN Portlet PORTLET-->
                                    <div class="panel panel-primary">

										
										<div class="panel-body">

										<div id="chartContainer" style="min-width: 310px; height: 400px; margin: 0 auto">
										    <highcharts-component ref="customerChart"></highcharts-component>
										</div>
										
                                        </div>
										
                                    </div>
                                    <!-- END Portlet PORTLET-->
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
	import {formatUnixDate,formatDate,showTip,showNotice,formatMintuesDate,formatNormalDate,getNowFormatDay} from '../../utils/common.js';

    import Highcharts from 'highcharts/highstock';
    import HighchartsMore from 'highcharts/highcharts-more';
    import HighchartsDrilldown from 'highcharts/modules/drilldown';
    import Highcharts3D from 'highcharts/highcharts-3d';
    HighchartsMore(Highcharts)
    HighchartsDrilldown(Highcharts);
    Highcharts3D(Highcharts);
	
	import HighchartsComponent from './../Common/HighchartsComponent.vue';
	
    export default {
        components: {
		    HighchartsComponent,datepicker
        },
        data () {
            return {
			   loadingSummaryProgrss : false,
			   loadingOrderChartProgrss : false,
			   loadingCustomerChartProgrss : false,
			   
			   dishQuantity : 0,
			   orderQuantity : 0,
			   companyQuantity : 0,
			   customerQuantity : 0,
			   averageOrderPrice : 0,
			   totalIncome : 0,
			   
			   startDate : '',
			   endDate : getNowFormatDay(),
			   actionProgress : false,
			   
			   summaryLoadDone : false,
			   orderChartLoadDone : false,
			   customerChartLoadDone : false
		   }
        },
        methods:{
		   loadDashboardSummary(){
		        this.loadingSummaryProgrss = true;
				this.$http.get('/dashboard/summary',{
                params: {
                 }
                })
                .then( (res) => {
				    this.loadingSummaryProgrss = false;
                    //子组件监听到数据返回变化会自动更新DOM
					if(res.status == 200){
                        this.dishQuantity = res.data.content.dishQuantity;
						this.orderQuantity = res.data.content.orderQuantity;
						this.companyQuantity = res.data.content.companyQuantity;
						this.customerQuantity = res.data.content.customerQuantity;
						this.averageOrderPrice = res.data.content.averageOrderPrice;
						this.totalIncome = res.data.content.totalIncome;
						
						this.summaryLoadDone = true;
                    }
                }, (response) => {
                     //showTip("Error","远程获取数据错误！");
					 showNotice('warning','Error!','远程获取数据错误,请检查网络!');
                     //this.loadingSummaryProgrss = false;
                     //error callback
                });
		   
		   },
		   generateOrderChart(){
		        this.loadingOrderChartProgrss = true;
				var url = '/dashboard/order/chart' + "?startDate=" + this.startDate + "&endDate=" + this.endDate;
				this.$http.get(url,{
                params: {
                 }
                })
                .then( (res) => {
				    this.loadingOrderChartProgrss = false;
					this.actionProgress = false;
                    //子组件监听到数据返回变化会自动更新DOM
					if(res.status == 200){
                        this.$refs.orderChart.chartType = 'column';
						this.$refs.orderChart.chartYAxisTilte = '订单数量';
						this.$refs.orderChart.chartSeriesTile = '数量';
						this.$refs.orderChart.chartLineColor = '#4B77BE';
						this.$refs.orderChart.chartSeriesColor = '#4B77BE';
						this.$refs.orderChart.chartTitle = "订单走势图 日期 : " + this.startDate + " to " + this.endDate;
						this.$refs.orderChart.chartAxisTitle = res.data.content.titles;
						this.$refs.orderChart.chartData = res.data.content.datas;

						this.$refs.orderChart.initChart();
						
						this.orderChartLoadDone = true;
                    }
                }, (response) => {
                     //showTip("Error","远程获取数据错误！");
					 showNotice('warning','Error!','远程获取数据错误,请检查网络!');
					 this.actionProgress = false;
                     this.loadingOrderChartProgrss = false;
                     //error callback
                });
		   },
		   generateCustomerChart(){
		        this.loadingCustomerChartProgrss = true;
				var url = '/dashboard/customer/chart' + "?startDate=" + this.startDate + "&endDate=" + this.endDate;
				this.$http.get(url,{
                params: {
                 }
                })
                .then( (res) => {
				    this.loadingCustomerChartProgrss = false;
					this.actionProgress = false;
                    //子组件监听到数据返回变化会自动更新DOM
					if(res.status == 200){
                        this.$refs.customerChart.chartType = 'column';
						this.$refs.customerChart.chartYAxisTilte = '用户数量';
						this.$refs.customerChart.chartSeriesTile = '数量';
						this.$refs.customerChart.chartLineColor = '#4B77BE';
						this.$refs.customerChart.chartSeriesColor = '#4B77BE';
						this.$refs.customerChart.chartTitle = "用户增长图 日期 : " + this.startDate + " to " + this.endDate;
						this.$refs.customerChart.chartAxisTitle = res.data.content.titles;
						this.$refs.customerChart.chartData = res.data.content.datas;

						this.$refs.customerChart.initChart();
						
						this.customerChartLoadDone = true;
                    }
                }, (response) => {
                     //showTip("Error","远程获取数据错误！");
					 showNotice('warning','Error!','远程获取数据错误,请检查网络!');
                     this.loadingCustomerChartProgrss = false;
					 this.actionProgress = false;
                     //error callback
                });
		   },
		   generateNewChart(){
		      this.actionProgress = true;
			  this.generateOrderChart();
			  this.generateCustomerChart();
		   },
		   getTenDaysBeforeDate(){
                var date = new Date();
	            date.setTime(date.getTime()-10*24*60*60*1000);
	
                var seperator1 = "-";
                var seperator2 = ":";
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                     month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                   strDate = "0" + strDate;
                }
                var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
                 return currentdate;
		   }
		},
        beforeMount(){
			this.startDate = this.getTenDaysBeforeDate();
		
            this.loadDashboardSummary();
			this.generateOrderChart();
			this.generateCustomerChart();
			
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

