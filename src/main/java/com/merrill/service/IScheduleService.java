package com.merrill.service;

import com.github.pagehelper.PageInfo;
import com.merrill.dao.entity.Operator;
import com.merrill.dao.entity.Schedule;
import com.merrill.query.QueryObject;
import com.merrill.web.vo.ScheduleVO;

import java.util.Date;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-03-05
 * Time: 20:05
 * Description:
 */
public interface IScheduleService {
    List<ScheduleVO> getScheduleListByDate(Date date);

    boolean updateScheduleList(ScheduleVO[] scheduleList);

    Schedule getSchedule(Long operatorID, Date string2Date, int number);

    Schedule getSchedule(Long id);

    boolean updateScheduleDescriptionAndStatus(Long id, String description, int status);

    List<Schedule> getLeaveList();

    boolean updateScheduleStatus(Long id, int status);

    PageInfo getReviewedLeaveList(QueryObject qo);

    PageInfo getUnReviewedLeaveList(QueryObject qo);

    List<Operator> getOperatorListBySchedule(String date, String number);

    List<Schedule> getLeaveListByOperatorID(Long operatorID);
}
