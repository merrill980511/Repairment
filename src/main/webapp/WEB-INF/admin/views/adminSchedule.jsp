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
            <a href="schedule">
                <i class="iconfont icon-calendar-check"></i>考勤
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
                            <th class="mon">周一<a href="javascript:;" title="编辑"><i class="iconfont icon-edit-solid editScheduleAction"></i></a></th>
                            <th class="tues">周二<a href="javascript:;" title="编辑"><i class="iconfont icon-edit-solid editScheduleAction"></i></a></th>
                            <th class="wed">周三<a href="javascript:;" title="编辑"><i class="iconfont icon-edit-solid editScheduleAction"></i></a></th>
                            <th class="thur">周四<a href="javascript:;" title="编辑"><i class="iconfont icon-edit-solid editScheduleAction"></i></a></th>
                            <th class="fri">周五<a href="javascript:;" title="编辑"><i class="iconfont icon-edit-solid editScheduleAction"></i></a></th>
                            <th class="sat">周六<a href="javascript:;" title="编辑"><i class="iconfont icon-edit-solid editScheduleAction"></i></a></th>
                            <th class="sun">周日<a href="javascript:;" title="编辑"><i class="iconfont icon-edit-solid editScheduleAction"></i></a></th>
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
    </div>
</div>
<div class="lid hidden">
    <div class="dialog hidden">
    </div>
    <div class="form hidden">
    </div>
</div>
<script type="text/javascript" src="/repair/admin/js/jquery-3.3.1.min.js"></script>
<script type="text/javascript" src="/repair/admin/js/adminSchedule.js"></script>
<script type="text/javascript" src="/repair/admin/js/jquery.cookie.js"></script>
<script type="text/javascript" src="/repair/admin/js/Chart.js"></script>
<script type="text/javascript" src="/repair/admin/js/utils.js"></script>
<script type="text/javascript" src="/repair/admin/js/admin.js"></script>
</body>
</html>

