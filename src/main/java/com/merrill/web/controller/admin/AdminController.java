package com.merrill.web.controller.admin;

import com.merrill.dao.entity.Admin;
import com.merrill.service.IAdminService;
import com.merrill.utils.Token;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-02-21
 * Time: 13:18
 * Description:
 */
@Controller("adminInfoController")
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private IAdminService adminService;

    @RequestMapping("/loginCommit")
    @ResponseBody
    public Object loginCommit(@RequestBody Map<String, String> map){
        String id = map.get("id");
        String password = map.get("password");
        Admin admin = adminService.login(Long.valueOf(id), password);
        Map<String, String> returnMap = new HashMap<>();
        if (admin != null){
            String token = Token.sign(admin.getId(), password);
            if (token != null){
                map.put("token", token);
                map.put("location", "/admin/index");
            }
        }
        return returnMap;
    }

    @RequestMapping("/login")
    public Object login(){
        return "/";
    }

    @RequestMapping("/index")
    public Object index(){
        return "/";
    }
}
