<template>
        <!-- BEGIN CONTAINER -->
        <div class="page-container">
            <!-- BEGIN CONTENT -->
            <div class="page-content-wrapper">
                <!-- BEGIN CONTENT BODY -->
                <!-- BEGIN PAGE HEAD-->
                <div class="page-head">
                    <div class="container">
                            <!-- BEGIN CONTENT HEADER -->
                            <div class="row margin-bottom-40 about-header">
                                <div class="col-md-12">
                                    <h1>家里饭 后台管理系统</h1>
                                    <h2></h2>
                                    <button type="button" class="btn btn-danger" @click="logout">退出</button>
                                </div>
                            </div>
                            <!-- END CONTENT HEADER -->
                    </div>
                </div>
                <!-- END PAGE HEAD-->
                <!-- BEGIN PAGE CONTENT BODY -->
                <div class="page-content">
                    <div class="container">
                        <!-- BEGIN PAGE CONTENT INNER -->
                        <div class="page-content-inner">
                            <div class="row">



                            </div>
							
                            <div class="row">
                                <div class="col-md-12">
                                    <!-- BEGIN Portlet PORTLET-->
                                    <div class="portlet light">
                                        <div class="portlet-title">
  

                                        </div>
                                        <div class="portlet-body">

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
	import {formatUnixDate,formatDate,showTip,showNotice,formatMintuesDate,formatNormalDate,getNowFormatDay,getTomorrowFormatDay} from '../../utils/common.js';
    export default {
        components: {
		   
        },
        data () {
            return {
				permissions : localStorage.ms_username,
            }
        },
        methods:{
		   logout(){
		      this.removeToken();
		      //this.$store.commit(types.LOGOUT);
              this.$router.push('/login');
		   },
		   removeToken(){
				    const self = this;
                    self.$http.put('/auth/remove-token', {
                      })
                      .then(function (response) {
                        if(response.data.statusCode == 200){
							//alert(response.data.responseString);
							showNotice('info','Success!','成功退出!');
				        }else{
						    showNotice('warning','Error!','操作失败!');
                        }
                      })
                      .catch(function (error) {
                        console.log(error);
						showNotice('warning','Error!','操作失败,网络异常!');
                      });
		   }
        },
		beforeCreate(){

		},
        beforeMount(){
            this.getList();
        },
		created () {

        },
        watch: {

        }
    }
</script>


<style>
.about-header {
  height: 500px;
  background-image: url("../../../static/img/bg/25.jpg");
  background-position: center;
  text-align: center;
  margin: 0 -20px; }

.about-header h1 {
  color: #fff;
  font-size: 55px;
  font-weight: 600;
  margin-top: 260px;
  text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.2); }

.about-header h2 {
  color: #fff;
  font-size: 22px;
  font-weight: 400;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-top: 30px;
  margin-bottom: 40px; }
</style>
