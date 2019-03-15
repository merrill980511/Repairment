package com.merrill.dao.mapper;

import com.merrill.dao.entity.Attendence;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-03-01
 * Time: 17:23
 * Description: 运维人员打卡接口
 */

@Repository
public interface AttendenceMapper {
    /**
     * 将运维人员的id和此时的时间状态添加到考勤表
     * 作为一条考勤记录
     *
     * @param operatorID 运维人员id
     * @return 返回受影响的行数
     */
    int checkin(Long operatorID);

    /**
     * 更新考勤表中的打卡下班时间
     *
     * @param id   考勤记录的id
     * @param date 打卡下班时间
     * @return 返回受影响的行数
     */
    int checkout(@Param("id") Long id, @Param("date") Date date);

    /**
     * 获取运维人员最后一次考勤记录的id
     *
     * @return 运维人员最后一次考勤记录的id
     */
    Long getLastID();

    /**
     * 获取运维人员状态为0或者1的考勤记录
     *
     * @param operatorID 运维人员的id
     * @return 返回查询到的考勤信息
     */
    Attendence getAttendenceByOperatorID(Long operatorID);

    /**
     * 根据考勤记录的id更新记录的状态
     *
     * @param id     考勤记录id
     * @param status 待更新的状态
     * @return 返回受影响的行数
     */
    int updateAttendenceStatusByID(@Param("id") Long id, @Param("status") int status);

    /**
     * 根据运维人员的id将其所有记录的一个状态转换成另一个状态
     *
     * @param operatorID 运维人员id
     * @param status     需要更改的状态
     * @param toStatus   更改之后的状态
     * @return 返回受影响的行数
     */
    int updateStatusByOperatorID(@Param("operatorID") Long operatorID, @Param("fromStatus") int status, @Param("toStatus") int toStatus);

    /**
     * 根据状态查询打卡记录数量
     *
     * @param status 状态
     * @return 该状态运维人员数量
     */
    int getAttendenceNumByStatus(int status);

    /**
     * 根据状态查询所有的打卡记录
     *
     * @param status 状态
     * @return 所有的打卡记录集合
     */
    List<Attendence> getAttendenceByStatus(int status);

    /**
     * 查询运维人员最后一次打卡的记录
     *
     * @param id 运维人员的id
     * @return 完整的记录
     */
    Attendence getLastAttendenceByOperatorID(Long id);

    /**
     * 根据记录的id获取整条记录
     *
     * @param id 记录的id
     * @return 完整的记录
     */
    Attendence getAttendenceByID(Long id);

}
