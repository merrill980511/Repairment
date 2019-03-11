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
//编辑表单显示
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
//请假条表单显示
function showLeaveForm(id,title,agree,disagree,agreeClass,disagreeClass){
    var formHtml = '<div class="header">\n' +
        '            '+title+'<i class="iconfont icon-close closeAction  action" title="关闭"></i>\n' +
        '<input type="hidden" class="id" value="'+id+'"/>\n'+
        '        </div>\n' +
        '        <div class="body">\n' +
        '        </div>\n' +
        '        <div class="footer">\n' +
        '            <button class="agreeAction '+agreeClass+'">'+agree+'</button>\n' +
        '            <button class="disagreeAction '+disagreeClass+'">'+disagree+'</button>\n' +
        '        </div>';
    $(".lid .form").attr("item-id",id);
    $(".lid .form").html(formHtml);
    $(".lid").show();
    $(".lid .form").show();
}
//预览表单显示
function showViewForm(id,title){
    var formHtml = '<div class="header">\n' +
        '            '+title+'<i class="iconfont icon-close closeAction  action" title="关闭"></i>\n' +
        '<input type="hidden" class="id" value="'+id+'"/>\n'+
        '        </div>\n' +
        '        <div class="body">\n' +
        '        </div>';
    $(".lid .form").attr("item-id",id);
    $(".lid .form").html(formHtml);
    $(".lid").show();
    $(".lid .form").show();
}
//管理员修改密码
function getEditAdminFormBodyHTML() {
    var orderFormBodyHTML = '<div class="info"><span class="name">密码</span><input type="password" class="content password" autocomplete="new-password"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n' +
        '<div class="info"><span class="name">确认密码</span><input type="password" class="content re_password"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n';
    return orderFormBodyHTML;
}
//排班表
function getEditScheduleFormInfo(scheduleList) {
    var date = $(".form").attr("item-id");
    var scheduleFormBodyHTML = "";
    for(var index = 0;index<4;index++){
        operatorList = getOperatorListBySchedule(date,index+1);
        var operatorListHtml = "<option value='-2'>无</option>";
        for(var i in operatorList){
            operatorListHtml += '<option value="'+operatorList[i].id+'">'+operatorList[i].name+'</option>\n';
        }
        scheduleFormBodyHTML += '<div class="info"><span class="name">'+getWorkTime(index+1)+'</span>' +
            '<select class="content operator">\n' +
            operatorListHtml+
            '</select>\n'+
            '<select class="content operator">\n' +
            operatorListHtml+
            '</select>\n' +
            '<select class="content operator">\n' +
            operatorListHtml+
            '</select>\n' +
            '<select class="content operator">\n' +
            operatorListHtml+
            '</select>\n' +
            '</div>\n';
    }
    return scheduleFormBodyHTML;
}
//请假单列名
function getLeaveThHtml() {
    var leaveThHtml = '<tr><th>申请人</th><th>请假日期</th><th>请假时间</th><th>请假缘由</th><th>状态</th><th>操作</th></tr>';
    return leaveThHtml;
};
//order列名
function getOrderThHtml() {
    var orderThHtml = '<tr><th>地点</th><th>报修人</th><th>用户备注</th><th>问题选项</th><th>操作</th></tr>';
    return orderThHtml;
};
//orderFinished列名
function getOrderFinishedThHtml() {
    var orderThHtml = '<tr><th>地点</th><th>报修人</th><th>用户备注</th><th>问题选项</th><th>处理人</th><th>部门备注</th><th>操作</th></tr>';
    return orderThHtml;
};
//operator列名
function getOperatorThHtml() {
    var orderThHtml = '<tr><th>学号</th><th>姓名</th><th>电话</th><th>操作</th></tr>';
    return orderThHtml;
};
//user列名
function getUserThHtml() {
    var orderThHtml = '<tr><th>工号</th><th>姓名</th><th>电话</th><th>操作</th></tr>';
    return orderThHtml;
};
//请假单列表
function getLeaveListHtml(leaveList) {
    var leaveListHTML = '';
    for(var i in leaveList){
        var colorClass =  (i % 2)?"even":"odd";
        var leave = leaveList[i];
        var leave_operator = leave.operator == null? "":leave.operator.name;
        leaveListHTML += '<tr class="'+colorClass+'" item-id="'+leave.id+'">\n' +
            '        <td>'+leave_operator+'</td><td>'+new Date(leave.date).Format("yyyy-MM-dd")+'</td><td>'+getWorkTime(leave.workTime.number)+'</td><td>'+leave.description+'</td><td>'+getScheduleStatus(leave.status)+'</td><td class="action"><i class="view iconfont icon-info-circle action" title="详情"></i></td>\n' +
            '    </tr>';
    }
    return leaveListHTML;
};
//问题列表
function getOrderListHtml(orderList) {
    var orderListHTML = '';
    for(var i in orderList){
        var colorClass =  (i % 2)?"even":"odd";
        var order = orderList[i];
        var order_user = order.user == null? "":order.user.name;
        orderListHTML += '<tr class="'+colorClass+'" item-id="'+order.id+'">\n' +
            '        <td>'+order.location+'</td><td>'+order_user+'</td><td>'+order.userDescription+'</td><td>'+order.repairment+'</td><td class="action"><i class="view iconfont icon-info-circle action" title="详情"></i>&ensp;<i class="edit iconfont icon-edit-solid action" title="修改"></i>&ensp;<i class="delete iconfont icon-delete-solid action" title="删除"></i></td>\n' +
            '    </tr>';
    }
    return orderListHTML;
};
//完成问题列表
function getOrderFinishedListHtml(orderFinishedList) {
    var orderFinishedListHTML = '';
    for(var i in orderFinishedList){
        var colorClass =  (i % 2)?"even":"odd";
        var orderFinished = orderFinishedList[i];
        var orderFinished_user = orderFinished.user == null? "":orderFinished.user.name;
        var orderFinished_operator =  orderFinished.operator == null ? "":orderFinished.operator.name;
        orderFinishedListHTML += '<tr class="'+colorClass+'" item-id="'+orderFinished.id+'">\n' +
            '        <td>'+orderFinished.location+'</td><td>'+orderFinished_user+'</td><td>'+orderFinished.userDescription+'</td><td>'+orderFinished.repairment+'</td><td>'+orderFinished_operator+'</td><td>'+orderFinished.description+'</td><td class="action"><i class="view iconfont icon-info-circle action" title="详情"></i>&ensp;<i class="edit iconfont icon-edit-solid action" title="修改"></i></td>\n' +
            '    </tr>';
    }
    return orderFinishedListHTML;
};
//运维人员列表
function getOperatorListHtml(operatorList) {
    var operatorListHTML = '';
    for(var i in operatorList){
        var colorClass =  (i % 2)?"even":"odd";
        var operator = operatorList[i];
        operatorListHTML += '<tr class="'+colorClass+'" item-id="'+operator.id+'">\n' +
            '        <td>'+operator.id+'</td><td>'+operator.name+'</td><td>'+operator.phone+'</td><td class="action"><i class="view iconfont icon-info-circle action" title="详情"></i>&ensp;<i class="edit iconfont icon-edit-solid action" title="修改"></i>&ensp;<i class="delete iconfont icon-delete-solid action" title="删除"></i></td>\n' +
            '    </tr>';
    }
    return operatorListHTML;
};
//用户列表
function getUserListHtml(userList) {
    var userListHTML = '';
    for(var i in userList){
        var colorClass =  (i % 2)?"even":"odd";
        var user = userList[i];
        userListHTML += '<tr class="'+colorClass+'" item-id="'+user.id+'">\n' +
            '        <td>'+user.id+'</td><td>'+user.name+'</td><td>'+user.phone+'</td><td class="action"><i class="view iconfont icon-info-circle action" title="详情"></i>&ensp;<i class="edit iconfont icon-edit-solid action" title="修改"></i>&ensp;<i class="delete iconfont icon-delete-solid action" title="删除"></i></td>\n' +
            '    </tr>';
    }
    return userListHTML;
};
//预览面板
//请假条预览
function getViewLeaveFormBodyHTML(leave) {
    var leave_operator = leave.operator == null? "":leave.operator.name;
    var orderFormBodyHTML = '<div class="info"><span class="name">请假申请人</span><input type="text" class="content operator" value="'+dataLoad(leave_operator)+'" readonly><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n' +
        '<div class="info"><span class="name">请假日期</span><input type="text" class="content date" value="'+dataLoad(new Date(leave.date).Format("yyyy-MM-dd"))+'" readonly><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
        '<div class="info"><span class="name">请假时间</span><input type="text" class="content number" value="'+dataLoad(getWorkTime(leave.number))+'" readonly><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
        '<div class="info"><span class="name">请假缘由</span><textarea rows="5" class="content description" readonly>'+dataLoad(leave.description)+'</textarea rows="5"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>';
    return orderFormBodyHTML;
}
//用户数据面板
function getViewUserFormBodyHTML(user) {
    var userFormBodyHTML =  '<div class="info"><span class="name">工号</span><input type="text" class="content id" value="'+dataLoad(user.id)+'" readonly><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n' +
        '<div class="info"><span class="name">姓名</span><input type="text" class="content name" value="'+dataLoad(user.name)+'" readonly><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
        '<div class="info"><span class="name">联系方式</span><input type="text" class="content phone" value="'+dataLoad(user.phone)+'" readonly><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n';
    return userFormBodyHTML;
}
//运维数据面板
function getViewOperatorFormBodyHTML(operator) {
    var operatorFormBodyHTML =  '<div class="info"><span class="name">工号</span><input type="text" class="content id" value="'+dataLoad(operator.id)+'" readonly><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n' +
        '<div class="info"><span class="name">姓名</span><input type="text" class="content name" value="'+dataLoad(operator.name)+'" readonly><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
        '<div class="info"><span class="name">联系方式</span><input type="text" class="content phone" value="'+dataLoad(operator.phone)+'" readonly><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n';
    return operatorFormBodyHTML;
}
//订单预览
function getViewOrderFormBodyHTML(order) {
    var order_user = order.user == null? "":order.user.name;
    var orderFormBodyHTML = '<div class="info"><span class="name">报修人</span><input type="text" class="content user" value="'+dataLoad(order_user)+'" readonly><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n' +
        '<div class="info"><span class="name">地点</span><input type="text" class="content location" value="'+dataLoad(order.location)+'" readonly><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
        '<div class="info"><span class="name">预约时间</span><input type="text" class="content beginTime" value="'+dateLoad(dataLoad(order.beginTime))+'" readonly><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
        '<div class="info"><span class="name">用户备注</span><textarea rows="5" class="content userDescription" readonly>'+dataLoad(order.userDescription)+'</textarea rows="5"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
        '<div class="info"><span class="name">备注</span><textarea rows="5" class="content description" readonly>'+dataLoad(order.description)+'</textarea rows="5"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
        '<div class="info"><span class="name">问题选项</span><textarea rows="5" class="content repairment" readonly>'+dataLoad(order.repairment)+'</textarea rows="5"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>';
    return orderFormBodyHTML;
}
//处理完成订单数据面板
function getViewOrderFinishedFormBodyHTML(order) {
    var order_user = order.user == null? "":order.user.name;
    var order_operator =  order.operator == null ? "":order.operator.name;
    var operatorListHtml = "";
    selectList = getAllOperatorList();
    for(var i in selectList){
        operatorListHtml += '<option value="'+selectList[i].name+'">'+selectList[i].name+'</option>';
    }
    var orderFinishedFormBodyHTML = '<div class="info"><span class="name">报修人</span><input type="text" class="content user" value="'+dataLoad(order_user)+'" readonly><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n' +
        '<div class="info"><span class="name">地点</span><input type="text" class="content location" value="'+dataLoad(order.location)+'" readonly><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
        '<div class="info"><span class="name">预约时间</span><input type="text" class="content beginTime" value="'+dateLoad(dataLoad(order.beginTime))+'" readonly><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
        '<div class="info"><span class="name">开始时间</span><input type="text" class="content handleTime" value="'+dateLoad(dataLoad(order.handleTime))+'" readonly><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
        '<div class="info"><span class="name">结束时间</span><input type="text" class="content endTime" value="'+dateLoad(dataLoad(order.endTime))+'" readonly><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
        '<div class="info"><span class="name">处理人</span><select type="text" class="content operator" disabled>' +
        operatorListHtml+
        '</select><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
        '<div class="info"><span class="name">用户备注</span><textarea rows="5" class="content userDescription" readonly>'+dataLoad(order.userDescription)+'</textarea rows="5"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
        '<div class="info"><span class="name">备注</span><textarea rows="5" class="content description" readonly>'+dataLoad(order.description)+'</textarea rows="5"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
        '<div class="info"><span class="name">问题选项</span><textarea rows="5" class="content repairment" readonly>'+dataLoad(order.repairment)+'</textarea rows="5"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>';
    $(".form .body .operator").val(dataLoad(order_operator));
    return orderFinishedFormBodyHTML;
}
//修改面板
//用户数据面板
function getEditUserFormBodyHTML(user) {
    var userFormBodyHTML =  '<div class="info"><span class="name">工号</span><input type="text" class="content id" value="'+dataLoad(user.id)+'" disabled><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n' +
        '<div class="info"><span class="name">姓名</span><input type="text" class="content name" value="'+dataLoad(user.name)+'"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
        '<div class="info"><span class="name">联系方式</span><input type="text" class="content phone" value="'+dataLoad(user.phone)+'"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n';
    return userFormBodyHTML;
}
//运维数据面板
function getEditOperatorFormBodyHTML(operator) {
    var operatorFormBodyHTML =  '<div class="info"><span class="name">工号</span><input type="text" class="content id" value="'+dataLoad(operator.id)+'" disabled><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n' +
        '<div class="info"><span class="name">姓名</span><input type="text" class="content name" value="'+dataLoad(operator.name)+'"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
        '<div class="info"><span class="name">联系方式</span><input type="text" class="content phone" value="'+dataLoad(operator.phone)+'"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n';
    return operatorFormBodyHTML;
}
//订单数据面板
function getEditOrderFormBodyHTML(order) {
    var order_user = order.user == null? "":order.user.name;
    var orderFormBodyHTML = '<div class="info"><span class="name">报修人</span><input type="text" class="content user" value="'+dataLoad(order_user)+'" disabled><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n' +
        '<div class="info"><span class="name">地点</span><input type="text" class="content location" value="'+dataLoad(order.location)+'" disabled><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
        '<div class="info"><span class="name">预约时间</span><input type="text" class="content beginTime" value="'+dateLoad(dataLoad(order.beginTime))+'" disabled><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
        '<div class="info"><span class="name">用户备注</span><textarea rows="5" class="content userDescription">'+dataLoad(order.userDescription)+'</textarea rows="5"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
        '<div class="info"><span class="name">备注</span><textarea rows="5" class="content description">'+dataLoad(order.description)+'</textarea rows="5"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
        '<div class="info"><span class="name">问题选项</span><textarea rows="5" class="content repairment">'+dataLoad(order.repairment)+'</textarea rows="5"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>';
    return orderFormBodyHTML;
}
//处理完成订单数据面板
function getEditOrderFinishedFormBodyHTML(order) {
    var order_user = order.user == null? "":order.user.name;
    var order_operator =  order.operator == null ? "":order.operator.name;
    var operatorListHtml = "";
    selectList = getAllOperatorList();
    for(var i in selectList){
        operatorListHtml += '<option value="'+selectList[i].name+'">'+selectList[i].name+'</option>';
    }
    var orderFinishedFormBodyHTML = '<div class="info"><span class="name">报修人</span><input type="text" class="content user" value="'+dataLoad(order_user)+'" disabled><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n' +
        '<div class="info"><span class="name">地点</span><input type="text" class="content location" value="'+dataLoad(order.location)+'" disabled><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
        '<div class="info"><span class="name">预约时间</span><input type="text" class="content beginTime" value="'+dateLoad(dataLoad(order.beginTime))+'" disabled><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
        '<div class="info"><span class="name">开始时间</span><input type="text" class="content handleTime" value="'+dateLoad(dataLoad(order.handleTime))+'" disabled><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
        '<div class="info"><span class="name">结束时间</span><input type="text" class="content endTime" value="'+dateLoad(dataLoad(order.endTime))+'" disabled><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
        '<div class="info"><span class="name">处理人</span><select type="text" class="content operator" disabled>' +
        operatorListHtml+
        '</select><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
        '<div class="info"><span class="name">用户备注</span><textarea rows="5" class="content userDescription">'+dataLoad(order.userDescription)+'</textarea rows="5"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
        '<div class="info"><span class="name">备注</span><textarea rows="5" class="content description">'+dataLoad(order.description)+'</textarea rows="5"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
        '<div class="info"><span class="name">问题选项</span><textarea rows="5" class="content repairment">'+dataLoad(order.repairment)+'</textarea rows="5"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>';
    $(".form .body .operator").val(dataLoad(order_operator));
    return orderFinishedFormBodyHTML;
}
//添加面板
//用户数据面板
function getAddUserFormBodyHTML() {
    var userFormBodyHTML =  '<div class="info"><span class="name">工号</span><input type="text" class="content id"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n' +
        '<div class="info"><span class="name">姓名</span><input type="text" class="content name"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
        '<div class="info"><span class="name">联系方式</span><input type="text" class="content phone"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n';
    return userFormBodyHTML;
}
//运维数据面板
function getAddOperatorFormBodyHTML() {
    var operatorFormBodyHTML =  '<div class="info"><span class="name">工号</span><input type="text" class="content id"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n' +
        '<div class="info"><span class="name">姓名</span><input type="text" class="content name"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
        '<div class="info"><span class="name">联系方式</span><input type="text" class="content phone"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n';
    return operatorFormBodyHTML;
}
//订单数据面板
function getAddOrderFormBodyHTML() {
    var orderFormBodyHTML = '<div class="info"><span class="name">报修人（工号）</span><input type="text" class="content user"><div class="tip user"></div><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n' +
        '<div class="info"><span class="name">联系方式</span><input type="text" class="content phone"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n' +
        '<div class="info"><span class="name">地点</span><input type="text" class="content location"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
        '<div class="info"><span class="name">预约时间</span><input type="datetime-local" class="content beginTime"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
        '<div class="info"><span class="name">用户备注</span><textarea rows="5" class="content userDescription"></textarea rows="5"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>\n'+
        '<div class="info"><span class="name">问题选项</span><textarea rows="5" class="content repairment"></textarea rows="5"><div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div></div>';
    return orderFormBodyHTML;
}
