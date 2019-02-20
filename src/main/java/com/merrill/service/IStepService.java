package com.merrill.service;

import com.merrill.dao.entity.Step;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-02-15
 * Time: 16:19
 * Description:
 */
public interface IStepService {
    Step getStepByOptionID(Long id);
}
