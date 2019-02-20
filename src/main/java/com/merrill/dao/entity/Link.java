package com.merrill.dao.entity;

import lombok.Data;

import java.io.Serializable;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-02-12
 * Time: 15:03
 * Description:用于存储链接相关信息
 */

@Data
public class Link implements Serializable {

    private static final long serialVersionUID = -7649355166885482540L;

    /**
     * 链接的id
     */
    private Long id;

    /**
     * 链接的名称
     */
    private String name;

    /**
     * 链接的url
     */
    private String content;
}
