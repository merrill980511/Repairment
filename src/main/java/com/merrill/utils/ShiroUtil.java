package com.merrill.utils;

import com.merrill.dao.entity.Admin;
import org.apache.shiro.SecurityUtils;
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
        Object credential = "330af4503dc0deae2e907a18162b0f5a";//密码原值
        ByteSource salt = ByteSource.Util.bytes("20211916118");//以账号作为盐值
        int hashIterations = 3;//加密3次
        SimpleHash hash = new SimpleHash(hashAlgorithmName, credential, salt, hashIterations);
        System.out.println(hash.toString());
    }
}
