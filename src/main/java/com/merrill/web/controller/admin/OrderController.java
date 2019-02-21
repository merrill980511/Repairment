package com.merrill.web.controller.admin;

import com.merrill.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-02-21
 * Time: 13:13
 * Description:
 */
@Controller("adminOrderController")
@RequestMapping("/admin")
public class OrderController {

    @Autowired
    private IOrderService orderService;

    @RequestMapping("/orderFinishedRate")
    @ResponseBody
    public Object orderFinished(@RequestBody Map<String, List> map){
        List<Date> dates = map.get("dateList");
        return orderService.getOrderRateListByDateList(dates);
    }

    @RequestMapping("/OrderByDate")
    @ResponseBody
    public Object unfinishedOrder(@RequestBody Map<String, String> map){
        String num = map.get("number");
        int number = Integer.valueOf(num);
        return orderService.getOrderByNumber(number);
    }
}
