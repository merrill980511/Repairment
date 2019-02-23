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
    <link rel="stylesheet" href="//at.alicdn.com/t/font_1050125_c1qebix8ucb.css" media="all">
    <link type="text/css" rel="stylesheet" href="/repair/admin/css/admin.css">
    <link type="text/css" rel="stylesheet" href="/repair/admin/css/adminTable.css">
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
            <a href="javascript:;">
                <i class="iconfont icon-chart"></i>图表
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
        <div class="panel-default">
            <div class="header">
                <i class="iconfont icon-table"></i>数据库表格
                <div class="select">
                    <button class="dropdown-toggle btn" data-toggle="dropdown" href="javascript:;" aria-expanded="false">
                        未处理问题<i class="iconfont icon-xiajiantou"></i>
                    </button>
                    <input type="text" class="hidden panel-item" value="order"/>
                    <div class="hidden options">
                        <ul>
                            <li><a class="javascript:;" panel-item="order"><i class="iconfont icon icon-order"></i>未处理问题</a></li>
                            <li><a class="javascript:;" panel-item="order-finished"><i class="iconfont icon icon-order"></i>已处理问题</a></li>
                            <li><a class="javascript:;" panel-item="operator"><i class="iconfont icon icon-team"></i>运维人员</a></li>
                            <li><a class="javascript:;" panel-item="user"><i class="iconfont icon icon-team"></i>用户</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="body">
                <table class="table">
                    <input type="hidden" id="pageSize" value="5">
                    <input type="hidden" id="currentPage" value="1">
                    <thead>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
            <div class="footer">
                <div class="page_devide">
                    <div id="pages"></div>
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
<script type="text/javascript" src="/repair/admin/js/jqPaginator.js"></script>
<script type="text/javascript" src="/repair/admin/js/pageFunction.js"></script>
<script type="text/javascript" src="/repair/admin/js/utils.js"></script>
<script type="text/javascript" src="/repair/admin/js/adminTable.js"></script>
<script type="text/javascript" src="/repair/admin/js/admin.js"></script>
</body>
</html>

