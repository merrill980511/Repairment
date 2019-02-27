package com.merrill.service;

import com.github.pagehelper.PageInfo;
import com.merrill.dao.entity.User;
import com.merrill.query.UserQueryObject;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-02-16
 * Time: 17:02
 * Description:
 */
public interface IUserService {
    User getUserByID(Long id);

    boolean addUser(User user);

    boolean updateUser(User user);

    boolean deleteUser(Long id);

    PageInfo getUserList(UserQueryObject qo);

    boolean deleteUserAndOrder(Long id);
}
