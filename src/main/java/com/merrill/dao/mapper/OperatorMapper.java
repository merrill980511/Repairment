package com.merrill.dao.mapper;

import com.merrill.dao.entity.Operator;
import com.merrill.query.OperatorQueryObject;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-02-21
 * Time: 13:26
 * Description: 运维人员操作数据库接口
 */
@Repository
public interface OperatorMapper {
    /**
     * 根据运维人员id删除运维人员
     *
     * @param id 运维人员id
     * @return 返回受影响行数
     */
    int delete(Long id);

    /**
     * 添加运维人员
     *
     * @param openID   运维人员的openID
     * @param name     运维人员姓名
     * @param password 运维人员的密码
     * @param phone    运维人员的联系方式
     * @return 返回受影响行数
     */
    int add(@Param("openID") String openID, @Param("name") String name,
            @Param("password") String password, @Param("phone") String phone);

    /**
     * 更新运维人员信息（密码一般为空）
     *
     * @param id       运维人员的id
     * @param name     运维人员的姓名
     * @param password 运维人员的密码
     * @param phone    运维人员的联系方式
     * @return 返回受影响行数
     */
    int update(@Param("id") Long id, @Param("name") String name,
               @Param("password") String password, @Param("phone") String phone);

    /**
     * 根据传入的参数查询相关的运维人员
     *
     * @param qo 封装了查询相关参数
     * @return 返回运维人员列表
     */
    List<Operator> getOperatorList(OperatorQueryObject qo);

    /**
     * 根据运维人员的id查询运维人员
     *
     * @param id 运维人员的id
     * @return 返回运维人员的相关信息
     */
    Operator getOperator(Long id);

    /**
     * 获取所有运维人员集合
     *
     * @return 返回所有运维人员集合
     */
    List<Operator> getAllOperatorList();

    /**
     * 根据运维的学号获取其工号
     *
     * @return 返回所有运维人员集合
     */
    Long getIdByUserID(String userId);

    /**
     * 根据operator的open_id获取运维人员
     * open_id就是学号
     *
     * @param id open_id
     * @return 查询出来的operator对象
     */
    Operator getOperatorByOpenID(String id);

    int editPassword(@Param("id") String id, @Param("password") String password);
}
