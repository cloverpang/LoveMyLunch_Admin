<template>
                                   <!-- BEGIN FORM-->

                                            <!-- /.modal -->
                                            <div class="modal fade bs-modal-lg" id="companyListPopup" tabindex="-1" role="dialog" aria-hidden="true">
                                                <div class="modal-dialog modal-lg">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
															<h4 class="modal-title"> 选择公司 {{loadingPopupData}}</h4> <h4 class="modal-title" v-show="loadingPopupData"> 数据加载中 ... ... </h4>
                                                        </div>
                                                        <div class="modal-body"> 
                                                    <div class="portlet-body form">
                                                            <div class="form-body">
	
                                                            </div>

                                                        <!-- END FORM-->
                                                    </div>
														</div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn dark btn-outline" data-dismiss="modal" > 关闭 </button>
                                                            <button type="submit" class="btn green"  >
															 保存 
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
import {showNotice} from '../../utils/common.js';
export default {
    name : 'companyListPopup',
    //通过props来接受从父组件传递过来的值
    props : {

    },
    methods : {
            //获取数据
            getPopupDataList () {
			    this.loadingPopupData = true; //显示加载条
				this.$http.get('/companyExtends',{
                params: {
                    conditionsStr: '',
                    pageSize: this.pageSize,
                    page: this.currentPage,
					sortColumn: this.sortColumn,
					sortType: this.sortType
                 }
                })
                .then( (res) => {
				    this.loadingPopupData = false;
                    //子组件监听到数据返回变化会自动更新DOM
					if(res.status == 200){
                        this.count = res.data.content.totalSize;
						this.totalPages = res.data.content.totalPageNum;
                        this.items = res.data.content.item;
                    }
                }, (response) => {
                     //showTip("Error","远程获取数据错误！");
					 showNotice('warning','Error!','远程获取数据错误,请检查网络!');
                     this.loadingPopupData = false;
                     //error callback
                });
            }
    },
    computed : {
        
    },
    data () {
        return {
           model:company,
           loadingPopupData:false,
           pageSize : 10 , //每页显示10条数据
           currentPage : 1, //当前页码
		   totalPages : 0,//总页数
           count : 0, //总记录数
           items : []
        }
    },
	beforeMount(){
         if(this.loadingPopupData == true){
            this.getPopupDataList();
         }
    },
    watch : {

    }
}
</script>

<style scoped>

</style>
