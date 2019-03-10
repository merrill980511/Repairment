package com.merrill.web.controller.admin;

import com.merrill.dao.entity.Attendence;
import com.merrill.service.IAttendenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-03-10
 * Time: 16:40
 * Description:
 */
@Controller("adminAttendenceController")
@RequestMapping("/admin")
public class AttendenceController {

    @Autowired
    private IAttendenceService attendenceService;

    @RequestMapping("/getCurrentAttendenceList")
    @ResponseBody
    public Object getCurrentOperatorList(){
        return attendenceService.getCurrentOperatorList();
    }
}
