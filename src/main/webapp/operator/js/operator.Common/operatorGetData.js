//数据获取方法
function getList(pageSize,currentPage) {
    var tableItem = $("#table-item").val();
    var keyWord = $("#keyWord").val();
    switch (tableItem) {
        case "order":
            getOrderList(pageSize,currentPage,keyWord);
            break;
        case "myOrder":
            getMyOrderList(pageSize,currentPage,keyWord);
            break;
        case "order-finished":
            getOrderFinishedList(pageSize,currentPage,keyWord);
            break;
        default:
            break;
    }
}
//获取我的状态
function getMyAttendence(operatorID) {
    var myAttendence = null;
    $.ajax({
        "url": "/repair/operator/getAttendence",
        "method": "post",
        "async":false,
        "headers": {
            "Content-Type": "application/json",
        },
        "data": '{\"operatorID\":\"'+operatorID+'\"}',
        "dataType": "json",
        "success": function (data) {
            myAttendence = data;
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
    return myAttendence;
}
//上班打卡
function checkIn(operatorID) {
    $.ajax({
        "url": "/repair/operator/checkIn",
        "method": "post",
        "async":false,
        "headers": {
            "Content-Type": "application/json",
        },
        "data": '{\"operatorID\":\"'+operatorID+'\"}',
        "dataType": "json",
        "success": function (data) {
            if(data.message == 'true'){
                alert("上班打卡成功");
                homePanelInit();
                setHomePanelInfo(getMyAttendence(operatorID));
            }else {
                alert(data.message);
            }
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
}
//下班打卡
function checkOut(operatorID) {
    $.ajax({
        "url": "/repair/operator/checkOut",
        "method": "post",
        "async":false,
        "headers": {
            "Content-Type": "application/json",
        },
        "data": '{\"operatorID\":\"'+operatorID+'\"}',
        "dataType": "json",
        "success": function (data) {
            if(data.message == 'true'){
                alert("下班打卡成功");
                homePanelInit();
                setHomePanelInfo(getMyAttendence(operatorID));
            }else {
                alert(data.message);
            }
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
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
//提交请假单
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
//提交空闲时间
function submitFreeTimeList(){
    var freeTimeList = [];
    for(var i = 0;i<7;i++){
        var j = Number(i)+1;
        var freeTime = [];
        $(".helpPanel table tbody tr:nth-child("+j+") td:not(.first-col)").each(function(){
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
//未处理
function getOrderList(pageSize,currentPage,keyWord){
    $.ajax({
        "url": "/repair/operator/getOrderList",
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
        },
        "data": '{\"pageSize\":\"'+pageSize+'\",\"currentPage\":\"'+currentPage+'\",\"keyWord\":\"'+keyWord+'\"}',
        "dataType": "json",
        "success": function (data) {
            if(data != null ){
                orderList = data.list;
                tableInit();
                $("div.table").append(getOrderListHtml(orderList));
                updatePages(data.pages,visiblePages,data.pageNum);
            }
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
};
//历史运维
function getOrderFinishedList(pageSize,currentPage,keyWord){
    $.ajax({
        "url": "/repair/operator/getOrderFinishedList",
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
        },
        "data": '{\"pageSize\":\"'+pageSize+'\",\"currentPage\":\"'+currentPage+'\",\"keyWord\":\"'+keyWord+'\"}',
        "dataType": "json",
        "success": function (data) {
            if(data != null ){
                orderList = data.list;
                tableInit();
                $("div.table").append(getOrderListHtml(orderList));
                updatePages(data.pages,visiblePages,data.pageNum);
            }
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
};
//我的运维
function getMyOrderList(pageSize,currentPage,keyWord){
    $.ajax({
        "url": "/repair/operator/getMyOrderList",
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
        },
        "data": '{\"pageSize\":\"'+pageSize+'\",\"currentPage\":\"'+currentPage+'\",\"keyWord\":\"'+keyWord+'\",\"operatorID\":\"'+operatorID+'\"}',
        "dataType": "json",
        "success": function (data) {
            if(data != null ){
                orderList = data.list;
                tableInit();
                $("div.table").append(getOrderListHtml(orderList));
                updatePages(data.pages,visiblePages,data.pageNum);
            }
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
};
//获取处理中订单
function getOrderInHandle(operatorID) {
    var order = null;
    $.ajax({
        "url": "/repair/operator/getOrderInHandle",
        "method": "post",
        "async":false,
        "headers": {
            "Content-Type": "application/json",
        },
        "data": '{\"operatorID\":\"'+operatorID+'\"}',
        "dataType": "json",
        "success": function (data) {
            order = data;
            orderItem = data;
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
    return order;
}
//获取订单
function getOrder(orderID) {
    var order = null;
    $.ajax({
        "url": "/repair/operator/getOrder",
        "method": "post",
        "async":false,
        "headers": {
            "Content-Type": "application/json",
        },
        "data": '{\"orderID\":\"'+orderID+'\"}',
        "dataType": "json",
        "success": function (data) {
            order = data;
            orderItem = data;
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
    return order;
}
//我去处理
function takeOrderAction(operatorID,order) {
    var orderID = order.id;
    $.ajax({
        "url": "/repair/operator/takeOrder",
        "method": "post",
        "async":false,
        "headers": {
            "Content-Type": "application/json",
        },
        "data": '{\"operatorID\":\"'+operatorID+'\",\"orderID\":\"'+orderID+'\"}',
        "dataType": "json",
        "success": function (data) {
            if(data.message == 'true' ){
                order.status = 1;
                infoPanelInit(order);
                $(".indexButton.handlingOrder").click();
            }else{
                alert(data.message);
            }
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
}
//保存备注
function updateDescription(orderID,description) {
    $.ajax({
        "url": "/repair/operator/updateDescription",
        "method": "post",
        "async":false,
        "headers": {
            "Content-Type": "application/json",
        },
        "data": '{\"orderID\":\"'+orderID+'\",\"description\":\"'+description+'\"}',
        "dataType": "json",
        "success": function (data) {
            if(data.message == 'true'){
                $(".info .saveDescriptionAction").prevAll("textarea.description").replaceWith("<label class='description'>"+description+"</label>");
                $(".info .saveDescriptionAction").css("margin","auto");
                $(".info .saveDescriptionAction").removeClass("icon-save").removeClass("saveDescriptionAction").addClass("icon-edit-solid").addClass("editDescriptionAction");
            }else{
                alert(data.message);
            }
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
}
//处理完成
function finishOrder(operatorID) {
    var description = $(".description").text();
    $.ajax({
        "url": "/repair/operator/finishOrder",
        "method": "post",
        "async":false,
        "headers": {
            "Content-Type": "application/json",
        },
        "data": '{\"operatorID\":\"'+operatorID+'\",\"description\":\"'+description+'\"}',
        "dataType": "json",
        "success": function (data) {
            if(data.message == 'true'){
                $(".indexButton.order").click();
                infoPanelInit();
            }else{
                alert(data.message);
            }
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
}
//获取我的请假单
function getMyLeaveList(){
    var leaveList = null;
    $.ajax({
        "url": "/repair/operator/getLeaveListByOperatorID",
        "method": "post",
        "async":false,
        "headers": {
            "Content-Type": "application/json",
        },
        "data": '{\"operatorID\":\"'+operatorID+'\"}',
        "dataType": "json",
        "success": function (data) {
                leaveList = data;
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
    return leaveList;
}