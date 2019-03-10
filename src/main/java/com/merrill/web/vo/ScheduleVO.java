package com.merrill.web.vo;

import com.merrill.dao.entity.Operator;
import com.merrill.dao.entity.WorkTime;
import lombok.Data;

import java.util.Date;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-03-09
 * Time: 15:49
 * Description:
 */
@Data
public class ScheduleVO {
    private Date date;

    private WorkTime workTime;

    private List<Operator> operatorList;
}
