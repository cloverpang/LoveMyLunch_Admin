<template>


                                            <!-- /.modal -->
                                            <div class="modal fade bs-modal-lg" id="distributerListPopup" tabindex="-1" role="dialog" aria-hidden="true">
                                                <div class="modal-dialog modal-lg">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
															<h4 class="modal-title" v-show="!loadingPopupData"> 请选择配送员 <span>检索出 {{count}} 条数据</span></h4>
                                                            <h4 class="modal-title" v-show="loadingPopupData"> 数据加载中 ... ... </h4>
                                                        </div>
                                           <div class="modal-body">
                                                    <div class="portlet-body form">

                                <div class="form-group">
                                                    <div class="input-group input-medium" v-show="!loadingPopupData">
                                                        <input type="text" class="form-control" placeholder="配送员"  v-model="keyword">
                                                        <span class="input-group-btn">
                                                            <button type="submit" class="btn green" @click="handleSearchDistributer">
                                                                <i class="fa fa-search"></i>
                                                            </button>
                                                        </span>
                                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-xs-12">
                                        <table class="table table-striped table-hover">

                                            <tbody>
                                                <tr v-for="(item,index) in items">
                                                    <td style="width:90%;">
                                                     <a href="javascript:void(0);" @click="selectDistributer(item.distributerId,item.distributerName)"> {{item.distributerName}} </a>
                                                    </td>
                                                </tr>
                                            </tbody>

                                        </table>
                                    </div>
                                </div>

        <template v-if="count">
		   <vMoPaging :page-index="currentPage" :total="count" :page-size="pageSize" @change="pageChange"></vMoPaging>
        </template>


                                                       </div>
                                                    </div>

                                                        <div class="modal-footer">

															<span>
                                                <strong> {{tipMessage}} </strong></span> &nbsp; &nbsp; &nbsp; &nbsp;
                                                            <button type="button" class="btn dark btn-outline" data-dismiss="modal" @click="cleanSelect"> 关闭 </button>
                                                        </div>
                                                    </div>
                                                    <!-- /.modal-content -->
                                                </div>
                                                <!-- /.modal-dialog -->
                                            </div>

</template>

<script>
import distributer from '../models/distributer';
import vMoPaging from './../Common/Paging';
import {showNotice} from '../../utils/common.js';
export default {
    name : 'distributerListPopupForCompany',
    components: {
		    vMoPaging
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
            getPopupDataList () {
			    this.loadingPopupData = true; //显示加载条
				var url = '/' + this.$store.state.user.operationCenter + '/distributers';
				this.$http.get(url,{
                params: {
                    conditionsStr: 'distributerName::like::' + this.keyword + '$status::=::0',//只选取状态正常的配送员
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
                     //this.loadingPopupData = false;
                     //error callback
                });
            },
            //从page组件传递过来的当前page
            pageChange (page) {
                this.currentPage = page;
                this.getPopupDataList();
            },
            handleSearchDistributer(){
                this.currentPage = 1;
                this.getPopupDataList();
            },
            selectDistributer(distributerId,distributerName){
			        // this.selectedDistributerId = distributerId;
				      // this.selectedDistributerName = distributerName;

              this.$parent.form.distributerId = distributerId;
              this.$parent.form.distributerName = distributerName;

              //
				      this.tipMessage = "您的选择是 : " + distributerName;
              // $('#distributerListPopup').modal('hide');
              //this.$emit('handleSelect',distributerId,distributerName);
              $('#distributerListPopup').modal('hide');
            },
            //确定
            saveSelected(){
                //调用父组件方法
                //this.$emit('handleSelect',this.selectedDistributerId,this.selectedDistributerName);
                //$('#distributerListPopup').modal('hide');
            },
			cleanSelect(){
				this.selectedDistributerId = '';
				this.selectedDistributerName = '';
			}
    },
    computed : {

    },
    data () {
        return {
           model:distributer,
           loadingPopupData:this.loadData,
           pageSize : 10 , //每页显示10条数据
           currentPage : 1, //当前页码
		   totalPages : 0,//总页数
           count : 0, //总记录数
           items : [],
           keyword : '',
           selectedDistributerName : '',
		   selectedDistributerId : '',
		   distributionFormId : this.distributionFormId,
		   tipMessage : ''
        }
    },
	beforeMount(){
         if(this.loadingPopupData == true){
            this.getPopupDataList();
         }
    },
    watch : {
        loadData(val) {
            this.loadingPopupData = val;
            if(this.loadingPopupData){
               this.getPopupDataList();
            }
        },
        selectedCompanyNames(val) {
            this.companyNames = val;
        },
        selectedCompanyIds(val) {
            this.companyIds = val;
        }
    }
}
</script>

<style scoped>

</style>
