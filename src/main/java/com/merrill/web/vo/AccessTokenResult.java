package com.merrill.web.vo;

import lombok.Data;

@Data
public class AccessTokenResult{
    private String access_token;

    private Integer expires_in;

    private String errcode;

    private String errmsg;

}