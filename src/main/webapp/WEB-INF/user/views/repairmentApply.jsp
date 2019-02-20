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
    <link rel="stylesheet" type="text/css" href="/repair/user/css/repairmentApply.css">
    <script type="text/javascript" src="/repair/user/js/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="/repair/user/js/utils.js"></script>
    <script type="text/javascript" src="/repair/user/js/repairmentApply.js"></script>
</head>
<body>
    <input type="hidden" id="userID" value="1"/>
    <div class="form">
        <div class="step">
            <label class="name">报修地点</label>
            <div class="select-view">
                <input class="select location input" type="text" placeholder="请输入保修地点" maxlength="250"/>
            </div>
        </div>
        <div class="step">
            <label class="name">手机号码</label>
            <div class="select-view">
                <input class="select phone input" type="text" placeholder="请输入手机号码" maxlength="20"/>
            </div>
        </div>
    </div>
    <div class="infoPanel">
        <div class="info hide"><label class="title">&emsp;</label><input type="hidden" class="id" value=""></div>
        <div class="info"><label class="title">申&ensp;请&ensp;人：</label><label class="user"></label></div>
        <div class="info"><label class="title">地&emsp;&emsp;点：</label><label class="location"></label></div>
        <div class="info"><label class="title">电&emsp;&emsp;话：</label><label class="phone"></label></div>
        <div class="info"><label class="title">预约时间：</label><label class="beginTime"></label></div>
        <div class="info"><label class="title">状&emsp;&emsp;态：</label><label class="status"></label></div>
        <div class="info"><label class="title">处&ensp;理&ensp;人：</label><label class="operator"></label></div>
        <div class="info"><label class="title">备&emsp;&emsp;注：</label><label class="userDescription"></label></div>
        <div class="info"><label class="title">报修信息：</label><label class="repairment"></label></div>
        <div class="info"><label class="title">&emsp;</label><input type="button" class="finishOrder" value="问题已解决"></div>
    </div>
    <div class="helpPanel">
        <div class="helpPanel_top">
            <label class="helpPanel_title">帮助菜单</label>
            <a href="javascript:;"><img src="/repair/user/images/close.png" title="关闭" class="closeAction"/></a>
        </div>
        <iframe src="" id="helpFrame"></iframe>
        <div class="helpPanel_bottom"><input type="button" value="未解决我的网络问题" class="solveFailed"/></div>
    </div>
</body>
</html>