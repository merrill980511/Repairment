$(function () {
    lidInit();
    //标准下拉框
    $(".dropdown-toggle").on("click",function () {
        var others = $(".options").not($(this).nextAll(".options"));
        others.hide();
        $(this).nextAll(".options").slideToggle();
    });
    //左侧导航栏下拉框
    $(".first-level>li>a").on("click",function () {
        var others = $(this).parents("li").siblings().find("a");
        others.each(function () {
            initSlidIcon($(this));
            $(this).nextAll(".second-level").slideUp();
        });
        switchSlidIcon($(this));
        $(this).nextAll(".second-level").slideToggle();
    });
    //标准下拉框选项点击
    $(".options a").on("click",function () {
        $(this).parents(".options").hide();
    });
    //表格中标准下拉框选项点击
    $(".panel-default .options a").on("click",function () {
        $(this).parents(".options").prevAll(".dropdown-toggle").html($(this).text()+"<i class=\"iconfont icon-xiajiantou\"></i>");
        var newPanelItem = $(this).attr("panel-item");
        var oldPanelItem = $(this).parents(".header").find(".panel-item").val();
        if(newPanelItem != oldPanelItem){
            $(this).parents(".header").find(".panel-item").val(newPanelItem);
            $(".panel-default .header .panel-item").change();
            $(".footer .addItem").removeClass().addClass("addItem").addClass(newPanelItem);
        }
    });
    //关闭按钮
    $(".lid").on("click",".closeAction",function () {
        lidInit();
        $(".lid .dialog").hide();
        $(".lid .form").hide();
        $(".lid").hide() ;
    });
    //取消按钮
    $(".lid").on("click",".cancelAction",function () {
        lidInit();
        $(".lid .dialog").hide();
        $(".lid .form").hide();
        $(".lid").hide();
    });
    //管理员修改个人信息
    $(".editAdmin").on("click",function(){
        var id = $.cookie("id");
        showForm(id,"修改密码","确认修改","取消修改","editAction editAdminAction");
        setAdminFormInfo();
    });
    //确认修改密码
    $(".form").on("click",".editAdminAction",function () {
        if(isSubmit()){
            var id = $(".form").attr("item-id");
            var password = $(".lid .form .body input.password").val();
            updatePassword(id,password);
        }
    });
    //修改表项
    $(".panel-default .header .panel-item").on("change",function () {
        $(".keyWord").val("");
        getPages(totalPages,visiblePages,currentPage);
    });
    //点击关键词搜索
    $(".searchAction").on("click",function () {
        getList($("#pageSize").val(),$("#currentPage").val());
    });
    //同意请假单
    $(".form").on("click",".agreeLeaveAction",function () {
        var id = $(".form").attr("item-id");
        agreeLeaveAction(id);
    });
    //驳回请假单
    $(".form").on("click",".disagreeLeaveAction",function () {
        var id = $(".form").attr("item-id");
        disagreeLeaveAction(id);
    });
    //查看未审核请假单
    $(".panel-default").on("click",".notReadLeave .view",function () {
        var id = $(this).parents("tr").attr("item-id");
        showLeaveForm(id,"请求详情","同意","驳回","agreeLeaveAction","disagreeLeaveAction");
        $(".form .body").html(getViewLeaveFormBodyHTML(getItem(id,"getLeave")));
    });
    //查看已审核请假单
    $(".panel-default").on("click",".haveReadLeave .view",function () {
        var id = $(this).parents("tr").attr("item-id");
        showViewForm(id,"请求详情");
        $(".form .body").html(getViewLeaveFormBodyHTML(getItem(id,"getLeave")));
    });
    //查看订单
    $(".panel-default").on("click",".order .view",function () {
        var id = $(this).parents("tr").attr("item-id");
        showViewForm(id,"问题详情");
        $(".form .body").html(getViewOrderFormBodyHTML(getItem(id,"getOrder")));
    });
    //查看完成订单
    $(".panel-default").on("click",".order_finished .view",function () {
        var id = $(this).parents("tr").attr("item-id");
        showViewForm(id,"问题详情");
        $(".form .body").html(getViewOrderFinishedFormBodyHTML(getItem(id,"getOrder")));
    });
    //查看运维
    $(".panel-default").on("click",".operator .view",function () {
        var id = $(this).parents("tr").attr("item-id");
        showViewForm(id,"运维人员详情");
        $(".form .body").html(getViewOperatorFormBodyHTML(getItem(id,"getOperator")));
    });
    //查看用户
    $(".panel-default").on("click",".user .view",function () {
        var id = $(this).parents("tr").attr("item-id");
        showViewForm(id,"用户详情");
        $(".form .body").html(getViewUserFormBodyHTML(getItem(id,"getUser")));
    });
});
$(document).ready(function () {
    indexHeightInit();
});
//本地获取运维
function getOperator(id) {
    var operator = null;
    for(var i in operatorList){
        if(operatorList[i].id == id){
            operator = operatorList[i];
        }
    }
    return operator;
}
//本地获取运维
function getOperatorByScheduleList(index,id) {
    var operator = null;
    for(var i in operatorListBySchedule[index]){
        if(operatorListBySchedule[index][i].id == id){
            operator = operatorListBySchedule[index][i];
        }
    }
    return operator;
}