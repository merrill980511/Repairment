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
    <title>考勤</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
    <link rel="stylesheet" href="//at.alicdn.com/t/font_1050125_t7qar5cy6b.css" media="all">
    <link type="text/css" rel="stylesheet" href="/repair/admin/css/admin.css">
    <link type="text/css" rel="stylesheet" href="/repair/admin/css/adminSchedule.css">
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
<div class="center-index adminShiro">
    <div class="content">
        <div class="panel-default schedule-management">
            <div class="header">
                <i class="iconfont icon-calendar-check"></i>考勤安排
                <div class="select">
                    <button class="dropdown-toggle btn" data-toggle="dropdown" href="javascript:;" aria-expanded="false">
                        本周&emsp;&emsp;&emsp;<i class="iconfont icon-xiajiantou"></i>
                    </button>
                    <input type="text" class="hidden panel-item" value="thisWeek"/>
                    <div class="hidden options">
                        <ul>
                            <li><a href="javascript:;" panel-item="thisWeek">本周&emsp;&emsp;&emsp;</a></li>
                            <li><a href="javascript:;" panel-item="nextWeek">下周&emsp;&emsp;&emsp;</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="body">
                <table class="table schedule">
                    <thead>
                        <tr class="schedule_titile">
                            <th class="first-col">&emsp;</th>
                            <th class="mon">周一&ensp;<span class="date"></span><a href="javascript:;" title="编辑"><i class="iconfont icon-edit-solid editScheduleAction"></i></a></th>
                            <th class="tues">周二&ensp;<span class="date"></span><a href="javascript:;" title="编辑"><i class="iconfont icon-edit-solid editScheduleAction"></i></a></th>
                            <th class="wed">周三&ensp;<span class="date"></span><a href="javascript:;" title="编辑"><i class="iconfont icon-edit-solid editScheduleAction"></i></a></th>
                            <th class="thur">周四&ensp;<span class="date"></span><a href="javascript:;" title="编辑"><i class="iconfont icon-edit-solid editScheduleAction"></i></a></th>
                            <th class="fri">周五&ensp;<span class="date"></span><a href="javascript:;" title="编辑"><i class="iconfont icon-edit-solid editScheduleAction"></i></a></th>
                            <th class="sat">周六&ensp;<span class="date"></span><a href="javascript:;" title="编辑"><i class="iconfont icon-edit-solid editScheduleAction"></i></a></th>
                            <th class="sun">周日&ensp;<span class="date"></span><a href="javascript:;" title="编辑"><i class="iconfont icon-edit-solid editScheduleAction"></i></a></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="schedule_content first odd">
                            <td class="first-col">一<br/>二</td>
                            <td class="mon"></td>
                            <td class="tues"></td>
                            <td class="wed"></td>
                            <td class="thur"></td>
                            <td class="fri"></td>
                            <td class="sat"></td>
                            <td class="sun"></td>
                        </tr>
                        <tr class="schedule_content second even">
                            <td class="first-col">三<br/>四</td>
                            <td class="mon"></td>
                            <td class="tues"></td>
                            <td class="wed"></td>
                            <td class="thur"></td>
                            <td class="fri"></td>
                            <td class="sat"></td>
                            <td class="sun"></td>
                        </tr>
                        <tr class="schedule_content third odd">
                            <td class="first-col">五<br/>六</td>
                            <td class="mon"></td>
                            <td class="tues"></td>
                            <td class="wed"></td>
                            <td class="thur"></td>
                            <td class="fri"></td>
                            <td class="sat"></td>
                            <td class="sun"></td>
                        </tr>
                        <tr class="schedule_content fourth even">
                            <td class="first-col">七<br/>八</td>
                            <td class="mon"></td>
                            <td class="tues"></td>
                            <td class="wed"></td>
                            <td class="thur"></td>
                            <td class="fri"></td>
                            <td class="sat"></td>
                            <td class="sun"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="panel-default leave-management table-panel">
            <div class="header">
                <i class="iconfont icon-audit"></i>请假单
                <div class="select">
                    <button class="dropdown-toggle btn" data-toggle="dropdown" href="javascript:;" aria-expanded="false">
                        未审核&emsp;&emsp;<i class="iconfont icon-xiajiantou"></i>
                    </button>
                    <input type="text" class="hidden panel-item" value="notRead"/>
                    <div class="hidden options">
                        <ul>
                            <li><a href="javascript:;" panel-item="notRead">未审核&emsp;&emsp;</a></li>
                            <li><a href="javascript:;" panel-item="haveRead">已审核&emsp;&emsp;</a></li>
                        </ul>
                    </div>
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
<script type="text/javascript" src="/repair/admin/js/tools/jqPaginator.js"></script>
<script type="text/javascript" src="/repair/admin/js/admin.Common/globalVariable.js"></script>
<script type="text/javascript" src="/repair/admin/js/admin.Common/pageFunction.js"></script>
<script type="text/javascript" src="/repair/admin/js/admin.Common/entity.js"></script>
<script type="text/javascript" src="/repair/admin/js/admin.Common/utils.js"></script>
<script type="text/javascript" src="/repair/admin/js/admin.Common/formCheck.js"></script>
<script type="text/javascript" src="/repair/admin/js/admin.Common/adminHtml.js"></script>
<script type="text/javascript" src="/repair/admin/js/admin.Common/adminGetData.js"></script>
<script type="text/javascript" src="/repair/admin/js/admin.Common/adminInit.js"></script>
<script type="text/javascript" src="/repair/admin/js/admin.Common/adminSetInfo.js"></script>
<script type="text/javascript" src="/repair/admin/js/admin.Unity/adminSchedule.js"></script>
<script type="text/javascript" src="/repair/admin/js/admin.Common/adminCommon.js"></script>
</body>
</html>

