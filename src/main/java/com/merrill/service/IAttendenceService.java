package com.merrill.service;

import com.merrill.dao.entity.Attendence;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-03-01
 * Time: 17:22
 * Description:
 */
public interface IAttendenceService {

    boolean checkin(Long id);

    String checkout(Long id);

    Attendence getAttendenceByOperatorID(Long operatorID);

    List<Attendence> getCurrentOperatorList();
}
