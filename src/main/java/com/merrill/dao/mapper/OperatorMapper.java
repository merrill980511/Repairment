package com.merrill.dao.mapper;

import com.merrill.dao.entity.Operator;
import com.merrill.query.OperatorQueryObject;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-02-21
 * Time: 13:26
 * Description:
 */
@Repository
public interface OperatorMapper {
    int delete(Long id);

    int add(@Param("id") Long id, @Param("name") String name,
            @Param("password") String password, @Param("phone") String phone);

    int update(@Param("id") Long id, @Param("name") String name,
               @Param("password") String password, @Param("phone") String phone);

    List<Operator> getOperatorList(OperatorQueryObject qo);

    Operator getOperator(Long id);

    List<Operator> getAllOperatorList();
}
