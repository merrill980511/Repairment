package com.merrill.dao.entity;

import lombok.Data;

import java.io.Serializable;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-02-21
 * Time: 15:09
 * Description: 用于存储管理员信息
 */

@Data
public class Admin implements Serializable {
    private static final long serialVersionUID = 8093665314568321262L;
    /**
     * 管理员的id
     */
    private Long id;

    /**
     * 管理员的登录密码
     */
    private String password;

    /**
     * 管理员的姓名
     */
    private String name;
}
