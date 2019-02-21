package com.merrill.web.vo;

import lombok.Data;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-02-21
 * Time: 14:26
 * Description:
 */
@Data
public class OrderRate {
    private int finishedNumber;

    private int unfinishedNumber;

    private double rate;
}
