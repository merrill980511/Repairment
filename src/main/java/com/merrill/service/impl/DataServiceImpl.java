package com.merrill.service.impl;

import com.merrill.dao.mapper.AttendenceMapper;
import com.merrill.dao.mapper.OrderMapper;
import com.merrill.dao.mapper.ScheduleMapper;
import com.merrill.service.IDataService;
import com.merrill.utils.DateUtil;
import com.merrill.web.vo.AttendenceRate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-02-21
 * Time: 13:21
 * Description:
 */
@Service
@Transactional
public class DataServiceImpl implements IDataService {

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private AttendenceMapper attendenceMapper;

    @Autowired
    private ScheduleMapper scheduleMapper;

    @Override
    @Transactional(readOnly = true)
    public List<Integer> getAdminOverview() {
        List<Integer> list = new ArrayList<>();
        list.add(orderMapper.getOrderNumberByStatus(0));
        int unfinishedNum = orderMapper.getOrderNumberByDate(DateUtil.date2String(new Date()));
        int finishedNum = orderMapper.getOrderFinishedNumberByDate(DateUtil.date2String(new Date()));
        int num1 = attendenceMapper.getAttendenceNumByStatus(1);
        int num2 = attendenceMapper.getAttendenceNumByStatus(0);
        list.add(unfinishedNum + finishedNum);
        list.add(finishedNum);
        list.add(num1);
        list.add(num2);
        return list;
    }

    @Override
    public List<AttendenceRate> getAttendenceRate(String[] date) {
        /**
         * 3 缺勤
         * 4 迟到
         * 5 早退
         * 6 既迟到又早退
         * 7 异常
         * 8 请假申请
         * 9 请假批准
         * 10 请假驳回
         */
        ArrayList<AttendenceRate> list = new ArrayList<>();
        for (String s : date) {
            AttendenceRate attendenceRate = new AttendenceRate();
            java.sql.Date d = DateUtil.string2SqlDate(s);
            int late = scheduleMapper.getNumberByDateAndStatus(d, 4);
            int early = scheduleMapper.getNumberByDateAndStatus(d, 3);
            int absence = scheduleMapper.getNumberByDateAndStatus(d, 5);
            int both = scheduleMapper.getNumberByDateAndStatus(d, 6);
            int total = late + early + absence + both;
            attendenceRate.setLate(late + both);
            attendenceRate.setAbsence(absence);
            attendenceRate.setLeaveEarly(early + both);
            if (total == 0){
                attendenceRate.setAbsenceRate(0);
                attendenceRate.setLateRate(0);
                attendenceRate.setLeaveEarlyRate(0);
            } else {
                attendenceRate.setLateRate((double)(late + both) / total);
                attendenceRate.setLeaveEarlyRate((double)(early + both) / total);
                attendenceRate.setAbsenceRate((double)absence / total);
            }
            list.add(attendenceRate);
        }
        return list;
    }
}
