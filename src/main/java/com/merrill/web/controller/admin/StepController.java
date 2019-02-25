package com.merrill.web.controller.admin;

import com.merrill.dao.entity.Step;
import com.merrill.service.IStepService;
import com.merrill.web.vo.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-02-22
 * Time: 0:50
 * Description:
 */
@Controller("adminStepController")
@RequestMapping("/admin")
public class StepController {

    @Autowired
    private IStepService stepService;
    @Autowired
    private Status status;

    @RequestMapping("/addStep")
    @ResponseBody
    public Object addStep(@RequestBody Step step){
        System.out.println(step);
        status.setMessage("true");
        return status;
    }

}
