package com.example.administrator.myapplication.util;

import android.app.Activity;
import android.content.ContentResolver;
import android.database.ContentObserver;
import android.os.Handler;
import android.provider.Settings;

import static android.content.pm.ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE;
import static android.content.pm.ActivityInfo.SCREEN_ORIENTATION_SENSOR_LANDSCAPE;

//观察屏幕旋转设置变化，类似于注册动态广播监听变化机制
public class RotationObserver extends ContentObserver {
    private ContentResolver mResolver;
    private Activity activity;

    public RotationObserver(Handler handler, Activity context) {
        super(handler);
        activity = context;
        mResolver = context.getContentResolver();
    }

    //屏幕旋转设置改变时调用
    @Override
    public void onChange(boolean selfChange) {
        // TODO Auto-generated method stub
        super.onChange(selfChange);
        //更新按钮状态
        setScreenOrientation();
    }

    public void setScreenOrientation() {
        try {
            int screenchange = Settings.System.getInt(activity.getContentResolver(), Settings.System.ACCELEROMETER_ROTATION);
            //是否开启自动旋转设置 1 开启 0 关闭
            if (screenchange == 1){
                activity.setRequestedOrientation(SCREEN_ORIENTATION_SENSOR_LANDSCAPE);
            }else {
                activity.setRequestedOrientation(SCREEN_ORIENTATION_LANDSCAPE);
            }
        } catch (Settings.SettingNotFoundException e) {
            e.printStackTrace();
        }
    }


    public void startObserver() {
        mResolver.registerContentObserver(Settings.System
                        .getUriFor(Settings.System.ACCELEROMETER_ROTATION), false,
                this);
    }

    public void stopObserver() {
        mResolver.unregisterContentObserver(this);
    }
}