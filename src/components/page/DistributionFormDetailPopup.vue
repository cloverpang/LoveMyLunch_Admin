<template>


                                            <!-- /.modal -->
                                            <div class="modal fade" id="distributionFormDetailModel" tabindex="-1" role="dialog" aria-hidden="true">
                                                <div class="modal-dialog modal-full">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
															<h4 class="modal-title" v-show="!loadingPopupData"> 配送单 -- {{formNumber}} -- {{orderQuantity}} 订单</h4> 
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
                                                                    <div class="col-md-1">
                                                                          <div class="input-icon right">
																		   {{formatMintuesDate(lastArriveTime)}}
                                                                          </div>
                                                                    </div>
                                                              </div>

                                                    </div>
                                </div>

                                <div class="row">
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
				this.$http.get('/distributionForm/' + this.distributionFormId,{
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
		   orderQuantity : 0
        }
    },
	beforeMount(){
	   
    },
    watch : {

    }
}
</script>

<style scoped>

</style>
