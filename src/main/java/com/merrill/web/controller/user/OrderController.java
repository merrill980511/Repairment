package com.merrill.web.controller.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.merrill.dao.entity.Order;
import com.merrill.service.IOrderService;
import com.merrill.web.vo.Status;

import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-02-16
 * Time: 11:43
 * Description:
 */
@Controller("userOrderController")
@RequestMapping("/user")
public class OrderController {
    @Autowired
    private IOrderService orderService;
    @Autowired
    private Status status;

    @RequestMapping("/submitOrder")
    @ResponseBody
    public Object submitOrder(@RequestBody Map<String, String> map) {
        String userID = map.get("userID");
        Long id = Long.valueOf(userID);
        if (orderService.saveOrder(id, map.get("phone"), map.get("repairment"),
                map.get("location"), map.get("userDescription"))) {
            status.setMessage("true");
        } else {
            status.setMessage("保存失败，请稍后再提交");
        }
        return status;
    }

    @RequestMapping("/getOrder")
    @ResponseBody
    public Object getOrder(@RequestBody Map<String, String> map) {
        String userID = map.get("userID");
        Long id = Long.valueOf(userID);
        Order order = orderService.getOrderByUserID(id);
        return order;
    }

    @RequestMapping("/finishOrder")
    @ResponseBody
    public Object finishOrder(@RequestBody Map<String, String> map){
        String orderID = map.get("orderID");
        Long id = Long.valueOf(orderID);
        if (orderService.finishOrder(id)){
            status.setMessage("true");
        } else {
            status.setMessage("完结失败，请稍后再提交");
        }
        return status;
    }
}
