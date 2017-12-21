<template>
                                            <!-- /.modal -->
                                            <div class="modal fade bs-modal-lg" id="editCompanyModal" tabindex="-1" role="dialog" aria-hidden="true">
                                                <div class="modal-dialog modal-lg">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                                                            <h4 class="modal-title"> {{model.companyName}} </h4>
                                                        </div>
                                                        <div class="modal-body"> 
                                                    <div class="portlet-body form">
                                                        <!-- BEGIN FORM-->
                                                        <form class="form-horizontal">
                                                            <div class="form-body">
                                                                <div class="form-group">
                                                                    <label class="col-md-3 control-label">公司名称</label>
                                                                    <div class="col-md-6">
                                                                        <input type="text" class="form-control input-circle" placeholder="公司名称" v-model="form.companyName">
                                                                    </div>
                                                                </div>
                                                                <div class="form-group">
                                                                    <label class="col-md-3 control-label">公司代码</label>
                                                                    <div class="col-md-6">
                                                                        <input type="text" class="form-control input-circle" placeholder="公司代码" v-model="form.companyCode"> 
                                                                    </div>
                                                                </div>


																
                                                                <div class="form-group last">
                                                                    <label class="col-md-3 control-label">Note:</label>
                                                                    <div class="col-md-6">
                                                                        <span class="form-control-static">  </span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </form>
                                                        <!-- END FORM-->
                                                    </div>
														</div>
                                                        <div class="modal-footer">
														    <button type="button" class="btn blue"><i class="fa fa-pencil"></i> 编辑 </button>
                                                            <button type="button" class="btn dark btn-outline" data-dismiss="modal"> 关闭 </button>
                                                            <button type="button" class="btn green"  @click="handleSave(model)">
															 保存 <span id="saveCompanyAction" v-show="actionLoadingDot">.</span>
															</button>
                                                        </div>
                                                    </div>
                                                    <!-- /.modal-content -->
                                                </div>
                                                <!-- /.modal-dialog -->
                                            </div>
</template>

<script>
import company from '../models/company';
import {showNotice,actionLoading} from '../../utils/common.js';
export default {
    name : 'editCompanyModal',
    //通过props来接受从父组件传递过来的值
    props : {
        model : { 
            default : company
        },
        form : { 
            default : company
        },
    },
    methods : {
        handleSave (model) {
		        actionLoading('saveCompanyAction');
		        this.actionLoadingDot = true;
                //父组件通过handleSave方法来处理该请求
                //this.$emit('handleSave', this.model);
				 
				//提交到API处理
				this.setModel();
				this.$http.put('/company',this.model)
				.then( (res) => {
				if(res.status == 200){
                     showNotice('success','Success!','修改成功!');					
				     this.actionLoadingDot = false;
			         $('#editCompanyModal').modal('hide');
                 }
                }, (response) => {
				     this.actionLoadingDot = false;
                     showNotice('warning','Error!','远程数据操作失败,请检查网络!');
                });
        },
		setModel(){
			this.model.companyName = this.form.companyName;
			this.model.companyCode = this.form.companyCode;
		}
    },
    computed : {
    },
    data () {
        return {
           model:company,
		   actionLoadingDot:false,
		   form:company
        }
    },
	beforeMount(){
        this.actionLoadingDot = false;
    },
    watch : {
    }
}
</script>
