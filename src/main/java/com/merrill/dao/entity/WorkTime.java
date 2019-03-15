package com.merrill.dao.entity;

import lombok.Data;

import java.io.Serializable;
import java.sql.Time;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-03-05
 * Time: 17:00
 * Description:
 */

@Data
public class WorkTime implements Serializable {

    private static final long serialVersionUID = -8659643100659334165L;

    /**
     * 工作时间段
     */
    private int number;

    /**
     * 工作开始时间
     */
    private Time beginTime;

    /**
     * 工作结束时间
     */
    private Time endTime;

}
