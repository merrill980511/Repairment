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
    //导航
    $(".indexButton").on("click",function () {
        if($("#table-item").val() != $(this).attr("table-item")){
            $("#table-item").val($(this).attr("table-item"));
            scrollTopDiv();
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
    //检索
    $("#page_devide").on("click","#checkAction",function () {
        getList($("#pageSize").val(), $("#currentPage").val());
        scrollTopDiv();
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
    //关闭helpPanel
    $(".helpPanel").on("click",".closeAction",function () {
        homePanelShow();
        helpPanelInit();
    });
    //helpPanel取消操作
    $(".helpPanel").on("click",".cancelAction",function () {
        $(".helpPanel .closeAction").click();
        scrollTopDiv();
    });
    //定时刷新
    setInterval(function () {
        if($("div.table").css("display") != 'none'){
            getList($("#pageSize").val(), $("#currentPage").val());
            scrollTopDiv();
        }
    },1000*30
    );
});
//获取总考勤
function getTotalScheduleList() {
    list = [];
    for(var i in weekDateList){
        list.push(getScheduleList(weekDateList[i]));
    }
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
//回滚
function scrollTopDiv() {
    $("div.table").scrollTop(0);
    $("div.homePanel>.content").scrollTop(0);
    $("div.infoPanel").scrollTop(0);
    $("div.helpPanel>.body").scrollTop(0);
}