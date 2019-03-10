package com.merrill.web.controller.admin;

import com.merrill.service.IEmptyTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-03-08
 * Time: 10:18
 * Description:
 */

@Controller("adminEmptyTimeController")
@RequestMapping("/admin")
public class EmptyTimeController {
    @Autowired
    private IEmptyTimeService emptyTimeService;



}
