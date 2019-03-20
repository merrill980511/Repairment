$(function () {
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
        var orderID = $(this).parents(".infoPanel").find("label.id").text();
        updateDescription(orderID,description);
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
    //改变排班表
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
    //改变排班表周次
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
    //请假
    $(".homePanel").on("click",".myLeaveList",function () {
        setMyLeaveList();
    });
    //请假
    $(".homePanel").on("click",".askForLeaveAction",function () {
        setLeaveList();
    });
    //空闲时间安排
    $(".homePanel").on("click",".freeTimeManagementAction",function () {
        setFreeTimeTable();
    });
    //选择空闲时间
    $(".helpPanel").on("click","td:not(.first-col)",function () {
        if($(this).hasClass("selected")){
            $(this).removeClass("selected");
            $(this).attr("item-data","0");
        }else{
            $(this).addClass("selected");
            $(this).attr("item-data","1");
        }
    });
    //提交请假单
    $(".helpPanel").on("click",".submitLeave",function () {
        if(isSubmit()){
            submitLeave();
        }
    });
    //提交空闲时间
    $(".helpPanel").on("click",".submitFreeTimeList",function () {
        if(isSubmit()){
            submitFreeTimeList();
        }
    });
});