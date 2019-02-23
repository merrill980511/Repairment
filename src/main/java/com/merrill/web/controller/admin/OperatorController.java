package com.merrill.web.controller.admin;

import com.merrill.dao.entity.Operator;
import com.merrill.query.OperatorQueryObject;
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
 * Date: 2019-02-21
 * Time: 23:19
 * Description:
 */
@Controller("adminOperatorController")
@RequestMapping("/admin")
public class OperatorController {

    @Autowired
    private IOperatorService operatorService;
    @Autowired
    private Status status;

    @RequestMapping("/addOperator")
    @ResponseBody
    public Object addOperator(@RequestBody Operator operator) {
        if (operatorService.add(operator)) {
            status.setMessage("true");
        } else {
            status.setMessage("保存失败，请稍后重试");
        }
        return status;
    }

    @RequestMapping("/deleteOperator")
    @ResponseBody
    public Object deleteOperator(@RequestBody Map<String, String> map) {
        if (operatorService.delete(Long.valueOf(map.get("id")))) {
            status.setMessage("true");
        } else {
            status.setMessage("删除失败，请稍后重试");
        }
        return status;
    }

    @RequestMapping("/updateOperator")
    @ResponseBody
    public Object updateOperator(@RequestBody Operator operator) {
        if (operatorService.update(operator)) {
            status.setMessage("true");
        } else {
            status.setMessage("更新失败，请稍后重试");
        }
        return status;
    }

    @RequestMapping("/getOperator")
    @ResponseBody
    public Object getOperator(@RequestBody Map<String, String> map) {
        String id = map.get("id");
        return operatorService.getOperator(Long.valueOf(id));
    }

    @RequestMapping("/getOperatorList")
    @ResponseBody
    public Object getOperatorList(@RequestBody OperatorQueryObject qo) {
        return operatorService.getOperatorList(qo);
    }
}
