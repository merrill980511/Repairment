package com.merrill.service.impl;

import com.merrill.dao.entity.Operator;
import com.merrill.dao.entity.Schedule;
import com.merrill.dao.mapper.ScheduleMapper;
import com.merrill.dao.mapper.WorkTimeMapper;
import com.merrill.service.IScheduleService;
import com.merrill.web.vo.ScheduleVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-03-05
 * Time: 20:05
 * Description:
 */

@Service
@Transactional
public class ScheduleServiceImpl implements IScheduleService {

    @Autowired
    private ScheduleMapper scheduleMapper;

    @Autowired
    private WorkTimeMapper workTimeMapper;

    @Override
    @Transactional(readOnly = true)
    public List<ScheduleVO> getScheduleListByDate(Date date) {
        List<ScheduleVO> scheduleVOS = new ArrayList<>();
        for (int i = 1; i < 5; i++) {
            List<Schedule> list = scheduleMapper.getScheduleListByDateAndNumber(new java.sql.Date(date.getTime()), i);
            ScheduleVO scheduleVO = new ScheduleVO();
            scheduleVO.setDate(date);
            scheduleVO.setWorkTime(workTimeMapper.getWorkTimeByNumber(i));
            List<Operator> operators = new ArrayList<>();
            for (Schedule schedule : list) {
                operators.add(schedule.getOperator());
            }
            scheduleVO.setOperatorList(operators);
            scheduleVOS.add(scheduleVO);
        }
        return scheduleVOS;
    }

    @Override
    public boolean updateScheduleList(ScheduleVO[] scheduleList) {
        for (ScheduleVO scheduleVO : scheduleList) {
            if (scheduleMapper.deleteScheduleListByDateAndNumber(scheduleVO.getDate(),
                    scheduleVO.getWorkTime().getNumber()) < 0) {
                return false;
            }
            for (Operator operator : scheduleVO.getOperatorList()) {
                if (scheduleMapper.addSchedule(scheduleVO.getDate(),
                        scheduleVO.getWorkTime().getNumber(), operator.getId(), 0) <= 0) {
                    return false;
                }
            }
        }
        return true;
    }

}
