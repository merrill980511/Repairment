$(function () {
    $(".form").on("blur",".body input.id",function () {
        var checkId = false;
        var id = $(this).val();
        if(!isNotNull(id)){
            $(this).nextAll(".errorMessage").show();
            $(this).nextAll(".errorMessage").children("label").text("工号不能为空");
        }else{
            $(this).nextAll(".errorMessage").hide();
            checkId =  true;
        }
        onSubmit = onSubmit&&checkId;
    });
    $(".form").on("blur",".body input.name",function () {
        var checkName = false;
        var name = $(this).val();
        if(!isNotNull(name)){
            $(this).nextAll(".errorMessage").show();
            $(this).nextAll(".errorMessage").children("label").text("姓名不能为空");
        }else{
            $(this).nextAll(".errorMessage").hide();
            checkName =  true;
        }
        onSubmit = onSubmit&&checkName;
    });
    $(".form").on("blur",".body input.phone",function () {
        var checkPhone = false;
        var phone = $(this).val();
        if(!isNotNull(phone)){
            $(this).nextAll(".errorMessage").show();
            $(this).nextAll(".errorMessage").children("label").text("联系方式不能为空");
        }else if(!isTel(phone)&&!isPhone(phone)){
            $(this).nextAll(".errorMessage").show();
            $(this).nextAll(".errorMessage").children("label").text("联系方式格式不正确");
        }else{
            $(this).nextAll(".errorMessage").hide();
            checkPhone =  true;
        }
        onSubmit = onSubmit&&checkPhone;
    });
    $(".form").on("focus",".body input.user",function () {
        userData = null;
        $(this).nextAll(".tip").text("");
        $(this).nextAll(".tip").hide();
    });
    $(".form").on("blur",".body input.user",function () {
        var checkUser = false;
        var userId = $(this).val();
        if(!isNotNull(userId)){
            $(this).nextAll(".errorMessage").show();
            $(this).nextAll(".errorMessage").children("label").text("工号不能为空");
        }else if(!isUser(userId)){
            $(this).nextAll(".errorMessage").show();
            $(this).nextAll(".errorMessage").children("label").text("该用户不存在");
        }else{
            var paddingLeft = 16*(userId.length+1) + 10;
            $(this).nextAll(".tip").css("left",paddingLeft);
            $(this).nextAll(".tip").css("width","calc(100% - "+paddingLeft+"px - 10px)");
            $(this).nextAll(".tip").text(dataLoad(userData.name));
            $(this).parents(".form").find("input.phone").val(userData.phone);
            $(this).nextAll(".tip").show();
            $(this).nextAll(".errorMessage").hide();
            checkUser =  true;
        }
        onSubmit = onSubmit&&checkUser;
    });
    $(".form").on("blur",".body input.password",function () {
        var checkPassword = false;
        var password = $(this).val();
        if(!isPassword(password)){
            $(this).nextAll(".errorMessage").show();
            $(this).nextAll(".errorMessage").children("label").text("密码长度8-16，且不能有空格、换行、中文");
        }else{
            $(this).nextAll(".errorMessage").hide();
            checkPassword =  true;
        }
        onSubmit = onSubmit&&checkPassword;
    });
    $(".form").on("blur",".body input.re_password",function () {
        var checkRePassword = false;
        var rePassword = $(this).val();
        var password = $(".lid .form .body input.password").val();
        if(rePassword != password){
            $(this).nextAll(".errorMessage").show();
            $(this).nextAll(".errorMessage").children("label").text("两次密码输入不一致");
        }else{
            $(this).nextAll(".errorMessage").hide();
            checkRePassword =  true;
        }
        onSubmit = onSubmit&&checkRePassword;
    });
});
//检测手机号码格式
function isPhone(phone){
    var reg = /^1[3,5,8]\d{9}$/;
    if(reg.test(phone))
    {
        return true;
    }
    else
    {
        return false;
    }
};
//检测电话格式
function isTel(tel) {
    var reg = /^8611\d{4}$/;
    if(reg.test(tel)){
        return true;
    }else{
        return false;
    }
}
//检测是否为空
function isNotNull(value) {
    if(value != ""){
        return true;
    }else{
        return false;
    }
};
//检测密码格式
function isPassword(password) {
    var reg = /^[^\s\u4e00-\u9fa5]{8,16}$/;
    if(reg.test(password)){
        return true;
    }else {
        return false;
    }
}
//检测是否可提交
function isSubmit() {
    onSubmit = true;
    $(".form").find(".content:enabled").each(function () {
       $(this).blur();
    });
    return onSubmit;
}
