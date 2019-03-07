package com.merrill.dao.mapper;

import com.merrill.dao.entity.Schedule;
import org.apache.ibatis.annotations.Param;
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

    int addSchedule(@Param("date") Date date, @Param("number") int number,
                    @Param("id1") Long id1, @Param("id2") Long id2,
                    @Param("id3") Long id3, @Param("id4") Long id4);

    int updateSchedule(@Param("id") Long id,
                       @Param("id1") Long id1, @Param("id2") Long id2,
                       @Param("id3") Long id3, @Param("id4") Long id4);
}
