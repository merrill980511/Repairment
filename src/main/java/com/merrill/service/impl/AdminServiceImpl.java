package com.merrill.service.impl;

import com.merrill.dao.entity.Admin;
import com.merrill.dao.mapper.AdminMapper;
import com.merrill.service.IAdminService;
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
    public Admin login(Long id, String password) {
        return adminMapper.login(id, password);
    }
}
