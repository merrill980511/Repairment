package com.merrill.dao.entity;

import lombok.Data;

import java.io.Serializable;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-02-12
 * Time: 15:00
 * Description: 用来存储每个步骤的选项信息
 */

@Data
public class Option implements Serializable {

    private static final long serialVersionUID = 2346064964079566204L;

    /**
     * 选项在数据库中的id
     */
    private Long id;

    /**
     * 选项的名称（备用字段）
     */
    private String name;

    /**
     * 选项的主要内容
     */
    private String content;

    /**
     * 选项在页面显示的位置顺序信息
     */
    private int location;

    /**
     * 选择该选项后应该跳转的步骤的id
     */
    private Long nextStepId;
}
