//通用
//遮罩初始化
function lidInit() {
    dialogInit();
    formInit();
    $(".lid").hide();
}
//左侧导航栏高度初始化
function indexHeightInit() {
    var windowHeight = $(document).height()
    $(".left-index").height(windowHeight);
}
//表格css初始化
function tableCssInit() {
    var thNum = $(".table thead th").length;
    $(".table thead th").css("min-width","calc(100% / "+thNum+")");
    $(".table tbody td").css("min-width","calc(100% / "+thNum+")");
};
//左侧导航栏下拉框图标变换
function switchSlidIcon(div){
    var icon = div.children(".slidIcon");
    if(icon.hasClass("icon-right")){
        icon.removeClass("icon-right").addClass("icon-up");
    }else if(icon.hasClass("icon-up")){
        icon.removeClass("icon-up").addClass("icon-right");
    }
};
//左侧导航栏下拉框图标初始化
function initSlidIcon(div){
    var icon = div.children(".slidIcon");
    icon.removeClass("icon-up").addClass("icon-right");
};
//首页
//首页初始化
function indexInit() {
    getOverview();
    getOrderChart(7);
    getAttendenceChart(8);
    getOrderSortByNum(5);
    getLeaveListByNum(5)
    getCurrentOperatorList();
    indexHeightInit();
}
//订单表格初始化
function orderTableInit() {
    $(".orderTable .table tr").each(function () {
        $(this).html('<td><label class="location left">&emsp;</label><label class="time right">&emsp;</label></td>');
    });
    $(".orderTable .footer .btn").html('0个未处理问题<i class="iconfont icon-right"></i>');
}
//请假单表格初始化
function leaveTableInit() {
    $(".leaveTable .table tr").each(function () {
        $(this).html('<td><label class="name left">&emsp;</label><label class="time right">&emsp;</label></td>');
    });
    $(".leaveTable .footer .btn").html('0个未处理请求<i class="iconfont icon-right"></i>');
}
//考勤
//值班表初始化
function scheduleTableInit() {
    lidInit();
    $("th:not(.first-col)").each(function (index,item) {
        $(this).attr("date-item",new Date(weekDateList[index]).Format("yyyy-MM-dd"));
        $(this).append("&nbsp;("+new Date(weekDateList[index]).Format("MM-dd")+")");
    });
    getTotalScheduleList();
    setScheduleTableInfo();
}