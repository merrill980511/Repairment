<%--
  Created by IntelliJ IDEA.
  User: 程鹏
  Date: 2019/2/19
  Time: 11:11
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<html>
<head>
    <title>信息办管理后台</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
    <link rel="stylesheet" href="//at.alicdn.com/t/font_1050125_t7qar5cy6b.css" media="all">
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
        <div class="panel-default table-panel">
            <div class="header">
                <i class="iconfont icon-table"></i>数据库表格
                <div class="select">
                    <button class="dropdown-toggle btn" data-toggle="dropdown" href="javascript:;" aria-expanded="false">
                        处理中人员
                    </button>
                    <input type="text" class="hidden panel-item" value="operatorBusy"/>
                </div>
            </div>
            <div class="body">
                <div class="table-check"><div class="check"><input type="text" class="keyWord" placeholder="请输入关键词" autocomplete="new-check"/><a href="javascript:;" class="searchAction" title="搜索"><i class="iconfont icon-search"></i></a></div></div>
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
<script type="text/javascript" src="/repair/admin/js/admin.Unity/adminTable.js"></script>
<script type="text/javascript" src="/repair/admin/js/admin.Common/adminCommon.js"></script>
</body>
</html>

