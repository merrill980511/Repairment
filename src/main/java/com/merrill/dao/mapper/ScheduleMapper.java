package com.merrill.dao.mapper;

import com.merrill.dao.entity.Schedule;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-03-05
 * Time: 20:06
 * Description:
 */
@Repository
public interface ScheduleMapper {
    List<Schedule> getScheduleListByDate(Date date);
}
