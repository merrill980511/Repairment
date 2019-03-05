package com.merrill.utils;

import java.text.DateFormat;
import java.text.ParseException;
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

    public static String string2String(String str){
        DateFormat format1 = new SimpleDateFormat("yyyy-MM-dd");
        Date date = null;
        try {
            date = format1.parse(str);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        DateFormat bf = new SimpleDateFormat("yyyyMMdd");
        return bf.format(date);
    }

    public static Date string2Date(String string){
        DateFormat format1 = new SimpleDateFormat("yyyy-MM-dd");
        Date date = null;
        try {
            date = format1.parse(string);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date;
    }
}
