package com.merrill.service;

import com.github.pagehelper.PageInfo;
import com.merrill.dao.entity.Order;
import com.merrill.query.OrderQueryObject;
import com.merrill.web.vo.OrderRate;

import java.util.Date;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-02-16
 * Time: 11:44
 * Description:
 */
public interface IOrderService {
    boolean saveOrder(Long id, String phone, String repairment, String location, String userDescription);

    Order getOrderByUserID(Long id);

    boolean finishOrder(Long id);

    PageInfo getOrderList(OrderQueryObject qo);

    PageInfo getOrderFinishedList(OrderQueryObject qo);

    boolean takeOrder(Long operatorID, Long orderID);

    List<OrderRate> getOrderRateListByDateList(List<Date> dates);

    List<Order> getOrderByNumber(int number);
}
