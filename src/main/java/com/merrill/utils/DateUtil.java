package com.merrill.utils;

import javax.xml.crypto.Data;
import java.sql.Time;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

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

    public static String getCurrentTime() {
        Date now = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");//可以方便地修改日期格式
        return dateFormat.format(now);
    }

    public static Time getTimeByDate(Date date){
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("HH:mm:ss");
        String dateString = simpleDateFormat.format(date);
        try {
            Date d = simpleDateFormat.parse(dateString);
            return new Time(d.getTime());
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }



    public static void main(String[] args) {
        Time time = getTimeByDate(new Date());
        System.out.println(time);

    }
}
