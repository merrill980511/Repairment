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
 * Description:
 */
@Repository
public interface EmptyTimeMapper {
    int insertByFreeTime(@Param("date") Date date, @Param("number") int number,
                         @Param("operatorID") Long operatorID);

    int deleteByFreeTime(@Param("date") Date date,
                         @Param("operatorID") Long operatorID);

    List<Long> getOperatorIDByDateAndNumber(@Param("date") Date date,
                                            @Param("number") String number);

}
