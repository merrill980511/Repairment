package com.merrill.dao.entity;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-02-12
 * Time: 15:15
 * Description: 用于存储用户报修生成的订单信息，包括已完成订单和处理中订单两种
 */

@Data
public class Order implements Serializable {

    private static final long serialVersionUID = 4844720560092509192L;

    /**
     * 数据库中订单的id
     */
    private Long id;

    /**
     * 报修人员信息
     */
    private User user;

    /**
     * 运维人员信息
     */
    private Operator operator;

    /**
     * 报修地址
     */
    private String location;

    /**
     * 报修联系人
     */
    private String phone;

    /**
     * 订单生成时间
     */
    @DateTimeFormat(pattern = "yyyy-MM-dd hh:mm:ss")
    private Date beginTime;


    /**
     * 订单预约时间
     */
    @DateTimeFormat(pattern = "yyyy-MM-dd hh:mm:ss")
    private Date reservationTime;

    /**
     * 订单处理时间
     */
    @DateTimeFormat(pattern = "yyyy-MM-dd hh:mm:ss")
    private Date handleTime;

    /**
     * 订单完结时间
     */
    @DateTimeFormat(pattern = "yyyy-MM-dd hh:mm:ss")
    private Date endTime;

    /**
     * 运维人员对订单信息的描述
     */
    private String description;

    /**
     * 用户对报修信息的描述
     */
    private String userDescription;

    /**
     * 根据用户对报修流程的选择生成的报修信息
     */
    private String repairment;

    /**
     * 订单状态
     * 1 未处理
     * 2 处理中
     * 3 处理完，未确认
     * 4 已完成
     */
    private int status;
}
