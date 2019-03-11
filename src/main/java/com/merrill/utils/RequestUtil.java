package com.merrill.utils;

import javax.servlet.http.HttpServletRequest;
import java.util.Properties;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-03-01
 * Time: 18:30
 * Description:
 */
public class RequestUtil {

    private static Properties p = new Properties();

    static {
        try {
            p.load(Thread.currentThread().getContextClassLoader().getResourceAsStream("ip.properties"));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * java 后台获取访问客户端ip地址
     *
     * @param request 请求
     * @return 客户端的ip
     */
    public static String getClientIpAddress(HttpServletRequest request) {
        String clientIp = request.getHeader("x-forwarded-for");
        if (clientIp == null || clientIp.length() == 0 || "unknown".equalsIgnoreCase(clientIp)) {
            clientIp = request.getHeader("Proxy-Client-IP");
        }
        if (clientIp == null || clientIp.length() == 0 || "unknown".equalsIgnoreCase(clientIp)) {
            clientIp = request.getHeader("WL-Proxy-Client-IP");
        }
        if (clientIp == null || clientIp.length() == 0 || "unknown".equalsIgnoreCase(clientIp)) {
            clientIp = request.getRemoteAddr();
        }
        return clientIp;
    }

    public static boolean isValid(String ip){
        String str = p.getProperty("ip1");
        if (ip.startsWith(str)){
            return true;
        } else {
            return false;
        }
    }

    public static void main(String[] args) {
        String s = p.getProperty("ip6");
        System.out.println(s);
    }
}
