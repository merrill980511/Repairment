package com.merrill.service.impl;

import com.merrill.dao.entity.Schedule;
import com.merrill.dao.entity.WorkTime;
import com.merrill.dao.mapper.ScheduleMapper;
import com.merrill.service.IScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Override
    public List<Schedule> getScheduleListByDate(Date date) {
        List<Schedule> list = scheduleMapper.getScheduleListByDate(date);
        for (int i = 0; i < 4; i++) {
            if (i >= list.size()) {
                Schedule schedule = new Schedule();
                schedule.setId(-2L);
                WorkTime workTime = new WorkTime();
                workTime.setNumber(i + 1);
                schedule.setWorkTime(workTime);
                list.add(schedule);
            }
        }
        return list;
    }

    @Override
    public boolean updateScheduleList(Schedule[] scheduleList) {
        for (int i = 0; i < scheduleList.length; i++) {
            if (scheduleList[i].getId().equals(-2L)) {
//                java.sql.Date sqlDate = new java.sql.Date(scheduleList[i].getDate().getTime());
                if (scheduleMapper.addSchedule(scheduleList[i].getDate(), scheduleList[i].getWorkTime().getNumber(),
                        scheduleList[i].getOperator1().getId(), scheduleList[i].getOperator2().getId(),
                        scheduleList[i].getOperator3().getId(), scheduleList[i].getOperator4().getId()) < 0) {
                    return false;
                }
            } else {
                if (scheduleMapper.updateSchedule(scheduleList[i].getId(),
                        scheduleList[i].getOperator1().getId(), scheduleList[i].getOperator2().getId(),
                        scheduleList[i].getOperator3().getId(), scheduleList[i].getOperator4().getId()) < 0) {
                    return false;
                }
            }
        }
        return true;
    }
}
