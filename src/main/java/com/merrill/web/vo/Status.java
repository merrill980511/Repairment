package com.merrill.web.vo;

import lombok.Data;
import net.sf.ehcache.search.parser.MAggregate;
import org.springframework.stereotype.Component;

import java.util.HashMap;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-2-17
 * Time: 11:24
 * Description: 用来存储后端返回信息，方便转换成json
 */

@Data
@Component
public class Status {

//    /**
//     * 接口查询状态
//     */
//    private int status = 200;

    /**
     * json的key固定为"message"，value根据后端数据处理结果返回
     */
    private String message;

//    /**
//     *
//     */
//    private HashMap<String, Object> data;
}