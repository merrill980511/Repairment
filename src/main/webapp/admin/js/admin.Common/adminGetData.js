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
        case "todayOrder":
            getTodayOrderList(pageSize,currentPage,keyWord);
            break;
        case "todayOrderFinished":
            getTodayOrderFinishedList(pageSize,currentPage,keyWord);
            break;
        case "operatorBusy":
            getOperatorBusyList(pageSize,currentPage,keyWord);
            break;
        case "operatorFree":
            getOperatorFreeList(pageSize,currentPage,keyWord);
            break;
        default:
            break;
    };
}
//登出
function logout() {
    $.ajax({
        "url": "/repair/admin/logout",
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
        },
        "data": "",
        "dataType": "json",
        "success": function (data) {
        },
        "error": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
    window.location.href = "login";
}
//修改密码
function updatePassword(id,password) {
    var url = "/repair/operator/editPasswordCommit"
    if(isAdmin){
        url = "/repair/admin/editPasswordCommit";
    }
    $.ajax({
        "url": url,
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
        },
        "data": "{\"id\":\""+id+"\",\"password\":\""+hex_md5(password)+"\"}",
        "dataType": "json",
        "success": function (data) {
            if(data.message = "true" ){
                lidInit();
            }else{
                alert(data.message);
            }
        },
        "error": function () {
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
        "error": function () {
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
        "error": function () {
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
        "error": function () {
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
        "error": function () {

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
        "error": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
    return isUser;
};
//首页

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
        "error": function () {
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
        "error": function () {
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
        "error": function () {
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
        "error": function () {
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
        "error": function () {
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
        "error": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
};
//获取今日问题列表
function getTodayOrderList(pageSize,currentPage,keyWord){
    $.ajax({
        "url": "/repair/admin/getTodayOrderList",
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
                $(".table>thead").html(getTodayOrderThHtml());
                $(".table>tbody").html(getTodayOrderListHtml(list));
                tableCssInit();
                updatePages(data.pages,visiblePages,data.pageNum);
            }
        },
        "error": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
};
//获取今日已解决问题列表
function getTodayOrderFinishedList(pageSize,currentPage,keyWord){
    $.ajax({
        "url": "/repair/admin/getTodayOrderFinishedList",
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
                $(".table>thead").html(getOrderFinishedThHtml());
                $(".table>tbody").html(getOrderFinishedListHtml(list));
                tableCssInit();
                updatePages(data.pages,visiblePages,data.pageNum);
            }
        },
        "error": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
};
//获取处理中人员列表
function getOperatorBusyList(pageSize,currentPage,keyWord){
    $.ajax({
        "url": "/repair/admin/getOrderSolvingList",
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
                $(".table>thead").html(getOperatorBusyThHtml());
                $(".table>tbody").html(getOperatorBusyListHtml(list));
                tableCssInit();
                updatePages(data.pages,visiblePages,data.pageNum);
            }
        },
        "error": function () {
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
        "error": function () {
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
        "error": function () {
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
        "error": function () {
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
        "error": function () {
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
        "error": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
};