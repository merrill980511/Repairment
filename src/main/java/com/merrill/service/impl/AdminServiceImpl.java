package com.merrill.service.impl;

import com.merrill.dao.entity.Admin;
import com.merrill.dao.mapper.AdminMapper;
import com.merrill.service.IAdminService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-02-21
 * Time: 15:04
 * Description:
 */
@Service
@Transactional
public class AdminServiceImpl implements IAdminService {
    @Autowired
    private AdminMapper adminMapper;

    @Override
    public boolean login(Long id, String password) {

        Subject subject = SecurityUtils.getSubject();
        UsernamePasswordToken token =
                new UsernamePasswordToken(id.toString(), password);
        try {
            subject.login(token);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean editPassword(Long id, String password) {
        if (adminMapper.editPassword(id, password) > 0){
            return true;
        } else {
            return false;
        }
    }
}
