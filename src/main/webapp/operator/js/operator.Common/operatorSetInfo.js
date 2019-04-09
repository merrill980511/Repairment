function setMyLeaveList() {
    var leaveList = getMyLeaveList();
    var leaveListHtml = '';
    for(var i in leaveList){
        leaveListHtml += '        <div class="info table-cell">\n' +
            '<span class="date">'+new Date(leaveList[i].date).Format("yyyy-MM-dd")+'</span><span class="time">'+getWorkTime(leaveList[i].workTime.number)+'</span><span class="status">'+getScheduleStatus(leaveList[i].status)+'</span>'+
            '        </div>\n';
    }
    $(".helpPanel").html('<div class="header">\n' +
        '        <label class="title">我的请假单</label>\n' +
        '        <a href="javascript:;"><img src="/repair/user/images/close.png" title="关闭" class="closeAction"/></a>\n' +
        '    </div>\n' +
        '    <div class="body">\n' +
        '        <div class="info table-cell">' +
        '           <span class="date">日期</span><span class="time">时间</span><span class="status">状态</span>'+
        '    </div>\n'+
        leaveListHtml+
        '</div>');
    $.date(".content.date");
    helpPanelShow();
}
//请假单置入
function setLeaveList() {
    var date = new Date();
    var beginYear = date.getFullYear();
    date.setDate(date.getDate()+7);
    var endYear = date.getFullYear();
    $(".helpPanel").html('<div class="header">\n' +
        '        <label class="title">提交请假单</label>\n' +
        '        <a href="javascript:;"><img src="/repair/user/images/close.png" title="关闭" class="closeAction"/></a>\n' +
        '    </div>\n' +
        '    <div class="body">\n' +
        '        <div class="info">\n' +
        '            <span class="name">请假日期</span>\n' +
        '            <input type="text" class="content date" placeholder="请选择请假日期" data-options="{\'type\':\'YYYY-MM-DD\',\'beginYear\':'+beginYear+',\'endYear\':'+endYear+',\'limitTime\':\'today\'}"/>\n' +
        '            <div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div>'+
        '        </div>\n' +
        '        <div class="info">\n' +
        '            <span class="name">请假时间</span>\n' +
        '            <select class="content number">\n' +
        '                <option value="-2">请选择请假时间</option>\n' +
        '                <option value="1">一二节课</option>\n' +
        '                <option value="2">三四节课</option>\n' +
        '                <option value="3">五六节课</option>\n' +
        '                <option value="4">七八节课</option>\n' +
        '            </select>\n' +
        '            <div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div>'+
        '        </div>\n' +
        '        <div class="info">\n' +
        '            <span class="name">请假缘由</span>\n' +
        '            <textarea rows="5" class="content description" placeholder="请输入请假缘由"></textarea>\n' +
        '            <div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div>'+
        '        </div>\n' +
        '        <div class="info">\n' +
        '            <button class="confirmAction submitLeave">提交请假单</button><button class="cancelAction">取消提交</button>\n' +
        '            <div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div>'+
        '        </div>\n' +
        '    </div>');
    $.date(".content.date");
    helpPanelShow();
}
//空闲时间表置入
function setFreeTimeTable() {
    $(".helpPanel").html('<div class="header">\n' +
        '        <label class="title">提交空闲时间表</label>\n' +
        '        <a href="javascript:;"><img src="/repair/user/images/close.png" title="关闭" class="closeAction"/></a>\n' +
        '    </div>\n' +
        '    <div class="body">\n' +
        '<div class="panel-default step-management">\n' +
        '            <div class="header">\n' +
        '                <i class="iconfont icon-calendar-check"></i>空闲时间安排\n' +
        '            </div>\n' +
        '            <div class="body">\n' +
        '                <table class="table schedule">\n' +
        '                    <thead>\n' +
        '                        <tr class="schedule_titile">\n' +
        '                            <th class="first-col">&emsp;</th>\n' +
        '                            <th class="first">一二</th>\n' +
        '                            <th class="second">三四</th>\n' +
        '                            <th class="third">五六</th>\n' +
        '                            <th class="fourth">七八</th>\n' +
        '                        </tr>\n' +
        '                    </thead>\n' +
        '                    <tbody>\n' +
        '                        <tr class="schedule_content odd">\n' +
        '                            <td class="first-col">周<br/>一</td>\n' +
        '                            <td class="first" item-data="0"></td>\n' +
        '                            <td class="second" item-data="0"></td>\n' +
        '                            <td class="third" item-data="0"></td>\n' +
        '                            <td class="fourth" item-data="0"></td>\n' +
        '                        </tr>\n' +
        '                        <tr class="schedule_content even">\n' +
        '                            <td class="first-col">周<br/>二</td>\n' +
        '                            <td class="first" item-data="0"></td>\n' +
        '                            <td class="second" item-data="0"></td>\n' +
        '                            <td class="third" item-data="0"></td>\n' +
        '                            <td class="fourth" item-data="0"></td>\n' +
        '                        </tr>\n' +
        '                        <tr class="schedule_content odd">\n' +
        '                            <td class="first-col">周<br/>三</td>\n' +
        '                            <td class="first" item-data="0"></td>\n' +
        '                            <td class="second" item-data="0"></td>\n' +
        '                            <td class="third" item-data="0"></td>\n' +
        '                            <td class="fourth" item-data="0"></td>\n' +
        '                        </tr>\n' +
        '                        <tr class="schedule_content even">\n' +
        '                            <td class="first-col">周<br/>四</td>\n' +
        '                            <td class="first" item-data="0"></td>\n' +
        '                            <td class="second" item-data="0"></td>\n' +
        '                            <td class="third" item-data="0"></td>\n' +
        '                            <td class="fourth" item-data="0"></td>\n' +
        '                        </tr>\n' +
        '                        <tr class="schedule_content odd">\n' +
        '                            <td class="first-col">周<br/>五</td>\n' +
        '                            <td class="first" item-data="0"></td>\n' +
        '                            <td class="second" item-data="0"></td>\n' +
        '                            <td class="third" item-data="0"></td>\n' +
        '                            <td class="fourth" item-data="0"></td>\n' +
        '                        </tr>\n' +
        '                        <tr class="schedule_content even">\n' +
        '                            <td class="first-col">周<br/>六</td>\n' +
        '                            <td class="first" item-data="0"></td>\n' +
        '                            <td class="second" item-data="0"></td>\n' +
        '                            <td class="third" item-data="0"></td>\n' +
        '                            <td class="fourth" item-data="0"></td>\n' +
        '                        </tr>\n' +
        '                        <tr class="schedule_content odd">\n' +
        '                            <td class="first-col">周<br/>日</td>\n' +
        '                            <td class="first" item-data="0"></td>\n' +
        '                            <td class="second" item-data="0"></td>\n' +
        '                            <td class="third" item-data="0"></td>\n' +
        '                            <td class="fourth" item-data="0"></td>\n' +
        '                        </tr>\n' +
        '                    </tbody>\n' +
        '                </table>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="info">\n' +
        '            <button class="confirmAction submitFreeTimeList">提交空闲时间表</button><button class="cancelAction">取消提交</button>\n' +
        '            <div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div>'+
        '        </div>\n' +
        '    </div>');
    helpPanelShow();
    $(".panel-default .table").each(function (){
        $(this).width($(this).parents(".panel-default").width()- 30);
    });
}
//考勤表数据置入
function setScheduleTableInfo() {
    for(var i in list){
        setScheduleRowInfo(i,list[i]);
    }
}
//考勤表单行数据置入
function setScheduleRowInfo(i,scheduleList) {
    var j = Number(i)+1;
    $(".homePanel .table tbody tr:nth-child("+j+")>td:not(.first-col)").each(function (index,item) {
        if(scheduleList[index] != null) {
            var operatorNames = '';
            if(isMine){
                for(var x in scheduleList[index].operatorList){
                    if(scheduleList[index].operatorList[x] != null && scheduleList[index].operatorList[x].name == operatorName){
                        operatorNames = operatorName;
                    }
                }
                $(this).html(operatorNames);
            }else{
                for(var x in scheduleList[index].operatorList){
                    if(scheduleList[index].operatorList[x] != null){
                        operatorNames += scheduleList[index].operatorList[x].name + "<br/>";
                    }
                }
                $(this).html(operatorNames);
            }
        }
    });
    $(".panel-default .table").each(function (){
        $(this).width($(this).parents(".panel-default").width()- 30);
    });
};
//主页信息置入
function setHomePanelInfo(attendence) {
    if(attendence != null){
        operatorName = attendence.operator == null?"":attendence.operator.name;
        $(".homePanel .header .name").html(operatorName);
        if(attendence.id != null){
            $(".homePanel .content").html('<button class="checkWorkAction checkOutAction">下班打卡</button>' +
                '<div class="panel-default step-management">\n' +
                '            <div class="header">\n' +
                '                <i class="iconfont icon-calendar-check"></i>考勤安排\n' +
                '                <div class="select">\n' +
                '                    <button class="changeIsMine btn" data-item="my" href="javascript:;" aria-expanded="false">' +
                '                        总体排班' +
                '                    </button>\n' +
                '                    <button class="dropdown-toggle btn" data-toggle="dropdown" href="javascript:;" aria-expanded="false">\n' +
                '                        本周&emsp;&emsp;&emsp;<i class="iconfont icon-xiajiantou"></i>\n' +
                '                    </button>\n' +
                '                    <input type="text" class="hidden panel-item" value="my"/>\n' +
                '                    <div class="hidden options">\n' +
                '                        <ul>\n' +
                '                            <li><a href="javascript:;" panel-item="thisWeek">本周&emsp;&emsp;&emsp;</a></li>\n' +
                '                            <li><a href="javascript:;" panel-item="nextWeek">下周&emsp;&emsp;&emsp;</a></li>\n' +
                '                        </ul>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '            <div class="body">\n' +
                '                <table class="table schedule">\n' +
                '                    <thead>\n' +
                '                        <tr class="schedule_titile">\n' +
                '                            <th class="first-col">&emsp;</th>\n' +
                '                            <th class="first">一二</th>\n' +
                '                            <th class="second">三四</th>\n' +
                '                            <th class="third">五六</th>\n' +
                '                            <th class="fourth">七八</th>\n' +
                '                        </tr>\n' +
                '                    </thead>\n' +
                '                    <tbody>\n' +
                '                        <tr class="schedule_content odd">\n' +
                '                            <td class="first-col">周<br/>一</td>\n' +
                '                            <td class="first"></td>\n' +
                '                            <td class="second"></td>\n' +
                '                            <td class="third"></td>\n' +
                '                            <td class="fourth"></td>\n' +
                '                        </tr>\n' +
                '                        <tr class="schedule_content even">\n' +
                '                            <td class="first-col">周<br/>二</td>\n' +
                '                            <td class="first"></td>\n' +
                '                            <td class="second"></td>\n' +
                '                            <td class="third"></td>\n' +
                '                            <td class="fourth"></td>\n' +
                '                        </tr>\n' +
                '                        <tr class="schedule_content odd">\n' +
                '                            <td class="first-col">周<br/>三</td>\n' +
                '                            <td class="first"></td>\n' +
                '                            <td class="second"></td>\n' +
                '                            <td class="third"></td>\n' +
                '                            <td class="fourth"></td>\n' +
                '                        </tr>\n' +
                '                        <tr class="schedule_content even">\n' +
                '                            <td class="first-col">周<br/>四</td>\n' +
                '                            <td class="first"></td>\n' +
                '                            <td class="second"></td>\n' +
                '                            <td class="third"></td>\n' +
                '                            <td class="fourth"></td>\n' +
                '                        </tr>\n' +
                '                        <tr class="schedule_content odd">\n' +
                '                            <td class="first-col">周<br/>五</td>\n' +
                '                            <td class="first"></td>\n' +
                '                            <td class="second"></td>\n' +
                '                            <td class="third"></td>\n' +
                '                            <td class="fourth"></td>\n' +
                '                        </tr>\n' +
                '                        <tr class="schedule_content even">\n' +
                '                            <td class="first-col">周<br/>六</td>\n' +
                '                            <td class="first"></td>\n' +
                '                            <td class="second"></td>\n' +
                '                            <td class="third"></td>\n' +
                '                            <td class="fourth"></td>\n' +
                '                        </tr>\n' +
                '                        <tr class="schedule_content odd">\n' +
                '                            <td class="first-col">周<br/>日</td>\n' +
                '                            <td class="first"></td>\n' +
                '                            <td class="second"></td>\n' +
                '                            <td class="third"></td>\n' +
                '                            <td class="fourth"></td>\n' +
                '                        </tr>\n' +
                '                    </tbody>\n' +
                '                </table>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '<button class="freeTimeManagementAction">空闲时间安排</button><button class="myLeaveList">我的请假单</button><button class="askForLeaveAction">请假</button>');
            switch (attendence.status) {
                case 0:
                    $(".homePanel .header .status").html('<i class="iconfont icon-dot"></i>&ensp;值班中');
                    $(".homePanel .header .status").removeClass().addClass("status normal");
                    break;
                case 1:
                    $(".homePanel .header .status").html('<i class="iconfont icon-dot"></i>&ensp;外勤中');
                    $(".homePanel .header .status").removeClass().addClass("status busy");
                    break;
                default:
                    $(".homePanel .header .status").html('<i class="iconfont icon-dot"></i>&ensp;异常');
                    $(".homePanel .header .status").removeClass().addClass("status free");
                    break;
            }
        }else{
            $(".homePanel .content").html('<button class="checkWorkAction checkInAction">上班打卡</button>' +
                '<div class="panel-default step-management">\n' +
                '            <div class="header">\n' +
                '                <i class="iconfont icon-calendar-check"></i>考勤安排\n' +
                '                <div class="select">\n' +
                '                    <button class="changeIsMine btn" data-item="my" href="javascript:;" aria-expanded="false">' +
                '                        总体排班' +
                '                    </button>\n' +
                '                    <button class="dropdown-toggle btn" data-toggle="dropdown" href="javascript:;" aria-expanded="false">\n' +
                '                        本周&emsp;&emsp;&emsp;<i class="iconfont icon-xiajiantou"></i>\n' +
                '                    </button>\n' +
                '                    <input type="text" class="hidden panel-item" value="my"/>\n' +
                '                    <div class="hidden options">\n' +
                '                        <ul>\n' +
                '                            <li><a href="javascript:;" panel-item="thisWeek">本周&emsp;&emsp;&emsp;</a></li>\n' +
                '                            <li><a href="javascript:;" panel-item="nextWeek">下周&emsp;&emsp;&emsp;</a></li>\n' +
                '                        </ul>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '            <div class="body">\n' +
                '                <table class="table schedule">\n' +
                '                    <thead>\n' +
                '                        <tr class="schedule_titile">\n' +
                '                            <th class="first-col">&emsp;</th>\n' +
                '                            <th class="first">一二</th>\n' +
                '                            <th class="second">三四</th>\n' +
                '                            <th class="third">五六</th>\n' +
                '                            <th class="fourth">七八</th>\n' +
                '                        </tr>\n' +
                '                    </thead>\n' +
                '                    <tbody>\n' +
                '                        <tr class="schedule_content odd">\n' +
                '                            <td class="first-col">周<br/>一</td>\n' +
                '                            <td class="first"></td>\n' +
                '                            <td class="second"></td>\n' +
                '                            <td class="third"></td>\n' +
                '                            <td class="fourth"></td>\n' +
                '                        </tr>\n' +
                '                        <tr class="schedule_content even">\n' +
                '                            <td class="first-col">周<br/>二</td>\n' +
                '                            <td class="first"></td>\n' +
                '                            <td class="second"></td>\n' +
                '                            <td class="third"></td>\n' +
                '                            <td class="fourth"></td>\n' +
                '                        </tr>\n' +
                '                        <tr class="schedule_content odd">\n' +
                '                            <td class="first-col">周<br/>三</td>\n' +
                '                            <td class="first"></td>\n' +
                '                            <td class="second"></td>\n' +
                '                            <td class="third"></td>\n' +
                '                            <td class="fourth"></td>\n' +
                '                        </tr>\n' +
                '                        <tr class="schedule_content even">\n' +
                '                            <td class="first-col">周<br/>四</td>\n' +
                '                            <td class="first"></td>\n' +
                '                            <td class="second"></td>\n' +
                '                            <td class="third"></td>\n' +
                '                            <td class="fourth"></td>\n' +
                '                        </tr>\n' +
                '                        <tr class="schedule_content odd">\n' +
                '                            <td class="first-col">周<br/>五</td>\n' +
                '                            <td class="first"></td>\n' +
                '                            <td class="second"></td>\n' +
                '                            <td class="third"></td>\n' +
                '                            <td class="fourth"></td>\n' +
                '                        </tr>\n' +
                '                        <tr class="schedule_content even">\n' +
                '                            <td class="first-col">周<br/>六</td>\n' +
                '                            <td class="first"></td>\n' +
                '                            <td class="second"></td>\n' +
                '                            <td class="third"></td>\n' +
                '                            <td class="fourth"></td>\n' +
                '                        </tr>\n' +
                '                        <tr class="schedule_content odd">\n' +
                '                            <td class="first-col">周<br/>日</td>\n' +
                '                            <td class="first"></td>\n' +
                '                            <td class="second"></td>\n' +
                '                            <td class="third"></td>\n' +
                '                            <td class="fourth"></td>\n' +
                '                        </tr>\n' +
                '                    </tbody>\n' +
                '                </table>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '<button class="freeTimeManagementAction">空闲时间安排</button><button class="myLeaveList">我的请假单</button><button class="askForLeaveAction">请假</button>');
            $(".homePanel .header .status").html('<i class="iconfont icon-dot"></i>&ensp;休息中');
            $(".homePanel .header .status").removeClass().addClass("status free");
        }
    }
    weekDateList = getWeekDateList(0);
    scheduleTableInit();
}
//信息面板详细信息置入
function setOrderInfo(order,isDisplay) {
    if(order != null && order.id != null) {
        $("label.id").text(order.id);
        $("label.user").text(order.user == null ? "":order.user.name);
        $("label.location").text(order.location);
        $("label.phone").text(order.phone);
        $("label.beginTime").text(dateLoad(order.beginTime));
        $("label.reservationTime").text(dateLoad(order.reservationTime));
        $("label.handleTime").text(dateLoad(order.handleTime));
        $("label.endTime").text(dateLoad(order.endTime));
        $("label.status").text(getOrderStatus(order.status));
        $("label.operator").text(order.operator == null ? "" : order.operator.name);
        $("label.repairment").text(order.repairment);
        $("label.userDescription").text(order.userDescription);
        $("label.description").text(order.description);
        if(order.status != 3){
            $("label.description").parents(".info").append("<i class='iconfont icon-edit-solid editDescriptionAction'></i>");
        }
        if(!isDisplay){
            if(order.operator != null && order.operator.id == operatorID && order.status == '1'){
                setFinishedOrderButton();
            }else if(order.status == '0'){
                setTakeOrderButton();
            }
        }
        setQuitOrderButton();
    }else{
        alert("没有该订单！");
        $(".indexButton.order").click();
    }
}
//处理完成按钮置入
function setFinishedOrderButton() {
    $(".infoPanel").append('<div class="info"><label class="title">&emsp;</label><button class="finishOrderAction">处理完成</button></div>');
}
//我去处理按钮置入
function setTakeOrderButton() {
    $(".infoPanel").append('<div class="info"><label class="title">&emsp;</label><button class="takeOrderAction">我去处理</button></div>');
}
//处理完成按钮置入
function setQuitOrderButton() {
    $(".infoPanel").append('<div class="info"><label class="title">&emsp;</label><button class="quitDisplayOrderAction">返回列表</button></div>');
}