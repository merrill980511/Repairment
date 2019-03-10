package com.merrill.dao.entity;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-03-08
 * Time: 10:15
 * Description: 值班人员空闲时间表
 */

@Data
public class EmptyTime implements Serializable {

    private static final long serialVersionUID = 3786268572555586402L;

    /**
     * 空闲时间记录的id
     */
    private Long id;

    /**
     * 记录的日期
     */
    private Date date;

    /**
     * 空闲的课程序号
     */
    private int number;

    /**
     * 当前日期和课程序号中空闲的运维人员
     */
    private List<Operator> operators;
}
