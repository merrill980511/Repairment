package com.merrill.web.vo;

import lombok.Data;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-03-02
 * Time: 16:25
 * Description:
 */

@Data
public class Page {
    private int pageSize;

    private int pageNum;

    private int pages;

    private List list;
}
