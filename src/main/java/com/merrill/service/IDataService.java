package com.merrill.service;

import com.merrill.web.vo.AttendenceRate;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-02-21
 * Time: 13:20
 * Description:
 */
public interface IDataService {
    List<Integer> getAdminOverview();

    List<AttendenceRate> getAttendenceRate(String[] date);
}
