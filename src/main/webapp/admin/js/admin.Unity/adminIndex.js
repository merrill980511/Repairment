$(function () {
    indexInit();
    //查看应急问题
    $(".orderTable").on("click","td.pointer",function () {
        var id = $(this).attr("item-id");
        showViewForm(id, "问题详情");
        $(".form .body").html(getViewOrderFormBodyHTML(getItem(id, "getOrder")));
    });
    //查看请假单
    $(".leaveTable").on("click","td.pointer",function () {
        var id = $(this).attr("item-id");
        showLeaveForm(id,"请求详情","同意","驳回","agreeLeaveAction","disagreeLeaveAction");
        $(".form .body").html(getViewLeaveFormBodyHTML(getItem(id,"getLeave")));
    });
});