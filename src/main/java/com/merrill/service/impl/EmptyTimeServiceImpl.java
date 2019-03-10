package com.merrill.service.impl;

import com.merrill.dao.mapper.EmptyTimeMapper;
import com.merrill.service.IEmptyTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-03-08
 * Time: 10:21
 * Description:
 */
@Service
@Transactional
public class EmptyTimeServiceImpl implements IEmptyTimeService {
    @Autowired
    private EmptyTimeMapper emptyTimeMapper;
}
