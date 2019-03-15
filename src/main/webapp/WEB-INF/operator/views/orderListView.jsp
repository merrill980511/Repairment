<%--
  Created by IntelliJ IDEA.
  User: 程鹏
  Date: 2019/2/17
  Time: 14:37
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>运维</title>
    <link rel="stylesheet" type="text/css" href="/repair/operator/css/orderListView.css">
    <link rel="stylesheet" href="//at.alicdn.com/t/font_1050125_gujzm24hyip.css" media="all">
</head>
<body>
<input type="hidden" id="operatorID" value="${param.id}"/>
<input type="hidden" id="totalPages" value="1"/>
<input type="hidden" id="currentPage" value="1"/>
<input type="hidden" id="pageSize" value="5"/>
<input type="hidden" id="table-item" value="checkIn"/>
<div id="page_devide">
    <div id="pages"></div>
    <div id="check"><input type="text" id="keyWord"><button id="checkAction"><i class="iconfont icon-search"></i></button></div>
</div>
<div class="table"></div>
<div class="infoPanel"></div>
<div class="homePanel">
</div>
<div class="helpPanel">
</div>
<div class="bottom-index">
    <div class="indexButton checkIn" table-item="checkIn">打卡</div>
    <div class="indexButton order" table-item="order">未处理</div>
    <div class="indexButton handlingOrder" table-item="handlingOrder">处理中</div>
    <div class="indexSelect">
        <div class="indexSelectItem">运维<i class="iconfont icon-up"></i></div>
        <div class="options hidden">
            <div class="indexButton myOrder" table-item="myOrder">我的运维</div>
            <div class="indexButton order-finished" table-item="order-finished">历史运维</div>
        </div>
    </div>
</div>
<script type="text/javascript" src="/repair/operator/js/tools/jquery-3.3.1.min.js"></script>
<script type="text/javascript" src="/repair/operator/js/tools/jquery.date.js"></script>
<script type="text/javascript" src="/repair/operator/js/tools/jqPaginator.js"></script>
<script type="text/javascript" src="/repair/operator/js/operator.Common/globalVariable.js"></script>
<script type="text/javascript" src="/repair/operator/js/operator.Common/utils.js"></script>
<script type="text/javascript" src="/repair/operator/js/operator.Common/pageFunction.js"></script>
<script type="text/javascript" src="/repair/operator/js/operator.Common/formCheck.js"></script>
<script type="text/javascript" src="/repair/operator/js/operator.Common/operatorGetData.js"></script>
<script type="text/javascript" src="/repair/operator/js/operator.Common/operatorSetInfo.js"></script>
<script type="text/javascript" src="/repair/operator/js/operator.Common/operatorHtml.js"></script>
<script type="text/javascript" src="/repair/operator/js/operator.Common/operatorInit.js"></script>
<script type="text/javascript" src="/repair/operator/js/operator.Common/operatorCommon.js"></script>
<script type="text/javascript" src="/repair/operator/js/operator.Unity/orderListView.js"></script>
</body>
</html>
