package com.merrill.service;

import com.github.pagehelper.PageInfo;
import com.merrill.dao.entity.Operator;
import com.merrill.query.OperatorQueryObject;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-02-21
 * Time: 23:22
 * Description:
 */
public interface IOperatorService {
    boolean add(Operator operator);

    boolean delete(Long id);

    boolean update(Operator operator);

    Operator getOperator(Long id);

    PageInfo getOperatorList(OperatorQueryObject qo);

    List<Operator> getAllOperatorList();

    boolean isWork(Long operatorID);
}
