<%--
  Created by IntelliJ IDEA.
  User: 程鹏
  Date: 2019/2/12
  Time: 9:08
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>申请报修</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
    <link rel="stylesheet" type="text/css" href="/repair/user/css/repairmentApply.css">
</head>
<body>
    <input type="hidden" id="userID" value="${param.id}"/>
    <div class="form">

    </div>
    <div class="infoPanel">
    </div>
    <div class="helpPanel">
        <div class="helpPanel_top">
            <label class="helpPanel_title">帮助菜单</label>
            <a href="javascript:;"><img src="/repair/user/images/close.png" title="关闭" class="closeAction"/></a>
        </div>
        <iframe src="" id="helpFrame"></iframe>
        <div class="helpPanel_bottom"><input type="button" value="未解决我的网络问题" class="solveFailed"/></div>
    </div>
    <script type="text/javascript" src="/repair/user/js/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="/repair/user/js/jquery.date.js"></script>
    <script type="text/javascript" src="/repair/user/js/utils.js"></script>
    <script type="text/javascript" src="/repair/user/js/repairmentApply.js"></script>
</body>
</html>