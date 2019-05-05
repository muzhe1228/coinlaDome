package com.example.administrator.myapplication.util;

import android.content.Context;
import android.content.SharedPreferences;
import android.content.SharedPreferences.Editor;

import com.example.administrator.myapplication.MyApplication;

import static android.content.Context.MODE_PRIVATE;

/**
 * ShardPerferience工具类
 * author：wangqi on 2018/1/5 10:10
 * email：773630555@qq.com
 *
 * TOKEN token
 *
 * ACCOUNT 登录手机号
 *
 * USERID 用户id
 *
 * URL 头像url
 *
 * COLORTYPE   0 绿涨红跌   1 红涨绿跌 -1未登录
 *
 * COUNTTYPE   0 24小时制 1 当日制
 *
 * MONEYTYPE   0 人民币  1 美元
 *
 * NAVGUIDANCE 1不是首次 0首次
 *
 * UMTOKEN 友盟token
 *
 * SORTGUIDANCE 排行引导页
 *
 * POINT(改为用户手机号) 红点 1 有  0 无
 *
 * 手机号+HINT ：账本隐藏/开启
 *
 * 时间 TIME
 *
 * 分享气泡  QIPAO1 QIPAO2
 *
 * 第一次启动app 在parentactivity 里面判断记载更新弹窗 ISFIRSTAPPLICATION
 *
 * 第一次进入币种详情 ISFIRSTTOBI  在biparticulartop 里面判断气泡
 *
 * 第一次进入头条 ISFIRSTTOP 在头条里判断气泡
 *
 * 是否操作过自选 CAOZUOZX 0否 1是
 *
 * 第一次提示绑定微信 BANDWXFIRST
 */
public class MySharePerference {
	
	public static void addSharePerference(Context context, String name, String value){
		try {
			SharedPreferences sp= context.getApplicationContext().getSharedPreferences("WX",MODE_PRIVATE);
			Editor editor = sp.edit();
			editor.putString(name,value);
			editor.apply();
		}catch (Exception e){
			e.printStackTrace();
		}
	}

	public static String getShardPerferience(Context context, String name, String defaultValue){
		SharedPreferences sp;
		try {
			sp= context.getApplicationContext().getSharedPreferences("WX",MODE_PRIVATE);
		}catch (Exception e){
			return "";
		}
		return sp.getString(name, defaultValue);
	}

	public static void addShareLongPerference(String name, long value){
		try {
			SharedPreferences sp= MyApplication.context.getSharedPreferences("WX",MODE_PRIVATE);
			Editor editor = sp.edit();
			editor.putLong(name,value);
			editor.apply();
		}catch (Exception e){
			e.printStackTrace();
		}
	}

	public static long getShardPerferienceLong(String name, long defaultValue){
		SharedPreferences sp;
		try {
			sp= MyApplication.context.getSharedPreferences("WX",MODE_PRIVATE);
		}catch (Exception e){
			return -1L;
		}
		return sp.getLong(name, defaultValue);
	}
}
