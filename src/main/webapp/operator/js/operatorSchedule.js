var totalScheduleList = [];
var weekDateList = [];
var isMine = true;
$(function () {
    $(".homePanel").on("click",".changeIsMine",function () {
        var dataItem = $(this).attr("data-item");
        switch (dataItem) {
            case "my":
                isMine = false;
                $(this).html("我的排班");
                $(this).attr("data-item","our");
                break;
            case "our":
                isMine = true;
                $(this).html("总体排班");
                $(this).attr("data-item","my");
                break;
            default:
                break;
        }
        scheduleTableInit();
    });
    $(".homePanel").on("change",".panel-item",function () {
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
    $(".helpPanel").on("click",".closeAction",function () {
        homePanelShow();
        helpPanelInit();
    });
    $(".helpPanel").on("click",".cancelAction",function () {
        $(".helpPanel .closeAction").click();
    });
    $(".homePanel").on("click",".askForLeaveAction",function () {
       setLeaveList();
    });
    $(".homePanel").on("click",".freeTimeManagementAction",function () {
        setFreeTimeTable();
    });
    $(".helpPanel").on("click","td:not(.first-col)",function () {
        if($(this).hasClass("selected")){
            $(this).removeClass("selected");
            $(this).attr("item-data","0");
        }else{
            $(this).addClass("selected");
            $(this).attr("item-data","1");
        }
    });
    $(".helpPanel").on("click",".submitLeave",function () {
        if(isSubmit()){
            submitLeave();
        }
    });
    $(".helpPanel").on("click",".submitFreeTimeList",function () {
        if(isSubmit()){
            submitFreeTimeList();
        }
    });
});
//表格初始化
function scheduleTableInit() {
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
    $(".homePanel .table tbody tr").each(function (index,item) {
        if(scheduleList[index] != null) {
            var operatorNames = '';
            var length = 0;
            var j = Number(i)+2;
            if(isMine){
                for(var x in scheduleList[index].operatorList){
                    if(scheduleList[index].operatorList[x] != null && scheduleList[index].operatorList[x].name == operatorName){
                        operatorNames = operatorName;
                    }
                }
                $(this).find("td:nth-child("+j+")").html(operatorNames);
            }else{
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
                $(this).find("td:nth-child("+j+")").html(operatorNames);
            }
        }
    });
};
//获取总考勤
function getTotalScheduleList() {
    totalScheduleList = [];
    for(var i in weekDateList){
        totalScheduleList.push(getScheduleList(weekDateList[i]));
    }
}
//获取单天考勤
function getScheduleList(date) {
    var scheduleList = null;
    $.ajax({
        "url": "/repair/operator/getScheduleList",
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
//
function helpPanelInit(){
    $(".helpPanel").html('');
}
//请假单置入
function setLeaveList() {
    var date = new Date();
    var beginYear = date.getFullYear();
    date.setDate(date.getDate()+7);
    var endYear = date.getFullYear();
    $(".helpPanel").html('<div class="header">\n' +
        '        <label class="title">提交请假单</label>\n' +
        '        <a href="javascript:;"><img src="/repair/user/images/close.png" title="关闭" class="closeAction"/></a>\n' +
        '    </div>\n' +
        '    <div class="body">\n' +
        '        <div class="info">\n' +
        '            <span class="name">请假日期</span>\n' +
        '            <input type="text" class="content date" placeholder="请选择请假日期" data-options="{\'type\':\'YYYY-MM-DD\',\'beginYear\':'+beginYear+',\'endYear\':'+endYear+',\'limitTime\':\'today\'}"/>\n' +
        '            <div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div>'+
        '        </div>\n' +
        '        <div class="info">\n' +
        '            <span class="name">请假时间</span>\n' +
        '            <select class="content number">\n' +
        '                <option value="-2">请选择请假时间</option>\n' +
        '                <option value="1">一二节课</option>\n' +
        '                <option value="2">三四节课</option>\n' +
        '                <option value="3">五六节课</option>\n' +
        '                <option value="4">七八节课</option>\n' +
        '            </select>\n' +
        '            <div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div>'+
        '        </div>\n' +
        '        <div class="info">\n' +
        '            <span class="name">请假缘由</span>\n' +
        '            <textarea rows="5" class="content description" placeholder="请输入请假缘由"></textarea>\n' +
        '            <div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div>'+
        '        </div>\n' +
        '        <div class="info">\n' +
        '            <button class="confirmAction submitLeave">提交请假单</button><button class="cancelAction">取消提交</button>\n' +
        '            <div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div>'+
        '        </div>\n' +
        '    </div>');
    $.date(".content.date");
    helpPanelShow();
}
//空闲时间表置入
function setFreeTimeTable() {
    $(".helpPanel").html('<div class="header">\n' +
        '        <label class="title">提交空闲时间表</label>\n' +
        '        <a href="javascript:;"><img src="/repair/user/images/close.png" title="关闭" class="closeAction"/></a>\n' +
        '    </div>\n' +
        '    <div class="body">\n' +
        '<div class="panel-default step-management">\n' +
        '            <div class="header">\n' +
        '                <i class="iconfont icon-calendar-check"></i>空闲时间安排\n' +
        '            </div>\n' +
        '            <div class="body">\n' +
        '                <table class="table schedule">\n' +
        '                    <thead>\n' +
        '                        <tr class="schedule_titile">\n' +
        '                            <th class="first-col">&emsp;</th>\n' +
        '                            <th class="mon">周一</th>\n' +
        '                            <th class="tues">周二</th>\n' +
        '                            <th class="wed">周三</th>\n' +
        '                            <th class="thur">周四</th>\n' +
        '                            <th class="fri">周五</th>\n' +
        '                            <th class="sat">周六</th>\n' +
        '                            <th class="sun">周日</th>\n' +
        '                        </tr>\n' +
        '                    </thead>\n' +
        '                    <tbody>\n' +
        '                        <tr class="schedule_content first odd">\n' +
        '                            <td class="first-col">一<br/>二</td>\n' +
        '                            <td class="mon" item-data="0"></td>\n' +
        '                            <td class="tues" item-data="0"></td>\n' +
        '                            <td class="wed" item-data="0"></td>\n' +
        '                            <td class="thur" item-data="0"></td>\n' +
        '                            <td class="fri" item-data="0"></td>\n' +
        '                            <td class="sat" item-data="0"></td>\n' +
        '                            <td class="sun" item-data="0"></td>\n' +
        '                        </tr>\n' +
        '                        <tr class="schedule_content second even">\n' +
        '                            <td class="first-col">三<br/>四</td>\n' +
        '                            <td class="mon" item-data="0"></td>\n' +
        '                            <td class="tues" item-data="0"></td>\n' +
        '                            <td class="wed" item-data="0"></td>\n' +
        '                            <td class="thur" item-data="0"></td>\n' +
        '                            <td class="fri" item-data="0"></td>\n' +
        '                            <td class="sat" item-data="0"></td>\n' +
        '                            <td class="sun" item-data="0"></td>\n' +
        '                        </tr>\n' +
        '                        <tr class="schedule_content third odd">\n' +
        '                            <td class="first-col">五<br/>六</td>\n' +
        '                            <td class="mon" item-data="0"></td>\n' +
        '                            <td class="tues" item-data="0"></td>\n' +
        '                            <td class="wed" item-data="0"></td>\n' +
        '                            <td class="thur" item-data="0"></td>\n' +
        '                            <td class="fri" item-data="0"></td>\n' +
        '                            <td class="sat" item-data="0"></td>\n' +
        '                            <td class="sun" item-data="0"></td>\n' +
        '                        </tr>\n' +
        '                        <tr class="schedule_content fourth even">\n' +
        '                            <td class="first-col">七<br/>八</td>\n' +
        '                            <td class="mon" item-data="0"></td>\n' +
        '                            <td class="tues" item-data="0"></td>\n' +
        '                            <td class="wed" item-data="0"></td>\n' +
        '                            <td class="thur" item-data="0"></td>\n' +
        '                            <td class="fri" item-data="0"></td>\n' +
        '                            <td class="sat" item-data="0"></td>\n' +
        '                            <td class="sun" item-data="0"></td>\n' +
        '                        </tr>\n' +
        '                    </tbody>\n' +
        '                </table>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="info">\n' +
        '            <button class="confirmAction submitFreeTimeList">提交空闲时间表</button><button class="cancelAction">取消提交</button>\n' +
        '            <div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div>'+
        '        </div>\n' +
        '    </div>');
    helpPanelShow();
}
function submitLeave(){
    var date = $(".helpPanel .date").val();
    var number = $(".helpPanel .number").val();
    var description = $(".helpPanel .description").val();
    $.ajax({
        "url": "/repair/operator/submitLeave",
        "method": "post",
        "async":false,
        "headers": {
            "Content-Type": "application/json",
        },
        "data": '{\"operatorID\":\"'+operatorID+'\",\"date\":\"'+date+'\",\"number\":\"'+number+'\",\"description\":\"'+description+'\"}',
        "dataType": "json",
        "success": function (data) {
            if(data.message == 'true'){
                alert("请假单提交成功！");
                homePanelShow();
                helpPanelInit();
            }else {
                alert(data.message);
            }
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
}
function submitFreeTimeList(){
    var freeTimeList = [];
    for(var i = 0;i<7;i++){
        var j = Number(i)+2;
        var freeTime = [];
        $(".helpPanel td:nth-child("+j+")").each(function(){
            freeTime.push(Number($(this).attr("item-data")));
        });
        freeTimeList.push(freeTime);
    }
    var freeTime = new Object();
    freeTime.operatorID = operatorID;
    freeTime.freeTimeList = freeTimeList;
    freeTime.dateList = getWeekDateList(1);
    $.ajax({
        "url": "/repair/operator/submitFreeTimeList",
        "method": "post",
        "async":false,
        "headers": {
            "Content-Type": "application/json",
        },
        "data": JSON.stringify(freeTime),
        "dataType": "json",
        "success": function (data) {
            if(data.message == 'true'){
                alert("空闲时间提交成功！");
                homePanelShow();
                helpPanelInit();
            }else {
                alert(data.message);
            }
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
}