package com.merrill.service.impl;

import com.merrill.dao.entity.Attendence;
import com.merrill.dao.mapper.AttendenceMapper;
import com.merrill.service.IAttendenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

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

    @Override
    public Long checkin(Long id) {
        attendenceMapper.checkin(id);
        return attendenceMapper.getLastID();
    }

    @Override
    public String checkout(Long id) {
        if (attendenceMapper.checkout(id, new Date()) > 0){
            return "true";
        } else {
            return "打卡失败，请稍后重试";
        }
    }

    @Override
    public Attendence getAttendenceByOperatorID(Long operatorID) {
        Attendence attendence = attendenceMapper.getAttendenceByOperatorID(operatorID);
         if (attendence == null){
             attendence = new Attendence();
         }
        return attendence;
    }

}
