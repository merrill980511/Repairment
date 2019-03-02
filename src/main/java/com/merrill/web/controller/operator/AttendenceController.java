package com.merrill.web.controller.operator;

import com.merrill.service.IAttendenceService;
import com.merrill.service.IOperatorService;
import com.merrill.utils.RequestUtil;
import com.merrill.web.vo.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
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
    private Status status;

    @RequestMapping("/checkin")
    @ResponseBody
    public Object checkin(@RequestBody Map<String, String> map, HttpServletRequest req) {
        RequestUtil.getClientIpAddress(req);
        Long id = Long.valueOf(map.get("operatorID"));
        Map<String, Object> temp = new HashMap<>();
        temp.put("attendenceID", attendenceService.checkin(id));
        return temp;
    }

    @RequestMapping("/checkout")
    @ResponseBody
    public Object checkout(@RequestBody Map<String, String> map) {
        Long operatorID = Long.valueOf(map.get("operatorID"));
        status.setMessage(attendenceService.checkout(operatorID));
        return status;
    }

    @RequestMapping("/getMyAttendence")
    @ResponseBody
    public Object getMyAttendence(@RequestBody Map<String, String> map) {
        Long operatorID = Long.valueOf(map.get("operatorID"));
        return attendenceService.getAttendenceByOperatorID(operatorID);
    }
}
