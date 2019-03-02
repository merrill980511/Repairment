<%--
  Created by IntelliJ IDEA.
  User: 程鹏
  Date: 2019/2/26
  Time: 12:53
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>选项管理</title>
    <link rel="stylesheet" href="//at.alicdn.com/t/font_1050125_t7qar5cy6b.css" media="all">
    <link type="text/css" rel="stylesheet" href="/repair/admin/css/admin.css">
    <link type="text/css" rel="stylesheet" href="/repair/admin/css/adminIndex.css">
    <link type="text/css" rel="stylesheet" href="/repair/admin/css/joint.css">
    <style type="text/css">
        .iconfont{
            font-size: inherit;
        }
    </style>
</head>
<body>
<div class="adcenter"></div>
<div class="top-index">
    <div class="top-left-index "><a href="javascript:;" class="admin-name">曹勇志</a></div>
    <div class="top-right-index">
        <ul>
            <li>
                <a class="dropdown-toggle" data-toggle="dropdown" href="javascript:;" aria-expanded="false">
                    <i class="iconfont icon icon-user-solid icon-first"></i>
                    <i class="iconfont icon icon-xiajiantou icon-not-first"></i>
                </a>
                <div class="hidden options">
                    <ul>
                        <li><a class="javascript:;"><i class="iconfont icon icon-setting"></i>修改个人信息</a></li>
                        <li class="divider"></li>
                        <li><a class="javascript:;"><i class="iconfont icon icon-logout"></i>退出登录</a></li>
                    </ul>
                </div>
            </li>
        </ul>
    </div>
</div>
<div class="left-index">
    <ul class="first-level">
        <li>
            <a href="index">
                <i class="iconfont icon-home-solid-2"></i>首页
            </a>
        </li>
        <li>
            <a href="step">
                <i class="iconfont icon-solution"></i>用户选项
            </a>
        </li>
        <li>
            <a href="table">
                <i class="iconfont icon-database-solid"></i>数据库
            </a>
        </li>
    </ul>
</div>
<div class="center-index">
    <div class="content">
        <div class="panel-default step-management">
            <div class="header">
                <i class="iconfont icon-solution"></i>用户选项管理
            </div>
            <div class="body">
                <div class="ProcessDiv"></div>
                <div id="paper"></div>
            </div>
        </div>
    </div>
</div>
<div class="lid hidden">
    <div class="dialog hidden">
    </div>
    <div class="form hidden">
    </div>
</div>
<script type="text/javascript" src="/repair/admin/js/jquery-3.3.1.min.js"></script>
<script type="text/javascript" src="/repair/admin/js/lodash.js"></script>
<script type="text/javascript" src="/repair/admin/js/backbone.js"></script>
<script type="text/javascript" src="/repair/admin/js/joint.js"></script>
<script type="text/javascript" src="/repair/admin/js/adminStep.js"></script>
<script type="text/javascript" src="/repair/admin/js/jquery.cookie.js"></script>
<script type="text/javascript" src="/repair/admin/js/Chart.js"></script>
<script type="text/javascript" src="/repair/admin/js/utils.js"></script>
<script type="text/javascript" src="/repair/admin/js/admin.js"></script>
</body>
</html>
