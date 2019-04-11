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
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
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
        <div class="top-left-index "><a href="javascript:;" class="admin-name">管理员</a></div>
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
            <li class="adminShiro">
                <a href="schedule">
                    <i class="iconfont icon-calendar-check"></i>考勤
                </a>
            </li>
            <li>
                <a href="table">
                    <i class="iconfont icon-file-exception"></i>报障
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
                        <a href="table">
                            <span class="num"></span>
                            <span class="name">未处理</span>
                        </a>
                    </div>
                    <div class="panel">
                        <a href="todayOrder">
                            <span class="num"></span>
                            <span class="name">今日问题</span>
                        </a>
                    </div>
                    <div class="panel">
                        <a href="todayOrderFinished">
                            <span class="num"></span>
                            <span class="name">今日已处理</span>
                        </a>
                    </div>
                    <div class="panel">
                        <a href="operatorBusy">
                            <span class="num"></span>
                            <span class="name">处理中人员</span>
                        </a>
                    </div>
                    <div class="panel adminShiro">
                        <a href="operatorFree">
                            <span class="num"></span>
                            <span class="name">值班室人员</span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="left-col">
                <div class="panel-default order-chart">
                    <div class="header">
                        <i class="iconfont icon-barchart"></i>问题详情
                    </div>
                    <div class="body">
                        <canvas id="orderChart"></canvas>
                    </div>
                </div>
                <div class="panel-default attendenceChart adminShiro">
                    <div class="header">
                        <i class="iconfont icon-areachart"></i>迟到早退率
                    </div>
                    <div class="body">
                        <canvas id="attendenceChart"></canvas>
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
                            </tbody>
                        </table>
                    </div>
                    <div class="footer">
                        <a href="table"><button class="btn">0个未处理问题<i class="iconfont icon-right"></i></button></a>
                    </div>
                </div>
                <div class="panel-default currentOperator adminShiro">
                    <div class="header">
                        <i class="iconfont icon-team"></i>当前人员
                    </div>
                    <div class="body">
                    </div>
                </div>
                <div class="panel-default leaveTable adminShiro">
                    <div class="header">
                        <i class="iconfont icon-order"></i>请假请求
                    </div>
                    <div class="body">
                        <table class="table">
                            <tbody>
                            <tr><td><label class="location left">&emsp;</label><label class="time right">&emsp;</label></td></tr>
                            <tr><td><label class="location left">&emsp;</label><label class="time right">&emsp;</label></td></tr>
                            <tr><td><label class="location left">&emsp;</label><label class="time right">&emsp;</label></td></tr>
                            <tr><td><label class="location left">&emsp;</label><label class="time right">&emsp;</label></td></tr>
                            <tr><td><label class="location left">&emsp;</label><label class="time right">&emsp;</label></td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="footer">
                        <a href="schedule"><button class="btn">0个未处理请求<i class="iconfont icon-right"></i></button></a>
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
    <script type="text/javascript" src="/repair/admin/js/tools/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="/repair/admin/js/tools/jquery.session.js"></script>
    <script type="text/javascript" src="/repair/admin/js/tools/Chart.js"></script>
    <script type="text/javascript" src="/repair/admin/js/tools/jqPaginator.js"></script>
    <script type="text/javascript" src="/repair/admin/js/admin.Common/globalVariable.js"></script>
    <script type="text/javascript" src="/repair/admin/js/admin.Common/pageFunction.js"></script>
    <script type="text/javascript" src="/repair/admin/js/admin.Common/entity.js"></script>
    <script type="text/javascript" src="/repair/admin/js/tools/md5.js"></script>
    <script type="text/javascript" src="/repair/admin/js/admin.Common/utils.js"></script>
    <script type="text/javascript" src="/repair/admin/js/admin.Common/formCheck.js"></script>
    <script type="text/javascript" src="/repair/admin/js/admin.Common/adminHtml.js"></script>
    <script type="text/javascript" src="/repair/admin/js/admin.Common/adminGetData.js"></script>
    <script type="text/javascript" src="/repair/admin/js/admin.Common/adminDataControll.js"></script>
    <script type="text/javascript" src="/repair/admin/js/admin.Common/adminInit.js"></script>
    <script type="text/javascript" src="/repair/admin/js/admin.Common/adminSetInfo.js"></script>
    <script type="text/javascript" src="/repair/admin/js/admin.Unity/adminIndex.js"></script>
    <script type="text/javascript" src="/repair/admin/js/admin.Common/adminCommon.js"></script>
</body>
</html>
