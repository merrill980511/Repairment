package com.merrill.dao.mapper;

import com.merrill.dao.entity.Admin;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-02-21
 * Time: 15:05
 * Description: 管理员操作数据库接口
 */
@Repository
public interface AdminMapper {
    /**
     * 管理员登录查询数据库
     *
     * @param id       管理员账号
     * @param password 管理员密码
     * @return 返回查询结果
     */
    Admin login(@Param("id") Long id, @Param("password") String password);

    /**
     * 管理员修改密码
     *
     * @param id       管理员账号
     * @param password 管理员密码
     * @return 返回受影响行数
     */
    int editPassword(@Param("id") Long id, @Param("password") String password);

    /**
     * 根据管理员账号查询管理员
     *
     * @param id 管理员账号
     * @return 查询出的管理员
     */
    Admin getByID(String id);
}
