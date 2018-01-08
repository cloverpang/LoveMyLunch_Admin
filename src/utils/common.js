/**
 * Created by yao on 15/05/2017.
 */
// 获取当前日期字符串，格式'yyyy-MM-dd HH:MM:SS'
export function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
}

// 格式'yyyy-MM-dd HH:MM'
export function formatMintuesDate(dateString) {
    var date = new Date(dateString);
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes();
    return currentdate;
}

// 格式'yyyy-MM-dd'
export function formatNormalDate(dateString) {
    var date = new Date(dateString);
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return currentdate;
}


// 格式化时间(****年*月*日)
export function formatDate(dateString) {
    var date = new Date(dateString);
    var month = 0;
    if(null != date){
        month = date.getMonth() + 1; 
    }
    return date.getFullYear() + '年' + month + '月' + date.getDate() + '日';
}

// 格式化uinxstamp(****年*月*日)
export function formatUnixDate(unixDate){
    var ts = unixDate || 0;
    var t,y,m,d,h,i,s;
    //t = ts ? new Date(ts*1000) : new Date();
    t = ts ? new Date(ts) : new Date();
    y = t.getFullYear();
    m = t.getMonth()+1;
    d = t.getDate();
    //h = t.getHours();
    //i = t.getMinutes();
    //s = t.getSeconds();

    // 可依据须要在这里定义时间格式
    //return y+'-'+(m<10?'0'+m:m)+'-'+(d<10?'0'+d:d)+' '+(h<10?'0'+h:h)+':'+(i<10?'0'+i:i)+':'+(s<10?'0'+s:s);
    return y + '年' + m + '月' + d + '日';
}

// 字符全部替换
export function replaceAll(str, s1, s2){
    return str.replace(new RegExp(s1, "gm"), s2);
}

export function toFormatDateString(date, fmt) {
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

export function showTip(tipTitle,tipMessage){
	if(tipTitle == null || tipTitle == ""){
		tipTitle = "Tip";
	}
	
	if(tipMessage == null || tipMessage == ""){
		bootbox.alert(tipTitle);   
	}else{
	                bootbox.dialog({
                    message: tipMessage,
                    title: tipTitle,
                    buttons: {
                      close: {
                        label: "关闭",
                        className: "red",
                        callback: function() {
                         
                        }
                      }
                    }
                }); 
	}
}

export function showNotice(type,title,message){
                toastr.options = {
                  "closeButton": false,
                  "debug": false,
                  "positionClass": "toast-center-center",
                  "onclick": null,
                  "showDuration": "1000",
                  "hideDuration": "1000",
                  "timeOut": "2000",
                  "extendedTimeOut": "1000",
                  "showEasing": "swing",
                  "hideEasing": "linear",
                  "showMethod": "fadeIn",
                  "hideMethod": "fadeOut"
                };

				if(type == "success"){
					toastr.success(message, title);
				}else if(type == "info"){
					toastr.info(message, title);
				}else if(type == "warning"){
					toastr.warning(message, title);
				}else if(type == "error"){
					toastr.error(message, title);
				}else{
					toastr.info(message, title);
				}
}

export function limitStringLength(str, len) {
        var str_length = 0;
		if(null != len && len != ""){
			str_length = parseInt(len);
		}
		
		if(str.length <= str_length){
			return str
		}else{
			return str.substr(0,str_length) + " ...";
		}
		
}

export function actionLoading(selector, text) {
	text = (typeof text !== 'undefined') ? text : "保存中..."; // Default ajax text
	
    setTimeout(function () {
        // If the ajax request still hasn't finished then bind animation
        if (!$("#" + selector).hasClass("finished")) {
            $("#" + selector).html(text);
            // Animate
            var dots = 0;
            var timer = setInterval(function () {
                if ($("#" + selector).hasClass("finished")) {
                    clearInterval(timer);
                } else {
                    var dotsSelector = selector;
                    if (dots < 3) {
                        $("#" + selector).append('.');
						//alert(dots);
                        dots++;
                    } else {
                        $("#" + selector).html("");
                        dots = 0;
                    }
                }
            }, 600);
        }else{
			//alert('has finished');
		}
    }, 500);
}