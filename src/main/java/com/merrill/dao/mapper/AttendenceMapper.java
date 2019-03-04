package com.merrill.dao.mapper;

import com.merrill.dao.entity.Attendence;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-03-01
 * Time: 17:23
 * Description:
 */

@Repository
public interface AttendenceMapper {
    int checkin(Long id);

    int checkout(@Param("id") Long id, @Param("date") Date date);

    Long getLastID();

    Attendence getAttendenceByOperatorID(Long operatorID);

    int updateAttendenceStatusByID(@Param("id") Long id, @Param("status") int status);
}
