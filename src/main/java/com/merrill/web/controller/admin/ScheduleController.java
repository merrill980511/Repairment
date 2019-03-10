package com.merrill.web.controller.admin;

import com.merrill.dao.entity.Operator;
import com.merrill.dao.entity.Schedule;
import com.merrill.query.QueryObject;
import com.merrill.service.IScheduleService;
import com.merrill.utils.DateUtil;
import com.merrill.web.vo.ScheduleVO;
import com.merrill.web.vo.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.*;

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
    public String schedule() {
        return "/admin/views/adminSchedule";
    }

    @RequestMapping("/getScheduleList")
    @ResponseBody
    public Object getScheduleList(@RequestBody Map<String, String> map) {
        String str = map.get("date");
        Date date = DateUtil.string2UtilDate(str);
        return scheduleService.getScheduleListByDate(date);
    }

    @RequestMapping("/updateScheduleList")
    @ResponseBody
    public Object updateScheduleList(@RequestBody ScheduleVO[] scheduleList) {
        for (ScheduleVO schedule : scheduleList) {
            List<Operator> operators = schedule.getOperatorList();
            List<Long> ids = new ArrayList<>();
            for (Operator operator : operators) {
                if (operator != null && !operator.getId().equals(-2L)) {
                    ids.add(operator.getId());
                }
            }
            Set set = new HashSet<>(ids);
            if (set.size() < ids.size()) {
                switch (schedule.getWorkTime().getNumber()){
                    case 1:
                        status.setMessage("第一二节课有人员重复，请确认后更新");
                        return status;
                    case 2:
                        status.setMessage("第三四节课有人员重复，请确认后更新");
                        return status;
                    case 3:
                        status.setMessage("第五六节课有人员重复，请确认后更新");
                        return status;
                    case 4:
                        status.setMessage("第七八节课有人员重复，请确认后更新");
                        return status;
                        default:
                            return "课程时间有误，请联系管理员";
                }
            }
        }
        if (scheduleService.updateScheduleList(scheduleList)) {
            status.setMessage("true");
        } else {
            status.setMessage("保存失败，请重试");
        }
        return status;
    }

    @RequestMapping("/getLeaveList")
    @ResponseBody
    private Object getLeaveList() {
        return scheduleService.getLeaveList();
    }

    @RequestMapping("/getReviewedLeaveList")
    @ResponseBody
    private Object getReviewedLeaveList(@RequestBody QueryObject qo) {
        return scheduleService.getReviewedLeaveList(qo);
    }

    @RequestMapping("/getUnReviewedLeaveList")
    @ResponseBody
    private Object getUnReviewedLeaveList(@RequestBody QueryObject qo) {
        return scheduleService.getUnReviewedLeaveList(qo);
    }

    @RequestMapping("/getLeave")
    @ResponseBody
    private Object getLeave(@RequestBody Map<String, String> map) {
        Long id = Long.valueOf(map.get("id"));
        return scheduleService.getSchedule(id);
    }

    @RequestMapping("/agreeLeave")
    @ResponseBody
    private Object agreeLeave(@RequestBody Map<String, String> map) {
        Long id = Long.valueOf(map.get("id"));
        if (scheduleService.updateScheduleStatus(id, 9)){
            status.setMessage("true");
        } else {
            status.setMessage("同意失败，请稍后重试");
        }
        return status;
    }

    @RequestMapping("/disagreeLeave")
    @ResponseBody
    private Object disagreeLeave(@RequestBody Map<String, String> map) {
        Long id = Long.valueOf(map.get("id"));
        if (scheduleService.updateScheduleStatus(id, 10)){
            status.setMessage("true");
        } else {
            status.setMessage("驳回失败，请稍后重试");
        }
        return status;
    }

}
