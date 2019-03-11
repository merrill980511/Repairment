package com.merrill.web.controller.operator;

import com.merrill.dao.entity.Schedule;
import com.merrill.service.IAttendenceService;
import com.merrill.service.IOperatorService;
import com.merrill.service.IScheduleService;
import com.merrill.utils.DateUtil;
import com.merrill.utils.RequestUtil;
import com.merrill.web.vo.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-03-01
 * Time: 16:23
 * Description:
 */

@Controller("operatorAttendenceController")
@RequestMapping("/operator")
public class AttendenceController {

    @Autowired
    private IAttendenceService attendenceService;

    @Autowired
    private IScheduleService scheduleService;
    @Autowired

    private Status status;

    @RequestMapping("/checkIn")
    @ResponseBody
    public Object checkin(@RequestBody Map<String, String> map, HttpServletRequest req) {
//        if (!RequestUtil.isValid(RequestUtil.getClientIpAddress(req))){
//            status.setMessage("请在指定地点登录");
//            return status;
//        }
        RequestUtil.getClientIpAddress(req);
        Long id = Long.valueOf(map.get("operatorID"));
        if (attendenceService.checkin(id)){
            status.setMessage("true");
        } else {
            status.setMessage("打卡失败，请稍后重试");
        }
        return status;
    }

    @RequestMapping("/checkOut")
    @ResponseBody
    public Object checkout(@RequestBody Map<String, String> map) {
        Long operatorID = Long.valueOf(map.get("operatorID"));
        status.setMessage(attendenceService.checkout(operatorID));
        return status;
    }

    @RequestMapping("/getAttendence")
    @ResponseBody
    public Object getAttendence(@RequestBody Map<String, String> map) {
        Long operatorID = Long.valueOf(map.get("operatorID"));
        return attendenceService.getAttendenceByOperatorID(operatorID);
    }

    @RequestMapping("/submitLeave")
    @ResponseBody
    public Object submitLeave(@RequestBody Map<String, String> map) {
        String d = map.get("date");
        String description = map.get("description");
        int number = Integer.valueOf(map.get("number"));
        Long operatorID = Long.valueOf(map.get("operatorID"));
        Schedule schedule = scheduleService.getSchedule(operatorID, DateUtil.string2UtilDate(d), number);
        if (schedule == null){
            status.setMessage("请假时间有误，请核实时间之后再提交申请");
            return status;
        }
        if (scheduleService.updateScheduleDescriptionAndStatus(schedule.getId(), description, 8)) {
            status.setMessage("true");
        }
        return null;
    }
}
