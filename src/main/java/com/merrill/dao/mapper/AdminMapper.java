package com.merrill.dao.mapper;

import com.merrill.dao.entity.Admin;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-02-21
 * Time: 15:05
 * Description:
 */
@Repository
public interface AdminMapper {
    Admin login(@Param("id") Long id, @Param("password") String password);

    int editPassword(@Param("id") Long id, @Param("password") String password);

    Admin getByID(String id);
}
