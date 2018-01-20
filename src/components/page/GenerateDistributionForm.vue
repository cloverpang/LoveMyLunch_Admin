<template>
                                            <div id="generateDistributionForm" class="modal fade" tabindex="-1" role="dialog" v-bind:aria-labelledby="modalId" aria-hidden="true" style="padding-top:200px;">
                                                <div class="modal-dialog">
                                                    <div class="modal-content">
													    <div class="modal-header">
                                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                                                            <h4 class="modal-title">手工生成配送单</h4>
                                                        </div>
                                                        <div class="modal-body">
														      <div class="form-body">
															<form id="form" class="form-horizontal">
                                                                <div class="row">
															      <div class="form-group">
                                                                    <label class="col-md-3 control-label">选择日期 </label>

                                                                    <div class="col-md-6">                                                            
                                                                     <datepicker v-model="generateDate" class="picker"></datepicker>
                                                                    </div>
                                                                 </div>
															  </div>
                                                           </form>
                                                           </div>
                                                        </div>
                                                        <div class="modal-footer">
														    <span v-show="!generateProgress">{{tipMessage}}</span>
														    <span v-show="generateProgress"><img src="../../../static/img/ajax-loader.gif"> 正在生成...</span>
                                                            <button class="btn default" data-dismiss="modal" aria-hidden="true">关闭</button>
                                                            <button class="btn blue" @click="generateDistributionForm()" :disabled="generateProgress">生成</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
</template>



<script>
import {formatUnixDate,formatDate,showTip,showNotice,formatMintuesDate,formatNormalDate,getNowFormatDay} from '../../utils/common.js';
export default {
    name : 'confirmModal',
	components: {
		  datepicker
    },
    //通过props来接受从父组件传递过来的值
    props : {

    },
    methods : {
        generateDistributionForm () {
		   this.generateProgress = true;
		   //alert(this.generateDate);
		    var url = '/' + this.$store.state.user.operationCenter + '/distributionForm/generate/' + this.generateDate;
		   	this.$http.put(url,{
            })
			.then( (res) => {
               //子组件监听到数据返回变化会自动更新DOM
				if(res.status == 200){
				   this.generateProgress = false;
				   this.showTipMessage = true;
				   this.generateQuantity = res.data.content;
				   if(this.generateQuantity == 0){
				      this.tipMessage = "没有配送单生成";
				   }else{
				      this.tipMessage = "已生成 " + this.generateQuantity + " 份配送单,请关闭此窗口返回刷新 ";
				   }
				   //$('#generateDistributionForm').modal('hide');
                   //showNotice('success','Success!','标记成功!');					
				   //this.getList();
                 }
               }, (response) => {
			        this.generateProgress = false;
                  //showNotice('warning','Error!','远程数据操作失败,请检查网络!');
            }); 
        }
    },
    computed : {

    },
    data () {
        return {
		    generateDate : getNowFormatDay(),
			generateQuantity : 0,
			generateProgress : false,
			tipMessage : ''
        }
    },
    watch : {
    }
}
</script>

<style scoped>

</style>
