<template>
                                   <!-- BEGIN FORM-->
                                   
                                            <!-- /.modal -->
                                            <div class="modal fade bs-modal-lg" id="showOperationLogModal" tabindex="-1" role="dialog" aria-hidden="true">
                                                <div class="modal-dialog modal-lg">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                                                            <h4 class="modal-title"> 操作人 -- {{model.operationUser}} </h4>
                                                        </div>
                                                        <div class="modal-body"> 
                                                    <div class="portlet-body form">
                                                            <div class="form-body">
															    <div class="row form-group" >
                                                                    <label class="col-md-1 control-label">时间:</label>
                                                                    <div class="col-md-9">
                                                                          <div class="input-icon right">
																		  {{formatMintuesDate(model.createTime)}}
                                                                          </div>
                                                                    </div>
                                                                </div>
											
															     <div class="row form-group" >
                                                                    <label class="col-md-1 control-label">URL:</label>
                                                                    <div class="col-md-9">
                                                                          <div class="input-icon right">
																		  {{model.operationUrl}}
                                                                          </div>
                                                                    </div>
                                                                </div>
																
															    <div class="row form-group" >
                                                                    <label class="col-md-1 control-label">参数:</label>
                                                                    <div class="col-md-9">
                                                                          <div class="input-icon right">
																		  {{model.requestParameters}}
                                                                          </div>
                                                                    </div>
                                                                </div>
																
															    <div class="row form-group" >
                                                                    <label class="col-md-1 control-label">返回:</label>
                                                                    <div class="col-md-9">
                                                                          <div class="input-icon right">
																		  {{model.operationReturn}}
                                                                          </div>
                                                                    </div>
                                                                </div>
																
															    <div class="row form-group" >
                                                                    <label class="col-md-1 control-label">异常:</label>
                                                                    <div class="col-md-9">
                                                                          <div class="input-icon right">
																		  {{model.operationException}}
                                                                          </div>
                                                                    </div>
                                                                </div>
															
                                                            </div>

                                                        <!-- END FORM-->
                                                    </div>
														</div>
                                                        <div class="modal-footer">
														   
                                                            <button type="button" class="btn dark btn-outline" data-dismiss="modal" @click="handleClose"> 关闭 </button>

                                                        </div>
                                                    </div>
                                                    <!-- /.modal-content -->
                                                </div>
                                                <!-- /.modal-dialog -->
                                            </div>
           
</template>

<script>
import operationLog from '../models/operationLog';
import {formatMintuesDate} from '../../utils/common.js';
export default {
    name : 'showOperationLogModal',
    //通过props来接受从父组件传递过来的值
    props : {
        model : { 
            default : null
        },
	    viewType : { 
            default : false
        },
		addType : { 
            default : false
        }
    },
    methods : {
		    formatMintuesDate(cellValue){
                return formatMintuesDate(cellValue);
            }
    },
    computed : {
        
    },
    data () {
        return {
           model:null,
		   viewType: false, //为true显示 view模式，如果为false 则为编辑模式
		   addType: false //为true显示 add模式
        }
    },
	beforeMount(){

    },
    watch : {
    }
}
</script>

<style scoped>
.emptyInput {
  border-style:none;
  background-color:#fff;
}
</style>
