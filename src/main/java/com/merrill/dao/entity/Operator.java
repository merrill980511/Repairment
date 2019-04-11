package com.merrill.dao.entity;

import lombok.Data;

import java.io.Serializable;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-02-12
 * Time: 15:16
 * Description: 用于存储运维人员相关信息
 */

@Data
public class Operator implements Serializable {

    private static final long serialVersionUID = -4875382522281734664L;

    /**
     * 运维人员的id
     */
    private Long id;

    /**
     * 运维人员微信的openID
     */
    private String openID;

    /**
     * 运维人员的密码
     */
    private String password;

    /**
     * 运维人员的名称
     */
    private String name;

    /**
     * 运维人员的联系方式
     */
    private String phone;
}
