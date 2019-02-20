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
    <script type="text/javascript" src="/repair/operator/js/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="/repair/operator/js/utils.js"></script>
    <script type="text/javascript" src="/repair/operator/js/jqPaginator.js"></script>
    <script type="text/javascript" src="/repair/operator/js/pageFunction.js"></script>
    <script type="text/javascript" src="/repair/operator/js/orderListView.js"></script>
</head>
<body>
<input type="hidden" id="operatorID" value="1"/>
<input type="hidden" id="totalPages" value="1"/>
<input type="hidden" id="currentPage" value="1"/>
<input type="hidden" id="pageSize" value="5"/>
<div id="page_devide">
    <div id="pages"></div>
</div>
<div class="table">
    <div class="tr">
        <div class="th location">地点</div><div class="th userDescription">用户备注</div><div class="th repairment">提交表单</div><div class="th action">操作</div>
    </div>
</div>
<div class="infoPanel">
    <div class="info"><label class="title">申&ensp;请&ensp;人：</label><label class="user"></label></div>
    <div class="info"><label class="title">地&emsp;&emsp;点：</label><label class="location"></label></div>
    <div class="info"><label class="title">电&emsp;&emsp;话：</label><label class="phone"></label></div>
    <div class="info"><label class="title">预约时间：</label><label class="beginTime"></label></div>
    <div class="info"><label class="title">状&emsp;&emsp;态：</label><label class="status"></label></div>
    <div class="info"><label class="title">处&ensp;理&ensp;人：</label><label class="operator"></label></div>
    <div class="info"><label class="title">备&emsp;&emsp;注：</label><label class="userDescription"></label></div>
    <div class="info"><label class="title">报修信息：</label><label class="repairment"></label></div>
</div>
</body>
</html>
