package com.merrill.utils;

import com.merrill.dao.entity.Admin;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.util.ByteSource;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-01-21
 * Time: 11:08
 * Description: Shiro相关的工具类
 */

public class ShiroUtil {


    /**
     * 将传入的用户的密码进行多次MD5加密
     *
     * @param id 管理员账号
     * @return 返回加密之后的密码
     */
    public static String SysMd5(Long id, String password) {
        String hashAlgorithmName = "MD5";//加密方式
        ByteSource salt = ByteSource.Util.bytes(id);//以账号作为盐值
        int hashIterations = 3;//加密3次
        SimpleHash hash = new SimpleHash(hashAlgorithmName, password, salt, hashIterations);
        return hash.toString();
    }

    /**
     * 将传入的用户的密码进行1次MD5加密
     *
     * @return 返回加密之后的密码
     */
    public static String SysMd5(String password) {
        SimpleHash hash = new SimpleHash("MD5", password, null, 1);
        return hash.toString();
    }

    /**
     * 获取已登录用户的邮箱
     *
     * @return
     */
    public static Long getLoginAdminID() {
        Subject currentUser = SecurityUtils.getSubject();
        if (currentUser == null || currentUser.getPrincipal() == null) {
            return null;
        }
        Admin admin = (Admin) currentUser.getPrincipal();
        return admin.getId();
    }



    public static void main(String[] args) {
        String hashAlgorithmName = "MD5";//加密方式
        /**
         * 7d256bf2d37babd3c92283f434cf678e
         */
        Object credential = "7d256bf2d37babd3c92283f434cf678e";//密码原值
        ByteSource salt = ByteSource.Util.bytes("202161122");//以账号作为盐值
        int hashIterations = 3;//加密3次

        SimpleHash hash = new SimpleHash(hashAlgorithmName, credential, salt, hashIterations);
//        SimpleHash hash = new SimpleHash(hashAlgorithmName, credential, null, 1);
        System.out.println(hash.toString());

    }
}
