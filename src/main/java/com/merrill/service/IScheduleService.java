package com.merrill.service;

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
}
