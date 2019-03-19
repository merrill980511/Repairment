<%--
  Created by IntelliJ IDEA.
  User: 程鹏
  Date: 2018/12/22
  Time: 11:27
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>用户登录</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
    <link rel="stylesheet" href="/repair/admin/css/login.css" type="text/css">
    <script type="text/javascript" src="/repair/admin/js/tools/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="/repair/admin/js/tools/jquery.cookie.js"></script>
    <script type="text/javascript" src="/repair/admin/js/tools/md5.js"></script>
    <script type="text/javascript" src="/repair/admin/js/login.js"></script>
</head>
<body>
<div id="frame">
    <div id="logo">信息办</div>
    <div id="form">
        <div class="info"><input type="text" placeholder="请输入登录账号" class="id" autofocus/>
            <div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div>
        </div>
        <div class="info"><input type="password" placeholder="请输入密码" class="password" maxlength="16" autocomplete="off" autocapitalize="off"/>
            <div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label></div>
        </div>
        <button id="loginAction">确认登录</button>
        <div class="errorMessage"><img src="/repair/admin/images/error.png"><label></label>
        </div>
    </div>
</div>
<form action="" class="hidden" id="urlChange" ></form>
</body>
</html>
