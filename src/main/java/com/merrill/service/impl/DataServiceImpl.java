package com.merrill.service.impl;

import com.merrill.dao.entity.Attendence;
import com.merrill.dao.mapper.AttendenceMapper;
import com.merrill.dao.mapper.OperatorMapper;
import com.merrill.dao.mapper.OrderMapper;
import com.merrill.dao.mapper.UserMapper;
import com.merrill.service.IDataService;
import com.merrill.utils.DateUtil;
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

    @Override
    @Transactional(readOnly = true)
    public List<Integer> getAdminOverview() {
        List<Integer> list = new ArrayList<>();
        list.add(orderMapper.getOrderNumberByStatus(0));
        int unfinishedNum = orderMapper.getOrderNumberByDate(DateUtil.date2String(new Date()));
        int finishedNum = orderMapper.getOrderFinishedNumberByDate(DateUtil.date2String(new Date()));
        int num1 = attendenceMapper.getAttendenceNumByStatus(0);
        int num2 = attendenceMapper.getAttendenceNumByStatus(1);
        list.add(unfinishedNum + finishedNum);
        list.add(finishedNum);
        list.add(num1);
        list.add(num2);
        return list;
    }
}
