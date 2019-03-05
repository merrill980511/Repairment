package com.merrill.realm;

import com.merrill.dao.entity.Admin;
import com.merrill.dao.mapper.AdminMapper;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.springframework.beans.factory.annotation.Autowired;

public class AdminRealm extends AuthorizingRealm {

    @Autowired
    private AdminMapper adminMapper;

    //认证操作
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        //从token中获取登录的用户名， 查询数据库返回用户信息
        String id = token.getPrincipal().toString();
        Admin admin = adminMapper.getByID(id);

        if (admin == null) {
            return null;
        }
        SimpleAuthenticationInfo info = new SimpleAuthenticationInfo(admin, admin.getPassword(),
                ByteSource.Util.bytes(id), "AdminRealm");
        return info;
    }

    //授权操作
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        return null;
    }
}
