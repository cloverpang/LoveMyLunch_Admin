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
                            <h1>警告
                                <small>您没有权限访问此页面</small>
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

                        <!-- END PAGE BREADCRUMBS -->
                        <!-- BEGIN PAGE CONTENT INNER -->
                        <div class="page-content-inner">
                            <div class="row">
                                <div class="col-md-12 page-404">
                                    <div class="number font-green"> No... </div>
                                    <div class="details">
                                        <h3>Sorry, 您没有权限访问此页面</h3>

                                           
                                        
                                            <div class="input-group input-medium">

                                            </div>
                                            <!-- /input-group -->
                                        
                                    </div>
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

<style>
.page-404 {
  text-align: center; }

.page-404 .number {
  position: relative;
  top: 35px;
  display: inline-block;
  letter-spacing: -10px;
  margin-top: 0px;
  margin-bottom: 10px;
  line-height: 128px;
  font-size: 128px;
  font-weight: 300;
  color: #7bbbd6;
  text-align: right; }

.page-404 .details {
  margin-left: 40px;
  display: inline-block;
  padding-top: 0px;
  text-align: left; }

/* 500 page option #1 */
.page-500 {
  text-align: center; }

.page-500 .number {
  display: inline-block;
  letter-spacing: -10px;
  line-height: 128px;
  font-size: 128px;
  font-weight: 300;
  color: #ec8c8c;
  text-align: right; }

.page-500 .details {
  margin-left: 40px;
  display: inline-block;
  text-align: left; }

/* 404 page option #2*/
.page-404-full-page {
  overflow-x: hidden;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #fafafa !important; }

.page-404-full-page .details input {
  background-color: #ffffff; }

.page-404-full-page .page-404 {
  margin-top: 100px; }

/* 500 page option #2*/
.page-500-full-page {
  overflow-x: hidden;
  padding: 20px;
  background-color: #fafafa !important; }

.page-500-full-page .details input {
  background-color: #ffffff; }

.page-500-full-page .page-500 {
  margin-top: 100px; }

/* 404 page option #3*/
.page-404-3 {
  background: #000 !important; }

.page-404-3 .page-inner img {
  right: 0;
  bottom: 0;
  z-index: -1;
  position: absolute; }

.page-404-3 .error-404 {
  color: #fff;
  text-align: left;
  padding: 70px 20px 0; }

.page-404-3 h1 {
  color: #fff;
  font-size: 130px;
  line-height: 160px; }

.page-404-3 h2 {
  color: #fff;
  font-size: 30px;
  margin-bottom: 30px; }

.page-404-3 p {
  color: #fff;
  font-size: 16px; }

@media (max-width: 480px) {
  .page-404 .number,
  .page-500 .number,
  .page-404 .details,
  .page-500 .details {
    text-align: center;
    margin-left: 0px; }
  .page-404-full-page .page-404 {
    margin-top: 30px; }
  .page-404-3 .error-404 {
    text-align: left;
    padding-top: 10px; }
  .page-404-3 .page-inner img {
    right: 0;
    bottom: 0;
    z-index: -1;
    position: fixed; } }

</style>
