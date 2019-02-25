package com.merrill.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.merrill.dao.entity.User;
import com.merrill.dao.mapper.UserMapper;
import com.merrill.query.UserQueryObject;
import com.merrill.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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

    @Override
    public boolean addUser(User user) {
        if (userMapper.addUser(user.getId(), user.getPhone(), user.getName()) > 0) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean updateUser(User user) {
        if (userMapper.updateUser(user.getId(), user.getPhone(), user.getName()) > 0) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean deleteUser(Long id) {
        if (userMapper.deleteUser(id) > 0) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public PageInfo getUserList(UserQueryObject qo) {
        PageHelper.startPage(qo.getCurrentPage(), qo.getPageSize());
        List<User> list = userMapper.getUserList(qo);
        PageInfo pageInfo = new PageInfo(list);
        if (pageInfo.getPages() <= 0) {
            pageInfo.setPages(1);
        }
        return pageInfo;
    }
}
