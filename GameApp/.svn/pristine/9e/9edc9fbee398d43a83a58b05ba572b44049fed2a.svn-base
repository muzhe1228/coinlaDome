package com.example.administrator.myapplication;

import android.app.Activity;
import android.app.Application;
import android.content.Context;
import android.os.Environment;
import android.os.Handler;
import android.text.TextUtils;
import android.util.Log;

import com.example.administrator.myapplication.util.AppUtils;
import com.example.administrator.myapplication.util.Constant;
import com.example.administrator.myapplication.util.MySharePerference;
import com.example.administrator.myapplication.util.Util;
import com.lahm.library.EasyProtectorLib;

import java.security.NoSuchAlgorithmException;
import java.util.Locale;

/**
 * email:773630555@qq.com
 * date: on 2018/7/11 17:32
 * @author MrWang
 */
public class MyApplication extends Application {
    public static Activity nowActivity;
    public static Context context;
    //本地测试
//    public static String baseurl = "http://192.168.10.200:7001";
    public static String baseurl = "https://api.pk123.app";
    public static String downLoadUrl = "";
    public static String mRealToken = "";

    public static String wwwResourse;
    public static String zipFileName = "bbpk-last";

    @Override
    protected void attachBaseContext(Context base) {
        super.attachBaseContext(base);
    }

    @Override
    public void onCreate() {
        super.onCreate();
        context = getApplicationContext();
        MySharePerference.addSharePerference(context, Constant.DEFAULT_VERSION, AppUtils.getVersionName(context));
        wwwResourse = getExternalFilesDir(Environment.DIRECTORY_DOCUMENTS).getAbsolutePath();
        if (EasyProtectorLib.checkIsBeingTracedByJava()
                || EasyProtectorLib.checkIsRunningInEmulator()
                || EasyProtectorLib.checkIsUsingMultiVirtualApp()){
//            EasyProtectorLib.checkIsXposedExist();
//            EasyProtectorLib.checkIsDebug(context) ||
                    clearActivity2exit();
        }
    }

    /**
     * 遍历clearActivity
     */
    public static void clearActivity2exit() {
        Handler handler = new Handler();
        Runnable runnable = new Runnable() {
            @Override
            public void run() {
                int pid = android.os.Process.myPid();    //获取当前应用程序的PID
                android.os.Process.killProcess(pid);
            }
        };
        handler.postDelayed(runnable, 1000);
    }

    public static void setRealToken(String realToken) {
        mRealToken = realToken;
        MySharePerference.addSharePerference(context, "REAL_TOKEN", mRealToken);
    }

    public static String getRealToken(String serveTime) {
        String str = String.format(Locale.getDefault(), "%s%s", Constant.BBPK, serveTime);
        String mToken = "";
        try {
            mToken = String.format(Locale.getDefault(), "%s", Util.getMD5(str));
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        MyApplication.setRealToken(mToken);
        if (TextUtils.isEmpty(mRealToken)) {
            mRealToken = MySharePerference.getShardPerferience(context, "REAL_TOKEN", "");
        }
        return mRealToken;
    }


}

