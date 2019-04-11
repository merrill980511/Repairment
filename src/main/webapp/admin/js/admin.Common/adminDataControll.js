//同意请假
function agreeLeaveAction(id) {
    if(isAdmin){
        $.ajax({
            "url": "/repair/admin/agreeLeave",
            "method": "post",
            "async":false,
            "headers": {
                "Content-Type": "application/json",
            },
            "data": '{\"id\":\"'+id+'\"}',
            "dataType": "json",
            "success": function (data) {
                if(data.message == 'true'){
                    window.location.reload()
                }else{
                    alert(data.message);
                }
            },
            "error": function () {
                alert("服务器繁忙，请稍后再试");
            },
        });
    }
}
//请假驳回
function disagreeLeaveAction(id) {
    if(isAdmin){
        $.ajax({
            "url": "/repair/admin/disagreeLeave",
            "method": "post",
            "async":false,
            "headers": {
                "Content-Type": "application/json",
            },
            "data": '{\"id\":\"'+id+'\"}',
            "dataType": "json",
            "success": function (data) {
                if(data.message == 'true'){
                    window.location.reload()
                }else{
                    alert(data.message);
                }
            },
            "error": function () {
                alert("服务器繁忙，请稍后再试");
            },
        });
    }
}
//获取考勤图数据
function getAttendenceChart(num){
    if(isAdmin){
        var dateList = getDateList(num);
        dateList.splice(num-1,1);
        $.ajax({
            "url": "/repair/admin/getAttendenceRate",
            "method": "post",
            "headers": {
                "Content-Type": "application/json",
            },
            "data": JSON.stringify(dateList),
            "dataType": "json",
            "success": function (data) {
                setAttendenceChart(data,dateList);
            },
            "error": function () {
                alert("服务器繁忙，请稍后再试");
            },
        });
    }
}
//获取当前人员数据
function getCurrentOperatorList(){
    if(isAdmin){
        $.ajax({
            "url": "/repair/admin/getCurrentAttendenceList",
            "method": "post",
            "headers": {
                "Content-Type": "application/json",
            },
            "data": "",
            "dataType": "json",
            "success": function (data) {
                setCurrentOperatorList(data);
            },
            "error": function () {
                alert("服务器繁忙，请稍后再试");
            },
        });
    }
}
//获取请假单列表
function getLeaveListByNum(num) {
    if(isAdmin){
        $.ajax({
            "url": "/repair/admin/getLeaveList",
            "method": "post",
            "headers": {
                "Content-Type": "application/json",
            },
            "data": "{\"number\":\""+num+"\"}",
            "dataType": "json",
            "success": function (data) {
                leaveTableInit();
                for(var i  = 0;i<num;i++){
                    if(data[i] != null){
                        $(".leaveTable .table tr:eq("+i+")").html('<td class="pointer" item-id="'+data[i].id+'"><label class="name left">'+data[i].operator.name+'</label><label class="time right">'+new Date(data[i].date).Format("yyyy-MM-dd")+" "+getWorkTime(data[i].workTime.number)+'</label></td>');
                    }
                }
                $(".leaveTable .footer .btn").html(data.length+'个未处理请求<i class="iconfont icon-right"></i>');
            },
            "error": function () {
                alert("服务器繁忙，请稍后再试");
            },
        });
    }
};

//考勤
//获取单天考勤
function getScheduleList(date) {
    if(isAdmin){
        var scheduleList = null;
        $.ajax({
            "url": "/repair/admin/getScheduleList",
            "method": "post",
            "async":false,
            "headers": {
                "Content-Type": "application/json",
            },
            "data": '{\"date\":'+JSON.stringify(date)+'}',
            "dataType": "json",
            "success": function (data) {
                scheduleList = data;
            },
            "error": function () {
                alert("服务器繁忙，请稍后再试");
            },
        });
        return scheduleList;
    }
}
//获取空闲运维人员列表
function getOperatorListBySchedule(date,number) {
    if(isAdmin){
        var operatorListBySchedule = null;
        $.ajax({
            "url": "/repair/admin/getOperatorListBySchedule",
            "method": "post",
            "async":false,
            "headers": {
                "Content-Type": "application/json",
            },
            "data": "{\"date\":\""+date+"\",\"number\":\""+number+"\"}",
            "dataType": "json",
            "success": function (data) {
                operatorListBySchedule = data;
            },
            "error": function () {
                alert("服务器繁忙，请稍后再试");
            },
        });
        return operatorListBySchedule;
    }
}
//更新考勤
function updateScheduleList(scheduleList) {
    if(isAdmin){
        $.ajax({
            "url": "/repair/admin/updateScheduleList",
            "method": "post",
            "async":false,
            "headers": {
                "Content-Type": "application/json",
            },
            "data": JSON.stringify(scheduleList),
            "dataType": "json",
            "success": function (data) {
                if(data.message == 'true'){
                    scheduleTableInit();
                }else{
                    alert(data.message);
                }
            },
            "error": function () {
                alert("服务器繁忙，请稍后再试");
            },
        });
    }
}
//获取未审核请假列表
function getNotReadLeavList(pageSize,currentPage,keyWord){
    if(isAdmin){
        $.ajax({
            "url": "/repair/admin/getUnReviewedLeaveList",
            "method": "post",
            "headers": {
                "Content-Type": "application/json",
            },
            "data": '{\"pageSize\":\"'+pageSize+'\",\"currentPage\":\"'+currentPage+'\",\"keyWord\":\"'+keyWord+'\"}',
            "dataType": "json",
            "success": function (data) {
                if(data != null ){
                    list = data.list;
                    $(".leave-management .table").removeClass().addClass("table notReadLeave");
                    $(".leave-management .table>thead").html(getLeaveThHtml());
                    $(".leave-management .table>tbody").html(getLeaveListHtml(list));
                    tableCssInit();
                    updatePages(data.pages,visiblePages,data.pageNum);
                }
            },
            "error": function () {
                alert("服务器繁忙，请稍后再试");
            },
        });
    }
};
//获取已审核请假列表
function getHaveReadLeavList(pageSize,currentPage,keyWord){
    if(isAdmin){
        $.ajax({
            "url": "/repair/admin/getReviewedLeaveList",
            "method": "post",
            "headers": {
                "Content-Type": "application/json",
            },
            "data": '{\"pageSize\":\"'+pageSize+'\",\"currentPage\":\"'+currentPage+'\",\"keyWord\":\"'+keyWord+'\"}',
            "dataType": "json",
            "success": function (data) {
                if(data != null ){
                    list = data.list;
                    $(".leave-management .table").removeClass().addClass("table haveReadLeave");
                    $(".leave-management .table>thead").html(getLeaveThHtml());
                    $(".leave-management .table>tbody").html(getLeaveListHtml(list));
                    tableCssInit();
                    updatePages(data.pages,visiblePages,data.pageNum);
                }
            },
            "error": function () {
                alert("服务器繁忙，请稍后再试");
            },
        });
    }
};
//获取运维人员列表
function getOperatorList(pageSize,currentPage,keyWord){
    if(isAdmin){
        $.ajax({
            "url": "/repair/admin/getOperatorList",
            "method": "post",
            "headers": {
                "Content-Type": "application/json",
            },
            "data": '{\"pageSize\":\"'+pageSize+'\",\"currentPage\":\"'+currentPage+'\",\"keyWord\":\"'+keyWord+'\"}',
            "dataType": "json",
            "success": function (data) {
                if(data != null ){
                    list = data.list;
                    $(".table").removeClass().addClass("table operator");
                    $(".table>thead").html(getOperatorThHtml());
                    $(".table>tbody").html(getOperatorListHtml(list));
                    tableCssInit();
                    updatePages(data.pages,visiblePages,data.pageNum);
                }
            },
            "error": function () {
                alert("服务器繁忙，请稍后再试");
            },
        });
    }
};
//获取值班室人员列表
function getOperatorFreeList(pageSize,currentPage,keyWord){
    if(isAdmin){
        $.ajax({
            "url": "/repair/admin/getOperatorFreeList",
            "method": "post",
            "headers": {
                "Content-Type": "application/json",
            },
            "data": '{\"pageSize\":\"'+pageSize+'\",\"currentPage\":\"'+currentPage+'\",\"keyWord\":\"'+keyWord+'\"}',
            "dataType": "json",
            "success": function (data) {
                if(data != null ){
                    list = data.list;
                    $(".table").removeClass().addClass("table operator");
                    $(".table>thead").html(getOperatorThHtml());
                    $(".table>tbody").html(getOperatorListHtml(list));
                    tableCssInit();
                    updatePages(data.pages,visiblePages,data.pageNum);
                }
            },
            "error": function () {
                alert("服务器繁忙，请稍后再试");
            },
        });
    }
};
//添加运维
function addOperator() {
    if(isAdmin){
        var operator = new Object();
        operator.openID = userData.openID;
        operator.name = userData.name;
        operator.phone = userData.phone;
        $.ajax({
            "url": "/repair/admin/addOperator",
            "method": "post",
            "async":false,
            "headers": {
                "Content-Type": "application/json",
            },
            "data": JSON.stringify(operator),
            "dataType": "json",
            "success": function (data) {
                if(data.message == 'true'){
                    lidInit();
                    getList($("#pageSize").val(),$("#currentPage").val());
                }else{
                    alert(data.message);
                }
            },
            "error": function () {
                alert("服务器繁忙，请稍后再试");
            },
        });
    }
};
//更新运维
function updateOperator() {
    if(isAdmin){
        var name = $(".form .body input.name").val();
        var phone = $(".form .body input.phone").val();
        editItem.name = name;
        editItem.phone = phone;
        $.ajax({
            "url": "/repair/admin/updateOperator",
            "method": "post",
            "async":false,
            "headers": {
                "Content-Type": "application/json",
            },
            "data": JSON.stringify(editItem),
            "dataType": "json",
            "success": function (data) {
                if(data.message == 'true'){
                    lidInit();
                    getList($("#pageSize").val(),$("#currentPage").val());
                }else{
                    alert(data.message);
                }
            },
            "error": function () {
                alert("服务器繁忙，请稍后再试");
            },
        });
    }
};