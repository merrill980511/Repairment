package com.merrill.dao.mapper;

import org.springframework.stereotype.Repository;
import com.merrill.dao.entity.User;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-02-16
 * Time: 14:54
 * Description:
 */
@Repository
public interface UserMapper {
    User getUserByID(Long id);
}
