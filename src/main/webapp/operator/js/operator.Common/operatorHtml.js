//订单列表
function getOrderListHtml(orderList) {
    var orderListHTML = '';
    var orderListCopyed = $.extend(true, [], orderList);
    for(var i in orderListCopyed){
        var order = orderListCopyed[i];
        var statusClass = 'standby';
        if(order.userDescription == null || order.userDescription == ''){
            order.userDescription = "&emsp;";
        }
        if(order.repairment == null || order.repairment == ''){
            order.repairment = "&emsp;";
        }
        if(order.status == '1'){
            statusClass = 'handling';
        }
        orderListHTML += '<div class="tr order">\n' +
            '        <div class="td location">'+order.location+'</div><div class="td userDescription">'+order.userDescription+'</div><div class="td repairment">'+order.repairment+'</div><div class="td status '+statusClass+'">'+getOrderStatus(order.status)+'</div><div class="td action"><input type="button" value="查看信息" class="displayOrderAction"/></div>\n' +
            '    </div>';
    }
    return orderListHTML;
};