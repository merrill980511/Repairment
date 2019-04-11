package com.merrill.web.controller.admin;

import com.merrill.service.IAdminService;
import com.merrill.web.vo.Status;
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
    @Autowired
    private Status status;

    @RequestMapping("/login")
    public Object login() {
        return "/admin/views/login";
    }

    @RequestMapping("/loginCommit")
    @ResponseBody
    public Object loginCommit(@RequestBody Map<String, String> map) {
        String id = map.get("id");
        String password = map.get("password");
        Map<String, String> returnMap = new HashMap<>();
        if (adminService.login(Long.valueOf(id), password)) {
            returnMap.put("location", "/repair/admin/index");
            if (adminService.isExist(id)) {
                returnMap.put("isAdmin", "true");
            } else {
                returnMap.put("isAdmin", "false");
            }
        } else {
            returnMap.put("message", "账号或密码错误");
        }
        return returnMap;
//        Admin admin = adminService.login(Long.valueOf(id), password);
//        Map<String, String> returnMap = new HashMap<>();
//        if (admin != null){
//            String token = Token.sign(admin.getId(), password);
//            if (token != null){
//                returnMap.put("token", token);
//                returnMap.put("location", "/repair/admin/index");
//            }
//        }
//        return returnMap;
    }

    @RequestMapping("/editPassword")
    public Object editPassword() {
        return "/";
    }

    @RequestMapping("/editPasswordCommit")
    @ResponseBody
    public Object editPasswordCommit(@RequestBody Map<String, String> map) {
        String id = map.get("id");
        String password = map.get("password");
        if (adminService.editPassword(Long.valueOf(id), password)) {
            status.setMessage("true");
        } else {
            status.setMessage("修改密码失败，请稍后重试");
        }
        return status;
    }

    @RequestMapping("/index")
    public Object index() {
        return "/admin/views/adminIndex";
    }

    @RequestMapping("/table")
    public Object table() {
        return "/admin/views/adminTable";
    }
}
