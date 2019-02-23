package com.merrill.web.controller.admin;

import com.merrill.service.IStepService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

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


}
