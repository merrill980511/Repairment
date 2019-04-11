package com.merrill.dao.mapper;

import com.merrill.dao.entity.Order;
import com.merrill.query.OperatorQueryObject;
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
     * 根据查询对象查询未完成订单列表
     *
     * @param qo 封装的查询对象
     * @return 该运维人员所有订单结果集
     */
    List<Order> getAllOrderListByOperatorID(OperatorQueryObject qo);

    /**
     * 根据查询对象查询已完成订单列表
     *
     * @param qo 封装的查询对象
     * @return 订单结果集
     */
    List<Order> getOrderFinishedList(OrderQueryObject qo);

    /**
     * 运维人员承接订单接口
     * 根据operator和order的id，更新订单的状态和handle_time
     *
     * @param operatorID 运维人员的id
     * @param orderID    订单的id
     * @param status     待更新的状态，一般为1
     * @param date       处理时间
     * @return 返回受影响的行数
     */
    int takeOrder(@Param("operatorID") Long operatorID, @Param("orderID") Long orderID,
                  @Param("status") int status, @Param("date") Date date);

    /**
     * 根据订单的状态查询订单数量
     *
     * @param status 待查询的状态
     * @return 该状态的订单数量
     */
    Integer getOrderNumberByStatus(int status);

    /**
     * 根据日期查询未完成的报修订单数量
     *
     * @param date 待查询日期
     * @return 该日期的报修订单数量
     */
    Integer getOrderNumberByDate(String date);

    /**
     * 根据日期查询已完成的订单数量
     *
     * @param date 待查询的日期
     * @return 该日期已完成的订单数量
     */
    Integer getOrderFinishedNumberByDate(String date);

    /**
     * 查询最后提交的若干条订单
     *
     * @param number 待查询的订单数量
     * @return 查询出来的结果集
     */
    List<Order> getOrderByNumber(int number);

    /**
     * 更新未完成的订单信息
     *
     * @param id              订单id
     * @param location        待更新的订单地址
     * @param description     待更新的订单描述
     * @param userDescription 待更新的订单用户描述
     * @param repairment      待更新的报修信息
     * @return 返回受影响的行数
     */
    int updateOrder(@Param("id") Long id, @Param("location") String location, @Param("description") String description,
                    @Param("userDescription") String userDescription, @Param("repairment") String repairment);

    /**
     * 根据用户的id删除其所有订单
     *
     * @param id 用户id
     * @return 返回受影响的行数
     */
    int deleteOrderByUserID(Long id);

    /**
     * 根据用户id删除其所有的已完成订单
     *
     * @param id 用户id
     * @return 返回受影响的行数
     */
    int deleteOrderFinishedByUserID(Long id);

    /**
     * 添加新的订单信息
     *
     * @param userID          用户的id
     * @param location        报修地点
     * @param phone           报修人联系方式
     * @param description     运维人员描述
     * @param userDescription 用户自己的描述
     * @param repairment      报修信息
     * @param status          订单状态
     * @return 返回受影响的结果集
     */
    int addOrder(@Param("userID") Long userID, @Param("location") String location, @Param("phone") String phone,
                 @Param("description") String description, @Param("userDescription") String userDescription,
                 @Param("repairment") String repairment, @Param("status") int status);

    /**
     * 根据运维人员的id和订单状态查询订单
     *
     * @param operatorID 运维人员id
     * @param status     订单状态
     * @return 返回查询出来的订单结果集
     */
    List<Order> getOrderByOperatorIDAndStatus(@Param("id") Long operatorID, @Param("status") int status);

//    List<Order> getOrderListByOperatorID(@Param("start") int start, @Param("pageSize") int pageSize,
//                                         @Param("id") Long id, @Param("keyWord") String keyWord);
//
//    List<Order> getOrderFinishedListByOperatorID(@Param("start") int start, @Param("pageSize") int pageSize,
//                                                 @Param("id") Long id, @Param("keyWord") String keyWord);

    /**
     * 根据运维人员的id查询其承接的未完成的订单数量
     *
     * @param id 运维人员id
     * @return 返回查询出的订单数量
     */
    int getOrderNumberByOperatorID(Long id);

    /**
     * 根据运维人员的id查询其承接的已完成的订单数量
     *
     * @param id 运维人员id
     * @return 返回查询出的订单数量
     */
    int getOrderFinishedNumberByOperatorID(Long id);

    /**
     * 根据运维人员id和订单的状态更新订单状态
     *
     * @param operatorID 运维人员的id
     * @param fromStatus 待更新状态
     * @param toStatus   更新后的状态
     * @return 返回更新时受影响的行数
     */
    int updateOrderByOperatorAndStatus(@Param("operatorID") Long operatorID, @Param("fromStatus") int fromStatus, @Param("toStatus") int toStatus);

    /**
     * 根据运维人员id和订单状态更新订单运维描述
     *
     * @param operatorID  运维人员id
     * @param description 运维人员的描述
     * @param status      订单状态
     * @return 返回更新受影响的结果集
     */
    int updateDescription(@Param("operatorID") Long operatorID, @Param("description") String description, @Param("status") int status);

    /**
     * 更改订单的运维人员描述
     *
     * @param orderID     订单id
     * @param description 运维人员描述
     * @return 返回更新受影响的结果集
     */
    int updateOrderDescription(@Param("orderID") Long orderID, @Param("description") String description);

    /**
     * 更新已完成的订单信息
     *
     * @param id              已完成订单的id
     * @param location        已完成订单的地址
     * @param description     已完成订单的运维人员描述
     * @param userDescription 已完成订单的用户描述
     * @param repairment      已完成订单的报修信息
     * @return 返回更新受影响的行数
     */
    int updateFinishedOrder(@Param("id") Long id, @Param("location") String location, @Param("description") String description,
                            @Param("userDescription") String userDescription, @Param("repairment") String repairment);

    /**
     * 获取今日提交的订单信息
     *
     * @param qo 封装了分页对象
     * @return 返回查询出的结果集
     */
    List<Order> getTodayOrderList(OrderQueryObject qo);

    /**
     * 获取今日已处理的订单信息
     *
     * @param qo 封装了分页对象
     * @return 返回查询出的结果集
     */
    List<Order> getTodayOrderFinishedList(OrderQueryObject qo);

    /**
     * 获取处理中的订单信息
     *
     * @param qo 封装了分页对象
     * @return 返回查询出的结果集
     */
    List<Order> getOrderSolvingList(OrderQueryObject qo);
}
