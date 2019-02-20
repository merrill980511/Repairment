package com.merrill.web.vo;

import lombok.Data;
import org.springframework.stereotype.Component;

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
    /**
     * json的key固定为"message"，value根据后端数据处理结果返回
     */
    private String message;
}