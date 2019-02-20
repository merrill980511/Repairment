package com.merrill.dao.entity;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-02-12
 * Time: 15:00
 * Description: 用于存储报修步骤信息
 */

@Data
public class Step implements Serializable {

    private static final long serialVersionUID = 5837349715265856708L;

    /**
     * 该步骤在数据库中的id
     */
    private Long id;

    /**
     * 该步骤的名称（备用字段）
     */
    private String name;

    /**
     * 该步骤的主要内容
     */
    private String content;

    /**
     * 该步骤相关的链接提示（可能有，可能没有）
     */
    private Link link;

    /**
     * 该步骤存在哪些选项
     */
    private List<Option> options;
}
