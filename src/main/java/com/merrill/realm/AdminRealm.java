package com.merrill.realm;

import com.merrill.dao.entity.Admin;
import com.merrill.dao.entity.Operator;
import com.merrill.dao.mapper.AdminMapper;
import com.merrill.dao.mapper.OperatorMapper;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.springframework.beans.factory.annotation.Autowired;

public class AdminRealm extends AuthorizingRealm {

    @Autowired
    private AdminMapper adminMapper;

    @Autowired
    private OperatorMapper operatorMapper;

    //认证操作
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        //从token中获取登录的用户名， 查询数据库返回用户信息
        String id = token.getPrincipal().toString();
        Admin admin = adminMapper.getByID(id);
        Operator operator = operatorMapper.getOperatorByOpenID(id);
        SimpleAuthenticationInfo info = null;
        if (admin != null) {
            info = new SimpleAuthenticationInfo(admin, admin.getPassword(),
                    ByteSource.Util.bytes(id), "AdminRealm");
        }else if (operator != null){
            info = new SimpleAuthenticationInfo(operator, operator.getPassword(),
                    ByteSource.Util.bytes(id), "AdminRealm");
        }
        return info;
    }

    //授权操作
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
        Object principal = principalCollection.getPrimaryPrincipal();//获取登录的用户名
        System.out.println(principal);
        try {
            Admin admin = (Admin) principal;
            if (adminMapper.getByID(admin.getId().toString()) != null) {               //两个if根据判断赋予登录用户权限
                info.addRole("admin");
            }
        } catch (Exception e) {
            try {
                Operator operator = (Operator) principal;
                if (operatorMapper.getOperator(operator.getId()) != null) {               //两个if根据判断赋予登录用户权限
                    info.addRole("telephoneOperator");
                }
            } catch (Exception ex) {

            }
        }

//        info.addRole("user");

        return info;
    }
}
