package com.merrill.web.vo;

import lombok.Data;

import java.util.ArrayList;
import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-03-10
 * Time: 11:38
 * Description:
 */
@Data
public class FreeTime {
    private Long operatorID;

    private String[][] freeTimeList;

    private String[] dateList;
}
