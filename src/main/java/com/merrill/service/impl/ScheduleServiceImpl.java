package com.merrill.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.merrill.dao.entity.Operator;
import com.merrill.dao.entity.Schedule;
import com.merrill.dao.mapper.EmptyTimeMapper;
import com.merrill.dao.mapper.OperatorMapper;
import com.merrill.dao.mapper.ScheduleMapper;
import com.merrill.dao.mapper.WorkTimeMapper;
import com.merrill.query.QueryObject;
import com.merrill.service.IScheduleService;
import com.merrill.utils.DateUtil;
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

    @Autowired
    private EmptyTimeMapper emptyTimeMapper;

    @Autowired
    private OperatorMapper operatorMapper;


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

    @Override
    public Schedule getSchedule(Long operatorID, Date date, int number) {
        return scheduleMapper.getSchedule(operatorID, date, number);
    }

    @Override
    public Schedule getSchedule(Long id) {
        return scheduleMapper.getScheduleByID(id);
    }

    @Override
    public boolean updateScheduleDescriptionAndStatus(Long id, String description, int status) {
        if (scheduleMapper.updateScheduleDescription(id, description, status) <= 0) {
            return false;
        }
        return true;
    }

    @Override
    public List<Schedule> getLeaveList() {
        return scheduleMapper.getScheduleListByStatus(8);
    }

    @Override
    public boolean updateScheduleStatus(Long id, int status) {
        if (scheduleMapper.updateScheduleStatus(id, status) <= 0) {
            return false;
        } else {
            return true;
        }
    }

    @Override
    public PageInfo getReviewedLeaveList(QueryObject qo) {
        PageHelper.startPage(qo.getCurrentPage(), qo.getPageSize());
        List<Schedule> list = scheduleMapper.getReviewedLeaveList(qo);
        PageInfo pageInfo = new PageInfo(list);
        if (pageInfo.getPages() <= 0) {
            pageInfo.setPages(1);
        }
        return pageInfo;
    }

    @Override
    public PageInfo getUnReviewedLeaveList(QueryObject qo) {
        PageHelper.startPage(qo.getCurrentPage(), qo.getPageSize());
        List<Schedule> list = scheduleMapper.getUnReviewedLeaveList(qo);
        PageInfo pageInfo = new PageInfo(list);
        if (pageInfo.getPages() <= 0) {
            pageInfo.setPages(1);
        }
        return pageInfo;
    }

    @Override
    public List<Operator> getOperatorListBySchedule(String date, String number) {
        List<Operator> list = new ArrayList<>();
        List<Long> ids = emptyTimeMapper.getOperatorIDByDateAndNumber(DateUtil.string2SqlDate(date), number);
        for (Long id : ids) {
            list.add(operatorMapper.getOperator(id));
        }
        return list;
    }

    @Override
    public List<Schedule> getLeaveListByOperatorID(Long operatorID) {
        java.sql.Date date = DateUtil.getCurrentSqlDate();
        return scheduleMapper.getLeaveListByOperatorID(date, operatorID);


    }
}
