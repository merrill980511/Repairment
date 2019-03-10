var orderChart = document.getElementById("orderChart").getContext("2d");
var attendenceChart = document.getElementById("attendenceChart").getContext("2d");
$(function () {
    indexInit();
    $(".orderTable").on("click","td.pointer",function () {
        var id = $(this).attr("item-id");
        showViewForm(id, "问题详情");
        $(".form .body").html(getViewOrderFormBodyHTML(getItem(id, "getOrder")));
    });
    $(".leaveTable").on("click","td.pointer",function () {
        var id = $(this).attr("item-id");
        showLeaveForm(id,"请求详情","同意","驳回","agreeLeaveAction","disagreeLeaveAction");
        $(".form .body").html(getViewLeaveFormBodyHTML(getItem(id,"getLeave")));
    });
});
function indexInit() {
    getOverview();
    getOrderChart(7);
    getAttendenceChart(8);
    getOrderSortByNum(5);
    getLeaveListByNum(5)
    getCurrentOperatorList();
    indexHeightInit();
}
//创建柱状图
function getOrderChart(num){
    $.ajax({
        "url": "/repair/admin/getOrderFinishRate",
        "method": "post",
        "headers": {
                "Content-Type": "application/json",
            },
        "data": JSON.stringify(getDateListJson(num)),
        "dataType": "json",
        "success": function (data) {
            setOrderChart(data,getDateList(num));
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
}

function getAttendenceChart(num){
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
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
}

function getCurrentOperatorList(){
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
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
}
function setCurrentOperatorList(data){
    var html = '';
    for(var i in data){
        var statusClass = 'absent';
        switch (data[i].status) {
            case 0 :
                statusClass = "normal";
                break;
            case 1:
                statusClass = "busy";
                break;
            default:
                statusClass = 'absent';
                break;
        }
        html += "<label class='"+statusClass+"'>"+data[i].operator.name+"</label><br/>"
    }
    $(".currentOperator .body").html(html);
}
function setOrderChart(data,dateList) {
    var finishedNumberList = [];
    var unfinishedNumberList = [];
    var rateList = [];
    for(var i in data){
        finishedNumberList.push(data[i].finishedNumber);
        unfinishedNumberList.push(data[i].unfinishedNumber)
        rateList.push(data[i].rate*100);
    }
    var chart = new Chart(orderChart, {
        type: 'bar',
        data: {
            labels: dateList,
            datasets: [
                {
                    type: "bar",
                    yAxisID:"number",
                    label: ['收到的问题'],
                    borderColor:"rgba(255,132,33,1)",
                    backgroundColor:"rgba(255,132,33,0.8)",
                    data : unfinishedNumberList,
                },
                {
                    type: "bar",
                    yAxisID:"number",
                    label: ['处理成功问题'],
                    borderColor:"rgba(51,122,183,1)",
                    backgroundColor:"rgba(51,122,183,0.8)",
                    data : finishedNumberList,
                },
                {
                    type: "line",
                    yAxisID:"rate",
                    label:['问题完成度'],
                    borderColor:"rgba(255,91,91,1)",
                    pointBackgroundColor: 'rgba(255,91,91,1)',
                    backgroundColor:"rgba(255,91,91,0.1)",
                    borderWidth: '8',
                    pointRadius: '1',
                    data : rateList,
                }
            ],
        },
        options: {
            tooltips: {
                mode: 'index',
                intersect: false
            },
            responsive: true,
            scales:{
                yAxes:[
                    {
                        id:'number',
                        type:'linear',
                        position:'left',
                        stacked:false,
                        scaleLabel:{
                            display:true,
                            labelString:"数量"
                        },
                        gridLines:{
                            display:false
                        },
                        ticks:{
                            beginAtZero:true
                        }
                    },
                    {
                        id:'rate',
                        type:'linear',
                        position:'right',
                        stacked:false,
                        scaleLabel:{
                            display:true,
                            labelString:"比率"
                        },
                        gridLines:{
                            display:false
                        },
                        ticks:{
                            beginAtZero:true
                        }
                    }
                ]
            }
        }
    });
};

//创建柱状图
function setAttendenceChart(data,dateList) {
    var comeLateRateList = [];
    var leaveEarlyRateList = [];
    var absenceRateList = [];
    for(var i in data){
        comeLateRateList.push(data[i].LateRate);
        leaveEarlyRateList.push(data[i].leaveEarlyRate)
        absenceRateList.push(data[i].absenceRate);
    }
    var chart = new Chart(attendenceChart, {
        type: 'line',
        data: {
            labels: dateList,
            datasets: [
                {
                    yAxisID:"rate",
                    label: ['迟到率'],
                    borderColor:"rgba(130,23,86,1)",
                    pointBackgroundColor: 'rgba(130,23,86,0.1)',
                    backgroundColor:"rgba(130,23,86,0.1)",
                    data : comeLateRateList,
                },
                {
                    yAxisID:"rate",
                    label: ['早退率'],
                    borderColor:"rgba(255,193,193,1)",
                    pointBackgroundColor: 'rgba(255,193,193,0.1)',
                    backgroundColor:"rgba(255,193,193,0.1)",
                    data : leaveEarlyRateList,
                },
                {
                    yAxisID:"rate",
                    label:['缺勤率'],
                    borderColor:"rgba(135,140,146,1)",
                    pointBackgroundColor: 'rgba(135,140,146,0.1)',
                    backgroundColor:"rgba(135,140,146,0.1)",
                    data : absenceRateList,
                }
            ],
        },
        options: {
            tooltips: {
                mode: 'index',
                intersect: false
            },
            responsive: true,
            scales:{
                yAxes:[
                    {
                        id:'rate',
                        type:'linear',
                        position:'left',
                        stacked:false,
                        scaleLabel:{
                            display:true,
                            labelString:"比率"
                        },
                        gridLines:{
                            display:false
                        },
                        ticks:{
                            beginAtZero:true
                        }
                    }
                ]
            }
        }
    });
}
//获取概览内容
function getOverview() {
    $.ajax({
        "url": "/repair/admin/overview",
        "method": "post",
        "headers": {
                "Content-Type": "application/json",
            },
        "data": "",
        "dataType": "json",
        "success": function (data) {
            if(data != null&&data.length != 0 ){
                setOverview(data);
            }
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
};
//置入概览内容
function setOverview(list) {
    var overviewPanel = $(".overview .panel");
    overviewPanel.each(function (index,element) {
       $(this).find(".num").text(list[index]);
    });
};
//获取应急问题列表
function getOrderSortByNum(num) {
    $.ajax({
        "url": "/repair/admin/getOrderSortByDate",
        "method": "post",
        "headers": {
                "Content-Type": "application/json",
            },
        "data": "{\"number\":\""+num+"\"}",
        "dataType": "json",
        "success": function (data) {
            orderTableInit();
            for(var i  = 0;i<num;i++){
                    if(data[i] != null){
                        $(".orderTable .table tr:eq("+i+")").html('<td class="pointer" item-id="'+data[i].id+'"><label class="location left">'+data[i].location+'</label><label class="time right">'+new Date(data[i].reservationTime).Format("yyyy-MM-dd hh:mm")+'</label></td>');
                    }
            }
            $(".orderTable .footer .btn").html(data.length+'个未处理问题<i class="iconfont icon-right"></i>');
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
};
//获取应急问题列表
function getLeaveListByNum(num) {
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
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
};
//获取dateList JSON对象
function getDateListJson(num) {
    var dateListJson = new Object();
    dateListJson.dateList = getDateList(num);
    return dateListJson;
}
//获取dateList对象
function getDateList(num) {
    var dateList = [];
    var now = new Date();
    for(var i=-num;i<0;i++){
        var date = new Date();
        date.setDate(now.getDate() + i + 1);
        dateList.push(date.Format("yyyy-MM-dd"));
    }
    return dateList;
};
function orderTableInit() {
    $(".orderTable .table tr").each(function () {
       $(this).html('<td><label class="location left">&emsp;</label><label class="time right">&emsp;</label></td>');
    });
    $(".orderTable .footer .btn").html('0个未处理问题<i class="iconfont icon-right"></i>');
}
function leaveTableInit() {
    $(".leaveTable .table tr").each(function () {
        $(this).html('<td><label class="name left">&emsp;</label><label class="time right">&emsp;</label></td>');
    });
    $(".leaveTable .footer .btn").html('0个未处理请求<i class="iconfont icon-right"></i>');
}