package com.merrill.dao.entity;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-03-05
 * Time: 16:59
 * Description:
 */

@Data
public class Schedule implements Serializable {

    private static final long serialVersionUID = 7594167775185173620L;

    private Long id;

    private Date date;

    private WorkTime workTime;

    private Operator operator1;

    private Operator operator2;

    private Operator operator3;

    private Operator operator4;
}
