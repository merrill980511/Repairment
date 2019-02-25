package com.merrill.web.controller.admin;

import com.merrill.dao.entity.User;
import com.merrill.query.UserQueryObject;
import com.merrill.service.IUserService;
import com.merrill.web.vo.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-02-25
 * Time: 9:06
 * Description:
 */
@Controller("adminUserController")
@RequestMapping("/admin")
public class UserController {

    @Autowired
    private IUserService userService;
    @Autowired
    private Status status;

    @RequestMapping("/addUser")
    @ResponseBody
    public Object addUser(@RequestBody User user) {
        if (userService.addUser(user)) {
            status.setMessage("true");
        } else {
            status.setMessage("添加失败，请稍后重试");
        }
        return status;
    }

    @RequestMapping("/updateUser")
    @ResponseBody
    public Object updateUser(@RequestBody User user) {
        if (userService.updateUser(user)) {
            status.setMessage("true");
        } else {
            status.setMessage("更新失败，请稍后重试");
        }
        return status;
    }

    @RequestMapping("deleteUser")
    @ResponseBody
    public Object deleteUser(@RequestBody Map<String, String> map) {
        Long id = Long.valueOf(map.get("id"));
        if (userService.deleteUser(id)) {
            status.setMessage("true");
        } else {
            status.setMessage("删除失败，请稍后重试");
        }
        return status;
    }

    @RequestMapping("/getUser")
    @ResponseBody
    public Object getUser(@RequestBody Map<String, String> map) {
        String id = map.get("id");
        return userService.getUserByID(Long.valueOf(id));
    }

    @RequestMapping("/getUserList")
    @ResponseBody
    public Object getUserList(@RequestBody UserQueryObject qo) {
        return userService.getUserList(qo);
    }

}
