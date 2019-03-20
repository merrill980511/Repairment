
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
    $(".infoPanel").html('<div class="info hidden"><label class="title">&ensp;</label><label class="id"></label></div>\n' +
        '        <div class="info"><label class="title">申&ensp;请&ensp;人：</label><label class="user"></label></div>\n' +
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
//helpPanel初始化
function helpPanelInit(){
    $(".helpPanel").html('');
}
//表格初始化
function scheduleTableInit() {
    $(".first-col").each(function (index,item) {
        $(this).attr("date-item",new Date(weekDateList[index]).Format("yyyy-MM-dd"));
    });
    getTotalScheduleList();
    setScheduleTableInfo();
}