package com.merrill.service.impl;

import com.merrill.dao.entity.Attendence;
import com.merrill.dao.entity.Order;
import com.merrill.dao.mapper.AttendenceMapper;
import com.merrill.dao.mapper.OperatorMapper;
import com.merrill.dao.mapper.OrderMapper;
import com.merrill.service.IAttendenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Id;
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

    @Autowired
    private OperatorMapper operatorMapper;

    @Autowired
    private OrderMapper orderMapper;

    @Override
    public boolean checkin(Long id) {
        if (attendenceMapper.getAttendenceByOperatorID(id) != null){
            return false;
        }
        if (attendenceMapper.checkin(id) > 0){
            if (orderMapper.getOrderByOperatorIDAndStatus(id, 1).size() != 0){
                attendenceMapper.updateStatusByOperatorID(id, 0, 1);
            }
            return true;
        } else {
            return false;
        }
    }

    @Override
    public String checkout(Long id) {
        Attendence attendence = attendenceMapper.getAttendenceByOperatorID(id);
        if (attendenceMapper.checkout(attendence.getId(), new Date()) > 0){
            return "true";
        } else {
            return "打卡失败，请稍后重试";
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Attendence getAttendenceByOperatorID(Long operatorID) {
        Attendence attendence = attendenceMapper.getAttendenceByOperatorID(operatorID);
         if (attendence == null){
             attendence = new Attendence();
             attendence.setOperator(operatorMapper.getOperator(operatorID));
         }
        return attendence;
    }

    @Override
    public boolean updateStatusByOperatorID(Long operatorID) {
        if (attendenceMapper.updateStatusByOperatorID(operatorID, 1, 0) <= 0) {
            return false;
        }
        if (orderMapper.updateOrderByOperatorAndStatus(operatorID, 1, 2) <= 0){
            return false;
        }
        return true;
    }

}
