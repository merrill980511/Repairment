package com.merrill.web.controller.operator;

import com.merrill.service.IScheduleService;
import com.merrill.utils.DateUtil;
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
 * Date: 2019-03-08
 * Time: 9:56
 * Description:
 */
@Controller("operatorScheduleController")
@RequestMapping("/operator")
public class ScheduleController {

    @Autowired
    IScheduleService scheduleService;

    @RequestMapping("/getScheduleList")
    @ResponseBody
    public Object getScheduleList(@RequestBody Map<String, String> map){
        String str = map.get("date");
        Date date = DateUtil.string2UtilDate(str);
        return scheduleService.getScheduleListByDate(date);
    }

    @RequestMapping("/getLeaveListByOperatorID")
    @ResponseBody
    public Object getLeaveListByOperatorID(@RequestBody Map<String, String> map){
        Long operatorID = Long.valueOf(map.get("operatorID"));
        return scheduleService.getLeaveListByOperatorID(operatorID);
    }
}
