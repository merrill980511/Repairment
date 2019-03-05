package com.merrill.service.impl;

import com.merrill.dao.entity.Schedule;
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
        return scheduleMapper.getScheduleListByDate(date);
    }
}
