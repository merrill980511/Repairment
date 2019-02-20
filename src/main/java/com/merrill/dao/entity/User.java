package com.merrill.dao.entity;

import lombok.Data;

import java.io.Serializable;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-02-12
 * Time: 15:12
 * Description: 用于存储用户相关的信息
 */

@Data
public class User implements Serializable {

    private static final long serialVersionUID = 5279642815829238035L;

    /**
     * 用户的id
     */
    private Long id;

    /**
     * 用户微信的openID
     */
    private String openID;

    /**
     * 用户姓名
     */
    private String name;

    /**
     * 用户联系方式
     */
    private String phone;
}
