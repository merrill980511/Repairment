$(function(){
    var id = $(".id");
    var password = $(".password");
    var loginAction = $("#loginAction");
    //回车
    $(document).on("keydown",function(event){
        if(event.keyCode ==13){
            $("#loginAction").click();
        }
    });
    //点击登录
    loginAction.on("click",function(){
        sendLogin(id,password);
    });
    //登录动作
    function sendLogin(id,password){
        $.ajax({
            "url":"/repair/admin/loginCommit",
            "method":"post",
            "headers": {
                "Content-Type": "application/json",
            },
            "data":"{\"id\":\""+id.val()+"\",\"password\":\""+hex_md5(password.val())+"\"}",
            "dataType":"json",
            "success":function(data){
                if(data.location != null && data.location != ""){
                    $.session.set('id', id.val());
                    $.session.set("isAdmin",data.isAdmin);
                    location.href = data.location;
                    return true;
                }else{
                    alert(data.message);
                }
            },
            "fail":function(data){
                loginAction.next().children("label").text("服务器繁忙，请稍后再试");
                loginAction.next().show();
                return false;
            },
        });
    }
});