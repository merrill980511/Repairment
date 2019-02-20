package com.merrill.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.merrill.query.OrderQueryObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.merrill.dao.entity.Order;
import com.merrill.dao.entity.User;
import com.merrill.dao.mapper.OrderMapper;
import com.merrill.dao.mapper.UserMapper;
import com.merrill.service.IOrderService;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-02-16
 * Time: 11:44
 * Description:
 */
@Service
@Transactional
public class OrderServiceImpl implements IOrderService {
    @Autowired
    private OrderMapper orderMapper;
    @Autowired
    private UserMapper userMapper;

    @Override
    public boolean saveOrder(Long id, String phone, String repairment, String location, String userDescription) {
        User user = userMapper.getUserByID(id);
        if(orderMapper.saveOrder(id, user.getPhone(), location, repairment, userDescription) > 0){
            return true;
        } else {
            return false;
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Order getOrderByUserID(Long id) {
        return orderMapper.getOrderByUserID(id);
    }

    @Override
    public boolean finishOrder(Long id) {
        Order order = orderMapper.getOrderByID(id);
        if (orderMapper.deleteOrderByID(id) <= 0){
            return false;
        }
        if (order.getOperator() == null){
            if (orderMapper.saveFinishedOrder(order.getId(), order.getUser().getId(),
                    null, order.getLocation(), order.getPhone(),
                    order.getBeginTime(), order.getUserDescription(), order.getDescription(),
                    order.getRepairment(), 2) <= 0){
                return false;
            }
        } else {
            if (orderMapper.saveFinishedOrder(order.getId(), order.getUser().getId(),
                    order.getOperator().getId(), order.getLocation(), order.getPhone(),
                    order.getBeginTime(), order.getUserDescription(), order.getDescription(),
                    order.getRepairment(), 2) <= 0){
                return false;
            }
        }
        return true;
    }

    @Override
    @Transactional(readOnly = true)
    public PageInfo getOrderList(OrderQueryObject qo) {
        PageHelper.startPage(qo.getCurrentPage(), qo.getPageSize());
        List<?> list = orderMapper.getOrderList(qo);
        PageInfo pageInfo = new PageInfo(list);
        if (pageInfo.getPages() <= 0) {
            pageInfo.setPages(1);
        }
        return pageInfo;
    }

    @Override
    @Transactional(readOnly = true)
    public PageInfo getOrderFinishedList(OrderQueryObject qo) {
        PageHelper.startPage(qo.getCurrentPage(), qo.getPageSize());
        List<?> list = orderMapper.getOrderFinishedList(qo);
        PageInfo pageInfo = new PageInfo(list);
        if (pageInfo.getPages() <= 0) {
            pageInfo.setPages(1);
        }
        return pageInfo;
    }

    @Override
    public boolean takeOrder(Long operatorID, Long orderID) {
        if (orderMapper.takeOrder(operatorID, orderID, 1) > 0) {
            return true;
        }
        return false;
    }
}
