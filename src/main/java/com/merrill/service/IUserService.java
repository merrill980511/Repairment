package com.merrill.service;

import com.merrill.dao.entity.User;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-02-16
 * Time: 17:02
 * Description:
 */
public interface IUserService {
    User getUserByID(Long id);
}
