package com.example.administrator.myapplication.util;

import android.content.Context;
import android.text.TextUtils;

import java.math.BigDecimal;

/**
 *
 */
public class NumberUtil {
    /**
     * 根据手机的分辨率从 dp 的单位 转成为 px(像素)
     */
    public static int dip2px(Context context, float dpValue) {
        final float scale = context.getResources().getDisplayMetrics().density;
        return (int) (dpValue * scale + 0.5f);
    }

    /**
     * 根据手机的分辨率从 px(像素) 的单位 转成为 dp
     */
    public static int px2dip(Context context, float pxValue) {
        final float scale = context.getResources().getDisplayMetrics().density;
        return (int) (pxValue / scale + 0.5f);
    }

    public static int toInt(String text) {
        return toInt(text, 0);
    }

    /**
     * @param text  数字文字
     * @param value 默认值
     * @return 字符串转int
     */
    public static int toInt(String text, int value) {
        if (TextUtils.isEmpty(text)) {
            return value;
        } else {
            int result = value;

            try {
                result = Integer.parseInt(text);
            } catch (Exception e) {
                e.printStackTrace();
            }

            return result;
        }
    }

    public static float toFloat(String text) {
        return toFloat(text, 0.0f);
    }

    public static float toFloat(String text, float value) {
        if (TextUtils.isEmpty(text)) {
            return value;
        } else {
            float result = value;

            try {
                result = Float.parseFloat(text);
            } catch (Exception e) {
                e.printStackTrace();
            }

            return result;
        }
    }

    /**
     * 提供精确的小数位四舍五入处理。
     * @param v 需要四舍五入的数字
     * @param scale 小数点后保留几位
     * @return 四舍五入后的结果
     */
    public static float round(double v, int scale) {
        if (scale < 0) {
            throw new IllegalArgumentException(
                    "The scale must be a positive integer or zero");
        }
        BigDecimal b = new BigDecimal(Double.toString(v));
        BigDecimal ne = new BigDecimal("1");
        return b.divide(ne, scale, BigDecimal.ROUND_HALF_UP).floatValue();
    }
}
