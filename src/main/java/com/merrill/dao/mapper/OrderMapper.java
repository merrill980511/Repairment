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
                  @Param("userDescription") String userDescription);

    Order getOrderByUserID(Long id);

    Order getOrderByID(Long id);

    int deleteOrderByID(Long id);

    int saveFinishedOrder(@Param("id") Long id, @Param("userID") Long userID, @Param("operatorID") Long operatorID,
                          @Param("location") String location, @Param("phone") String phone, @Param("beginDate") Date beginTime,
                          @Param("userDescription") String userDescription, @Param("description") String description,
                          @Param("repairment") String repairment, @Param("status") int status);

    List<?> getOrderList(OrderQueryObject qo);

    List<?> getOrderFinishedList(OrderQueryObject qo);

    int takeOrder(@Param("operatorID") Long operatorID, @Param("orderID") Long orderID,
                  @Param("status") int status);

    Integer getOrderNumberByStatus(int status);

    Integer getOrderNumberByDate(String date);

    Integer getOrderFinishedNumberByDate(String date);

    List<Order> getOrderByNumber(int number);
}
