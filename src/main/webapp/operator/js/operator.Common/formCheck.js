var onSubmit = true;
$(function () {
    $(".helpPanel").on("blur","input.date",function () {
        var checkDate = false;
        var date = $(this).val();
        if(!isNotNull(date)){
            $(this).nextAll(".errorMessage").show();
            $(this).nextAll(".errorMessage").children("label").text("请假日期不能为空！");
        }else{
            $(this).nextAll(".errorMessage").hide();
            checkDate =  true;
        }
        onSubmit = onSubmit&&checkDate;
    });
    $(".helpPanel").on("blur","select.number",function () {
        var checkNumber = false;
        var number = $(this).val();
        if(!isNotNull(number)||number == "-2"){
            $(this).nextAll(".errorMessage").show();
            $(this).nextAll(".errorMessage").children("label").text("请选择请假时间！");
        }else{
            $(this).nextAll(".errorMessage").hide();
            checkNumber =  true;
        }
        onSubmit = onSubmit&&checkNumber;
    });
    $(".helpPanel").on("blur","textarea.description",function () {
        var checkDescription = false;
        var description = $(this).val();
        if(!isNotNull(description)){
            $(this).nextAll(".errorMessage").show();
            $(this).nextAll(".errorMessage").children("label").text("请假缘由不能为空！");
        }else{
            $(this).nextAll(".errorMessage").hide();
            checkDescription =  true;
        }
        onSubmit = onSubmit&&checkDescription;
    });
});
//检测是否为空
function isNotNull(value) {
    if(value != ""){
        return true;
    }else{
        return false;
    }
};
function isSubmit() {
    onSubmit = true;
    $(".helpPanel").find(".content:enabled").each(function () {
        $(this).blur();
    });
    return onSubmit;
}
