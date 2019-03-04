package com.merrill.service;

import com.merrill.dao.entity.Admin;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-02-21
 * Time: 15:04
 * Description:
 */
public interface IAdminService {
    boolean login(Long id, String password);

    boolean editPassword(Long id, String password);
}
