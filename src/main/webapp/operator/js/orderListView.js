//全局变量
var visiblePages = 6;
var operatorID = '';
var orderList = [];
var orderItem;
var operatorName;
$(function () {
    operatorID = $("#operatorID").val();
    //初始化
    pageInit();
    //隐藏多选项
    $(document).click(function(){
        $(".options").hide();
    });
    $(".homePanel").on("click",".select *",function(){
        event.stopPropagation();
    });
    $(".indexSelectItem").on("click",function () {
        event.stopPropagation();
    });
    $(".indexSelectItem").on("click","*",function () {
        event.stopPropagation();
    });
    //点击我去处理
    $(".infoPanel").on("click",".takeOrderAction",function () {
        takeOrderAction(operatorID,orderItem);
    });
    //点击查看信息
    $("div.table").on("click",".displayOrderAction",function () {
        var index = $(this).parents(".order").index();
        infoPanelInit();
        setOrderInfo(getOrder(orderList[index-1].id),$("#table-item").val() == 'order-finished');
    });
    //导航
    $(".indexButton").on("click",function () {
        if($("#table-item").val() != $(this).attr("table-item")){
            $("#table-item").val($(this).attr("table-item"));
            $("#table-item").change();
        }
    });
    //多选项
    $(".indexSelectItem").on("click",function () {
        var others = $(".options").not($(this).nextAll(".options"));
        others.hide();
        $(this).nextAll(".options").slideToggle();
    });
    //打卡导航
    $(".checkIn").on("click",function () {
       homePanelShow();
        setHomePanelInfo(getMyAttendence(operatorID));
    });
    //处理中导航
    $(".handlingOrder").on("click",function () {
        infoPanelInit();
        setOrderInfo(getOrderInHandle(operatorID),false);
    });
    //表格获取
    $("#table-item").on("change",function () {
        if($(this).val() != 'handlingOrder'){
            tableInit();
            getPages(1,visiblePages,1);
        }
    });
    //修改备注
    $(".infoPanel").on("click",".editDescriptionAction",function () {
        var description = $(this).prevAll("label.description").text();
        $(this).prevAll("label.description").replaceWith("<textarea rows='6' placeholder='请输入备注' class='description'>"+description+"</textarea>");
        $(this).css("margin","30px 0px 30px 20px");
        $(this).removeClass("icon-edit-solid").removeClass("editDescriptionAction").addClass("icon-save").addClass("saveDescriptionAction");
    });
    //保存备注
    $(".infoPanel").on("click",".saveDescriptionAction",function () {
        var description = $(this).prevAll("textarea.description").val();
        $(this).prevAll("textarea.description").replaceWith("<label class='description'>"+description+"</label>");
        $(this).css("margin","auto");
        $(this).removeClass("icon-save").removeClass("saveDescriptionAction").addClass("icon-edit-solid").addClass("editDescriptionAction");
    });
    //处理完成
    $(".infoPanel").on("click",".finishOrderAction",function () {
       finishOrder(operatorID);
    });
    //退出视图
    $(".infoPanel").on("click",".quitDisplayOrderAction",function () {
        tableShow();
    });
    //上班打卡
    $(".homePanel").on("click",".checkInAction",function () {
       checkIn(operatorID);
    });
    //下班打卡
    $(".homePanel").on("click",".checkOutAction",function () {
        checkOut(operatorID);
    });
    //检索
    $("#page_devide").on("click","#checkAction",function () {
        getList($("#pageSize").val(), $("#currentPage").val());
    });
    $(".homePanel").on("click",".panel-default .options a",function () {
        $(this).parents(".options").prevAll(".dropdown-toggle").html($(this).text()+"<i class=\"iconfont icon-xiajiantou\"></i>");
        var newPanelItem = $(this).attr("panel-item");
        var oldPanelItem = $(this).parents(".header").find(".panel-item").val();
        if(newPanelItem != oldPanelItem){
            $(this).parents(".header").find(".panel-item").val(newPanelItem);
            $(".panel-default .header .panel-item").change();
            $(".footer .addItem").removeClass().addClass("addItem").addClass(newPanelItem);
        }
    });
    //标准下拉框选项点击
    $(".homePanel").on("click",".options a",function () {
        $(this).parents(".options").hide();
    });
    //标准下拉框
    $(".homePanel").on("click",".dropdown-toggle",function () {
        var others = $(".options").not($(this).nextAll(".options"));
        others.hide();
        $(this).nextAll(".options").slideToggle();
    });
    setInterval(function () {
        if($("div.table").css("display") != 'none'){
            getList($("#pageSize").val(), $("#currentPage").val());
        }
        },1000*30
    );
});
//界面初始化
function pageInit() {
    homePanelInit();
    setHomePanelInfo(getMyAttendence(operatorID));
}
//主页展示
function homePanelShow() {
    $(".helpPanel").hide();
    $(".infoPanel").hide();
    $("div.table").hide();
    $("#page_devide").hide();
    $(".homePanel").show();
}
//表格展示
function tableShow() {
    $(".helpPanel").hide();
    $(".homePanel").hide();
    $(".infoPanel").hide();
    $("div.table").show();
    $("#page_devide").show();
}
//信息面板展示
function infoPanelShow() {
    $(".helpPanel").hide();
    $(".homePanel").hide();
    $("#page_devide").hide();
    $("div.table").hide();
    $(".infoPanel").show();
}
//提示面板展示
function helpPanelShow() {
    $(".homePanel").hide();
    $("#page_devide").hide();
    $("div.table").hide();
    $(".infoPanel").hide();
    $(".helpPanel").show();
}
//主页初始化
function homePanelInit() {
    $(".homePanel").html('<div class="header">\n' +
        '        <span class="name"></span><span class="status free"><i class="iconfont icon-dot"></i>&ensp;休息中</span>\n' +
        '    </div>\n' +
        '    <div class="content">\n' +
        '        <button class="checkWorkAction">打卡</button>\n' +
        '    </div>');
    homePanelShow();
}
//表单初始化
function tableInit(){
    $("div.table").html('<div class="tr">\n' +
        '        <div class="th location">地点</div><div class="th userDescription">用户备注</div><div class="th repairment">提交表单</div><div class="th status">状态</div><div class="th action">操作</div>\n' +
        '    </div>');
    tableShow();
};
//信息面板初始化
function infoPanelInit(){
    $(".infoPanel").html('<div class="info"><label class="title">申&ensp;请&ensp;人：</label><label class="user"></label></div>\n' +
        '        <div class="info"><label class="title">地&emsp;&emsp;点：</label><label class="location"></label></div>\n' +
        '        <div class="info"><label class="title">电&emsp;&emsp;话：</label><label class="phone"></label></div>\n' +
        '        <div class="info"><label class="title">提交时间：</label><label class="beginTime"></label></div>\n' +
        '        <div class="info"><label class="title">预约时间：</label><label class="reservationTime"></label></div>\n' +
        '        <div class="info"><label class="title">处理时间：</label><label class="handleTime"></label></div>\n' +
        '        <div class="info"><label class="title">结束时间：</label><label class="endTime"></label></div>\n' +
        '        <div class="info"><label class="title">状&emsp;&emsp;态：</label><label class="status"></label></div>\n' +
        '        <div class="info"><label class="title">处&ensp;理&ensp;人：</label><label class="operator"></label></div>\n' +
        '        <div class="info"><label class="title">用户备注：</label><label class="userDescription"></label></div>\n'+
        '        <div class="info"><label class="title">报修信息：</label><label class="repairment"></label></div>\n' +
        '        <div class="info"><label class="title">备&emsp;&emsp;注：</label><label class="description"></label></div>');
    infoPanelShow();
};
//主页信息置入
function setHomePanelInfo(attendence) {
    if(attendence != null){
        operatorName = attendence.operator == null?"":attendence.operator.name;
        $(".homePanel .header .name").html(operatorName);
        if(attendence.id != null){
            $(".homePanel .content").html('<button class="checkWorkAction checkOutAction">下班打卡</button>' +
                '<div class="panel-default step-management">\n' +
                '            <div class="header">\n' +
                '                <i class="iconfont icon-calendar-check"></i>考勤安排\n' +
                '                <div class="select">\n' +
                '                    <button class="changeIsMine btn" data-item="my" href="javascript:;" aria-expanded="false">' +
                '                        总体排班' +
                '                    </button>\n' +
                '                    <button class="dropdown-toggle btn" data-toggle="dropdown" href="javascript:;" aria-expanded="false">\n' +
                '                        本周&emsp;&emsp;&emsp;<i class="iconfont icon-xiajiantou"></i>\n' +
                '                    </button>\n' +
                '                    <input type="text" class="hidden panel-item" value="my"/>\n' +
                '                    <div class="hidden options">\n' +
                '                        <ul>\n' +
                '                            <li><a href="javascript:;" panel-item="thisWeek">本周&emsp;&emsp;&emsp;</a></li>\n' +
                '                            <li><a href="javascript:;" panel-item="nextWeek">下周&emsp;&emsp;&emsp;</a></li>\n' +
                '                        </ul>\n' +
                '                    </div>\n' +
                '                </div>\n' +
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
                '                            <td class="mon"></td>\n' +
                '                            <td class="tues"></td>\n' +
                '                            <td class="wed"></td>\n' +
                '                            <td class="thur"></td>\n' +
                '                            <td class="fri"></td>\n' +
                '                            <td class="sat"></td>\n' +
                '                            <td class="sun"></td>\n' +
                '                        </tr>\n' +
                '                        <tr class="schedule_content second even">\n' +
                '                            <td class="first-col">三<br/>四</td>\n' +
                '                            <td class="mon"></td>\n' +
                '                            <td class="tues"></td>\n' +
                '                            <td class="wed"></td>\n' +
                '                            <td class="thur"></td>\n' +
                '                            <td class="fri"></td>\n' +
                '                            <td class="sat"></td>\n' +
                '                            <td class="sun"></td>\n' +
                '                        </tr>\n' +
                '                        <tr class="schedule_content third odd">\n' +
                '                            <td class="first-col">五<br/>六</td>\n' +
                '                            <td class="mon"></td>\n' +
                '                            <td class="tues"></td>\n' +
                '                            <td class="wed"></td>\n' +
                '                            <td class="thur"></td>\n' +
                '                            <td class="fri"></td>\n' +
                '                            <td class="sat"></td>\n' +
                '                            <td class="sun"></td>\n' +
                '                        </tr>\n' +
                '                        <tr class="schedule_content fourth even">\n' +
                '                            <td class="first-col">七<br/>八</td>\n' +
                '                            <td class="mon"></td>\n' +
                '                            <td class="tues"></td>\n' +
                '                            <td class="wed"></td>\n' +
                '                            <td class="thur"></td>\n' +
                '                            <td class="fri"></td>\n' +
                '                            <td class="sat"></td>\n' +
                '                            <td class="sun"></td>\n' +
                '                        </tr>\n' +
                '                    </tbody>\n' +
                '                </table>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '<button class="freeTimeManagementAction">空闲时间安排</button><button class="askForLeaveAction">请假</button>');
            switch (attendence.status) {
                case 0:
                    $(".homePanel .header .status").html('<i class="iconfont icon-dot"></i>&ensp;值班中');
                    $(".homePanel .header .status").removeClass().addClass("status normal");
                    break;
                case 1:
                    $(".homePanel .header .status").html('<i class="iconfont icon-dot"></i>&ensp;外勤中');
                    $(".homePanel .header .status").removeClass().addClass("status busy");
                    break;
                default:
                    $(".homePanel .header .status").html('<i class="iconfont icon-dot"></i>&ensp;异常');
                    $(".homePanel .header .status").removeClass().addClass("status free");
                    break;
            }
        }else{
            $(".homePanel .content").html('<button class="checkWorkAction checkInAction">上班打卡</button>' +
                '<div class="panel-default step-management">\n' +
                '            <div class="header">\n' +
                '                <i class="iconfont icon-calendar-check"></i>考勤安排\n' +
                '                <div class="select">\n' +
                '                    <button class="changeIsMine btn" data-item="my" href="javascript:;" aria-expanded="false">' +
                '                        总体排班' +
                '                    </button>\n' +
                '                    <button class="dropdown-toggle btn" data-toggle="dropdown" href="javascript:;" aria-expanded="false">\n' +
                '                        本周&emsp;&emsp;&emsp;<i class="iconfont icon-xiajiantou"></i>\n' +
                '                    </button>\n' +
                '                    <input type="text" class="hidden panel-item" value="my"/>\n' +
                '                    <div class="hidden options">\n' +
                '                        <ul>\n' +
                '                            <li><a href="javascript:;" panel-item="thisWeek">本周&emsp;&emsp;&emsp;</a></li>\n' +
                '                            <li><a href="javascript:;" panel-item="nextWeek">下周&emsp;&emsp;&emsp;</a></li>\n' +
                '                        </ul>\n' +
                '                    </div>\n' +
                '                </div>\n' +
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
                '                            <td class="mon"></td>\n' +
                '                            <td class="tues"></td>\n' +
                '                            <td class="wed"></td>\n' +
                '                            <td class="thur"></td>\n' +
                '                            <td class="fri"></td>\n' +
                '                            <td class="sat"></td>\n' +
                '                            <td class="sun"></td>\n' +
                '                        </tr>\n' +
                '                        <tr class="schedule_content second even">\n' +
                '                            <td class="first-col">三<br/>四</td>\n' +
                '                            <td class="mon"></td>\n' +
                '                            <td class="tues"></td>\n' +
                '                            <td class="wed"></td>\n' +
                '                            <td class="thur"></td>\n' +
                '                            <td class="fri"></td>\n' +
                '                            <td class="sat"></td>\n' +
                '                            <td class="sun"></td>\n' +
                '                        </tr>\n' +
                '                        <tr class="schedule_content third odd">\n' +
                '                            <td class="first-col">五<br/>六</td>\n' +
                '                            <td class="mon"></td>\n' +
                '                            <td class="tues"></td>\n' +
                '                            <td class="wed"></td>\n' +
                '                            <td class="thur"></td>\n' +
                '                            <td class="fri"></td>\n' +
                '                            <td class="sat"></td>\n' +
                '                            <td class="sun"></td>\n' +
                '                        </tr>\n' +
                '                        <tr class="schedule_content fourth even">\n' +
                '                            <td class="first-col">七<br/>八</td>\n' +
                '                            <td class="mon"></td>\n' +
                '                            <td class="tues"></td>\n' +
                '                            <td class="wed"></td>\n' +
                '                            <td class="thur"></td>\n' +
                '                            <td class="fri"></td>\n' +
                '                            <td class="sat"></td>\n' +
                '                            <td class="sun"></td>\n' +
                '                        </tr>\n' +
                '                    </tbody>\n' +
                '                </table>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '<button class="freeTimeManagementAction">空闲时间安排</button><button class="askForLeaveAction">请假</button>');
            $(".homePanel .header .status").html('<i class="iconfont icon-dot"></i>&ensp;休息中');
            $(".homePanel .header .status").removeClass().addClass("status free");
        }
    }
    weekDateList = getWeekDateList(0);
    scheduleTableInit();
}
//表格信息置入/数据获取方法
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
//信息面板详细信息置入
function setOrderInfo(order,isDisplay) {
    if(order != null && order.id != null) {
        $("label.user").text(order.user == null ? "":order.user.name);
        $("label.location").text(order.location);
        $("label.phone").text(order.phone);
        $("label.beginTime").text(dateLoad(order.beginTime));
        $("label.reservationTime").text(dateLoad(order.reservationTime));
        $("label.handleTime").text(dateLoad(order.handleTime));
        $("label.endTime").text(dateLoad(order.endTime));
        $("label.status").text(getOrderStatus(order.status));
        $("label.operator").text(order.operator == null ? "" : order.operator.name);
        $("label.repairment").text(order.repairment);
        $("label.userDescription").text(order.userDescription);
        $("label.description").text(order.description);
        if(!isDisplay){
            if(order.operator != null && order.operator.id == operatorID && order.status == '1'){
                setFinishedOrderButton();
            }else if(order.status == '0'){
                setTakeOrderButton();
            }
        }
        setQuitOrderButton();
    }else{
        alert("没有该订单！");
        $(".indexButton.order").click();
    }
}
//处理完成按钮置入
function setFinishedOrderButton() {
    $("label.description").parents(".info").append("<i class='iconfont icon-edit-solid editDescriptionAction'></i>");
    $(".infoPanel").append('<div class="info"><label class="title">&emsp;</label><button class="finishOrderAction">处理完成</button></div>');
}
//我去处理按钮置入
function setTakeOrderButton() {
    $(".infoPanel").append('<div class="info"><label class="title">&emsp;</label><button class="takeOrderAction">我去处理</button></div>');
}
//处理完成按钮置入
function setQuitOrderButton() {
    $(".infoPanel").append('<div class="info"><label class="title">&emsp;</label><button class="quitDisplayOrderAction">返回列表</button></div>');
}
//获取订单列表
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
//格式化订单列表
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
//格式化订单列表
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

//格式化订单列表
function getOrderListHtml(orderList) {
    var orderListHTML = '';
    var orderListCopyed = $.extend(true, [], orderList);
    for(var i in orderListCopyed){
        var order = orderListCopyed[i];
        var statusClass = 'standby';
        if(order.userDescription == null || order.userDescription == ''){
            order.userDescription = "&emsp;";
        }
        if(order.repairment == null || order.repairment == ''){
            order.repairment = "&emsp;";
        }
        if(order.status == '1'){
            statusClass = 'handling';
        }
        orderListHTML += '<div class="tr order">\n' +
            '        <div class="td location">'+order.location+'</div><div class="td userDescription">'+order.userDescription+'</div><div class="td repairment">'+order.repairment+'</div><div class="td status '+statusClass+'">'+getOrderStatus(order.status)+'</div><div class="td action"><input type="button" value="查看信息" class="displayOrderAction"/></div>\n' +
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

//获取处理订单
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
//上班打卡
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