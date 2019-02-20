package com.merrill.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.merrill.dao.entity.User;
import com.merrill.dao.mapper.UserMapper;
import com.merrill.service.IUserService;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-02-16
 * Time: 17:02
 * Description:
 */
@Service
@Transactional
public class UserServiceImpl implements IUserService {
    @Autowired
    private UserMapper userMapper;

    @Override
    @Transactional(readOnly = true)
    public User getUserByID(Long id) {
        return userMapper.getUserByID(id);
    }
}
