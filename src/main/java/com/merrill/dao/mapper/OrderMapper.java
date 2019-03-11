package com.merrill.dao.mapper;

import com.merrill.query.OrderQueryObject;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import com.merrill.dao.entity.Order;

import java.util.Date;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-02-16
 * Time: 11:43
 * Description:
 */
@Repository
public interface OrderMapper {
    int saveOrder(@Param("id") Long id, @Param("phone") String phone,
                  @Param("location") String location, @Param("repairment") String result,
                  @Param("userDescription") String userDescription,
                  @Param("reservationTime") Date reservationTime);

    Order getOrderByUserID(Long id);

    Order getOrderByID(Long id);

    Order getOrderFinishedByID(Long id);

    int deleteOrderByID(Long id);

    int saveFinishedOrder(@Param("id") Long id, @Param("userID") Long userID, @Param("operatorID") Long operatorID,
                          @Param("location") String location, @Param("phone") String phone,
                          @Param("beginDate") Date beginTime, @Param("handleDate") Date handleTime,
                          @Param("userDescription") String userDescription, @Param("description") String description,
                          @Param("repairment") String repairment, @Param("status") int status, @Param("reservationDate") Date reservationTime);

    List<Order> getOrderList(OrderQueryObject qo);

    List<Order> getOrderFinishedList(OrderQueryObject qo);

    int takeOrder(@Param("operatorID") Long operatorID, @Param("orderID") Long orderID,
                  @Param("status") int status, @Param("date") Date date);

    Integer getOrderNumberByStatus(int status);

    Integer getOrderNumberByDate(String date);

    Integer getOrderFinishedNumberByDate(String date);

    List<Order> getOrderByNumber(int number);

    int updateOrder(@Param("id") Long id, @Param("location") String location, @Param("description") String description,
                    @Param("userDescription") String userDescription, @Param("repairment") String repairment);

    int deleteOrderByUserID(Long id);

    int deleteOrderFinishedByUserID(Long id);

    int addOrder(@Param("userID") Long userID, @Param("location") String location, @Param("phone") String phone,
                 @Param("description") String description, @Param("userDescription") String userDescription,
                 @Param("repairment") String repairment, @Param("status") int status);

    List<Order> getOrderByOperatorIDAndStatus(@Param("id") Long operatorID, @Param("status") int status);

    List<Order> getOrderListByOperatorID(@Param("start") int start, @Param("pageSize") int pageSize,
                                         @Param("id") Long id, @Param("keyWord") String keyWord);

    List<Order> getOrderFinishedListByOperatorID(@Param("start") int start, @Param("pageSize") int pageSize,
                                                 @Param("id") Long id, @Param("keyWord") String keyWord);

    int getOrderNumberByOperatorID(Long id);

    int getOrderFinishedNumberByOperatorID(Long id);

    int updateOrderByOperatorAndStatus(@Param("operatorID") Long operatorID, @Param("fromStatus") int fromStatus, @Param("toStatus") int toStatus);

    int updateDescription(@Param("operatorID") Long operatorID, @Param("description") String description, @Param("status") int status);

    int updateOrderDescription(@Param("orderID") Long orderID, @Param("description") String description);
}
