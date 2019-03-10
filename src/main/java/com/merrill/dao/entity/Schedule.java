package com.merrill.dao.entity;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-03-05
 * Time: 16:59
 * Description: 用于存储排班表信息
 */

@Data
public class Schedule implements Serializable {

    private static final long serialVersionUID = 7594167775185173620L;

    /**
     * 排班表的id
     */
    private Long id;

    /**
     * 排班的日期
     */
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date date;

    /**
     * 排班的值班时间段
     */
    private WorkTime workTime;

    /**
     * 运维人员
     */
    private Operator operator;

    /**
     * 运维人员1的状态
     *
     * 0 未打卡
     * 1
     * 2
     * 3 缺勤
     * 4 迟到
     * 5 早退
     * 6 既迟到又早退
     */
    private int status;

    /**
     * 相关描述
     */
    private String description;
}
