package com.merrill.web.controller.user;

import com.merrill.dao.entity.User;
import com.merrill.service.IUserService;
import com.merrill.web.vo.AccessTokenResult;
import com.merrill.web.vo.CodeTokenResult;
import com.merrill.web.vo.UserInfoResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileWriter;
import java.util.Date;
import java.util.Map;


@Controller("UserWxController")
@RequestMapping("/user")
public class WxController {
    private String corpId = "wx3937f0d825370119";//企业号ID
    private String corpsecret = "kQclf6pPbCQp_mcf-jgOm1OiEgxd3VGb5q2-q9E-NaI";//应用secret
    private String indexUrl = "http://wlbx.njit.edu.cn/repair/user/repairmentApply";//主页地址

    private String access_token;
    private Long access_token_updateTime;

    @Autowired
    private IUserService userService;

    /**
     * https://---/rest/Login/auth
     *
     * @param request
     * @param response
     * @throws Exception
     */
    @RequestMapping(value = "/auth")
    @ResponseBody
    public void auth(HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        String requestUrl = request.getRequestURL().toString();
        String url = requestUrl.substring(0, requestUrl.indexOf("auth")) + "login";// "http://---/ngctxl/rest/Login/login";
        String get_code_url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=CORPID&redirect_uri=REDIRECT_URI&response_type=code&scope=snsapi_userinfo#wechat_redirect";
        get_code_url = get_code_url.replace("CORPID", corpId).replace(
                "REDIRECT_URI", url);
        System.out.println("get_code_url=" + get_code_url);
        response.sendRedirect(get_code_url);
    }

    @RequestMapping(value = "/login")
    @ResponseBody
    public void login(HttpServletRequest request, HttpServletResponse response)
            throws Exception {

        getAccessToken();
        String code = request.getParameter("code");

        //code换userInfo
        String get_user_url = "https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?access_token=ACCESS_TOKEN&code=CODE";
        get_user_url.replace("ACCESS_TOKEN", access_token).replace(
                "CODE", code);
        RestTemplate restTemplate = new RestTemplate();
        Map<String,String> codeTokenResult = restTemplate.getForObject(
                String.format("https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?access_token=%s&code=%s",
                        access_token,code ), Map.class);
        String userId = codeTokenResult.get("UserId");

        UserInfoResult userInfoResult = restTemplate.getForObject(
                String.format("https://qyapi.weixin.qq.com/cgi-bin/user/get?access_token=%s&userid=%s",
                        access_token,userId ), UserInfoResult.class);

        String name = userInfoResult.getName();
        String phone = userInfoResult.getMobile();

        Long id = userService.getIdByUserID(userId);

        if (id == null){
            User user = new User();
            user.setName(name);
            user.setOpenID(userId);
            user.setPhone(phone);
            userService.addUser(user);
            id = userService.getIdByUserID(userId);
        }

        response.sendRedirect(indexUrl+"?"+"id="+id);
    }

    private String getAccessToken() throws Exception {
        if (access_token != null && (access_token_updateTime + 5400000) > new Date().getTime())
            return access_token;
        RestTemplate restTemplate = new RestTemplate();
        AccessTokenResult accessTokenResult = restTemplate.getForObject(
                String.format("https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=%s&corpsecret=%s",
                        corpId,corpsecret ), AccessTokenResult.class);
        if (accessTokenResult.getErrcode() == null || accessTokenResult.getErrcode().equals("0")) {
            access_token_updateTime = new Date().getTime();
            access_token = accessTokenResult.getAccess_token();
        } else System.out.println("error:" + accessTokenResult);
        return accessTokenResult.getAccess_token();
    }
}
