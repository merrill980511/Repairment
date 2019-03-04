$(function () {
    var userID = $("#userID").val();
    pageInit();
    //界面初始化
    function pageInit() {
        if(infoPanelInit()){

        }else{
            formInit();
        }
        var user = getUserInfo(userID);
        $("input.phone").val(user.phone);
    }
    //表单初始化
    function formInit(){
        var date = new Date();
        var beginYear = date.getFullYear();
        date.setDate(date.getDate()+7);
        var endYear = date.getFullYear();
        $(".form").html('<div class="step">\n' +
            '            <label class="name">报修地点</label>\n' +
            '            <div class="select-view">\n' +
            '                <input class="select location" placeholder="请输入保修地点" maxlength="250"/>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '        <div class="step">\n' +
            '            <label class="name">手机号码</label>\n' +
            '            <div class="select-view">\n' +
            '                <input class="select phone" placeholder="请输入手机号码" maxlength="20"/>\n' +
            '            </div>\n' +
            '        </div>\n'+
            '        <div class="step">\n' +
            '            <label class="name">预约时间</label>\n' +
            '            <div class="select-view">\n' +
            '                <input id="reservationTime" class="select reservationTime input" data-options="{\'type\':\'YYYY-MM-DD hh:mm\',\'beginYear\':'+beginYear+',\'endYear\':'+endYear+',\'limitTime\':\'today\'}" type="text" placeholder="请选择预约时间" maxlength="20"/>\n' +
            '            </div>\n' +
            '        </div>'
        );
        $.date("#reservationTime");
        $(".infoPanel").hide();
        $(".form").show();
        return getNextStep(-1);
    };
    //信息面板初始化
    function infoPanelInit(){
        $(".infoPanel").html('<div class="info hide"><label class="title">&emsp;</label><input type="hidden" class="id" value=""></div>\n' +
            '        <div class="info"><label class="title">申&ensp;请&ensp;人：</label><label class="user"></label></div>\n' +
            '        <div class="info"><label class="title">地&emsp;&emsp;点：</label><label class="location"></label></div>\n' +
            '        <div class="info"><label class="title">电&emsp;&emsp;话：</label><label class="phone"></label></div>\n' +
            '        <div class="info"><label class="title">提交时间：</label><label class="beginTime"></label></div>\n' +
            '        <div class="info"><label class="title">预约时间：</label><label class="reservationTime"></label></div>\n' +
            '        <div class="info"><label class="title">处理时间：</label><label class="handleTime"></label></div>\n' +
            '        <div class="info"><label class="title">完成时间：</label><label class="endTime"></label></div>\n' +
            '        <div class="info"><label class="title">状&emsp;&emsp;态：</label><label class="status"></label></div>\n' +
            '        <div class="info"><label class="title">处&ensp;理&ensp;人：</label><label class="operator"></label></div>\n' +
            '        <div class="info"><label class="title">备&emsp;&emsp;注：</label><label class="userDescription"></label></div>\n' +
            '        <div class="info"><label class="title">报修信息：</label><label class="repairment"></label></div>\n' +
            '        <div class="info"><label class="title">&emsp;</label><input type="button" class="finishOrder" value="问题已解决"></div>');
        return getOrder(userID);
    };
    //提示面板初始化
    function helpPanelInit(){
        $(".helpPanel").html('<div class="helpPanel_top">\n' +
            '            <label class="helpPanel_title">帮助菜单</label>\n' +
            '            <a href="javascript:;"><img src="/repair/user/images/close.png" title="关闭" class="closeAction"/></a>\n' +
            '        </div>\n' +
            '        <iframe src="" id="helpFrame"></iframe>');
        $("#helpFrame").css('height',"calc(100% - 55px)");
    }
    //选择选项
    $(".form").on("change","select.select",function () {
        $(this).parents(".step").nextAll().remove();
        var selectedOptionID = $(this).find("option:selected").val();
        getNextStep(selectedOptionID);
    });
    //点击链接
    $(".form").on("click","a.link",function () {
        helpPanelInit();
        var helpHref = $(this).attr("helpHref");
        var title = $(this).attr("title");
        $("#helpFrame").attr("src",helpHref);
        $(".helpPanel_title").text(title);
        if($(this).parents(".step").hasClass("final")){
            $("#helpFrame").css("height","calc(100% - 55px - 45px)");
            $(".helpPanel").append('<div class="helpPanel_bottom"><input type="button" value="未解决我的网络问题" class="solveFailed"/></div>');
        }
        $(".helpPanel").show();
    });
    //点击关闭
    $(".helpPanel").on("click",".closeAction",function () {
        $("#helpFrame").attr("src","");
        $(".helpPanel").hide();
    });
    //点击未解决
    $(".helpPanel").on("click",".solveFailed",function () {
        $("#helpFrame").attr("src","");
        $(".helpPanel").hide();
        $(".final").nextAll().remove();
        $(".form").append(getSubmitHtml());
    });
    //提交信息
    $(".form").on("click",".submit",function () {
        submitOrder();
    });
    //点击完成订单
    $(".infoPanel").on("click",".finishOrder",function () {
        var orderID = $(this).parents('.infoPanel').find('.id').val();
        finishOrder(orderID);
    });
    //获取信息面板详细信息
    function getOrder(userID) {
        var getOrder = false;
        if(userID != null && userID != '' && userID != 'undefined'){
            $.ajax({
                "url": "/repair/user/getOrder",
                "async": false ,
                "method": "post",
                "headers": {
                    "Content-Type": "application/json",
                },
                "data": '{\"userID\":\"'+userID+'\"}',
                "dataType": "json",
                "success": function (data) {
                    setOrderInfo(data);
                    getOrder = (data.id != null);
                },
                "fail": function () {
                    alert("服务器繁忙，请稍后再试");
                },
            });
            return getOrder;
        }
    };
    //信息面板详细信息置入
    function setOrderInfo(order) {
        if(order.id != null) {
            $(".info>.id").val(order.id);
            $(".info>.user").text(order.user.name);
            $(".info>.location").text(order.location);
            $(".info>.phone").text(order.phone);
            $(".info>.beginTime").text(dateLoad(order.beginTime));
            $(".info>.reservationTime").text(dateLoad(order.reservationTime));
            $(".info>.handleTime").text(dateLoad(order.handleTime));
            $(".info>.endTime").text(dateLoad(order.endTime));
            $(".info>.status").text(getOrderStatus(order.status));
            $(".info>.operator").text(order.operator == null ? "" : order.operator.name);
            $(".info>.repairment").text(order.repairment);
            $(".info>.userDescription").text(order.userDescription);
            $(".form").hide();
            $(".infoPanel").show();
        }
    }
    //获取下一选项步骤
    function getNextStep(selectedOptionID) {
        var getNextStep = false;
        if(selectedOptionID != '-2'){
            $.ajax({
                "url": "/repair/user/nextStep",
                "async": false ,
                "method": "post",
                "headers": {
                    "Content-Type": "application/json",
                },
                "data": '{\"optionID\":\"'+selectedOptionID+'\"}',
                "dataType": "json",
                "success": function (data) {
                    if(data.id != null){
                        if(data.options != null && data.options.length != 0){
                            $(".form").append(getStepHtml(data));
                        }else{
                            $(".form").append(getFinalStepHtml(data));
                        }
                    }else{
                        $(".form").append(getSubmitHtml());
                    }
                    getNextStep =  true;
                },
                "fail": function () {
                    alert("服务器繁忙，请稍后再试");
                },
            });
            return getNextStep;
        }
    };
    //结果提交
    function submitOrder() {
        var phone = $("input.phone").val();
        var reservationTime = $("input.reservationTime").val();
        var location = $("input.location").val();
        var userDescription = $("textarea.userDescription").val();
        var submitOrder = false;
        if(!isNotNull(phone)){
            $(".errorMessage>label").text("手机号不能为空！");
            $(".errorMessage").show();
            return false;
        }else if(!isNotNull(reservationTime)) {
            $(".errorMessage>label").text("预约时间不能为空！");
            $(".errorMessage").show();
            return false;
        }else if(!isNotNull(location)){
            $(".errorMessage>label").text("报修地点不能为空！");
            $(".errorMessage").show();
            return false;
        }else if(!isPhone(phone)){
            $(".errorMessage>label").text("手机号码格式不正确");
            $(".errorMessage").show();
            return false;
        }else{
            $(".errorMessage>label").text("");
            $(".errorMessage").hide();
            $.ajax({
                "url": "/repair/user/submitOrder",
                "method": "post",
                "headers": {
                    "Content-Type": "application/json",
                },
                "data": '{\"userID\":\"'+userID+'\",\"phone\":\"'+phone+'\",\"reservationTime\":\"'+reservationTime+'\",\"location\":\"'+location+'\",\"userDescription\":\"'+userDescription+'\",\"repairment\":\"'+getResult()+'\"}',
                "dataType": "json",
                "success": function (data) {
                    if(data.message == 'true'){
                        pageInit();
                        submitOrder =  true;
                    }else{
                        $(".errorMessage>label").text(data.message);
                        $(".errorMessage").show();
                    }
                },
                "fail": function () {
                    $(".errorMessage>label").text("服务器繁忙，请稍后再试");
                    $(".errorMessage").show();
                },
            });
            return submitOrder;
        }
    }
    //格式化选项步骤代码
    function getStepHtml(step) {
        var optionsHtml = '';
        for(var i in step.options){
            optionsHtml += '<option class="option" value="'+step.options[i].id+'">'+step.options[i].content+'</option>\n';
        }
        var linkHtml = '<a class="link"></a>';
        if(step.link != null &&step.link.name != null&&step.link.name != ''){
            linkHtml += '<a class="link" helpHref="'+step.link.content+'" title="'+step.link.name+'"><img src="/repair/user/images/questionMark.png">'+step.link.name+'</a>\n';
        }
        var stepHtml = ' <div class="step">\n' +
            '            <label class="name">'+step.content+'</label>\n' +
            '            <div class="select-view">\n' +
            '                <select class="select">\n' +
            '                    <option class="option default" value="-2">请选择</option>\n' +
            optionsHtml+
            '                </select>\n' +
            '            </div>\n' +
            linkHtml+
            '        </div>';
        return stepHtml;
    };
    //格式化最终选项步骤代码
    function getFinalStepHtml(step) {
        var linkHtml = '<a class="link"></a>';
        if(step.link != null &&step.link.name != null&&step.link.name != ''){
            linkHtml = '<a class="link" helpHref="'+step.link.content+'" title="'+step.link.name+'"><img src="/repair/user/images/questionMark.png">'+step.link.name+'</a>\n';
        }
        var stepHtml = ' <div class="step final">\n' +
            '            <label class="name">&emsp;</label>\n' +
            '            <div class="select-view">\n' +
            '                <label class="select red">\n' +
            step.name+
            '                </label>\n' +
            '            </div>\n' +
            linkHtml+
            '        </div>';
        return stepHtml;
    };
    //格式化选择结果
    function getResult() {
        var result = '';
        var phone = $("input.phone").val();
        var location = $("input.location").val();
        var userDescription = $("input.userDescription").text();
        result += phone+";"+location+";"+userDescription+";";
        $(".step").each(function () {
            var option = $(this).find("option:selected").text();
            if(option != ""&&option != "undefined"){
                result += option+";";
            }
        });
        return result;
    };
    //格式化备注以及提交按钮
    function getSubmitHtml() {
        var submitHtml = '<div class="step">\n' +
            '            <label class="name">备注</label>\n' +
            '            <div class="select-view">\n' +
            '                <textarea class="select userDescription input" rows="5" placeholder="请输入备注" maxlength="250"></textarea>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '<input type="button" value="提交" class="submit"><br/>' +
            '<div class="errorMessage"><img src="/repair/user/images/error.png"><label></label></div>';
        return submitHtml;
    };
    function finishOrder(orderID){
        $.ajax({
            "url": "/repair/user/finishOrder",
            "method": "post",
            "headers": {
                "Content-Type": "application/json",
            },
            "data": '{\"orderID\":\"'+orderID+'\"}',
            "dataType": "json",
            "success": function (data) {
                if(data.message == 'true'){
                    pageInit();
                }else{
                    alert(data.message);
                }
            },
            "fail": function () {
                alert("服务器繁忙，请稍后再试");
            },
        });
    }
});