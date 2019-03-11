package com.merrill.service.impl;

import com.merrill.dao.mapper.EmptyTimeMapper;
import com.merrill.service.IEmptyTimeService;
import com.merrill.utils.DateUtil;
import com.merrill.web.vo.FreeTime;
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

    @Override
    public boolean updateByFreeTime(FreeTime freeTime) {
        Long operatorID = freeTime.getOperatorID();
        String[][] temp = freeTime.getFreeTimeList();
        String[] date = freeTime.getDateList();
        for (int i = 0; i < temp.length; i++) {
            if (emptyTimeMapper.deleteByFreeTime(DateUtil.string2UtilDate(date[i]), operatorID) < 0) {
                return false;
            }
            for (int j = 0; j < temp[i].length; j++) {
                if (temp[i][j].equals("1")) {
                    if (emptyTimeMapper.insertByFreeTime(DateUtil.string2SqlDate(date[i]),
                            j + 1, operatorID) <= 0) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
}
