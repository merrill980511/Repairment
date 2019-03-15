package com.merrill.web.vo;

import lombok.Data;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-03-12
 * Time: 15:52
 * Description:
 */
@Data
public class CodeTokenResult {
    private int errcode;

    private String errmsg;

    private String UserId;

    private String DeviceId;
}
