//通用
//获取表格数据
function getList(pageSize,currentPage) {
    var panelItem = $(".table-panel .header").find(".panel-item").val();
    var keyWord = $(".keyWord").val();
    switch (panelItem) {
        case "order":
            getOrderList(pageSize,currentPage,keyWord);
            break;
        case "order-finished":
            getOrderFinishedList(pageSize,currentPage,keyWord);
            break;
        case "operator":
            getOperatorList(pageSize,currentPage,keyWord);
            break;
        case "user":
            getUserList(pageSize,currentPage,keyWord);
            break;
        case "notRead":
            getNotReadLeavList(pageSize,currentPage,keyWord);
            break;
        case "haveRead":
            getHaveReadLeavList(pageSize,currentPage,keyWord);
            break;
        default:
            break;
    };
}
//修改密码
function updatePassword(id,password) {
    $.ajax({
        "url": "/repair/admin/editPasswordCommit",
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
        },
        "data": "{\"id\":\""+id+"\",\"password\":\""+password+"\"}",
        "dataType": "json",
        "success": function (data) {
            if(data.message = "true" ){
                lidInit();
            }else{
                alert(data.message);
            }
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
}
//获得数据
function getItem(id,url) {
    var item = null;
    $.ajax({
        "url": url,
        "method": "post",
        "async":false,
        "headers": {
            "Content-Type": "application/json",
        },
        "data": '{\"id\":\"'+id+'\"}',
        "dataType": "json",
        "success": function (data) {
            item = data;
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
    editItem = item;
    return item;
};
//删除数据
function deleteItem(id,url){
    $.ajax({
        "url": url,
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
        },
        "data": '{\"id\":\"'+id+'\"}',
        "dataType": "json",
        "success": function (data) {
            if(data.message = "true" ){
                lidInit();
                getList($("#pageSize").val(),$('#currentPage').val());
            }else{
                alert(data.message);
            }
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
};
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
//获取用户信息
function getUserInfo(userID) {
    var user = null;
    $.ajax({
        "url": "/repair/admin/getUser",
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
//检测是否为用户
function isUser(userId) {
    var isUser = false;
    $.ajax({
        "url": "/repair/admin/getUser",
        "method": "post",
        "async":false,
        "headers": {
            "Content-Type": "application/json",
        },
        "data": '{\"id\":\"'+userId+'\"}',
        "dataType": "json",
        "success": function (data) {
            userData = data;
            isUser = (data != null);
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
    return isUser;
};
//首页
//同意请假
function agreeLeaveAction(id) {
    $.ajax({
        "url": "/repair/admin/agreeLeave",
        "method": "post",
        "async":false,
        "headers": {
            "Content-Type": "application/json",
        },
        "data": '{\"id\":\"'+id+'\"}',
        "dataType": "json",
        "success": function (data) {
            if(data.message == 'true'){
                window.location.reload()
            }else{
                alert(data.message);
            }
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
}
//请假驳回
function disagreeLeaveAction(id) {
    $.ajax({
        "url": "/repair/admin/disagreeLeave",
        "method": "post",
        "async":false,
        "headers": {
            "Content-Type": "application/json",
        },
        "data": '{\"id\":\"'+id+'\"}',
        "dataType": "json",
        "success": function (data) {
            if(data.message == 'true'){
                window.location.reload()
            }else{
                alert(data.message);
            }
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
}
//获取订单图数据
function getOrderChart(num){
    $.ajax({
        "url": "/repair/admin/getOrderFinishRate",
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
        },
        "data": JSON.stringify(getDateListJson(num)),
        "dataType": "json",
        "success": function (data) {
            setOrderChart(data,getDateList(num));
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
}
//获取考勤图数据
function getAttendenceChart(num){
    var dateList = getDateList(num);
    dateList.splice(num-1,1);
    $.ajax({
        "url": "/repair/admin/getAttendenceRate",
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
        },
        "data": JSON.stringify(dateList),
        "dataType": "json",
        "success": function (data) {
            setAttendenceChart(data,dateList);
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
}
//获取当前人员数据
function getCurrentOperatorList(){
    $.ajax({
        "url": "/repair/admin/getCurrentAttendenceList",
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
        },
        "data": "",
        "dataType": "json",
        "success": function (data) {
            setCurrentOperatorList(data);
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
}
//获取概览内容
function getOverview() {
    $.ajax({
        "url": "/repair/admin/overview",
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
        },
        "data": "",
        "dataType": "json",
        "success": function (data) {
            if(data != null&&data.length != 0 ){
                setOverview(data);
            }
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
};
//获取应急问题列表
function getOrderSortByNum(num) {
    $.ajax({
        "url": "/repair/admin/getOrderSortByDate",
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
        },
        "data": "{\"number\":\""+num+"\"}",
        "dataType": "json",
        "success": function (data) {
            orderTableInit();
            for(var i  = 0;i<num;i++){
                if(data[i] != null){
                    $(".orderTable .table tr:eq("+i+")").html('<td class="pointer" item-id="'+data[i].id+'"><label class="location left">'+data[i].location+'</label><label class="time right">'+new Date(data[i].reservationTime).Format("yyyy-MM-dd hh:mm")+'</label></td>');
                }
            }
            $(".orderTable .footer .btn").html(data.length+'个未处理问题<i class="iconfont icon-right"></i>');
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
};
//获取请假单列表
function getLeaveListByNum(num) {
    $.ajax({
        "url": "/repair/admin/getLeaveList",
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
        },
        "data": "{\"number\":\""+num+"\"}",
        "dataType": "json",
        "success": function (data) {
            leaveTableInit();
            for(var i  = 0;i<num;i++){
                if(data[i] != null){
                    $(".leaveTable .table tr:eq("+i+")").html('<td class="pointer" item-id="'+data[i].id+'"><label class="name left">'+data[i].operator.name+'</label><label class="time right">'+new Date(data[i].date).Format("yyyy-MM-dd")+" "+getWorkTime(data[i].workTime.number)+'</label></td>');
                }
            }
            $(".leaveTable .footer .btn").html(data.length+'个未处理请求<i class="iconfont icon-right"></i>');
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
};
//考勤
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
//获取空闲运维人员列表
function getOperatorListBySchedule(date,number) {
    var operatorList = null;
    $.ajax({
        "url": "/repair/admin/getOperatorListBySchedule",
        "method": "post",
        "async":false,
        "headers": {
            "Content-Type": "application/json",
        },
        "data": "{\"date\":\""+date+"\",\"number\":\""+number+"\"}",
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
    });
}
//获取未审核请假列表
function getNotReadLeavList(pageSize,currentPage,keyWord){
    $.ajax({
        "url": "/repair/admin/getUnReviewedLeaveList",
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
        },
        "data": '{\"pageSize\":\"'+pageSize+'\",\"currentPage\":\"'+currentPage+'\",\"keyWord\":\"'+keyWord+'\"}',
        "dataType": "json",
        "success": function (data) {
            if(data != null ){
                list = data.list;
                $(".leave-management .table").removeClass().addClass("table notReadLeave");
                $(".leave-management .table>thead").html(getLeaveThHtml());
                $(".leave-management .table>tbody").html(getLeaveListHtml(list));
                tableCssInit();
                updatePages(data.pages,visiblePages,data.pageNum);
            }
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
};
//获取已审核请假列表
function getHaveReadLeavList(pageSize,currentPage,keyWord){
    $.ajax({
        "url": "/repair/admin/getReviewedLeaveList",
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
        },
        "data": '{\"pageSize\":\"'+pageSize+'\",\"currentPage\":\"'+currentPage+'\",\"keyWord\":\"'+keyWord+'\"}',
        "dataType": "json",
        "success": function (data) {
            if(data != null ){
                list = data.list;
                $(".leave-management .table").removeClass().addClass("table haveReadLeave");
                $(".leave-management .table>thead").html(getLeaveThHtml());
                $(".leave-management .table>tbody").html(getLeaveListHtml(list));
                tableCssInit();
                updatePages(data.pages,visiblePages,data.pageNum);
            }
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
};
//问题订单
//表格
//获取订单列表
function getOrderList(pageSize,currentPage,keyWord){
    $.ajax({
        "url": "/repair/admin/getOrderList",
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
        },
        "data": '{\"pageSize\":\"'+pageSize+'\",\"currentPage\":\"'+currentPage+'\",\"keyWord\":\"'+keyWord+'\"}',
        "dataType": "json",
        "success": function (data) {
            if(data != null ){
                list = data.list;
                $(".table").removeClass().addClass("table order");
                $(".table>thead").html(getOrderThHtml());
                $(".table>tbody").html(getOrderListHtml(list));
                tableCssInit();
                updatePages(data.pages,visiblePages,data.pageNum);
            }
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
};
//获取完成订单列表
function getOrderFinishedList(pageSize,currentPage,keyWord){
    $.ajax({
        "url": "/repair/admin/getOrderFinishedList",
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
        },
        "data": '{\"pageSize\":\"'+pageSize+'\",\"currentPage\":\"'+currentPage+'\",\"keyWord\":\"'+keyWord+'\"}',
        "dataType": "json",
        "success": function (data) {
            if(data != null ){
                list = data.list;
                $(".table").removeClass().addClass("table order_finished");
                $(".table>thead").html(getOrderFinishedThHtml());
                $(".table>tbody").html(getOrderFinishedListHtml(list));
                tableCssInit();
                updatePages(data.pages,visiblePages,data.pageNum);
            }
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
};
//获取运维人员列表
function getOperatorList(pageSize,currentPage,keyWord){
    $.ajax({
        "url": "/repair/admin/getOperatorList",
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
        },
        "data": '{\"pageSize\":\"'+pageSize+'\",\"currentPage\":\"'+currentPage+'\",\"keyWord\":\"'+keyWord+'\"}',
        "dataType": "json",
        "success": function (data) {
            if(data != null ){
                list = data.list;
                $(".table").removeClass().addClass("table operator");
                $(".table>thead").html(getOperatorThHtml());
                $(".table>tbody").html(getOperatorListHtml(list));
                tableCssInit();
                updatePages(data.pages,visiblePages,data.pageNum);
            }
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
};
//获取用户列表
function getUserList(pageSize,currentPage,keyWord){
    $.ajax({
        "url": "/repair/admin/getUserList",
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
        },
        "data": '{\"pageSize\":\"'+pageSize+'\",\"currentPage\":\"'+currentPage+'\",\"keyWord\":\"'+keyWord+'\"}',
        "dataType": "json",
        "success": function (data) {
            if(data != null ){
                list = data.list;
                $(".table").removeClass().addClass("table user");
                $(".table>thead").html(getUserThHtml());
                $(".table>tbody").html(getUserListHtml(list));
                tableCssInit();
                updatePages(data.pages,visiblePages,data.pageNum);
            }
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
};
//添加订单
function addOrder() {
    var order = new Object();
    var userID = $(".form .body input.user").val();
    var location = $(".form .body input.location").val();
    var phone = $(".form .body input.phone").val();
    var beginTime = $(".form .body input.beginTime").val();
    var userDescription = $(".form .body textarea.userDescription").val();
    var repairemnt = $(".form .body textarea.repairment").val();
    order.userID = userID;
    order.location = location;
    order.phone = phone;
    order.beginTime = beginTime;
    order.userDescription = userDescription;
    order.repairment = repairemnt;
    $.ajax({
        "url": "/repair/admin/addOrder",
        "method": "post",
        "async":false,
        "headers": {
            "Content-Type": "application/json",
        },
        "data": JSON.stringify(order),
        "dataType": "json",
        "success": function (data) {
            if(data.message == 'true'){
                lidInit();
                getList($("#pageSize").val(),$("#currentPage").val());
            }else{
                alert(data.message);
            }
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
};
//更新订单
function updateOrder() {
    var userDescription = $(".form .body textarea.userDescription").val();
    var description = $(".form .body textarea.description").val();
    var repairemnt = $(".form .body textarea.repairment").val();
    editItem.userDescription = userDescription;
    editItem.description = description;
    editItem.repairment = repairemnt;
    editItem = changeObjToMapString(editItem);
    $.ajax({
        "url": "/repair/admin/updateOrder",
        "method": "post",
        "async":false,
        "headers": {
            "Content-Type": "application/json",
        },
        "data": JSON.stringify(editItem),
        "dataType": "json",
        "success": function (data) {
            if(data.message == 'true'){
                lidInit();
                getList($("#pageSize").val(),$("#currentPage").val());
            }else{
                alert(data.message);
            }
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
};
//更新已完成订单
function updateOrderFinished() {
    var operator = selectList[$(".form .body .operator>option:selected").index()];
    var userDescription = $(".form .body textarea.userDescription").val();
    var description = $(".form .body textarea.description").val();
    var repairemnt = $(".form .body textarea.repairment").val();
    editItem.operator = operator;
    editItem.userDescription = userDescription;
    editItem.description = description;
    editItem.repairment = repairemnt;
    editItem = changeObjToMapString(editItem);
    $.ajax({
        "url": "/repair/admin/updateOrder",
        "method": "post",
        "async":false,
        "headers": {
            "Content-Type": "application/json",
        },
        "data": JSON.stringify(editItem),
        "dataType": "json",
        "success": function (data) {
            if(data.message == 'true'){
                lidInit();
                getList($("#pageSize").val(),$("#currentPage").val());
            }else{
                alert(data.message);
            }
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
};
//添加运维
function addOperator() {
    var operator = new Object();
    var id = $(".form .body input.id").val();
    var name = $(".form .body input.name").val();
    var phone = $(".form .body input.phone").val();
    operator.id = id;
    operator.name = name;
    operator.phone = phone;
    $.ajax({
        "url": "/repair/admin/addOperator",
        "method": "post",
        "async":false,
        "headers": {
            "Content-Type": "application/json",
        },
        "data": JSON.stringify(operator),
        "dataType": "json",
        "success": function (data) {
            if(data.message == 'true'){
                lidInit();
                getList($("#pageSize").val(),$("#currentPage").val());
            }else{
                alert(data.message);
            }
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
};
//更新运维
function updateOperator() {
    var name = $(".form .body input.name").val();
    var phone = $(".form .body input.phone").val();
    editItem.name = name;
    editItem.phone = phone;
    $.ajax({
        "url": "/repair/admin/updateOperator",
        "method": "post",
        "async":false,
        "headers": {
            "Content-Type": "application/json",
        },
        "data": JSON.stringify(editItem),
        "dataType": "json",
        "success": function (data) {
            if(data.message == 'true'){
                lidInit();
                getList($("#pageSize").val(),$("#currentPage").val());
            }else{
                alert(data.message);
            }
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
};
//添加用户
function addUser() {
    var user = new Object();
    var id = $(".form .body input.id").val();
    var name = $(".form .body input.name").val();
    var phone = $(".form .body input.phone").val();
    user.id = id;
    user.name = name;
    user.phone = phone;
    $.ajax({
        "url": "/repair/admin/addUser",
        "method": "post",
        "async":false,
        "headers": {
            "Content-Type": "application/json",
        },
        "data": JSON.stringify(user),
        "dataType": "json",
        "success": function (data) {
            if(data.message == 'true'){
                lidInit();
                getList($("#pageSize").val(),$("#currentPage").val());
            }else{
                alert(data.message);
            }
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
};
//更新用户
function updateUser() {
    var name = $(".form .body input.name").val();
    var phone = $(".form .body input.phone").val();
    editItem.name = name;
    editItem.phone = phone;
    $.ajax({
        "url": "/repair/admin/updateUser",
        "method": "post",
        "async":false,
        "headers": {
            "Content-Type": "application/json",
        },
        "data": JSON.stringify(editItem),
        "dataType": "json",
        "success": function (data) {
            if(data.message == 'true'){
                lidInit();
                getList($("#pageSize").val(),$("#currentPage").val());
            }else{
                alert(data.message);
            }
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
};