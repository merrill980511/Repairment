package com.merrill.dao.mapper;

import org.springframework.stereotype.Repository;
import com.merrill.dao.entity.Step;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-02-15
 * Time: 16:23
 * Description:
 */

@Repository
public interface StepMapper {
    Long getStepIDByOptionID(Long id);

    Step getStepByID(Long id);

    Long getStepMinID();
}
