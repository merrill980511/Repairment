package com.merrill.dao.mapper;

import com.merrill.dao.entity.Schedule;
import com.merrill.query.QueryObject;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-03-05
 * Time: 20:06
 * Description: 运维人员排班信息
 */
@Repository
public interface ScheduleMapper {
    /**
     * 获取某一天某个运维人员的排班情况
     * @param date 待查询的日期
     * @param operatorID 待查询的运维人员id
     * @return 返回查询出的排班课程列表
     */
    List<Integer> getNumbersByDateAndOperatorID(@Param("date") Date date,
                                                @Param("operatorID") Long operatorID);

    /**
     *
     * @param date
     * @param number
     * @return
     */
    List<Schedule> getScheduleListByDateAndNumber(@Param("date") Date date,
                                                  @Param("number") int number);

    int deleteScheduleListByDateAndNumber(@Param("date") Date date,
                                          @Param("number") int number);

    int addSchedule(@Param("date") Date date, @Param("number") int number,
                    @Param("operatorID") Long operatorId, @Param("status") int status);

    int updateScheduleOperatorStatus(@Param("operatorID") Long operatorID, @Param("date") Date date,
                                     @Param("number") int number, @Param("status") int status);

    Schedule getSchedule(@Param("operatorID") Long operatorID, @Param("date") Date date,
                         @Param("number") int number);

    int updateScheduleDescription(@Param("id") Long id, @Param("description") String description,
                                  @Param("status") int status);

    List<Long> getScheduleByStatus(int status);

    int getNumberByDateAndStatus(@Param("date") Date date, @Param("status") int status);

    List<Schedule> getScheduleListByStatus(int status);

    Schedule getScheduleByID(Long id);

    int updateScheduleStatus(@Param("id") Long id, @Param("status") int status);

    List<Schedule> getReviewedLeaveList(QueryObject qo);

    List<Schedule> getUnReviewedLeaveList(QueryObject qo);

    List<Schedule> getLeaveListByOperatorID(@Param("date") Date date, @Param("operatorID") Long operatorID);

    int deleteScheduleByID(Long id);
}
