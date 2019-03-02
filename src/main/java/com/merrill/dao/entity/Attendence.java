package com.merrill.dao.entity;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-03-01
 * Time: 17:04
 * Description: 运维人员考勤相关
 */

@Data
public class Attendence implements Serializable {
    private static final long serialVersionUID = 1816153030013427390L;

    /**
     * 考勤记录的id
     */
    private Long id;

    /**
     * 运维人员
     */
    private Operator operator;

    /**
     * 打卡签到时间
     */
    @DateTimeFormat(pattern = "yyyy-MM-dd hh:mm:ss")
    private Date checkinTime;

    /**
     * 打卡签退时间
     */
    @DateTimeFormat(pattern = "yyyy-MM-dd hh:mm:ss")
    private Date checkoutTime;

    /**
     * 打卡说明
     */
    private String description;

    /**
     * 出勤时状态
     * 0 值班室
     * 1 外勤
     *
     * 2 正常打卡
     * 3 缺勤
     * 4 迟到
     * 5 早退
     */
    private int status;
}
