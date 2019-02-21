package com.merrill.web.interceptor;

import com.alibaba.fastjson.JSON;
import com.merrill.utils.Token;
import com.merrill.web.vo.Status;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-02-21
 * Time: 15:47
 * Description:
 */
public class AdminTokenInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        response.setCharacterEncoding("UTF-8");
        String token = request.getHeader("token");
        if (token != null){
            if (Token.verify(token)) {
                return true;
            }
        }
        Status status = new Status();
        status.setMessage("账号或密码错误");
        response.getWriter().write(JSON.toJSONString(status));
        return false;
    }
}
