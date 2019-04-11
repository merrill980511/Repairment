package com.merrill.web.controller.admin;

import com.merrill.query.OrderQueryObject;
import com.merrill.service.IOrderService;
import com.merrill.web.vo.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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
    @Autowired
    private Status status;

    @RequestMapping("/getOrderFinishRate")
    @ResponseBody
    public Object getOrderFinishRate(@RequestBody Map<String, List> map) {
        List<String> dates = map.get("dateList");
        return orderService.getOrderRateListByDateList(dates);
    }

    @RequestMapping("/getOrderSortByDate")
    @ResponseBody
    public Object getOrderSortByDate(@RequestBody Map<String, String> map) {
        String num = map.get("number");
        int number = Integer.valueOf(num);
        return orderService.getOrderByNumber(number);
    }

    @RequestMapping("/getOrderList")
    @ResponseBody
    public Object getOrderList(@RequestBody OrderQueryObject qo) {
        return orderService.getOrderList(qo);
    }

    @RequestMapping("/getOrderFinishedList")
    @ResponseBody
    public Object getOrderFinishedList(@RequestBody OrderQueryObject qo) {
        return orderService.getOrderFinishedList(qo);
    }

    @RequestMapping("/getOrder")
    @ResponseBody
    public Object getOrder(@RequestBody Map<String, String> map) {
        String id = map.get("id");
        return orderService.getOrderByID(Long.valueOf(id));
    }

    @RequestMapping("/addOrder")
    @ResponseBody
    public Object addOrder(@RequestBody Map<String, String> map) {
        Long userID = Long.valueOf(map.get("userID"));
        String location = map.get("location");
        String userDescription = map.get("userDescription");
        String description = map.get("phone");
        String phone = map.get("description");
        String repairment = map.get("map");
        if (orderService.addOrder(userID, location, phone,
                userDescription, description, repairment)) {
            status.setMessage("true");
        } else {
            status.setMessage("添加失败，请稍后重试");
        }
        return status;
    }

    @RequestMapping("/deleteOrder")
    @ResponseBody
    public Object deleteOrder(@RequestBody Map<String, String> map) {
        Long orderID = Long.valueOf(map.get("orderID"));
        if (orderService.deleteOrderByID(orderID)) {
            status.setMessage("true");
        } else {
            status.setMessage("删除失败，请稍后重试");
        }
        return status;
    }

    @RequestMapping("/updateOrder")
    @ResponseBody
    public Object updateOrder(@RequestBody Map<String, String> map) {
        Long id = Long.valueOf(map.get("id"));
        String location = map.get("location");
        String description = map.get("description");
        String userDescription = map.get("userDescription");
        String repairment = map.get("repairment");
        if (orderService.updateOrder(id, location, description,
                userDescription, repairment)) {
            status.setMessage("true");
        } else {
            status.setMessage("更新失败，请稍后重试");
        }
        return status;
    }

    @RequestMapping("/finishOrder")
    @ResponseBody
    public Object finishOrder(@RequestBody Map<String, String> map) {
        String orderID = map.get("orderID");
        if (orderService.finishOrder(Long.valueOf(orderID))) {
            status.setMessage("true");
        } else {
            status.setMessage("完结失败，请稍后再提交");
        }
        return status;
    }

    @RequestMapping("/getTodayOrderList")
    @ResponseBody
    public Object getTodayOrderList(@RequestBody OrderQueryObject qo){
        return orderService.getTodayOrderList(qo);
    }

    @RequestMapping("/getTodayOrderFinishedList")
    @ResponseBody
    public Object getTodayOrderFinishedList(@RequestBody OrderQueryObject qo){
        return orderService.getTodayOrderFinishedList(qo);
    }

    @RequestMapping("/getOrderSolvingList")
    @ResponseBody
    public Object getOrderSolvingList(@RequestBody OrderQueryObject qo){
        return orderService.getOrderSolvingList(qo);
    }
}
