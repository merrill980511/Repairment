$(function(){
    indexHeightInit();
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
        var id = getCookie("id");
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
});
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
//左侧导航栏高度初始化
function indexHeightInit() {
    var windowHeight = $("body").height();
    if($(".center-index").height()>$("body").height()){
        windowHeight = $(".center-index").height();
    }
    $(".left-index").height(windowHeight);
}
//遮罩初始化
function lidInit() {
    dialogInit();
    formInit();
    $(".lid").hide();
}
//对话框初始化
function dialogInit() {
    var dialogHtml = '<div class="header">\n' +
        '            <i class="iconfont icon-close closeAction  action" title="关闭"></i>\n' +
        '        </div>\n' +
        '        <div class="body">\n' +
        '            <div class="info">\n' +
        '                <span class="name"></span>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="footer">\n' +
        '            <button class="confirmAction">确认</button>\n' +
        '            <button class="cancelAction">取消</button>\n' +
        '        </div>';
    $(".lid .dialog").attr("item-id","-2");
    $(".lid .dialog").html(dialogHtml);
    $(".lid .dialog").hide();
};
//对话框显示
function showDialog(id,title,message,confirm,cancel,confirmClass) {
    var dialogHtml = '<div class="header">\n' +
        '            '+title+'<i class="iconfont icon-close closeAction  action" title="关闭"></i>\n' +
        '        </div>\n' +
        '        <div class="body">\n' +
        '            <div class="info">\n' +
        '                <span class="name">'+message+'</span>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="footer">\n' +
        '            <button class="'+confirmClass+'">'+confirm+'</button>\n' +
        '            <button class="cancelAction">'+cancel+'</button>\n' +
        '        </div>';
    $(".lid .dialog").attr("item-id",id);
    $(".lid .dialog").html(dialogHtml);
    $(".lid").show();
    $(".lid .dialog").show();
};
//表单初始化
function formInit() {
    var formHtml = '<div class="header">\n' +
        '            <i class="iconfont icon-close closeAction  action" title="关闭"></i>\n' +
        '<input type="hidden" class="id" value="-2"/>\n'+
        '        </div>\n' +
        '        <div class="body">\n' +
        '        </div>\n' +
        '        <div class="footer">\n' +
        '            <button class="confirmAction">确认</button>\n' +
        '            <button class="cancelAction">取消</button>\n' +
        '        </div>';
    $(".lid .form").attr("item-id","-2");
    $(".lid .form").html(formHtml);
    $(".lid .form").hide();
}
//表单显示
function showForm(id,title,confirm,cancel,confirmClass){
    var formHtml = '<div class="header">\n' +
        '            '+title+'<i class="iconfont icon-close closeAction  action" title="关闭"></i>\n' +
        '<input type="hidden" class="id" value="'+id+'"/>\n'+
        '        </div>\n' +
        '        <div class="body">\n' +
        '        </div>\n' +
        '        <div class="footer">\n' +
        '            <button class="submit '+confirmClass+'">'+confirm+'</button>\n' +
        '            <button class="cancelAction">'+cancel+'</button>\n' +
        '        </div>';
    $(".lid .form").attr("item-id",id);
    $(".lid .form").html(formHtml);
    $(".lid").show();
    $(".lid .form").show();
}
function setAdminFormInfo(){
    $(".lid .form .body").html(getEditAdminFormBodyHTML());
}
function getEditAdminFormBodyHTML() {
    var orderFormBodyHTML = '<div class="info"><span class="name">密码</span><input type="password" class="content password" autocomplete="new-password"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n' +
        '<div class="info"><span class="name">确认密码</span><input type="password" class="content re_password"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n';
    return orderFormBodyHTML;
}
function updatePassword(id,password) {
    $.ajax({
        "url": "/repair/admin/editPasswordCommit",
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
            "token":getToken(),
        },
        "data": "{\"id\":\""+id+"\",\"password\":\""+password+"\"}",
        "dataType": "json",
        "success": function (data) {
            if(data.message = "true" ){
                lidInit();
            }else{
                alert(data.message);
            }
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
}
function addOptionsInTipByItem(item){
    $(".tip.options ul").append('<li><a class="javascript:;">item</a></li>\n');
}
function addOptionsInTipByList(list) {
    for(var i in list){
        addOptionsInTipByItem(list[i]);
    }
}