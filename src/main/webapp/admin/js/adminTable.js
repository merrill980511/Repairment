var totalPages = 1;
var visiblePages = 5;
var currentPage = 1;
var list = [];
var formList = [];
$(function () {
    getPages(totalPages,visiblePages,currentPage);
    $(".panel-default .header .panel-item").on("change",function () {
        getPages(totalPages,visiblePages,currentPage);
    });
    //确认修改订单
    $(".panel-default").on("click",".order .edit",function () {
        var id = $(this).parents(".order").attr("item-id");
        showForm(id,"问题详情",formList,"确认修改","取消修改","editAction editOrderAction");
    });
    //确认删除订单
    $(".panel-default").on("click",".order .delete",function () {
        var id = $(this).parents(".order").attr("item-id");
        showDialog(id,"删除问题","确认删除该问题？","确认删除","取消删除","deleteAction deleteOrderAction");
    });
    //确认修改完成订单
    $(".panel-default").on("click",".order_finished .edit",function () {
        var id = $(this).parents(".order_finished").attr("item-id");
        showForm(id,"问题详情",formList,"确认修改","取消修改","editAction editOrderFinishedAction");
    });
    //确认删除完成订单
    $(".panel-default").on("click",".order_finished .delete",function () {
        var id = $(this).parents(".order_finished").attr("item-id");
        showDialog(id,"删除问题","确认删除该问题？","确认删除","取消删除","deleteAction deleteOrderFinishedAction");
    });
    //确认修改运维人员
    $(".panel-default").on("click",".operator .edit",function () {
        var id = $(this).parents(".operator").attr("item-id");
        showForm(id,"运维人员详情",formList,"确认修改","取消修改","editAction editOperatorAction");
    });
    //确认删除运维人员
    $(".panel-default").on("click",".operator .delete",function () {
        var id = $(this).parents(".operator").attr("item-id");
        showDialog(id,"删除运维人员","确认删除该运维人员？","确认删除","取消删除","deleteAction deleteOperatorAction");
    });
    //确认修改用户
    $(".panel-default").on("click",".user .edit",function () {
        var id = $(this).parents(".user").attr("item-id");
        showForm(id,"用户详情",formList,"确认修改","取消修改","editAction editUserAction");
    });
    //确认删除用户
    $(".panel-default").on("click",".user .delete",function () {
        var id = $(this).parents(".user").attr("item-id");
        showDialog(id,"删除用户","确认删除该用户？","确认删除","取消删除","deleteAction deleteUserAction");
    });
    //删除订单
    $(".dialog").on("click",".deleteOrderAction",function () {
        var id = $(this).parent(".dialog").attr("item-id");
        deleteItem(id,"deleteOrder");
    });
    //删除完成订单
    $(".dialog").on("click",".deleteOrderFinishedAction",function () {
        var id = $(this).parent(".dialog").attr("item-id");
        deleteItem(id,"deleteOrderFinished");
    });
    //删除运维人员
    $(".dialog").on("click",".deleteOperatorAction",function () {
        var id = $(this).parent(".dialog").attr("item-id");
        deleteItem(id,"deleteOperator");
    });
    //删除用户
    $(".dialog").on("click","deleteUserAction",function () {
        var id = $(this).parent(".dialog").attr("item-id");
        deleteItem(id,"deleteUser");
    });
});
//获取表格数据
function getList(pageSize,currentPage) {
    var panelItem = $(".panel-default .header").find(".panel-item").val();
    switch (panelItem) {
        case "order":
            getOrderList(pageSize,currentPage);
            break;
        case "order-finished":
            getOrderFinishedList(pageSize,currentPage);
            break;
        case "operator":
            getOperatorList(pageSize,currentPage);
            break;
        case "user":
            getUserList(pageSize,currentPage);
            break;
        default:
            break;
    }
}
//获取订单数据
function getOrderList(pageSize,currentPage){
    $.ajax({
        "url": "/repair/admin/commit/getOrderList",
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
            "token":getToken(),
        },
        "data": '{\"pageSize\":\"'+pageSize+'\",\"currentPage\":\"'+currentPage+'\"}',
        "dataType": "json",
        "success": function (data) {
            if(data != null ){
                list = data.list;
                $(".table").removeClass().addClass("table order");
                $(".table>thead").html(getOrderThHtml());
                $(".table>tbody").html(getOrderListHtml(list));
                tableCssInit();
                updatePages(data.pageNum,visiblePages,data.pages);
            }
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
};
//获取完成订单数据
function getOrderFinishedList(pageSize,currentPage){
    $.ajax({
        "url": "/repair/admin/commit/getOrderFinishedList",
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
            "token":getToken(),
        },
        "data": '{\"pageSize\":\"'+pageSize+'\",\"currentPage\":\"'+currentPage+'\"}',
        "dataType": "json",
        "success": function (data) {
            if(data != null ){
                list = data.list;
                $(".table").removeClass().addClass("table order_finished");
                $(".table>thead").html(getOrderFinishedThHtml());
                $(".table>tbody").html(getOrderFinishedListHtml(list));
                tableCssInit();
                updatePages(data.pageNum,visiblePages,data.pages);
            }
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
};
//获取运维人员数据
function getOperatorList(pageSize,currentPage){
    $.ajax({
        "url": "/repair/admin/commit/getOperatorList",
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
            "token":getToken(),
        },
        "data": '{\"pageSize\":\"'+pageSize+'\",\"currentPage\":\"'+currentPage+'\"}',
        "dataType": "json",
        "success": function (data) {
            if(data != null ){
                list = data.list;
                $(".table").removeClass().addClass("table operator");
                $(".table>thead").html(getOperatorThHtml());
                $(".table>tbody").html(getOperatorListHtml(list));
                tableCssInit();
                updatePages(data.pageNum,visiblePages,data.pages);
            }
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
};
//获取用户数据
function getUserList(pageSize,currentPage){
    $.ajax({
        "url": "/repair/admin/commit/getUserList",
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
            "token":getToken(),
        },
        headers: {

        },
        "data": '{\"pageSize\":\"'+pageSize+'\",\"currentPage\":\"'+currentPage+'\"}',
        "dataType": "json",
        "success": function (data) {
            if(data != null ){
                list = data.list;
                $(".table").removeClass().addClass("table user");
                $(".table>thead").html(getUserThHtml());
                $(".table>tbody").html(getUserListHtml(list));
                tableCssInit();
                updatePages(data.pageNum,visiblePages,data.pages);
            }
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
};
//格式化order列名
function getOrderThHtml() {
    var orderThHtml = '<tr><th>地点</th><th>报修人</th><th>用户备注</th><th>问题选项</th><th>操作</th></tr>';
    return orderThHtml;
};
//格式化orderFinished列名
function getOrderFinishedThHtml() {
    var orderThHtml = '<tr><th>地点</th><th>报修人</th><th>用户备注</th><th>问题选项</th><th>处理人</th><th>部门备注</th><th>操作</th></tr>';
    return orderThHtml;
};
//格式化operator列名
function getOperatorThHtml() {
    var orderThHtml = '<tr><th>学号</th><th>姓名</th><th>电话</th><th>操作</th></tr>';
    return orderThHtml;
};
//格式化user列名
function getUserThHtml() {
    var orderThHtml = '<tr><th>工号</th><th>姓名</th><th>电话</th><th>操作</th></tr>';
    return orderThHtml;
};
//格式化问题列表
function getOrderListHtml(orderList) {
    var orderListHTML = '';
    for(var i in orderList){
        var colorClass =  (i % 2)?"even":"odd";
        var order = orderList[i];
        var order_user = order.user == null? "":order.user.name;
        orderListHTML += '<tr class="'+colorClass+'" item-id="'+order.id+'">\n' +
            '        <td>'+order.location+'</td><td>'+order_user+'</td><td>'+order.userDescription+'</td><td>'+order.repairment+'</td><td class="action"><i class="edit iconfont icon-edit-solid action" title="修改"></i>&ensp;<i class="delete iconfont icon-delete-solid action" title="删除"></i></td>\n' +
            '    </tr>';
    }
    return orderListHTML;
};
//格式化完成问题列表
function getOrderFinishedListHtml(orderFinishedList) {
    var orderFinishedListHTML = '';
    for(var i in orderFinishedList){
        var colorClass =  (i % 2)?"even":"odd";
        var orderFinished = orderFinishedList[i];
        var orderFinished_user = orderFinished.user == null? "":orderFinished.user.name;
        var orderFinished_operator =  orderFinished.operator == null ? "":orderFinished.operator.name;
        orderFinishedListHTML += '<tr class="'+colorClass+'" item-id="'+orderFinished.id+'">\n' +
            '        <td>'+orderFinished.location+'</td><td>'+orderFinished_user+'</td><td>'+orderFinished.userDescription+'</td><td>'+orderFinished.repairment+'</td><td>'+orderFinished_operator+'</td><td>'+orderFinished.description+'</td><td class="action"><i class="edit iconfont icon-edit-solid action" title="修改"></i>&ensp;<i class="delete iconfont icon-delete-solid action" title="删除"></i></td>\n' +
            '    </tr>';
    }
    return orderFinishedListHTML;
};
//格式化运维人员列表
function getOperatorListHtml(operatorList) {
    var operatorListHTML = '';
    for(var i in operatorList){
        var colorClass =  (i % 2)?"even":"odd";
        var operator = operatorList[i];
        operatorListHTML += '<tr class="'+colorClass+'" item-id="'+operator.id+'">\n' +
            '        <td>'+operator.id+'</td><td>'+operator.name+'</td><td>'+operator.phone+'</td><td class="action"><i class="edit iconfont icon-edit-solid action" title="修改"></i>&ensp;<i class="delete iconfont icon-delete-solid action" title="删除"></i></td>\n' +
            '    </tr>';
    }
    return operatorListHTML;
};
//格式化用户列表
function getUserListHtml(userList) {
    var userListHTML = '';
    for(var i in userList){
        var colorClass =  (i % 2)?"even":"odd";
        var user = userList[i];
        userListHTML += '<tr class="'+colorClass+'" item-id="'+user.id+'">\n' +
            '        <td>'+user.id+'</td><td>'+user.name+'</td><td>'+user.phone+'</td><td class="action"><i class="edit iconfont icon-edit-solid action" title="修改"></i>&ensp;<i class="delete iconfont icon-delete-solid action" title="删除"></i></td>\n' +
            '    </tr>';
    }
    return user;
};
//格式化列名
function getThHtml(obj) {
    var thHtml = '';
    for(var key in obj){
        thHtml += '<th>'+key+'</th>';
    }
    return thHtml;
}
//表格css初始化
function tableCssInit() {
    var thNum = $(".table thead th").length;
    $(".table thead th").css("min-width","calc(100% / "+thNum+")");
    $(".table tbody td").css("min-width","calc(100% / "+thNum+")");
}
//删除数据库表项
function deleteItem(id,url){
    $.ajax({
        "url": url,
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
            "token":getToken(),
        },
        "data": '{\"id\":\"'+id+'\"}',
        "dataType": "json",
        "success": function (data) {
            if(data.message = "true" ){
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
