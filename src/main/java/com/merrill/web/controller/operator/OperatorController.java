package com.merrill.web.controller.operator;

import com.merrill.service.IOperatorService;
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
 * Date: 2019-04-11
 * Time: 12:10
 * Description:
 */

@Controller("operatorOperatorController")
@RequestMapping("/operator")
public class OperatorController {
    @Autowired
    private IOperatorService operatorService;

    @Autowired
    private Status status;

    @RequestMapping("/editPasswordCommit")
    @ResponseBody
    public Object editPassword(@RequestBody Map<String, String> map) {
        String id = map.get("id");
        String password = map.get("password");
        if (operatorService.editPassword(id, password)) {
            status.setMessage("true");
        } else {
            status.setMessage("修改密码错误");
        }
        return status;
    }
}
