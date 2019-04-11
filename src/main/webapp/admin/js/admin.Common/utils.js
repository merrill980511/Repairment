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
//
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
//时间格式化
function chartDateLoad(date) {
    return new Date(date).Format("yyyy-MM-dd");
}
//数据处理
function dataLoad(data){
    if(data == null || data == "undefined" || typeof(data) == "undefined"){
        return "";
    }
    return data;
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
//获取dateList JSON对象
function getDateListJson(num) {
    var dateListJson = new Object();
    dateListJson.dateList = getDateList(num);
    return dateListJson;
}
//获取dateList对象
function getDateList(num) {
    var dateList = [];
    var now = new Date();
    for(var i=-num;i<0;i++){
        var date = new Date();
        date.setDate(now.getDate() + i + 1);
        dateList.push(date.Format("yyyy-MM-dd"));
    }
    return dateList;
};
//获取订单状态
function getStatus(status) {
    switch (status) {
        case 0:
            return "未处理";
            break;
        case 1:
            return "处理中";
            break;
        case 2:
            return "处理完，未确认";
            break;
        case 3:
            return "已完成";
            break;
        default:
            return "异常";
    }
}
//获取当前星期几
function getWeekDay() {
    var curWeek = new Date().getDay();
    if(curWeek == 0){
        curWeek = 7;
    }
    return curWeek;
}
//获取单周日期
function getWeekDateList(num) {
    var date = new Date();
    var curMonDayDate;
    var curWeek = getWeekDay();
    var stDay = 1 - curWeek;
    curMonDayDate = addDate(date, stDay);
    var arrDate = [];
    for (var i = 7*num; i < 7*num+7; i++) {
        arrDate.push(addDate(new Date(curMonDayDate), i));
    }
    return arrDate;
}
//增加天数
function addDate(date, days) {
    var d = new Date(date);
    d.setDate(d.getDate() + days);
    var m = d.getMonth() + 1;
    return d.getFullYear() + '-' + m + '-' + d.getDate();
}
//obj转mapString
function changeObjToMapString(obj) {
    for(var i in obj){
        if(isObj(obj[i])){
            changeObjToMapString(obj[i]);
        }
        obj[i] = obj[i] + "";
    }
    return obj;
}
//判断是否为对象
function isObj(o){
    return (typeof o == 'object');
}