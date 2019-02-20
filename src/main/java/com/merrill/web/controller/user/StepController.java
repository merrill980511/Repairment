package com.merrill.web.controller.user;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.merrill.dao.entity.Step;
import com.merrill.service.IStepService;

import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-02-12
 * Time: 14:59
 * Description:
 */

@Controller
@RequestMapping("/user")
public class StepController {

    @Autowired
    private IStepService stepService;

    @RequestMapping("/repairmentApply")
    public String repairmentApply(){
        return "repairmentApply";
    }

    @RequestMapping("/nextStep")
    @ResponseBody
    @JsonSerialize
    public Object nextStep(@RequestBody Map<String, String> map){
        String id = map.get("optionID");
        Long optionID = Long.valueOf(id);
        Step step = stepService.getStepByOptionID(optionID);
        return step;
    }
}
