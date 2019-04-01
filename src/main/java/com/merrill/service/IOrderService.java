package com.merrill.service;

import com.github.pagehelper.PageInfo;
import com.merrill.dao.entity.Order;
import com.merrill.query.OperatorQueryObject;
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
    boolean saveOrder(Long id, String phone, String repairment, String location,
                      String userDescription, Date reservationTime);

    Order getOrderByUserID(Long id);

    boolean finishOrder(Long id);

    PageInfo getOrderList(OrderQueryObject qo);

    PageInfo getOrderFinishedList(OrderQueryObject qo);

    String takeOrder(Long operatorID, Long orderID);

    List<OrderRate> getOrderRateListByDateList(List<String> dates);

    List<Order> getOrderByNumber(int number);

    Order getOrderByID(Long id);

    boolean updateOrder(Long id, String location, String description, String userDescription, String repairment);

    boolean addOrder(Long userID, String location, String phone, String userDescription, String description, String repairment);

    Order getOrderInHandle(Long operatorID);

    PageInfo getOrderListByOperatorID(OperatorQueryObject qo);

    boolean deleteOrderByID(Long orderID);

    boolean updateStatusByOperatorID(Long operatorID, String description);

    boolean updateDescription(Long orderID, String description);
}
