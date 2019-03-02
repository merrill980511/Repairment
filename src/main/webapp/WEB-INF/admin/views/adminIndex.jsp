<%--
  Created by IntelliJ IDEA.
  User: 程鹏
  Date: 2019/2/19
  Time: 11:11
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>信息办管理后台</title>
    <link rel="stylesheet" href="//at.alicdn.com/t/font_1050125_t7qar5cy6b.css" media="all">
    <link type="text/css" rel="stylesheet" href="/repair/admin/css/admin.css">
    <link type="text/css" rel="stylesheet" href="/repair/admin/css/adminIndex.css">
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
                            <li><a class="editAdmin" href="javascript:;"><i class="iconfont icon icon-setting"></i>修改个人信息</a></li>
                            <li class="divider"></li>
                            <li><a class="logout" href="javascript:;"><i class="iconfont icon icon-logout"></i>退出登录</a></li>
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
            <div class="overview">
                <div class="header">
                    概览
                </div>
                <div class="body">
                    <div class="panel">
                        <a href="javascript:;">
                            <span class="num">8</span>
                            <span class="name">未处理</span>
                        </a>
                    </div>
                    <div class="panel">
                        <a href="javascript:;">
                            <span class="num">5</span>
                            <span class="name">今日问题</span>
                        </a>
                    </div>
                    <div class="panel">
                        <a href="javascript:;">
                            <span class="num">3</span>
                            <span class="name">今日已处理</span>
                        </a>
                    </div>
                    <div class="panel">
                        <a href="javascript:;">
                            <span class="num">10</span>
                            <span class="name">处理中人员</span>
                        </a>
                    </div>
                    <div class="panel">
                        <a href="javascript:;">
                            <span class="num">1</span>
                            <span class="name">值班室人员</span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="left-col">
                <div class="panel-default order-linear-chart">
                    <div class="header">
                        <i class="iconfont icon-areachart"></i>问题详情线性图
                    </div>
                    <div class="body">
                        <canvas id="orderLinearChart"></canvas>
                    </div>
                </div>
                <div class="panel-default order-bar-chart">
                    <div class="header">
                        <i class="iconfont icon-barchart"></i>问题详情柱状图
                    </div>
                    <div class="body">
                        <canvas id="orderBarChart"></canvas>
                    </div>
                </div>
            </div>
            <div class="right-col">
                <div class="panel-default orderTable">
                    <div class="header">
                        <i class="iconfont icon-order"></i>未处理问题
                    </div>
                    <div class="body">
                        <table class="table">
                            <tbody>
                                <tr><td><label class="location left">&emsp;</label><label class="time right">&emsp;</label></td></tr>
                                <tr><td><label class="location left">&emsp;</label><label class="time right">&emsp;</label></td></tr>
                                <tr><td><label class="location left">&emsp;</label><label class="time right">&emsp;</label></td></tr>
                                <tr><td><label class="location left">&emsp;</label><label class="time right">&emsp;</label></td></tr>
                                <tr><td><label class="location left">&emsp;</label><label class="time right">&emsp;</label></td></tr>
                                <tr><td><label class="location left">&emsp;</label><label class="time right">&emsp;</label></td></tr>
                                <tr><td><label class="location left">&emsp;</label><label class="time right">&emsp;</label></td></tr>
                                <tr><td><label class="location left">&emsp;</label><label class="time right">&emsp;</label></td></tr>
                                <tr><td><label class="location left">&emsp;</label><label class="time right">&emsp;</label></td></tr>
                                <tr><td><label class="location left">&emsp;</label><label class="time right">&emsp;</label></td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="footer">
                        <button class="btn">30个未处理问题<i class="iconfont icon-right"></i></button>
                    </div>
                </div>
                <div class="panel-default order-pie-chart">
                    <div class="header">
                        <i class="iconfont icon-piechart"></i>问题详情饼状图
                    </div>
                    <div class="body">
                        <canvas id="orderPieChart" width="129%"></canvas>
                    </div>
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
    <script type="text/javascript" src="/repair/admin/js/jquery.cookie.js"></script>
    <script type="text/javascript" src="/repair/admin/js/Chart.js"></script>
    <script type="text/javascript" src="/repair/admin/js/formCheck.js"></script>
    <script type="text/javascript" src="/repair/admin/js/utils.js"></script>
    <script type="text/javascript" src="/repair/admin/js/adminIndex.js"></script>
    <script type="text/javascript" src="/repair/admin/js/admin.js"></script>
</body>
</html>
