package com.merrill.service.impl;

import com.merrill.dao.entity.Attendence;
import com.merrill.dao.entity.WorkTime;
import com.merrill.dao.mapper.*;
import com.merrill.service.IAttendenceService;
import com.merrill.utils.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Time;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-03-01
 * Time: 17:22
 * Description:
 */

@Service
@Transactional
public class AttendenceServiceImpl implements IAttendenceService {

    @Autowired
    private AttendenceMapper attendenceMapper;

    @Autowired
    private OperatorMapper operatorMapper;

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private ScheduleMapper scheduleMapper;

    @Autowired
    private WorkTimeMapper workTimeMapper;

    @Override
    public boolean checkin(Long id) {
        if (attendenceMapper.getAttendenceByOperatorID(id) != null) {
            return false;
        }
        if (attendenceMapper.checkin(id) > 0) {
            if (orderMapper.getOrderByOperatorIDAndStatus(id, 1).size() != 0) {
                attendenceMapper.updateStatusByOperatorID(id, 0, 1);
            }
            return true;
        } else {
            return false;
        }
    }

    @Override
    public String checkout(Long operatorID) {
        Attendence attendence = attendenceMapper.getLastAttendenceByOperatorID(operatorID);
        if (attendenceMapper.checkout(attendence.getId(), new Date()) > 0) {

            //验证值班状态信息
//            String time = DateUtil.getCurrentTime();
//            int number = workTimeMapper.getNumberByTime(time);

            Attendence a = attendenceMapper.getAttendenceByID(attendence.getId());

            Time checkInTime = DateUtil.getTimeByDate(a.getCheckinTime());
            Time checkOutTime = DateUtil.getTimeByDate(a.getCheckoutTime());

            Date date = new java.sql.Date(new Date().getTime());
            List<Integer> list = scheduleMapper.getNumbersByDateAndOperatorID(date, operatorID);
            for (Integer integer : list) {
                WorkTime workTime = workTimeMapper.getWorkTimeByNumber(integer);
                if (workTime == null) {
                    return "打卡失败，请联系管理员";
                }
                Time beginTime = workTime.getBeginTime();
                Time endTime = workTime.getEndTime();
                if (beginTime.after(checkOutTime) || endTime.before(checkInTime)) {
                    //不再指定时间段内，无影响
                    continue;
                } else if (beginTime.before(checkInTime) && endTime.after(checkOutTime)) {
                    //开始时间之前打卡，结束时间之后打卡，正常
                    scheduleMapper.updateScheduleOperatorStatus(operatorID, date, integer, 2);
                } else if (beginTime.before(checkInTime) && endTime.before(checkOutTime)) {
                    //开始时间之前打卡，结束时间之前打卡，早退
                    scheduleMapper.updateScheduleOperatorStatus(operatorID, date, integer, 5);
                } else if (beginTime.after(checkInTime) && endTime.before(checkOutTime)) {
                    //开始时间之后打卡，结束时间之后打卡，既迟到又早退
                    scheduleMapper.updateScheduleOperatorStatus(operatorID, date, integer, 6);
                } else if (beginTime.after(checkInTime) && endTime.after(checkOutTime)) {
                    //开始时间之后打卡，结束时间之后打卡，迟到
                    scheduleMapper.updateScheduleOperatorStatus(operatorID, date, integer, 4);
                } else {
                    //特殊情况，异常
                    scheduleMapper.updateScheduleOperatorStatus(operatorID, date, integer, 7);
                }

//                if (beginTime.after(checkOutTime) || endTime.before(checkInTime)) {
//                    continue;
//                } else if (beginTime.before(checkInTime) && endTime.after(checkInTime)) {
//                    if (beginTime.before(checkOutTime) && endTime.after(checkOutTime)) {
//                        scheduleMapper.updateScheduleOperatorStatus(operatorID, date, integer, 6);
////                        attendenceMapper.updateAttendenceStatusByID(attendence.getId(), 6);
//                    } else {
//                        scheduleMapper.updateScheduleOperatorStatus(operatorID, date, integer, 4);
////                        attendenceMapper.updateAttendenceStatusByID(attendence.getId(), 4);
//                    }
//                } else if (beginTime.before(checkOutTime) && endTime.after(checkOutTime)) {
//                    scheduleMapper.updateScheduleOperatorStatus(operatorID, date, integer, 5);
////                    attendenceMapper.updateAttendenceStatusByID(attendence.getId(), 5);
//                } else {
//                    scheduleMapper.updateScheduleOperatorStatus(operatorID, date, integer, 2);
////                    attendenceMapper.updateAttendenceStatusByID(attendence.getId(), 2);
//                }

            }
            return "true";
        } else {
            return "打卡失败，请稍后重试";
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Attendence getAttendenceByOperatorID(Long operatorID) {
        Attendence attendence = attendenceMapper.getLastAttendenceByOperatorID(operatorID);
        if (attendence == null || attendence.getStatus() == 2) {
            attendence = new Attendence();
            attendence.setOperator(operatorMapper.getOperator(operatorID));
        }
        return attendence;
    }

    @Override
    public List<Attendence> getCurrentOperatorList() {
        List<Attendence> list = new ArrayList<>();
        list.addAll(attendenceMapper.getAttendenceByStatus(0));
        list.addAll(attendenceMapper.getAttendenceByStatus(1));
        return list;
    }
}
