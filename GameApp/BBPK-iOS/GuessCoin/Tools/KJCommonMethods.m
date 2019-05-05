//
//  KJCommonMethods.m
//  KJFrameworkProject
//
//  Created by 王振 DemoKing on 2016/11/15.
//  Copyright © 2016年 baozi. All rights reserved.
//

#import "KJCommonMethods.h"
#import <AdSupport/ASIdentifierManager.h>
#import <CommonCrypto/CommonDigest.h>
@implementation KJCommonMethods

#pragma mark -
#pragma mark - 关于状态栏

/**
 高亮显示
 */
+ (void)lightStatus {
    [[UIApplication sharedApplication] setStatusBarStyle:UIStatusBarStyleLightContent];
}
/**
 黑色状态
 */
+ (void)darkStatus {
    [[UIApplication sharedApplication] setStatusBarStyle:UIStatusBarStyleDefault];
}

#pragma mark -
#pragma mark - 关于时间

/**
 date 转 固定格式时间
 
 @param date date
 @param formatter 格式
 @return 字符串
 */
+ (NSString *)stringWithDate:(NSDate *)date
                   formatter:(NSString *)formatter {
    if (!formatter) {
        return nil;
    }
    if (!date) {
        return nil;
    }
    NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
    [dateFormatter setDateFormat:formatter];
    NSString *dateString = [dateFormatter stringFromDate:date];
    return dateString;
}

/**
 时间戳 转 固定格式时间
 
 @param timeString 时间戳字符串
 @param formatter 格式
 @return 字符串
 */
+ (NSString *)stringWith1970TimeString:(NSString *)timeString
                             formatter:(NSString *)formatter {
    NSTimeInterval timeInterval;
    if (timeString.length == 13) {
        // JAVA
        timeInterval = [timeString doubleValue] / 1000;
    } else if (timeString.length == 10) {
        // PHP
        timeInterval = [timeString doubleValue];
    } else {
        return nil;
    }
    if (!formatter) {
        return nil;
    }
    NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
    [dateFormatter setDateFormat:formatter];
    NSDate *date = [NSDate dateWithTimeIntervalSince1970:timeInterval];
    NSString *dateString = [dateFormatter stringFromDate:date];
    return dateString;
}

/**
 时间字符串格式转换
 
 @param timeString 需要转换的时间字符串
 @param fromFormatter 当前格式
 @param toFormatter 转换后的格式
 @return 新的时间字符串
 */
+ (NSString *)stringWithTimeString:(NSString *)timeString
                     fromFormatter:(NSString *)fromFormatter
                       toFormatter:(NSString *)toFormatter {
    if (!fromFormatter) {
        return nil;
    }
    if (!toFormatter) {
        return nil;
    }
    if (!timeString) {
        return nil;
    }
    NSDate *date = [KJCommonMethods dateWithTimeString:timeString formatter:fromFormatter];
    NSString *newSting = [KJCommonMethods stringWithDate:date formatter:toFormatter];
    return newSting;
}

/**
 固定格式时间 转 时间戳
 
 @param timeString 时间
 @param formatter 格式
 @return 时间戳
 */
+ (NSString *)timestampWithTimeString:(NSString *)timeString
                            formatter:(NSString *)formatter {
    if (!formatter) {
        return nil;
    }
    if (!timeString) {
        return nil;
    }
    NSDate *date = [KJCommonMethods dateWithTimeString:timeString formatter:formatter];
    NSString *timestamp = [NSString stringWithFormat:@"%ld",[@([date timeIntervalSince1970]) longValue]];
    return timestamp;
}

/**
 date 转 时间戳字符串
 
 @param date 时间
 @return 时间戳字符串
 */
+ (NSString *)timestampWithDate:(NSDate *)date {
    if (!date) {
        return nil;
    }
    NSString *timestamp = [NSString stringWithFormat:@"%lf",[date timeIntervalSince1970]];
    return timestamp;
}

/**
 固定格式时间 转 date
 
 @param timeString 时间字符串
 @param formatter 格式
 @return date
 */
+ (NSDate *)dateWithTimeString:(NSString *)timeString
                     formatter:(NSString *)formatter {
    if (!formatter) {
        return nil;
    }
    if (!timeString) {
        return nil;
    }
    NSDateFormatter *formatter2 = [[NSDateFormatter alloc] init];
    [formatter2 setDateFormat:formatter];
    NSDate *date = [formatter2 dateFromString:timeString];
    return date;
}

/**
 时间戳 转 date
 
 @param timeString 时间戳
 @return date
 */
+ (NSDate *)dateWith1970TimeString:(NSString *)timeString {
    if (!timeString) {
        return nil;
    }
    return [NSDate dateWithTimeIntervalSince1970:[timeString integerValue]];
}

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
                           end:(void(^)(void))end {
    if (allSecond == 0) {
        return;
    }
    __block NSInteger timeout = allSecond;
    dispatch_queue_t queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);
    dispatch_source_t _timer = dispatch_source_create(DISPATCH_SOURCE_TYPE_TIMER, 0, 0,queue);
    dispatch_source_set_timer(_timer,dispatch_walltime(NULL, 0),1.0 * NSEC_PER_SEC, 0);
    dispatch_source_set_event_handler(_timer, ^{
        if(timeout <= 0){
            dispatch_source_cancel(_timer);
            dispatch_async(dispatch_get_main_queue(), ^{
                if (end) {
                    end();
                }
            });
        } else {
            dispatch_async(dispatch_get_main_queue(), ^{
                if (perSecond) {
                    perSecond(timeout);
                }
                timeout --;
            });
        }
    });
    dispatch_resume(_timer);
}

#pragma mark -
#pragma mark - 关于快速写入和读取（本地的）值

/**
 NSUserDefaults 存储
 
 @param value 值
 @param key 键
 */
+ (void)saveValue:(id)value
              key:(NSString *)key {
    if (!value) {
        return;
    }
  
    
    [[NSUserDefaults standardUserDefaults] setValue:value forKey:key];
}

/**
 NSUserDefaults 获取
 
 @param key 键
 @return 对象
 */
+ (id)getValueForkey:(NSString *)key {
    if (!key) {
        return nil;
    }
    return [[NSUserDefaults standardUserDefaults] objectForKey:key];
}

/**
 NSUserDefaults 移除
 
 @param key 键
 */
+ (void)removeValueForkey:(NSString *)key {
    if (!key) {
        return;
    }
    [[NSUserDefaults standardUserDefaults] removeObjectForKey:key];
}

/**
 根据本地json文件读取
 
 @param jsonName 文件名
 @return id
 */
+ (id)jsonName:(NSString *)jsonName {
    if (!jsonName) {
        return nil;
    }
    NSString *filePath = [[NSBundle mainBundle] pathForResource:jsonName ofType:@"json"];
    NSData *data = [NSData dataWithContentsOfFile:filePath];
    NSError *error = nil;
    if (!data) {
        return nil;
    }
    return [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableContainers error:&error];
}

#pragma mark -
#pragma mark - 关于系统

/**
 判断是否开启推送
 
 @return YES||NO
 */
+ (BOOL)notificationAuthority {
    if ([[[UIDevice currentDevice] systemVersion] floatValue] >= 8.0) {
        UIUserNotificationSettings *setting = [[UIApplication sharedApplication] currentUserNotificationSettings];
        if (UIUserNotificationTypeNone != setting.types) {
            return YES;
        }
    }
    return NO;
}

/**
 获取当前语言
 
 @return 语言
 */
+ (NSString *)currentLanguage {
    NSArray *languages = [NSLocale preferredLanguages];
    return [languages objectAtIndex:0];
}

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
+ (int)abs:(int)ab {
    return abs(ab);
}

/**
 浮点型 取绝对值
 
 @param fab fab
 @return return
 */
+ (CGFloat)fabs:(CGFloat)fab {
    return fabs(fab);
}

/**
 向上取整
 
 @param c c
 @return NSInteger
 */
+ (NSInteger)ceilf:(CGFloat)c {
    return ceilf(c);
}

/**
 向下取整
 
 @param f f
 @return NSInteger
 */
+ (NSInteger)floor:(CGFloat)f {
    return floor(f);
}

/**
 获取随机数
 
 @param from 从
 @param to 到
 @return 随机数
 */
+ (NSInteger)randomNumberFromValue:(int)from
                           toValue:(int)to {
    return (NSInteger)(from + (arc4random() % (to - from + 1)));
}

/**
 float类型保留x位小数
 
 @param number number
 @param position position
 @return NSString
 */
+ (NSString *)positionNumber:(float)number
                    position:(int)position {
    NSDecimalNumberHandler* roundingBehavior = [NSDecimalNumberHandler decimalNumberHandlerWithRoundingMode:NSRoundDown scale:position raiseOnExactness:NO raiseOnOverflow:NO raiseOnUnderflow:NO raiseOnDivideByZero:NO];
    NSDecimalNumber *ouncesDecimal;
    NSDecimalNumber *roundedOunces;
    
    ouncesDecimal = [[NSDecimalNumber alloc] initWithFloat:number];
    roundedOunces = [ouncesDecimal decimalNumberByRoundingAccordingToBehavior:roundingBehavior];
    return [NSString stringWithFormat:@"%@",roundedOunces];
}

#pragma mark -
#pragma mark - 关于JSON解析

/**
 将对象（如dictionary）转化为json
 
 @param dataObject 对象
 @return 字符串
 */
+ (NSString *)toJSONString:(id)dataObject {
    if (!dataObject) {
        return nil;
    }
    if ([NSJSONSerialization isValidJSONObject:dataObject]) {
        NSError *error;
        NSData *jsonData = [NSJSONSerialization dataWithJSONObject:dataObject options:NSJSONWritingPrettyPrinted error:&error];
        if(error) {
            return nil;
        }
        NSString *json =[[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
        return json;
    }
    return nil;
}

/**
 将json字符串转化为dictionary
 
 @param JSONString JSON string
 @return 字典
 */
+ (NSDictionary *)toDictionary:(NSString *)JSONString {
    if (JSONString == nil) {
        return nil;
    }
    NSData *jsonData = [JSONString dataUsingEncoding:NSUTF8StringEncoding];
    NSError *err;
    NSDictionary *dic =  [NSJSONSerialization JSONObjectWithData:jsonData options:NSJSONReadingAllowFragments error:&err];
    if (err) {
        return nil;
    }
    return dic;
}

/**
 将json字符串转化为array
 
 @param JSONString json
 @return array
 */
+ (NSArray *)toArray:(NSString *)JSONString {
    if (JSONString == nil) {
        return nil;
    }
    NSData *jsonData = [JSONString dataUsingEncoding:NSUTF8StringEncoding];
    NSError *err;
    NSArray *array =  [NSJSONSerialization JSONObjectWithData:jsonData options:NSJSONReadingAllowFragments error:&err];
    if (err) {
        return nil;
    }
    return array;
}

#pragma mark -
#pragma mark - UUID

/**
 获取UUID

 @return UUID
 */
+ (NSString *)generateUUID {
    CFUUIDRef theUUID =CFUUIDCreate(NULL);
    CFStringRef guid = CFUUIDCreateString(NULL, theUUID);
    CFRelease(theUUID);
    NSString *uuidString = [((__bridge NSString *)guid)stringByReplacingOccurrencesOfString:@"-"withString:@""];
    CFRelease(guid);
    return uuidString;
}

/**
 获取IDFA

 @return IDFA
 */
+ (NSString *)getIDFA{
    ASIdentifierManager *asIM = [[ASIdentifierManager alloc] init];
    NSString *idfa = [asIM.advertisingIdentifier UUIDString];
    return idfa;
}
#pragma mark -
#pragma mark - 跳转系统设置中本App的设置页面
/**
 跳转系统设置
 */
+ (void)openSystemSet{
    NSURL * url = [NSURL URLWithString:UIApplicationOpenSettingsURLString];
    if([[UIApplication sharedApplication] canOpenURL:url]) {
        NSURL *url =[NSURL URLWithString:UIApplicationOpenSettingsURLString];
        [[UIApplication sharedApplication] openURL:url];
    }
}


#pragma mark  图片压缩
//图片压缩至指定大小
+ (UIImage *)compressImage:(UIImage *)image toByte:(NSUInteger)maxLength {
    // Compress by quality
    CGFloat compression = 1;
    NSData *data = UIImageJPEGRepresentation(image, compression);
    if (data.length < maxLength) return image;
    
    CGFloat max = 1;
    CGFloat min = 0;
    for (int i = 0; i < 6; ++i) {
        compression = (max + min) / 2;
        data = UIImageJPEGRepresentation(image, compression);
        if (data.length < maxLength * 0.9) {
            min = compression;
        } else if (data.length > maxLength) {
            max = compression;
        } else {
            break;
        }
    }
    UIImage *resultImage = [UIImage imageWithData:data];
    if (data.length < maxLength) return resultImage;
    
    // Compress by size
    NSUInteger lastDataLength = 0;
    while (data.length > maxLength && data.length != lastDataLength) {
        lastDataLength = data.length;
        CGFloat ratio = (CGFloat)maxLength / data.length;
        CGSize size = CGSizeMake((NSUInteger)(resultImage.size.width * sqrtf(ratio)),
                                 (NSUInteger)(resultImage.size.height * sqrtf(ratio))); // Use NSUInteger to prevent white blank
        UIGraphicsBeginImageContext(size);
        [resultImage drawInRect:CGRectMake(0, 0, size.width, size.height)];
        resultImage = UIGraphicsGetImageFromCurrentImageContext();
        UIGraphicsEndImageContext();
        data = UIImageJPEGRepresentation(resultImage, compression);
    }
    
    return resultImage;
}

#pragma mark
#pragma mark 去掉html标签
/**
 去掉html标签
 
 @param string 带html标签的文本
 @return 取消html标签的文本
 */
+ (NSString *)deleteHtmlString:(NSString *)string{
    NSRegularExpression *regularExpretion=[NSRegularExpression regularExpressionWithPattern:@"<[^>]*>|\n"
                                                                                    options:0
                                                                                      error:nil];
    string=[regularExpretion stringByReplacingMatchesInString:string options:NSMatchingReportProgress range:NSMakeRange(0, string.length) withTemplate:@""];
    return string;
}


#pragma mark
#pragma mark 快速添加手势

/**
 添加单击手势

 @param view 作用view
 @param target 所在响应类
 @param action 响应方法
 */
+(void)addTapGestureWith:(UIView *)view WithTarget:(nullable id)target action:(nullable SEL)action{
    view.userInteractionEnabled = YES;
    UITapGestureRecognizer * tap = [[UITapGestureRecognizer alloc] initWithTarget:target action:action];
    [view addGestureRecognizer:tap];
}

#pragma mark
#pragma mark 复制至粘贴板
/**
 复制至粘贴板
 
 @param sting 复制内容
 */
+(void)copyWith:(NSString *)sting{
    if (sting.length > 0) {
        UIPasteboard *pboard = [UIPasteboard generalPasteboard];
        pboard.string = sting;
    }
}

#pragma mark
#pragma mark MD5加密

/**
 32位MD5小写加密
 
 @param string 加密前的字符串
 @return 加密后的字符串
 */
+(NSString *)MD5ForLower32Bate:(NSString *)string{
    //要进行UTF8的转码
    const char* input = [string UTF8String];
    unsigned char result[CC_MD5_DIGEST_LENGTH];
    CC_MD5(input, (CC_LONG)strlen(input), result);
    
    NSMutableString *digest = [NSMutableString stringWithCapacity:CC_MD5_DIGEST_LENGTH * 2];
    for (NSInteger i = 0; i < CC_MD5_DIGEST_LENGTH; i++) {
        [digest appendFormat:@"%02x", result[i]];
    }
    
    return digest;
}

/**
 32位MD5大写加密
 
 @param string 加密前的字符串
 @return 加密后的字符串
 */
+(NSString *)MD5ForUpper32Bate:(NSString *)string{
    //要进行UTF8的转码
    const char* input = [string UTF8String];
    unsigned char result[CC_MD5_DIGEST_LENGTH];
    CC_MD5(input, (CC_LONG)strlen(input), result);
    
    NSMutableString *digest = [NSMutableString stringWithCapacity:CC_MD5_DIGEST_LENGTH * 2];
    for (NSInteger i = 0; i < CC_MD5_DIGEST_LENGTH; i++) {
        [digest appendFormat:@"%02X", result[i]];
    }
    
    return digest;
}

/**
 16位MD5大写加密
 
 @param string 加密前的字符串
 @return 加密后的字符串
 */
+(NSString *)MD5ForUpper16Bate:(NSString *)string{
    NSString *md5Str = [self MD5ForUpper32Bate:string];
    
    NSString  *str;
    for (int i=0; i<24; i++) {
        str=[md5Str substringWithRange:NSMakeRange(8, 16)];
    }
    return str;
}

/**
 16位MD5小写加密
 
 @param string 加密前的字符串
 @return 加密后的字符串
 */
+(NSString *)MD5ForLower16Bate:(NSString *)string{
    NSString *md5Str = [self MD5ForLower32Bate:string];
    
    NSString  *str;
    for (int i=0; i<24; i++) {
        str=[md5Str substringWithRange:NSMakeRange(8, 16)];
    }
    return str;
}

#pragma mark
#pragma mark GCD分线程处理
/**
 延时几秒执行方法
 
 @param second 秒数
 @param fuction 要执行的方法
 */
+(void)GCDDelySecondAction:(NSInteger )second fuction:(void (^)(void))fuction{
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(second * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        !fuction ? : fuction();
    });
}

/**
 开辟分线程执行方法
 
 @param fuction 要执行的方法
 */
+(void)GCDOpenNewThreadAction:(void (^)(void))fuction{
    dispatch_async(dispatch_get_global_queue(0, 0), ^{
        // 处理耗时操作的代码块...
        !fuction ? :fuction();
    });
}

/**
 回到主线程执行方法（刷新UI）
 
 @param fuction 要执行的方法
 */
+(void)GCDBackMainThreadAction:(void (^)(void))fuction{
    //通知主线程刷新
    dispatch_async(dispatch_get_main_queue(), ^{
        //回调或者说是通知主线程刷新，
        !fuction ? :fuction();
    });
}


/**
 gcd

 @param defaultthread 耗时线程
 @param uithread 主线程
 */
+ (void)gcdDispatchDefault:(void (^)(void))defaultthread uithread:(void (^)(void))uithread{
    
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        // 耗时操作线程
        defaultthread();
        // UI线程必须在主线程更新
        dispatch_async(dispatch_get_main_queue(), ^{
            NSLog(@"更新UI线程------%@",[NSThread currentThread]);
            uithread();
        });
    });
}

@end
