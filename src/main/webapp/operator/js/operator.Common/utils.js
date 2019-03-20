//订单状态转换
function getOrderStatus(status) {
   switch (status) {
       case 0 :
           return "未处理";
       case 1 :
           return "处理中";
       case 2:
           return "处理完未确认";
       case 3:
           return "处理完成";
       default:
           return "无";
   }
};
//订单状态转换
function getWorkTime(number) {
    switch (number) {
        case 1 :
            return "一二";
        case 2 :
            return "三四";
        case 3:
            return "五六";
        case 4:
            return "七八";
        default:
            return "无";
    }
};
//schedule状态
function getScheduleStatus(status) {
    switch (status) {
        case 0:
            return "未打卡";
            break;
        case 3:
            return "缺勤";
            break;
        case 4:
            return "迟到";
            break;
        case 5:
            return "早退";
            break;
        case 6:
            return "既迟到又早退";
            break;
        case 7:
            return "异常";
            break;
        case 8:
            return "审核中";
            break;
        case 9:
            return "已批准";
            break;
        case 10:
            return "已驳回";
            break;
        default:
            return "异常";
            break;
    }
}
//通用时间格式化
function dateLoad(date) {
    var result = new Date(date).Format("yyyy-MM-dd hh:mm:ss");
    if(result == 'NaN-aN-aN aN:aN:aN' || date == null){
        result =  "";
    }
    return result;
}
//时间格式化通用函数
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
//检测手机号码格式
function isPhone(phone){
    var reg = /^1[3,5,8]\d{9}$/;
    if(reg.test(phone))
    {
        return true;
    }
    else
    {
        return false;
    }
};
//检测是否为空
function isNotNull(value) {
    if(value != ""){
        return true;
    }else{
        return false;
    }
};
function getUserInfo(userID) {
    var user = null;
    $.ajax({
        "url": "/repair/user/getUser",
        "async": false ,
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
        },
        "data": '{\"userID\":\"'+userID+'\"}',
        "dataType": "json",
        "success": function (data) {
                user =  data;
        },
        "fail": function () {

        },
    });
    return user;
};