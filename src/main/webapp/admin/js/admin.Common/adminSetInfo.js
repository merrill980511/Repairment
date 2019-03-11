//修改密码
function setAdminFormInfo(){
    $(".lid .form .body").html(getEditAdminFormBodyHTML());
}
//置入概览内容
function setOverview(list) {
    var overviewPanel = $(".overview .panel");
    overviewPanel.each(function (index,element) {
        $(this).find(".num").text(list[index]);
    });
};
//当前人员
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
//表格
//值班表
function setScheduleTableInfo() {
    for(var i in list){
        setScheduleColInfo(i,list[i]);
    }
}
//值班表单列数据置入
function setScheduleColInfo(i,scheduleList) {
    $(".table tbody tr").each(function (index,item) {
        if(scheduleList[index] != null) {
            var operatorNames = '';
            var length = 0;
            for(var x in scheduleList[index].operatorList){
                if(scheduleList[index].operatorList[x] != null){
                    length++;
                    if(length%2 == 1){
                        operatorNames += scheduleList[index].operatorList[x].name;
                    }else{
                        operatorNames += ","+scheduleList[index].operatorList[x].name + "<br/>";
                    }
                }
            }
            var j = Number(i)+2;
            $(this).find("td:nth-child("+j+")").html(operatorNames);
        }
    });
};
//表单
//值班表
function setEditScheduleFormInfo(scheduleList){
    $(".form .body").html(getEditScheduleFormInfo(scheduleList));
    var scheduleInfo = $(".form .info");
    scheduleInfo.each(function (index,item) {
        var editSchedule = scheduleList[index];
        if(editSchedule != null) {
            for (var x in editSchedule.operatorList) {
                if (editSchedule.operatorList[x] != null) {
                    var j = Number(x)+2;
                    $(this).find("select:nth-child(" +j+ ")").val(editSchedule.operatorList[x].id);
                }
            }
        }
    });
}
//修改数据面板显示
function setEditFormInfo() {
    var panelItem = $(".panel-default .header").find(".panel-item").val();
    var id = $(".form").attr("item-id");
    switch (panelItem) {
        case "order":
            $(".form .body").html(getEditOrderFormBodyHTML(getItem(id,"getOrder")));
            break;
        case "order-finished":
            $(".form .body").html(getEditOrderFinishedFormBodyHTML(getItem(id,"getOrder")));
            break;
        case "operator":
            $(".form .body").html(getEditOperatorFormBodyHTML(getItem(id,"getOperator")));
            break;
        case "user":
            $(".form .body").html(getEditUserFormBodyHTML(getItem(id,"getUser")));
            break;
        default:
            $(".form .body").html("");
            break;
    };
};
//添加数据面板显示
function setAddFormInfo() {
    var panelItem = $(".panel-default .header").find(".panel-item").val();
    var id = $(".form").attr("item-id");
    switch (panelItem) {
        case "order":
            $(".form .body").html(getAddOrderFormBodyHTML(getItem(id,"getOrder")));
            break;
        case "operator":
            $(".form .body").html(getAddOperatorFormBodyHTML(getItem(id,"getOperator")));
            break;
        case "user":
            $(".form .body").html(getAddUserFormBodyHTML(getItem(id,"getUser")));
            break;
        default:
            $(".form .body").html("");
            break;
    };
};
//图
//问题图
function setOrderChart(data,dateList) {
    var finishedNumberList = [];
    var totalNumberList = [];
    var rateList = [];
    for(var i in data){
        finishedNumberList.push(data[i].finishedNumber);
        totalNumberList.push(data[i].totalNumber)
        rateList.push(data[i].rate*100);
    }
    var orderChart = document.getElementById("orderChart").getContext("2d");
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
                    data : totalNumberList,
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
                    borderWidth: '4',
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
//考勤图
function setAttendenceChart(data,dateList) {
    var comeLateRateList = [];
    var leaveEarlyRateList = [];
    var absenceRateList = [];
    for(var i in data){
        comeLateRateList.push(data[i].LateRate);
        leaveEarlyRateList.push(data[i].leaveEarlyRate)
        absenceRateList.push(data[i].absenceRate);
    }
    var attendenceChart = document.getElementById("attendenceChart").getContext("2d");
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
