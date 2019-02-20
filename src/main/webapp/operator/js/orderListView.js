//全局变量
var visiblePages = 6;
var operatorID = '';
var orderList = [];
$(function () {
    //新建分页
    operatorID = $("#operatorID").val();
    getPages(1,visiblePages,1);
    pageInit();
    //点击我去处理
    $(".table").on("click",".takeOrderAction",function () {
       var index = $(this).parents(".order").index();
       takeOrderAction(operatorID,orderList[index-1]);
    });
});
//界面初始化
function pageInit() {
    tableInit();
}
//表单初始化
function tableInit(){
    $(".table").html('<div class="tr">\n' +
        '        <div class="th location">地点</div><div class="th userDescription">用户备注</div><div class="th repairment">提交表单</div><div class="th action">操作</div>\n' +
        '    </div>');
    $(".infoPanel").hide();
    $(".table").show();
};
//信息面板初始化
function infoPanelInit(order){
    $(".infoPanel").html(' <div class="info"><label class="title">申&ensp;请&ensp;人：</label><label class="user"></label></div>\n' +
        '        <div class="info"><label class="title">地&emsp;&emsp;点：</label><label class="location"></label></div>\n' +
        '        <div class="info"><label class="title">电&emsp;&emsp;话：</label><label class="phone"></label></div>\n' +
        '        <div class="info"><label class="title">预约时间：</label><label class="beginTime"></label></div>\n' +
        '        <div class="info"><label class="title">状&emsp;&emsp;态：</label><label class="status"></label></div>\n' +
        '        <div class="info"><label class="title">处&ensp;理&ensp;人：</label><label class="operator"></label></div>\n' +
        '        <div class="info"><label class="title">备&emsp;&emsp;注：</label><label class="userDescription"></label></div>\n'+
        '        <div class="info"><label class="title">报修信息：</label><label class="repairment"></label></div>\n');
    setOrderInfo(order);
};
//信息面板详细信息置入
function setOrderInfo(order) {
    if(order.id != null) {
        $("label.user").text(order.user.name);
        $("label.location").text(order.location);
        $("label.phone").text(order.phone);
        $("label.beginTime").text(dateLoad(order.beginTime));
        $("label.status").text(getOrderStatus(order.status));
        $("label.operator").text(order.operator == null ? "" : order.operator.name);
        $("label.repairment").text(order.repairment);
        $("label.userDescription").text(order.userDescription);
        $(".table").hide();
        $(".infoPanel").show();
    }
}
//数据获取方法
function getList(pageSize,currentPage) {
    getOrderList(pageSize,currentPage);
}
//获取订单列表
function getOrderList(pageSize,currentPage){
    $.ajax({
        "url": "/repair/operator/getOrderList",
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
        },
        "data": '{\"pageSize\":\"'+pageSize+'\",\"currentPage\":\"'+currentPage+'\"}',
        "dataType": "json",
        "success": function (data) {
            if(data != null ){
                orderList = data.list;
                $(".table").append(getOrderListHtml(orderList));
                updatePages(data.pages,visiblePages,data.pageNum);
            }
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
};
//格式化订单列表
function getOrderListHtml(orderList) {
    var orderListHTML = '';
    var orderListCopyed = $.extend(true, [], orderList);
    for(var i in orderListCopyed){
        var order = orderListCopyed[i];
        var buttonAbled = '';
        if(order.userDescription == null || order.userDescription == ''){
            order.userDescription = "&emsp;";
        }
        if(order.repairment == null || order.repairment == ''){
            order.repairment = "&emsp;";
        }
        if(order.status == '1'){
            buttonAbled = 'disabled';
        }
        orderListHTML += '<div class="tr order">\n' +
            '        <div class="td location">'+order.location+'</div><div class="td userDescription">'+order.userDescription+'</div><div class="td repairment">'+order.repairment+'</div><div class="td action"><input type="button" value="我去处理" class="takeOrderAction" '+buttonAbled+'/></div>\n' +
            '    </div>';
    }
    return orderListHTML;
};
//处理订单
function takeOrderAction(operatorID,order) {
    var orderID = order.id;
    $.ajax({
        "url": "/repair/operator/takeOrder",
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
        },
        "data": '{\"operatorID\":\"'+operatorID+'\",\"orderID\":\"'+orderID+'\"}',
        "dataType": "json",
        "success": function (data) {
            if(data.message == 'true' ){
                order.status = 1;
                infoPanelInit(order);
            }else{
                alert(data.message);
            }
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
}