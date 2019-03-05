package com.merrill.dao.entity;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

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

    private int number;

    private Date beginTime;

    private Date endTime;

}
