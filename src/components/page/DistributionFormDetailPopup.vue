<template>


                                            <!-- /.modal -->
                                            <div class="modal fade" id="distributionFormDetailModel" tabindex="-1" role="dialog" aria-hidden="true">
                                                <div class="modal-dialog modal-full">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
															<h4 class="modal-title" v-show="!loadingPopupData"> 
															配送单号 : <b>{{formNumber}}</b> -- 共 {{orderQuantity}} 份订单
															
														 <button type="submit" class="btn green" @click="handleExportToExcel" :disabled="exportProgress">
                                                               <span id="saveCustomerAction" v-show="!exportProgress"> 导出EXCEL</span>
															   <span id="saveCustomerAction" v-show="exportProgress"> 导出中 ......</span>
                                                         </button>
															</h4> 
                                                            <h4 class="modal-title" v-show="loadingPopupData"> 数据加载中 ... ...</h4>
                                                        </div>
                                           <div class="modal-body">             
                                                    <div class="portlet-body form">
                                                            
                                <div class="form-group">
                                                    <div v-show="!loadingPopupData">
															 <div class="row form-group" >
                                                                    <label class="col-md-1 control-label">公司名:</label>
                                                                    <div class="col-md-2">
                                                                          <div class="input-icon right">
																		   {{companyName}}
                                                                          </div>
                                                                    </div>
																	<label class="col-md-1 control-label">公司地址:</label>
                                                                    <div class="col-md-3">
                                                                          <div class="input-icon right">
																		   {{companyAddress}}
                                                                          </div>
                                                                    </div>
																	<label class="col-md-1 control-label">配送员:</label>
                                                                    <div class="col-md-1">
                                                                          <div class="input-icon right">
																		   {{distributerName}}
                                                                          </div>
                                                                    </div>
																	<label class="col-md-1 control-label">送达时间:</label>
                                                                    <div class="col-md-2">
                                                                          <div class="input-icon right">
																		   {{formatMintuesDate(lastArriveTime)}}
                                                                          </div>
                                                                    </div>
                                                              </div>

                                                    </div>
                                </div>

                                <div class="row distributform-full-page" v-show="!loadingPopupData">
                                    <div class="col-xs-12">
                                        <table class="table table-striped table-hover">
                                              <thead>
                                                        <tr>
                                                            <th style="width:5%;"> 序号 </th>
                                                            <th style="width:10%;"> 订单号 

                                                            </th>
                                                            <th style="width:10%;"> 就餐日期 </th>
														    <th style="width:10%;"> 下单人 </th>
                                                            <th style="width:10%;"> 手机</th>
                                                            <th style="width:30%;"> 订单详细 </th>
                                                            <th style="width:25%;"> 备注 </th>
                                                        </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(item,index) in orderItems">
												    <td style="width:5%;"> {{Number(index + 1) }}
													</td>
                                                    <td style="width:10%;word-wrap:break-word;word-break:break-all;"> 
                                                    {{item.orderNumber}} 
                                                    </td>
												    <td style="width:10%;word-wrap:break-word;word-break:break-all;"> 
                                                    {{formatNormalDate(item.lunchTime)}} 
                                                    </td>
													<td style="width:10%;word-wrap:break-word;word-break:break-all;"> 
                                                    {{item.customerName}} 
                                                    </td>
												    <td style="width:10%;word-wrap:break-word;word-break:break-all;"> 
                                                    {{item.customerMobile}} 
                                                    </td>
												    <td style="width:30%;word-wrap:break-word;word-break:break-all;"> 
                                                    {{item.content}} 
                                                    </td>
												    <td style="width:25%;word-wrap:break-word;word-break:break-all;"> 
                                                    {{item.remark}} 
                                                    </td>
                                                </tr> 
                                            </tbody>

                                        </table>
                                    </div>
                                </div>

                
                                                       </div>
                                                    </div>
														
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn dark btn-outline" data-dismiss="modal"> 关闭 </button>
                                                        </div>
                                                    </div>
                                                    <!-- /.modal-content -->
                                                </div>
                                                <!-- /.modal-dialog -->
                                            </div>

</template>

<script>
	import {formatUnixDate,formatDate,showTip,showNotice,formatMintuesDate,formatNormalDate,getNowFormatDay} from '../../utils/common.js';
export default {
    name : 'distributionFormDetailModel',
    components: {

    },
    //通过props来接受从父组件传递过来的值
    props : {
        loadData : { 
            default : false 
        },
		distributionFormId : {
		    default : ''
		}
    },
    methods : {
            //获取数据
            getPopupDetailList () {
			    this.loadingPopupData = true; //显示加载条
				var url = '/' + this.$store.state.user.operationCenter + '/distributionForm/' + this.distributionFormId;
				this.$http.get(url,{
                params: {
                 }
                })
                .then( (res) => {
				    this.loadingPopupData = false;
                    //子组件监听到数据返回变化会自动更新DOM
					if(res.status == 200){
                        this.orderItems = res.data.content.orders;
						this.companyName = res.data.content.companyName;
						this.companyAddress = res.data.content.companyAddress;
						this.formNumber = res.data.content.formNumber;
						this.lastArriveTime = res.data.content.lastArriveTime;
						this.distributerName = res.data.content.distributerName;
						this.orderQuantity = this.orderItems.length;
                    }
                }, (response) => {
                     //showTip("Error","远程获取数据错误！");
					 showNotice('warning','Error!','远程获取数据错误,请检查网络!');
                     //this.loadingPopupData = false;
                     //error callback
                });
            },
			handleExportToExcel(){
			    this.exportProgress = true;
                var self = this;
				var url = '/' + this.$store.state.user.operationCenter + '/distributionForm/export/' + this.distributionFormId;
                self.$http.get(url,{
                    params: {
                    },
                    responseType: 'arraybuffer'
                })
				.then( (res) => {
				    this.exportProgress = false;
                    //子组件监听到数据返回变化会自动更新DOM
					if(res.status == 200){
                      //创建一个blob对象,file的一种
                      let blob = new Blob([res.data], { type: 'application/x-xls' })
                      let link = document.createElement('a')
                      link.href = window.URL.createObjectURL(blob)
                      link.download = this.formNumber + '.xls'
                      link.click()
                    }
                }, (response) => {
				     this.exportProgress = false;
					 showNotice('warning','Error!','远程获取数据错误,请检查网络!');
                     //error callback
                });
            },
			formatNormalDate(cell){
			   return formatNormalDate(cell);
			},
			formatMintuesDate(cell){
			   return formatMintuesDate(cell);
			}
    },
    computed : {
        
    },
    data () {
        return {
           loadingPopupData:this.loadData,
		   distributionFormId:'',
           orderItems : [],
		   formNumber : '',
		   companyName : '',
		   companyAddress : '',
		   lastArriveTime : '',
		   distributerName : '',
		   orderQuantity : 0,
		   exportProgress: false
        }
    },
	beforeMount(){
	   
    },
    watch : {

    }
}
</script>

<style>
.distributform-full-page {
  overflow-x: hidden;
  padding: 20px;
  height:400px;
  margin-bottom: 20px;
  background-color: #fafafa !important; }

</style>
