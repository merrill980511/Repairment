package com.merrill.dao.mapper;

import com.merrill.dao.entity.User;
import com.merrill.query.UserQueryObject;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-02-16
 * Time: 14:54
 * Description:
 */
@Repository
public interface UserMapper {
    User getUserByID(Long id);

    int addUser(@Param("id") Long id, @Param("phone") String phone,
                @Param("name") String name, @Param("openID") String openID);

    int updateUser(@Param("id") Long id, @Param("phone") String phone,
                   @Param("name") String name);

    int deleteUser(Long id);

    List<User> getUserList(UserQueryObject qo);

    Long getIdByUserID(String userId);
}
