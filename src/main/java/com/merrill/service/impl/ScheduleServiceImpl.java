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
                WorkTime workTime = new WorkTime();
                workTime.setNumber(i + 1);
                schedule.setWorkTime(workTime);
                list.add(schedule);
            }
        }
        return list;
    }
}
