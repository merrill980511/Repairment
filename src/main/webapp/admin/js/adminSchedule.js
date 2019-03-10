var totalScheduleList = [];
var editScheduleList = [];
var weekDateList = [];
var operatorList = [];
$(function () {
    weekDateList = getWeekDateList(0);
    scheduleTableInit();
    $(".editScheduleAction").on("click",function () {
        var index = $(this).parents("th").index();
        editScheduleList = totalScheduleList[index - 1];
        var date = $(this).parents("th").attr("date-item");
        showForm(date,"编辑排班","确认修改","取消修改","editAction editScheduleAction");
        setEditScheduleFormInfo(editScheduleList);
    });
    $(".form").on("click",".editScheduleAction",function () {
        updateScheduleList(getUpdateScheduleList());
    });
    $(".panel-default .header .panel-item").on("change",function () {
        var panelItem = $(this).val();
        switch (panelItem) {
            case "thisWeek":
                weekDateList = getWeekDateList(0);
                break;
            case "nextWeek":
                weekDateList = getWeekDateList(1);
                break;
            default:
                break;
        }
        scheduleTableInit();
    });
});
//表格初始化
function scheduleTableInit() {
    lidInit();
    $("th:not(.first-col)").each(function (index,item) {
        $(this).attr("date-item",new Date(weekDateList[index]).Format("yyyy-MM-dd"));
    });
    getTotalScheduleList();
    setScheduleTableInfo();
}
//表格数据置入
function setScheduleTableInfo() {
    for(var i in totalScheduleList){
        setScheduleColInfo(i,totalScheduleList[i]);
    }
}
//单列数据置入
function setScheduleColInfo(i,scheduleList) {
        $(".table tbody tr").each(function (index,item) {
            if(scheduleList[index] != null) {
                var operatorNames = '';
                var length = 0;
                for(var x in scheduleList[index].operatorList){
                    if(scheduleList[index].operatorList[x] != null){
                        length++;
                        if(length%2 == 1){
                            operatorNames += scheduleList[index].operatorList[x].name;
                        }else{
                            operatorNames += ","+scheduleList[index].operatorList[x].name + "<br/>";
                        }
                    }
                }
                var j = Number(i)+2;
                $(this).find("td:nth-child("+j+")").html(operatorNames);
            }
        });
};
//表单信息置入
function setEditScheduleFormInfo(scheduleList){
    $(".form .body").html(getEditScheduleFormInfo(scheduleList));
    var scheduleInfo = $(".form .info");
    scheduleInfo.each(function (index,item) {
        var editSchedule = scheduleList[index];
        if(editSchedule != null) {
            for (var x in editSchedule.operatorList) {
                if (editSchedule.operatorList[x] != null) {
                    var j = Number(x)+2;
                    $(this).find("select:nth-child(" +j+ ")").val(editSchedule.operatorList[x].id);
                }
            }
        }
    });
}
//表单HTML获取
function getEditScheduleFormInfo(scheduleList) {
    var operatorListHtml = "<option value='-2'>无</option>";
    operatorList = getAllOperatorList();
    for(var i in operatorList){
        operatorListHtml += '<option value="'+operatorList[i].id+'">'+operatorList[i].name+'</option>\n';
    }
    var scheduleFormBodyHTML =
        '<div class="info"><span class="name">一二</span>' +
        '<select class="content operator">\n' +
        operatorListHtml+
        '</select>\n' +
        '<select class="content operator">\n' +
        operatorListHtml+
        '</select>\n' +
        '<select class="content operator">\n' +
        operatorListHtml+
        '</select>\n' +
        '<select class="content operator">\n' +
        operatorListHtml+
        '</select>\n' +
        '</div>\n'+
        '<div class="info"><span class="name">三四</span>' +
        '<select class="content operator">\n' +
        operatorListHtml+
        '</select>\n' +
        '<select class="content operator">\n' +
        operatorListHtml+
        '</select>\n' +
        '<select class="content operator">\n' +
        operatorListHtml+
        '</select>\n' +
        '<select class="content operator">\n' +
        operatorListHtml+
        '</select>\n' +
        '</div>\n'+
        '<div class="info"><span class="name">五六</span>' +
        '<select class="content operator">\n' +
        operatorListHtml+
        '</select>\n' +
        '<select class="content operator">\n' +
        operatorListHtml+
        '</select>\n' +
        '<select class="content operator">\n' +
        operatorListHtml+
        '</select>\n' +
        '<select class="content operator">\n' +
        operatorListHtml+
        '</select>\n' +
        '</div>\n'+
        '<div class="info"><span class="name">七八</span>' +
        '<select class="content operator">\n' +
        operatorListHtml+
        '</select>\n' +
        '<select class="content operator">\n' +
        operatorListHtml+
        '</select>\n' +
        '<select class="content operator">\n' +
        operatorListHtml+
        '</select>\n' +
        '<select class="content operator">\n' +
        operatorListHtml+
        '</select>\n' +
        '</div>';
    return scheduleFormBodyHTML;
}
//获取总考勤
function getTotalScheduleList() {
    totalScheduleList = [];
    for(var i in weekDateList){
        totalScheduleList.push(getScheduleList(weekDateList[i]));
    }
}
//获取新考勤
function getUpdateScheduleList() {
    var updateScheduleList = editScheduleList;
    var scheduleInfo = $(".form .info");
    scheduleInfo.each(function (index,item) {
        updateScheduleList[index].date = $(".form").attr("item-id");
        updateScheduleList[index].operatorList = [];
        for(var i = 0;i<4;i++){
            updateScheduleList[index].operatorList.push(getOperator($(this).find("select:nth-child("+Number(i)+2+")").val()));
        }
    });
    return updateScheduleList;
}
//更新考勤
function updateScheduleList(scheduleList) {
    $.ajax({
        "url": "/repair/admin/updateScheduleList",
        "method": "post",
        "async":false,
        "headers": {
            "Content-Type": "application/json",
        },
        "data": JSON.stringify(scheduleList),
        "dataType": "json",
        "success": function (data) {
            if(data.message == 'true'){
                scheduleTableInit();
            }else{
                alert(data.message);
            }
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });}
//获取单天考勤
function getScheduleList(date) {
    var scheduleList = null;
    $.ajax({
        "url": "/repair/admin/getScheduleList",
        "method": "post",
        "async":false,
        "headers": {
            "Content-Type": "application/json",
        },
        "data": '{\"date\":'+JSON.stringify(date)+'}',
        "dataType": "json",
        "success": function (data) {
            scheduleList = data;
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
    return scheduleList;
}
//获取运维人员列表
function getAllOperatorList() {
    var operatorList = null;
    $.ajax({
        "url": "/repair/admin/getAllOperatorList",
        "method": "post",
        "async":false,
        "headers": {
            "Content-Type": "application/json",
        },
        "data": "",
        "dataType": "json",
        "success": function (data) {
            operatorList = data;
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
    return operatorList;
}
//本地获取运维
function getOperator(id) {
    var operator = null;
    for(var i in operatorList){
        if(operatorList[i].id == id){
            operator = operatorList[i];
        }
    }
    if(operator == null){
        operator = newOperator();
        operator.id = "-2";
    }
    return operator;
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
/*function setWeekView() {
    switch (getWeekDay()) {
        case 0 :
            $(".sun").css("color","#FFFFFF");
            $(".sun").css("background-color","#009fe8");
            break;
        case 1 :
            $(".mon").css("color","#FFFFFF");
            $(".mon").css("background-color","#009fe8");
            break;
        case 2 :
            $(".tues").css("color","#FFFFFF");
            $(".tues").css("background-color","#009fe8");
            break;
        case 3 :
            $(".wed").css("color","#FFFFFF");
            $(".wed").css("background-color","#009fe8");
            break;
        case 4 :
            $(".thur").css("color","#FFFFFF");
            $(".thur").css("background-color","#009fe8");
            break;
        case 5 :
            $(".fri").css("color","#FFFFFF");
            $(".fri").css("background-color","#009fe8");
            break;
        case 6 :
            $(".sat").css("color","#FFFFFF");
            $(".sat").css("background-color","#009fe8");
            break;
    }
};*/
