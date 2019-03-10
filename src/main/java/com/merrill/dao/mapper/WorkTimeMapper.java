package com.merrill.dao.mapper;

import com.merrill.dao.entity.WorkTime;
import org.springframework.stereotype.Repository;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-03-08
 * Time: 10:22
 * Description:
 */
@Repository
public interface WorkTimeMapper {
    int getNumberByTime(String time);

    WorkTime getWorkTimeByNumber(int number);
}
