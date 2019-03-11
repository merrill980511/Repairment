$(function () {
    weekDateList = getWeekDateList(0);
    scheduleTableInit();
    getPages(totalPages,visiblePages,currentPage);
    //编辑排班
    $(".editScheduleAction").on("click",function () {
        var index = $(this).parents("th").index();
        editItem = list[index - 1];
        var date = $(this).parents("th").attr("date-item");
        showForm(date,"编辑排班","确认修改","取消修改","editAction editScheduleAction");
        setEditScheduleFormInfo(editItem);
    });
    //确认修改排班
    $(".form").on("click",".editScheduleAction",function () {
        updateScheduleList(getUpdateScheduleList());
    });
    //改变周次
    $(".panel-default .header .panel-item").on("change",function () {
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
});
//获取总考勤
function getTotalScheduleList() {
    list = [];
    for(var i in weekDateList){
        list.push(getScheduleList(weekDateList[i]));
    }
}
//获取新考勤
function getUpdateScheduleList() {
    var updateScheduleList = editItem;
    var scheduleInfo = $(".form .info");
    scheduleInfo.each(function (index,item) {
        updateScheduleList[index].date = $(".form").attr("item-id");
        updateScheduleList[index].operatorList = [];
        for(var i = 0;i<4;i++){
            updateScheduleList[index].operatorList.push(getOperator($(this).find("select:nth-child("+Number(i)+2+")").val()));
        }
    });
    return updateScheduleList;
}