<template>


                                            <!-- /.modal -->
                                            <div class="modal fade bs-modal-lg" id="companyListPopup" tabindex="-1" role="dialog" aria-hidden="true">
                                                <div class="modal-dialog modal-lg">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
															<h4 class="modal-title" v-show="!loadingPopupData"> 请选择公司 <span>检索出 {{count}} 条数据</span></h4> 
                                                            <h4 class="modal-title" v-show="loadingPopupData"> 数据加载中 ... ... </h4>
                                                        </div>
                                           <div class="modal-body">             
                                                    <div class="portlet-body form">
                                                            
                                <div class="form-group">
                                                    <div class="input-group input-medium" v-show="!loadingPopupData">
                                                        <input type="text" class="form-control" placeholder="公司名 or 公司代码"  v-model="keyword">
                                                        <span class="input-group-btn">
                                                            <button type="submit" class="btn green" @click="handleSearchCompany">
                                                                <i class="fa fa-search"></i>
                                                            </button>
                                                        </span>
                                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-xs-12">
                                        <table class="table table-striped table-hover">

                                            <tbody>
                                                <tr v-for="(item,index) in items" id="span-item.companyId">
                                                    <td style="width:10%;">
                                                           <div class="md-checkbox">
                                                                <input type="checkbox" :id="item.companyId" class="md-check" :value='item.companyId' v-model='companyIds' disabled>
                                                                <label :for="item.companyId">
                                                                    <span></span>
                                                                    <span class="check"></span>
                                                                    <span class="box"></span>   </label>
                                                            </div>
                                                    </td>
                                                    <td style="width:90%;"> 
                                                     <a href="javascript:void(0);" @click="selectCompany(item.companyName,item.companyId)"> {{item.companyName}} </a> 
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
                                                            <button type="button" class="btn dark btn-outline" data-dismiss="modal" > 关闭 </button>
                                                            <button type="button" class="btn green" @click="saveSelected">
															 确定
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
import vMoPaging from './../Common/Paging';
import {showNotice} from '../../utils/common.js';
export default {
    name : 'companyListPopup',
    components: {
		    vMoPaging
    },
    //通过props来接受从父组件传递过来的值
    props : {
        loadData : { 
            default : false 
        },
        selectedCompanyNames : { 
            default : [] 
        },
        selectedCompanyIds : { 
            default : [] 
        }
    },
    methods : {
            //获取数据
            getPopupDataList () {
			    this.loadingPopupData = true; //显示加载条
				var url = '/' + this.$store.state.user.operationCenter + '/companies';
				this.$http.get(url,{
                params: {
                    conditionsStr: 'companyName::like::' + this.keyword + '$companyCode::like::' + this.keyword,
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
            handleSearchCompany(){
                this.currentPage = 1;
                this.getPopupDataList();
            },
            addCompany(companyName,companyId){
                //alert(companyName + companyId);
                this.companyNames.push(companyName);
                this.companyIds.push(companyId);
            },
            selectCompany(companyName,companyId){
                //先判断当前ID是否在数组中
                if(this.companyIds.indexOf(companyId) !== -1){
                   var index = this.companyIds.indexOf(companyId);
                   this.companyIds.splice(index,1);
                   this.companyNames.splice(index,1);
                }else{
                   this.companyNames.push(companyName);
                   this.companyIds.push(companyId);
                }
            },
            //确定所选公司
            saveSelected(){
                //使用$parent 直接赋值 
                //this.$parent.selectedCompanyNames = this.companyNames;
                //this.$parent.selectedCompanyIds = this.companyIds;

                
                //先清空
                this.$parent.selectedCompanyNames = [];
                this.$parent.selectedCompanyIds = [];
 
                var _this = this; 
                if(this.companyNames.length > 0){
                    this.companyNames.forEach(function(item){
                      _this.$parent.selectedCompanyNames.push(item);
                    });
                }

                if(this.companyIds.length > 0){
                    this.companyIds.forEach(function(item){
                      _this.$parent.selectedCompanyIds.push(item);
                    });
                }

                //调用父组件方法 
                //this.$emit('handleSelected',this.companyNames,this.companyIds);	
                $('#companyListPopup').modal('hide');
            }
    },
    computed : {
        
    },
    data () {
        return {
           model:company,
           loadingPopupData:this.loadData,
           pageSize : 10 , //每页显示10条数据
           currentPage : 1, //当前页码
		   totalPages : 0,//总页数
           count : 0, //总记录数
           items : [],
           keyword : '',
           companyNames : this.selectedCompanyNames,
           companyIds : this.selectedCompanyIds
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
