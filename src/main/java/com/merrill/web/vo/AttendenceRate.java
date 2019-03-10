package com.merrill.web.vo;

import lombok.Data;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-03-10
 * Time: 15:25
 * Description:
 */
@Data
public class AttendenceRate {
    private int late;

    private int leaveEarly;

    private int absence;

    private double lateRate;

    private double leaveEarlyRate;

    private double absenceRate;
}
