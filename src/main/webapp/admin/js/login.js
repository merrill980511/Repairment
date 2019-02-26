$(function(){
    var id = $("#id");
    var password = $("#password");
    var loginAction = $("#loginAction");
    //回车
    $(document).on("keydown",function(event){
        if(event.keyCode ==13){
            $("#loginAction").click();
        }
    });
    //账号获得焦点
    id.on("focus",function(){
        id.next().hide();
    });
    //账号失去焦点
    id.on("blur",function(){
        if(!isNotNull(id.val())){
            id.next().children("label").text("账号不能为空");
            id.next().show();
        }else{
            id.next().hide();
        }
    });
    //密码获得焦点
    password.on("focus",function() {
        password.next().hide();
    });
    //密码失去焦点
    password.on("blur",function(){
        if(!isNotNull(password.val())){
            id.next().children("label").text("密码不能为空");
            id.next().show();
        }else{
            id.next().hide();
        }
    });
    //点击登录
    loginAction.on("click",function(){
        if(isNotNull(id.val())&&isNotNull(password.val())){
            loginAction.next().hide();
            sendLogin(id,password);
        }
    });
    //登录动作
    function sendLogin(id,password){
        $.ajax({
            "url":"/repair/admin/loginCommit",
            "method":"post",
            "headers": {
                "Content-Type": "application/json",
            },
            "data":"{\"id\":\""+id.val()+"\",\"password\":\""+password.val()+"\"}",
            "dataType":"json",
            "success":function(data){
                if(data.location != null && data.location != ""){
                    setToken(data.token);
                    location.href = data.location;
                    return true;
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