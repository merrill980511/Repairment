var totalPages = 1;
var visiblePages = 5;
var currentPage = 1;
var list = [];
var editItem = [];
var selectList = [];
var selectItem = [];
$(function () {
    getPages(totalPages,visiblePages,currentPage);
});
$(".panel-default .header .panel-item").on("change",function () {
    $(".keyWord").val("");
    getPages(totalPages,visiblePages,currentPage);
});
$(".searchAction").on("click",function () {
    getList($("#pageSize").val(),$("#currentPage").val());
});
//确认添加订单
$(".panel-default").on("click",".addItem.order",function () {
    var id = $(this).parents("tr").attr("item-id");
    showForm(id,"添加问题","确认添加","取消添加","editAction addOrderAction");
    setAddFormInfo();
});
//确认添加运维人员
$(".panel-default").on("click",".addItem.operator",function () {
    var id = $(this).parents("tr").attr("item-id");
    showForm(id,"添加运维人员","确认添加","取消添加","editAction addOperatorAction");
    setAddFormInfo();
});
//确认添加用户
$(".panel-default").on("click",".addItem.user",function () {
    var id = $(this).parents("tr").attr("item-id");
    showForm(id,"添加用户","确认添加","取消添加","editAction addUserAction");
    setAddFormInfo();
});
//确认修改订单
$(".panel-default").on("click",".order .edit",function () {
    var id = $(this).parents("tr").attr("item-id");
    showForm(id,"问题详情","确认修改","取消修改","editAction editOrderAction");
    setEditFormInfo();
});
//确认删除订单
$(".panel-default").on("click",".order .delete",function () {
    var id = $(this).parents("tr").attr("item-id");
    showDialog(id,"删除问题","确认删除该问题？","确认删除","取消删除","deleteAction deleteOrderAction");
});
//确认修改完成订单
$(".panel-default").on("click",".order_finished .edit",function () {
    var id = $(this).parents("tr").attr("item-id");
    showForm(id,"问题详情","确认修改","取消修改","editAction editOrderFinishedAction");
    setEditFormInfo();
});
//确认删除完成订单
$(".panel-default").on("click",".order_finished .delete",function () {
    var id = $(this).parents("tr").attr("item-id");
    showDialog(id,"删除问题","确认删除该问题？","确认删除","取消删除","deleteAction deleteOrderFinishedAction");
});
//确认修改运维人员
$(".panel-default").on("click",".operator .edit",function () {
    var id = $(this).parents("tr").attr("item-id");
    showForm(id,"运维人员详情","确认修改","取消修改","editAction editOperatorAction");
    setEditFormInfo();
});
//确认删除运维人员
$(".panel-default").on("click",".operator .delete",function () {
    var id = $(this).parents("tr").attr("item-id");
    showDialog(id,"删除运维人员","确认删除该运维人员？","确认删除","取消删除","deleteAction deleteOperatorAction");
});
//确认修改用户
$(".panel-default").on("click",".user .edit",function () {
    var id = $(this).parents("tr").attr("item-id");
    showForm(id,"用户详情","确认修改","取消修改","editAction editUserAction");
    setEditFormInfo();
});
//确认删除用户
$(".panel-default").on("click",".user .delete",function () {
    var id = $(this).parents("tr").attr("item-id");
    showDialog(id,"删除用户","确认删除该用户？","确认删除","取消删除","deleteAction deleteUserAction");
});
//删除订单
$(".dialog").on("click",".deleteOrderAction",function () {
    var id = $(this).parents(".dialog").attr("item-id");
    deleteItem(id,"deleteOrder");
});
//删除完成订单
$(".dialog").on("click",".deleteOrderFinishedAction",function () {
    var id = $(this).parents(".dialog").attr("item-id");
    deleteItem(id,"deleteOrderFinished");
});
//删除运维人员
$(".dialog").on("click",".deleteOperatorAction",function () {
    var id = $(this).parents(".dialog").attr("item-id");
    deleteItem(id,"deleteOperator");
});
//删除用户
$(".dialog").on("click",".deleteUserAction",function () {
    var id = $(this).parents(".dialog").attr("item-id");
    deleteItem(id,"deleteUser");
});
//修改订单
$(".form").on("click",".editOrderAction",function () {
    if(isSubmit()) {
        updateOrder();
    }
});
//修改已完成订单
$(".form").on("click",".editOrderFinishedAction",function () {
    if(isSubmit()) {
        updateOrderFinished();
    }
});
//修改运维人员
$(".form").on("click",".editOperatorAction",function () {
    if(isSubmit()) {
        updateOperator();
    }
});
//修改用户
$(".form").on("click",".editUserAction",function () {
    if(isSubmit()) {
        updateUser();
    }
});
//添加订单
$(".form").on("click",".addOrderAction",function () {
    if(isSubmit()) {
        addOrder();
    }
});
//添加运维
$(".form").on("click",".addOperatorAction",function () {
    if(isSubmit()) {
        addOperator();
    }
});
//添加用户
$(".form").on("click",".addUserAction",function () {
    if(isSubmit()) {
        addUser();
    }
});
//获取表格数据
function getList(pageSize,currentPage) {
    var panelItem = $(".panel-default .header").find(".panel-item").val();
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
        default:
            break;
    };
}
//获取订单数据
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
//获取完成订单数据
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
//获取运维人员数据
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
//获取用户数据
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
            '        <td>'+orderFinished.location+'</td><td>'+orderFinished_user+'</td><td>'+orderFinished.userDescription+'</td><td>'+orderFinished.repairment+'</td><td>'+orderFinished_operator+'</td><td>'+orderFinished.description+'</td><td class="action"><i class="edit iconfont icon-edit-solid action" title="修改"></i></td>\n' +
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
    return userListHTML;
};
//修改数据面板显示
function setEditFormInfo() {
    var panelItem = $(".panel-default .header").find(".panel-item").val();
    var id = $(".form").attr("item-id");
    switch (panelItem) {
        case "order":
            $(".form .body").html(getEditOrderFormBodyHTML(getItem(id,"getOrder")));
            break;
        case "order-finished":
            $(".form .body").html(getEditOrderFinishedFormBodyHTML(getItem(id,"getOrder")));
            break;
        case "operator":
            $(".form .body").html(getEditOperatorFormBodyHTML(getItem(id,"getOperator")));
            break;
        case "user":
            $(".form .body").html(getEditUserFormBodyHTML(getItem(id,"getUser")));
            break;
        default:
            $(".form .body").html("");
            break;
    };
};
//添加数据面板显示
function setAddFormInfo() {
    var panelItem = $(".panel-default .header").find(".panel-item").val();
    var id = $(".form").attr("item-id");
    switch (panelItem) {
        case "order":
            $(".form .body").html(getAddOrderFormBodyHTML(getItem(id,"getOrder")));
            break;
        case "operator":
            $(".form .body").html(getAddOperatorFormBodyHTML(getItem(id,"getOperator")));
            break;
        case "user":
            $(".form .body").html(getAddUserFormBodyHTML(getItem(id,"getUser")));
            break;
        default:
            $(".form .body").html("");
            break;
    };
};
//修改面板
//用户数据面板
function getEditUserFormBodyHTML(user) {
    var userFormBodyHTML =  '<div class="info"><span class="name">工号</span><input type="text" class="content id" value="'+dataLoad(user.id)+'" disabled><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n' +
        '<div class="info"><span class="name">姓名</span><input type="text" class="content name" value="'+dataLoad(user.name)+'"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
        '<div class="info"><span class="name">联系方式</span><input type="text" class="content phone" value="'+dataLoad(user.phone)+'"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n';
    return userFormBodyHTML;
}
//运维数据面板
function getEditOperatorFormBodyHTML(operator) {
    var operatorFormBodyHTML =  '<div class="info"><span class="name">工号</span><input type="text" class="content id" value="'+dataLoad(operator.id)+'" disabled><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n' +
    '<div class="info"><span class="name">姓名</span><input type="text" class="content name" value="'+dataLoad(operator.name)+'"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
    '<div class="info"><span class="name">联系方式</span><input type="text" class="content phone" value="'+dataLoad(operator.phone)+'"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n';
    return operatorFormBodyHTML;
}
//订单数据面板
function getEditOrderFormBodyHTML(order) {
    var order_user = order.user == null? "":order.user.name;
    var orderFormBodyHTML = '<div class="info"><span class="name">报修人</span><input type="text" class="content user" value="'+dataLoad(order_user)+'" disabled><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n' +
    '<div class="info"><span class="name">地点</span><input type="text" class="content location" value="'+dataLoad(order.location)+'" disabled><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
    '<div class="info"><span class="name">预约时间</span><input type="text" class="content beginTime" value="'+dateLoad(dataLoad(order.beginTime))+'" disabled><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
    '<div class="info"><span class="name">用户备注</span><textarea rows="5" class="content userDescription">'+dataLoad(order.userDescription)+'</textarea rows="5"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
    '<div class="info"><span class="name">备注</span><textarea rows="5" class="content description">'+dataLoad(order.description)+'</textarea rows="5"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
    '<div class="info"><span class="name">问题选项</span><textarea rows="5" class="content repairment">'+dataLoad(order.repairment)+'</textarea rows="5"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>';
    return orderFormBodyHTML;
}
//处理完成订单数据面板
function getEditOrderFinishedFormBodyHTML(order) {
    var order_user = order.user == null? "":order.user.name;
    var order_operator =  order.operator == null ? "":order.operator.name;
    var operatorListHtml = "";
    selectList = getAllOperatorList();
    for(var i in selectList){
        operatorListHtml += '<option value="'+selectList[i].name+'">'+selectList[i].name+'</option>';
    }
    var orderFinishedFormBodyHTML = '<div class="info"><span class="name">报修人</span><input type="text" class="content user" value="'+dataLoad(order_user)+'" disabled><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n' +
        '<div class="info"><span class="name">地点</span><input type="text" class="content location" value="'+dataLoad(order.location)+'" disabled><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
        '<div class="info"><span class="name">预约时间</span><input type="text" class="content beginTime" value="'+dateLoad(dataLoad(order.beginTime))+'" disabled><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
        '<div class="info"><span class="name">开始时间</span><input type="text" class="content handleTime" value="'+dateLoad(dataLoad(order.handleTime))+'" disabled><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
        '<div class="info"><span class="name">结束时间</span><input type="text" class="content endTime" value="'+dateLoad(dataLoad(order.endTime))+'" disabled><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
        '<div class="info"><span class="name">处理人</span><select type="text" class="content operator" disabled>' +
         operatorListHtml+
        '</select><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
        '<div class="info"><span class="name">用户备注</span><textarea rows="5" class="content userDescription">'+dataLoad(order.userDescription)+'</textarea rows="5"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
        '<div class="info"><span class="name">备注</span><textarea rows="5" class="content description">'+dataLoad(order.description)+'</textarea rows="5"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
        '<div class="info"><span class="name">问题选项</span><textarea rows="5" class="content repairment">'+dataLoad(order.repairment)+'</textarea rows="5"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>';
    $(".form .body .operator").val(dataLoad(order_operator));
    return orderFinishedFormBodyHTML;
}
//添加面板
//用户数据面板
function getAddUserFormBodyHTML() {
    var userFormBodyHTML =  '<div class="info"><span class="name">工号</span><input type="text" class="content id"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n' +
        '<div class="info"><span class="name">姓名</span><input type="text" class="content name"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
        '<div class="info"><span class="name">联系方式</span><input type="text" class="content phone"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n';
    return userFormBodyHTML;
}
//运维数据面板
function getAddOperatorFormBodyHTML() {
    var operatorFormBodyHTML =  '<div class="info"><span class="name">工号</span><input type="text" class="content id"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n' +
        '<div class="info"><span class="name">姓名</span><input type="text" class="content name"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
        '<div class="info"><span class="name">联系方式</span><input type="text" class="content phone"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n';
    return operatorFormBodyHTML;
}
//订单数据面板
function getAddOrderFormBodyHTML() {
    var orderFormBodyHTML = '<div class="info"><span class="name">报修人（工号）</span><input type="text" class="content user"><div class="tip user"></div><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n' +
        '<div class="info"><span class="name">联系方式</span><input type="text" class="content phone"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n' +
        '<div class="info"><span class="name">地点</span><input type="text" class="content location"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
        '<div class="info"><span class="name">预约时间</span><input type="datetime-local" class="content beginTime"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
        '<div class="info"><span class="name">用户备注</span><textarea rows="5" class="content userDescription"></textarea rows="5"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
        '<div class="info"><span class="name">问题选项</span><textarea rows="5" class="content repairment"></textarea rows="5"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>';
    return orderFormBodyHTML;
}
//格式化列名
function getThHtml(obj) {
    var thHtml = '';
    for(var key in obj){
        thHtml += '<th>'+key+'</th>';
    }
    return thHtml;
}
//删除数据库表项
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
//获得数据面板
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
//添加已完成订单
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
//更新运维
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
function changeObjToMapString(obj) {
    for(var i in obj){
        if(isObj(obj[i])){
            changeObjToMapString(obj[i]);
        }
        obj[i] = obj[i] + "";
    }
    return obj;
}
function isObj(o){
    return (typeof o == 'object');
}