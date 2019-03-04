package com.merrill.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.merrill.dao.entity.Attendence;
import com.merrill.dao.entity.Operator;
import com.merrill.dao.mapper.AttendenceMapper;
import com.merrill.query.OperatorQueryObject;
import com.merrill.query.OrderQueryObject;
import com.merrill.utils.DateUtil;
import com.merrill.web.vo.OrderRate;
import com.merrill.web.vo.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.merrill.dao.entity.Order;
import com.merrill.dao.entity.User;
import com.merrill.dao.mapper.OrderMapper;
import com.merrill.dao.mapper.UserMapper;
import com.merrill.service.IOrderService;

import java.util.ArrayList;
import java.util.Date;
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
    @Autowired
    private AttendenceMapper attendenceMapper;

    @Override
    public boolean saveOrder(Long id, String phone, String repairment, String location, String userDescription, Date reservationTime) {
        User user = userMapper.getUserByID(id);
        if (reservationTime == null){
            reservationTime = new Date();
        }
        if(orderMapper.saveOrder(id, phone, location, repairment, userDescription, reservationTime) > 0){
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
        Attendence attendence = attendenceMapper.getLastAttendenceByOperatorID(id);
        if (attendenceMapper.updateAttendenceStatusByID(attendence.getId(), 0) <= 0){
            return false;
        }
        if (order.getOperator() == null){
            if (orderMapper.saveFinishedOrder(order.getId(), order.getUser().getId(),
                    null, order.getLocation(), order.getPhone(),
                    order.getBeginTime(), order.getHandleTime(), order.getUserDescription(),
                    order.getDescription(), order.getRepairment(), 2, order.getReservationTime()) <= 0){
                return false;
            }
        } else {
            if (orderMapper.saveFinishedOrder(order.getId(), order.getUser().getId(),
                    order.getOperator().getId(), order.getLocation(), order.getPhone(),
                    order.getBeginTime(), order.getHandleTime(),order.getUserDescription(),
                    order.getDescription(), order.getRepairment(), 2, order.getReservationTime()) <= 0){
                return false;
            }
        }
        return true;
    }

    @Override
    @Transactional(readOnly = true)
    public PageInfo getOrderList(OrderQueryObject qo) {
        PageHelper.startPage(qo.getCurrentPage(), qo.getPageSize());
        List<Order> list = orderMapper.getOrderList(qo);
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
        List<Order> list = orderMapper.getOrderFinishedList(qo);
        PageInfo pageInfo = new PageInfo(list);
        if (pageInfo.getPages() <= 0) {
            pageInfo.setPages(1);
        }
        return pageInfo;
    }

    @Override
    public String takeOrder(Long operatorID, Long orderID) {
        Attendence attendence = attendenceMapper.getAttendenceByOperatorID(operatorID);
        if (attendence == null){
            return "您未打卡签到，请先签到";
        }
        if (orderMapper.getOrderByOperatorIDAndStatus(operatorID, 1).size() > 0){
            return "承接订单失败，请先处理完当前订单";
        }
        if (attendenceMapper.updateAttendenceStatusByID(attendence.getId(), 1) < 0){
            return "承接订单失败，请稍后重试";
        }
        if (orderMapper.takeOrder(operatorID, orderID, 1, new Date()) > 0) {
            return "true";
        }
        return "承接订单失败，请稍后重试";
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderRate> getOrderRateListByDateList(List<String> dates) {
        List<OrderRate> list = new ArrayList<>();
        for (String date : dates) {
            OrderRate orderRate = new OrderRate();
            int finishedNumber = orderMapper.getOrderFinishedNumberByDate(DateUtil.string2String(date));
            int unfinishedNumber = orderMapper.getOrderNumberByDate(DateUtil.string2String(date));
            int total = finishedNumber + unfinishedNumber;
            orderRate.setFinishedNumber(finishedNumber);
            orderRate.setUnfinishedNumber(unfinishedNumber);
            orderRate.setTotalNumber(total);
            if (total == 0){
                orderRate.setRate(1);
            } else {
                orderRate.setRate(finishedNumber / total);
            }
            list.add(orderRate);
        }
        return list;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Order> getOrderByNumber(int number) {
        return orderMapper.getOrderByNumber(number);
    }

    @Override
    @Transactional(readOnly = true)
    public Order getOrderByID(Long id) {
        Order order = orderMapper.getOrderByID(id);
        if (order == null){
            order = orderMapper.getOrderFinishedByID(id);
        }
        return order;
    }

    @Override
    public boolean updateOrder(Long id, String location, String description, String userDescription,
                               String repairment) {
        if (orderMapper.updateOrder(id, location, description, userDescription, repairment) > 0){
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean addOrder(Long userID, String location, String phone, String userDescription,
                            String description, String repairment) {
        if (orderMapper.addOrder(userID, location, phone, description, userDescription, repairment, 0) > 0){
            return true;
        } else {
            return false;
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Order getOrderInHandle(Long operatorID) {
        List<Order> list = orderMapper.getOrderByOperatorIDAndStatus(operatorID, 1);
        if (list.size() > 0){
            return list.get(0);
        } else {
            return null;
        }

    }

    @Override
    @Transactional(readOnly = true)
    public Page getOrderListByOperatorID(OperatorQueryObject qo) {
        int currentPage = qo.getCurrentPage();
        int pageSize = qo.getPageSize();
        int start = pageSize * (currentPage - 1);
        Long id = qo.getOperatorID();
        int orderNum = orderMapper.getOrderNumberByOperatorID(id);
        int orderFinishedNum = orderMapper.getOrderFinishedNumberByOperatorID(id);
        int total = orderNum + orderFinishedNum;
        String keyWord = qo.getKeyWord();
        List<Order> list = orderMapper.getOrderListByOperatorID(start,
                pageSize, id, keyWord);
        int remain = pageSize;
        if (list.size() != 0){
            start = 0;
            remain = start + pageSize - orderNum;
        } else {
            start = start - orderNum;
        }
        //防止非第一次查询的缓存
        if (list.size() < pageSize){
            if (remain > 0){
                list.addAll(orderMapper.getOrderFinishedListByOperatorID(start, remain, id, keyWord));
            }
        }
        if (list.size() > pageSize){
            remain = total - pageSize * (currentPage - 1);
            start = pageSize * (currentPage - 1) - orderNum;
            list = orderMapper.getOrderFinishedListByOperatorID(start, remain, id, keyWord);
        }
        Page page = new Page();
        page.setPageNum(currentPage);
        page.setPages(total % pageSize == 0 ? total / pageSize : total / pageSize + 1);
        page.setList(list);
        page.setPageSize(pageSize);
        return page;
    }
}
