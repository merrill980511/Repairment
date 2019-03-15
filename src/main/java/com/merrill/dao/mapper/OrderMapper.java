package com.merrill.dao.mapper;

import com.merrill.dao.entity.Order;
import com.merrill.query.OrderQueryObject;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-02-16
 * Time: 11:43
 * Description: 报修订单相关操作接口
 */
@Repository
public interface OrderMapper {
    /**
     * 保存未处理订单
     *
     * @param id              用户id
     * @param phone           用户联系方式
     * @param location        报修地点
     * @param result          系统生成的报修信息
     * @param userDescription 用户对问题的描述
     * @param reservationTime 用户预约时间
     * @return 返回受影响的行数
     */
    int saveOrder(@Param("id") Long id, @Param("phone") String phone,
                  @Param("location") String location, @Param("repairment") String result,
                  @Param("userDescription") String userDescription,
                  @Param("reservationTime") Date reservationTime);

    /**
     * 根据用户的id查询未处理的订单
     *
     * @param id 用户id
     * @return 返回查询到的订单
     */
    Order getOrderByUserID(Long id);

    /**
     * 根据订单id查询未完成的订单
     *
     * @param id 订单id
     * @return 返回查询到的订单
     */
    Order getOrderByID(Long id);

    /**
     * 根据订单id查询已完成的订单
     *
     * @param id 订单id
     * @return 返回查询到的订单
     */
    Order getOrderFinishedByID(Long id);

    /**
     * 根据订单id删除订单
     *
     * @param id 订单id
     * @return 返回受影响行数
     */
    int deleteOrderByID(Long id);

    /**
     * 保存已完成订单到完成表
     *
     * @param id              订单id
     * @param userID          用户id
     * @param operatorID      运维人员id
     * @param location        报修地点
     * @param phone           联系方式
     * @param beginTime       报修时间
     * @param handleTime      开始处理时间
     * @param userDescription 用户添加的问题描述
     * @param description     运维人员添加的问题藐视
     * @param repairment      系统生成的问题描述
     * @param status          订单状态
     * @param reservationTime 用户预约时间
     * @return 返回受影响的行数
     */
    int saveFinishedOrder(@Param("id") Long id, @Param("userID") Long userID, @Param("operatorID") Long operatorID,
                          @Param("location") String location, @Param("phone") String phone,
                          @Param("beginDate") Date beginTime, @Param("handleDate") Date handleTime,
                          @Param("userDescription") String userDescription, @Param("description") String description,
                          @Param("repairment") String repairment, @Param("status") int status, @Param("reservationDate") Date reservationTime);

    /**
     * 根据查询对象查询未完成订单列表
     *
     * @param qo 封装的查询对象
     * @return 订单结果集
     */
    List<Order> getOrderList(OrderQueryObject qo);

    /**
     * 根据查询对象查询已完成订单列表
     *
     * @param qo 封装的查询对象
     * @return 订单结果集
     */
    List<Order> getOrderFinishedList(OrderQueryObject qo);

    /**
     *
     * @param operatorID
     * @param orderID
     * @param status
     * @param date
     * @return
     */
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
