var orderLinearChart = document.getElementById("orderLinearChart").getContext("2d");
var orderBarChart = document.getElementById("orderBarChart").getContext("2d");
var orderPieChart = document.getElementById("orderPieChart").getContext("2d");

$(function () {
    getOverview();
    getOrderLinearChart(7);
    getOrderBarChart(7);
    getOrderSortByNum(10);
    //getOrderPieChart();
});
//创建线性表
function getOrderLinearChart(num){
    $.ajax({
        "url": "/repair/admin/getOrderFinishRate",
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
            "token":getToken(),
        },
        "data": JSON.stringify(getDateListJson(num)),
        "dataType": "json",
        "success": function (data) {
            setOrderLinearChart(data,getDateList(num));
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
}
//创建柱状图
function getOrderBarChart(num){
    $.ajax({
        "url": "/repair/admin/getOrderFinishRate",
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
            "token":getToken(),
        },
        "data": JSON.stringify(getDateListJson(num)),
        "dataType": "json",
        "success": function (data) {
            setOrderBarChart(data,getDateList(num));
        },
        "fail": function () {
            alert("服务器繁忙，请稍后再试");
        },
    });
}
function setOrderLinearChart(data,dateList) {
    var rateList = [];
    for(var i in data){
        rateList.push(data[i].rate);
    }
    var chart = new Chart(orderLinearChart, {
        type: "line",
        pointDot : true,
        responsive : true,
        data:{
            labels: dateList,
            datasets: [
                {
                    label: ['问题完成度'],
                    borderColor:"rgba(255,132,33,1)",
                    backgroundColor:"rgba(255,132,33,0.2)",
                    data : rateList,
                }
                ],
        },
    });
};
//创建柱状图
function setOrderBarChart(data,dateList) {
    var finishedNumberList = [];
    var unfinishedNumberList = [];
    for(var i in data){
        finishedNumberList.push(data[i].finishedNumber);
        unfinishedNumberList.push(data[i].unfinishedNumber)
    }
    var chart = new Chart(orderBarChart, {
        type: "bar",
        pointDot : true,
        responsive : true,
        data:{
            labels: dateList,
            datasets: [
                {
                    label: ['收到的问题'],
                    borderColor:"rgba(255,91,91,1)",
                    backgroundColor:"rgba(255,91,91,0.8)",
                    data : finishedNumberList,
                },
                {
                    label: ['处理成功问题'],
                    borderColor:"rgba(51,122,183,1)",
                    backgroundColor:"rgba(51,122,183,0.8)",
                    data : unfinishedNumberList,
                }
            ],
        },
    });
};
//创建饼状图
function getOrderPieChart() {
    $("#orderPieChart").height($("#orderPieChart").width());
    var chart = new Chart(orderPieChart, {
        type:"pie",
        data:{
            labels: [
                "未处理",
                "处理中",
                "处理完成",
                "到访不遇",
            ],
            datasets: [
                {
                    data: [6,7,52,18],
                    backgroundColor: [
                        "#21c8ff",
                        "#0bf8b8",
                        "#e24cf4",
                        "#fff714",
                    ],
                    hoverBackgroundColor: [
                        "#21c8ff",
                        "#0bf8b8",
                        "#e24cf4",
                        "#fff714",
                    ]
                }],
        },
    });
};
//获取概览内容
function getOverview() {
    $.ajax({
        "url": "/repair/admin/overview",
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
            "token":getToken(),
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
            "token":getToken(),
        },
        "data": "{\"number\":\""+num+"\"}",
        "dataType": "json",
        "success": function (data) {
            orderTableInit();
            for(var i  = 0;i<num;i++){
                    if(data[i] != null){
                        $(".orderTable .table tr:eq("+i+")").html('<td><label class="location left">'+data[i].location+'</label><label class="time right">'+dateLoad(data[i].beginTime)+'</label></td>');
                    }
            }
            $(".orderTable .footer .btn").html(data.length+'个未处理问题<i class="iconfont icon-right"></i>');
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