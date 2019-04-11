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
     *
     * @param date       待查询的日期
     * @param operatorID 待查询的运维人员id
     * @return 返回查询出的排班课程列表
     */
    List<Integer> getNumbersByDateAndOperatorID(@Param("date") Date date,
                                                @Param("operatorID") Long operatorID);

    /**
     * 获取某一个日期的某一节课的值班安排
     *
     * @param date 待查询日期
     * @param number 待查询课程序号
     * @return 返回查询出的结果集
     */
    List<Schedule> getScheduleListByDateAndNumber(@Param("date") Date date,
                                                  @Param("number") int number);

    /**
     * 删除某一天某一节课程的所有安排
     * @param date 日期
     * @param number 课程序号
     * @return 返回受影响的结果行
     */
    int deleteScheduleListByDateAndNumber(@Param("date") Date date,
                                          @Param("number") int number);

    /**
     * 添加值班安排
     * @param date 待添加日期
     * @param number 待添加课程序号
     * @param operatorId 待添加运维人员id
     * @param status 值班安排的状态
     * @return 返回添加受影响的结果行数
     */
    int addSchedule(@Param("date") Date date, @Param("number") int number,
                    @Param("operatorID") Long operatorId, @Param("status") int status);

    /**
     * 更新某一天某一节课，某个运维人员的状态
     * @param operatorID 运维人员id
     * @param date 待更新日期
     * @param number 待更新课程序号
     * @param status 更新之后的状态信息
     * @return 返回受影响的行数
     */
    int updateScheduleOperatorStatus(@Param("operatorID") Long operatorID, @Param("date") Date date,
                                     @Param("number") int number, @Param("status") int status);

    /**
     * 根据日期和课程序号获取运维人员的
     * @param operatorID
     * @param date
     * @param number
     * @return
     */
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
