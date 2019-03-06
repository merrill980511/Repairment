package com.merrill.web.controller.admin;

import com.merrill.dao.entity.Schedule;
import com.merrill.service.IScheduleService;
import com.merrill.utils.DateUtil;
import com.merrill.web.vo.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-03-05
 * Time: 13:50
 * Description:
 */
@Controller
@RequestMapping("/admin")
public class ScheduleController {

    @Autowired
    private IScheduleService scheduleService;

    @Autowired
    private Status status;

    @RequestMapping("/schedule")
    public String schedule(){
        return "/admin/views/adminSchedule";
    }

    @RequestMapping("/getScheduleList")
    @ResponseBody
    public Object getScheduleList(@RequestBody Map<String, String> map){
        String str = map.get("date");
        Date date = DateUtil.string2Date(str);
        return scheduleService.getScheduleListByDate(date);
    }

    @RequestMapping("/updateSchedule")
    @ResponseBody
    public Object updateSchedule(@RequestBody Schedule schedule){

        return status;
    }
}
