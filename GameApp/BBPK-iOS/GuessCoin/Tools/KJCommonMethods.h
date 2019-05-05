//
//  KJCommonMethods.h
//  KJFrameworkProject
//
//  Created by 王振 DemoKing on 2016/11/15.
//  Copyright © 2016年 baozi. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface KJCommonMethods : NSObject

#pragma mark -
#pragma mark - 关于状态栏

/**
 高亮显示
 */
+ (void)lightStatus;

/**
 黑色状态
 */
+ (void)darkStatus;

#pragma mark -
#pragma mark - 关于时间

/**
 date 转 固定格式时间
 
 @param date date
 @param formatter 格式
 @return 字符串
 */
+ (NSString *)stringWithDate:(NSDate *)date
                   formatter:(NSString *)formatter;

/**
 时间戳 转 固定格式时间
 
 @param timeString 时间戳字符串
 @param formatter 格式
 @return 字符串
 */
+ (NSString *)stringWith1970TimeString:(NSString *)timeString
                             formatter:(NSString *)formatter;

/**
 时间字符串格式转换

 @param timeString 需要转换的时间字符串
 @param fromFormatter 当前格式
 @param toFormatter 转换后的格式
 @return 新的时间字符串
 */
+ (NSString *)stringWithTimeString:(NSString *)timeString
                     fromFormatter:(NSString *)fromFormatter
                       toFormatter:(NSString *)toFormatter;

/**
 固定格式时间 转 时间戳

 @param timeString 时间
 @param formatter 格式
 @return 时间戳
 */
+ (NSString *)timestampWithTimeString:(NSString *)timeString
                            formatter:(NSString *)formatter;

/**
 date 转 时间戳字符串

 @param date 时间
 @return 时间戳字符串
 */
+ (NSString *)timestampWithDate:(NSDate *)date;

/**
 固定格式时间 转 date

 @param timeString 时间字符串
 @param formatter 格式
 @return date
 */
+ (NSDate *)dateWithTimeString:(NSString *)timeString
                     formatter:(NSString *)formatter;

/**
 时间戳 转 date

 @param timeString 时间戳
 @return date
 */
+ (NSDate *)dateWith1970TimeString:(NSString *)timeString;

#pragma mark -
#pragma mark - 关于倒计时

/**
 倒计时

 @param allSecond 总秒数
 @param perSecond 每秒回调
 @param end 结束回调
 */
+ (void)countDownWithAllSecond:(NSInteger)allSecond
                     perSecond:(void(^)(NSInteger second))perSecond
                           end:(void(^)(void))end;

#pragma mark -
#pragma mark - 关于快速写入和读取（本地的）值

/**
 NSUserDefaults 存储

 @param value 值
 @param key 键
 */
+ (void)saveValue:(id)value
              key:(NSString *)key;

/**
 NSUserDefaults 获取

 @param key 键
 @return 对象
 */
+ (id)getValueForkey:(NSString *)key;

/**
 NSUserDefaults 移除

 @param key 键
 */
+ (void)removeValueForkey:(NSString *)key;

/**
 根据本地json文件读取

 @param jsonName 文件名
 @return id
 */
+ (id)jsonName:(NSString *)jsonName;

#pragma mark -
#pragma mark - 关于系统

/**
 判断是否开启推送

 @return YES||NO
 */
+ (BOOL)notificationAuthority;

/**
 获取当前语言

 @return 语言
 */
+ (NSString *)currentLanguage;

#pragma mark -
#pragma mark - 关于数字格式转换

/**
 *  取绝对值 整形
 *
 *  @param fab
 *
 *  @return
 */

/**
 取绝对值

 @param ab ab
 @return ab
 */
+ (int)abs:(int)ab;

/**
 浮点型 取绝对值

 @param fab fab
 @return return
 */
+ (CGFloat)fabs:(CGFloat)fab;

/**
 向上取整

 @param c c
 @return NSInteger
 */
+ (NSInteger)ceilf:(CGFloat)c;

/**
 向下取整

 @param f f
 @return NSInteger
 */
+ (NSInteger)floor:(CGFloat)f;

/**
 获取随机数

 @param from 从
 @param to 到
 @return 随机数
 */
+ (NSInteger)randomNumberFromValue:(int)from
                           toValue:(int)to;

/**
 float类型保留x位小数

 @param number number
 @param position position
 @return NSString
 */
+ (NSString *)positionNumber:(float)number
                    position:(int)position;

#pragma mark -
#pragma mark - 关于JSON解析

/**
 将对象（如dictionary）转化为json

 @param dataObject 对象
 @return 字符串
 */
+ (NSString *)toJSONString:(id)dataObject;

/**
 将json字符串转化为dictionary

 @param JSONString JSON string
 @return 字典
 */
+ (NSDictionary *)toDictionary:(NSString *)JSONString;

/**
 将json字符串转化为array

 @param JSONString json
 @return array
 */
+ (NSArray *)toArray:(NSString *)JSONString;

#pragma mark -
#pragma mark - UUID

/**
 获取UUID
 
 @return UUID
 */
+ (NSString *)generateUUID;

/**
 获取IDFA
 
 @return IDFA
 */
+ (NSString *)getIDFA;
/**
 跳转系统设置
 */
+ (void)openSystemSet;

#pragma mark 手机号密文显示
/**
 手机号密文显示
 
 @param phoneNum 手机号
 @return 手机号密文
 */
+ (NSString *)phoneNumberSafeString:(NSString *)phoneNum;

#pragma mark  压缩图片

/**
 压缩图片至指定大小

 @param image 图片
 @param maxLength 压缩至指定长度
 @return 压缩后的图片
 */
+ (UIImage *)compressImage:(UIImage *)image toByte:(NSUInteger)maxLength;

#pragma mark
#pragma mark 去掉html标签

/**
 去掉html标签

 @param string 带html标签的文本
 @return 取消html标签的文本
 */
+ (NSString *)deleteHtmlString:(NSString *)string;

#pragma mark
#pragma mark 根据涨跌幅来区分颜色
/**
 根据涨跌以及用户习惯来计算显示红色还是绿色
 
 @param riseFall 涨跌幅 0:涨   1：跌   2:持平
 @return 颜色
 */
+ (UIColor *)getColorWithRiseFall:(NSString *)riseFall;

/**
 根据涨跌幅字符串来判断返回对应颜色
 
 @param riseFallSting 涨跌幅字符串
 @return 对应颜色
 */
+(UIColor *)judgeColorWithRiseFallString:(NSString *)riseFallSting;

#pragma mark
#pragma mark 将数字（字符串）转为千分位格式化字符串

/**
 将数字（字符串）转为千分位格式化字符串
 
 @param string 原数字（字符串）
 @return 千分位格式化字符串
 */
+(NSString * )numberFormatterStringWith:(NSString *)string;

#pragma mark
#pragma mark 一些考拉行情所用到的常用方法
/**
 根据考拉规则转化小数
 
 @param string 原数字
 @return 转化后的数字
 */
+(NSString * )decimalValueWith:(NSString *)string;

/**
 价格和涨跌幅是否为空或者0
 
 @param price 价格
 @param riseFall 涨跌幅
 @return 是否为空
 */
+(BOOL)priceORriseFallEmptyWithPrice:(NSString *)price withRiseFall:(NSString *)riseFall;

/**
 移除可能存在的币种符号
 
 @param string 可能存在币种符号的字符串
 @return 移除后的结果
 */
+(NSString *)removeCoinType:(NSString *)string;

/**
 移除千分位逗号
 
 @param string 可能存在千分位逗号的字符串
 @return 移除后的结果
 */
+(NSString *)removeFormatterString:(NSString *)string;

/**
 添加币种符号
 
 @param string 添加前的字符串
 @return 添加后的字符串
 */
+(NSString *)addCoinType:(NSString *)string;

#pragma mark
#pragma mark 快速添加手势

/**
 添加单击手势
 
 @param view 作用view
 @param target 所在响应类
 @param action 响应方法
 */
+(void)addTapGestureWith:(UIView *)view WithTarget:(nullable id)target action:(nullable SEL)action;

#pragma mark
#pragma mark 复制至粘贴板
/**
 复制至粘贴板
 
 @param sting 复制内容
 */
+(void)copyWith:(NSString *)sting;

#pragma mark
#pragma mark MD5加密

/**
 32位MD5小写加密

 @param string 加密前的字符串
 @return 加密后的字符串
 */
+(NSString *)MD5ForLower32Bate:(NSString *)string;

/**
 32位MD5大写加密
 
 @param string 加密前的字符串
 @return 加密后的字符串
 */
+(NSString *)MD5ForUpper32Bate:(NSString *)string;

/**
 16位MD5大写加密
 
 @param string 加密前的字符串
 @return 加密后的字符串
 */
+(NSString *)MD5ForUpper16Bate:(NSString *)string;

/**
 16位MD5小写加密
 
 @param string 加密前的字符串
 @return 加密后的字符串
 */
+(NSString *)MD5ForLower16Bate:(NSString *)string;

#pragma mark
#pragma mark GCD分线程处理
/**
 延时几秒执行方法

 @param second 秒数
 @param fuction 要执行的方法
 */
+(void)GCDDelySecondAction:(NSInteger )second fuction:(void (^)(void))fuction;

/**
 开辟分线程执行方法
 
 @param fuction 要执行的方法
 */
+(void)GCDOpenNewThreadAction:(void (^)(void))fuction;

/**
 回到主线程执行方法（刷新UI）
 
 @param fuction 要执行的方法
 */
+(void)GCDBackMainThreadAction:(void (^)(void))fuction;

/**
 GCD

 @param defaultthread 耗时线程
 @param uithread 主线程
 */
+ (void)gcdDispatchDefault:(void (^)(void))defaultthread uithread:(void (^)(void))uithread;

#pragma mark
#pragma mark 处理数字逻辑
/**
 处理数字逻辑（加千分位逗号以及单位）
 
 @param value 原始数值
 @return 结果
 */
+ (NSString *)numerAddUnitAndCommaWith:(double)value;

/**
 处理带币种符号的数字逻辑（加千分位逗号，币种符号以及单位）
 
 @param value 原始价格
 @return 输出价格字符串
 */
+ (NSString *)coinTypeNumerAddUnitAndCommaWith:(double)value;

/**
 价格处理数字逻辑（加千分位逗号，币种符号）(不加单位)
 
 @param value 原始价格
 @return 输出价格字符串
 */
+ (NSString *)priceAddUnitAndCommaWith:(double)value;

/**
 移除可能存在的币种符号,单位以及千分位逗号
 @return 移除后的结果
 */
+(NSString *)removeAllToDouble:(NSString *)string;

#pragma mark
#pragma mark 汇率计算
/**
 返回汇率计算后的价格
 @return 计算后的结果
 */
+(double)exchangeRataBy:(double)price;
@end
