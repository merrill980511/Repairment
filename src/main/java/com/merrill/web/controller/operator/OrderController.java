package com.merrill.web.controller.operator;

import com.merrill.query.OperatorQueryObject;
import com.merrill.query.OrderQueryObject;
import com.merrill.service.IOperatorService;
import com.merrill.service.IOrderService;
import com.merrill.web.vo.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-02-18
 * Time: 10:03
 * Description:
 */
@Controller("operatorOrderController")
@RequestMapping("/operator")
public class OrderController {

    @Autowired
    private IOrderService orderService;

    @Autowired
    private IOperatorService operatorService;

    @Autowired
    private Status status;


    @RequestMapping("/orderListView")
    public String orderListView(){
        return "/operator/views/orderListView";
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

    @RequestMapping("/takeOrder")
    @ResponseBody
    public Object takeOrder(@RequestBody Map<String, String> map){
        Long operatorID = Long.valueOf(map.get("operatorID"));
        if (operatorService.isWork(operatorID)){
            status.setMessage("未处于上班时间，请先打卡");
        }
        Long orderID = Long.valueOf(map.get("orderID"));
        status.setMessage(orderService.takeOrder(operatorID, orderID));
        return status;
    }

    @RequestMapping("/getOrderInHandle")
    @ResponseBody
    public Object getOrderInHandle(@RequestBody Map<String, String> map){
        Long operatorID = Long.valueOf(map.get("operatorID"));
        return orderService.getOrderInHandle(operatorID);
    }

    @RequestMapping("/getOrder")
    @ResponseBody
    public Object getOrder(@RequestBody Map<String, String> map) {
        Long orderID = Long.valueOf(map.get("orderID"));
        return orderService.getOrderByID(orderID);
    }

    @RequestMapping("/getMyOrderList")
    @ResponseBody
    public Object getMyOrderList(@RequestBody OperatorQueryObject qo) {
        return orderService.getOrderListByOperatorID(qo);
    }

//    @RequestMapping("/finishOrder")
//    @ResponseBody
//    public Object finishOrder(@RequestBody Map<String, String> map) {
//        return orderService.getOrderListByOperatorID(qo);
//    }
}
