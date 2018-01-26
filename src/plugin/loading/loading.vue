<template>
<div class="loader" v-show="isShow">
 <div class="loadingbox">
{{tipMessage}} 耗时:{{timeSecond}}秒
 </div>
</div>
</template>

<script>
  export default {
    data() {
      return {
        isShow: false,
		originTipMessage:'页面加载中，请稍等...',
		tipMessage:'页面加载中，请稍等...',
		timeSecond:1
      }
    },
    computed: {

    },
    methods: {
      /**
       * 显示动画loading
       */
      show(message) {
	    this.timeSecond = 1;
        this.isShow = true;
		if(message != ''){
		   this.tipMessage = message;
		}else{
		   this.tipMessage = this.originTipMessage;
		}

		var intervalid;
        this.intervalid = setInterval(() => {
		  if(this.timeSecond == 30){
		     this.hide();	 
		  }
          this.timeSecond++;
        }, 1000)
      },
      /**
       * 隐藏动画loading
       */
      hide() {
	    clearInterval(this.intervalid);
        this.isShow = false;
      }
    },
	beforeDestroy () {
      clearInterval(this.intervalid);
    }
  }
</script>

<style scoped>
.loader{position: fixed; left: 0px; top: 0px; height: 100%; width: 100%; z-index: 10005; background: url('../../../static/img/wpoint.png') left top repeat;}
.loader img{position: absolute; left: 50%; top: 50%;}

.loader .loadingbox { border:solid 2px #86a5ad; background:#F2F2F2 url(../../../static/img/loading.gif) no-repeat 10px 10px;}
.loader .loadingbox { color:#333333;display:block; width:240px; height:50px; position:fixed; top:50%; left:50%; margin-left:-120px; margin-top:-25px; padding:10px 10px 10px 50px; text-align:left; line-height:27px; font-weight:bold; position:absolute; z-index:111;}
</style>