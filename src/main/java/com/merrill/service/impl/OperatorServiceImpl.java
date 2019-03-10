package com.merrill.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.merrill.dao.entity.Attendence;
import com.merrill.dao.entity.Operator;
import com.merrill.dao.mapper.AttendenceMapper;
import com.merrill.dao.mapper.OperatorMapper;
import com.merrill.dao.mapper.ScheduleMapper;
import com.merrill.query.OperatorQueryObject;
import com.merrill.service.IOperatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-02-21
 * Time: 23:22
 * Description:
 */

@Service
@Transactional
public class OperatorServiceImpl implements IOperatorService {

    @Autowired
    private OperatorMapper operatorMapper;

    @Autowired
    private AttendenceMapper attendenceMapper;

    @Autowired
    private ScheduleMapper scheduleMapper;


    @Override
    public boolean add(Operator operator) {
        if (operator.getPassword() == null){
            operator.setPassword(operator.getId() + "");
        }
        if (operatorMapper.add(operator.getId(), operator.getName(),
                operator.getPassword(), operator.getPhone()) > 0) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean delete(Long id) {
        if (operatorMapper.delete(id) > 0) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean update(Operator operator) {
        if (operatorMapper.update(operator.getId(), operator.getName(),
                operator.getPassword(), operator.getPhone()) > 0) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public Operator getOperator(Long id) {
        return operatorMapper.getOperator(id);
    }


    @Override
    public PageInfo getOperatorList(OperatorQueryObject qo) {
        PageHelper.startPage(qo.getCurrentPage(), qo.getPageSize());
        List<Operator> list = operatorMapper.getOperatorList(qo);
        PageInfo pageInfo = new PageInfo(list);
        if (pageInfo.getPages() <= 0) {
            pageInfo.setPages(1);
        }
        return pageInfo;
    }

    @Override
    public List<Operator> getAllOperatorList() {
        return operatorMapper.getAllOperatorList();
    }

    @Override
    public boolean isWork(Long operatorID) {
        Attendence attendence = attendenceMapper.getAttendenceByOperatorID(operatorID);
        if (attendence == null){
            return false;
        } else {
            return true;
        }
    }
}
