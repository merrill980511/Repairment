package com.merrill.dao.mapper;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-03-08
 * Time: 10:22
 * Description: 运维人员空闲时间操作接口
 */
@Repository
public interface EmptyTimeMapper {
    /**
     * 插入运维人员空闲状态记录
     *
     * @param date       日期
     * @param number     空闲课程号
     * @param operatorID 运维人员id
     * @return 返回受影响行数
     */
    int insertByFreeTime(@Param("date") Date date, @Param("number") int number,
                         @Param("operatorID") Long operatorID);

    /**
     * 删除某一天运维人员的所有空闲状态记录
     *
     * @param date       日期
     * @param operatorID 运维人员id
     * @return 返回受影响行数
     */
    int deleteByFreeTime(@Param("date") Date date,
                         @Param("operatorID") Long operatorID);

    /**
     * 获取某一天谋一节课所有有空的运维人员id
     *
     * @param date   日期
     * @param number 课程号
     * @return 所有有空的运维人员id
     */
    List<Long> getOperatorIDByDateAndNumber(@Param("date") Date date,
                                            @Param("number") String number);

}
