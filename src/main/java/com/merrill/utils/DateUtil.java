package com.merrill.utils;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: 梅峰鑫
 * Date: 2019-02-21
 * Time: 13:55
 * Description:
 */
public class DateUtil {
    public static String date2String(Date date){
        DateFormat bf = new SimpleDateFormat("yyyyMMdd");
        return bf.format(date);
    }
}
