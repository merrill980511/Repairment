package com.merrill.web.controller.admin;

import com.merrill.service.IDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-02-21
 * Time: 13:15
 * Description:
 */
@Controller("adminDataController")
@RequestMapping("/admin")
public class DataController {

    @Autowired
    private IDataService dataService;

    @RequestMapping("/overview")
    @ResponseBody
    public Object overview(){
        return dataService.getAdminOverview();
    }


}
