package com.merrill.web.controller.operator;

import com.merrill.service.IEmptyTimeService;
import com.merrill.web.vo.FreeTime;
import com.merrill.web.vo.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-03-08
 * Time: 10:18
 * Description:
 */

@Controller("operatorEmptyTimeController")
@RequestMapping("/operator")
public class EmptyTimeController {
    @Autowired
    private IEmptyTimeService emptyTimeService;

    @Autowired
    private Status status;

    @RequestMapping("/submitFreeTimeList")
    @ResponseBody
    public Object submitFreeTimeList(@RequestBody FreeTime freeTime){
        if (emptyTimeService.updateByFreeTime(freeTime)) {
            status.setMessage("true");
        } else {
            status.setMessage("添加空闲时间失败，请稍后重试");
        }
        return status;
    }
}
