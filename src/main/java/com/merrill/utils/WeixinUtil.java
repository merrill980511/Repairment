package com.merrill.utils;

import com.merrill.dao.entity.User;
import com.merrill.web.vo.UserInfoResult;
import lombok.Data;
import org.springframework.web.client.RestTemplate;

import java.util.Date;
import java.util.Properties;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-03-20
 * Time: 15:18
 * Description:
 */
public class WeixinUtil {

    private static Properties p = new Properties();

    private static Long access_token_updateTime;

    static {
        try {
            p.load(Thread.currentThread().getContextClassLoader().getResourceAsStream("weixin.properties"));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static String getCorpId(){
        return p.getProperty("corpId");
    }

    public static String getUserIndexUrl(){
        return p.getProperty("userIndexUrl");
    }

    public static String getOperatorIndexUrl(){
        return p.getProperty("operatorIndexUrl");
    }

    public static String getAccessToken(String access_token){
        String corpId = p.getProperty("corpId");
        String corpsecret = p.getProperty("corpsecret");
        if (access_token != null && (access_token_updateTime + 5400000) > new Date().getTime())
            return access_token;
        RestTemplate restTemplate = new RestTemplate();
        AccessTokenResult accessTokenResult = restTemplate.getForObject(
                String.format("https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=%s&corpsecret=%s",
                        corpId,corpsecret ), AccessTokenResult.class);
        if (accessTokenResult.getErrcode() == null || accessTokenResult.getErrcode().equals("0")) {
            access_token_updateTime = new Date().getTime();
        } else System.out.println("error:" + accessTokenResult);
        return accessTokenResult.getAccess_token();
    }

    public static User getUser(String id){
        UserInfoResult userInfoResult = new RestTemplate().getForObject(
                String.format("https://qyapi.weixin.qq.com/cgi-bin/user/get?access_token=%s&userid=%s",
                        getAccessToken(null), id), UserInfoResult.class);
        if (userInfoResult == null){
            return null;
        } else {
            User user = new User();
            user.setPhone(userInfoResult.getMobile());
            user.setOpenID(userInfoResult.getUserid());
            user.setName(userInfoResult.getName());
            return user;
        }
    }


}

@Data
class AccessTokenResult{
    private String access_token;

    private Integer expires_in;

    private String errcode;

    private String errmsg;

}