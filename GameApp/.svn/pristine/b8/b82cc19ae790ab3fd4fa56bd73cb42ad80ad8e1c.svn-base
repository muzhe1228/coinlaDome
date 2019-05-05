//
//  MBProgressHUDUtil.h
//  GfitSpin
//
//  Created by 王振 DemoKing on 16/8/26.
//  Copyright © 2016年 DemoKing. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface MBProgressHUDUtil : NSObject

/**
 *  文字提示 显示时间为2妙
 */
+ (void)hudWithText:(NSString *)text;
/**
 *  请求提示
 *
 *  @param text 提示文字
 *
 *  @param block 回调
 */
+ (void)progressWithText:(NSString *)text block:(void(^)(void))block;
/**
 *  请求提示
 *
 *  @param block 回调 设置进度
 */
+ (void)progressBlock:(void(^)(void))block;
/**
 *  请求提示
 */
+ (void)showProgress;
/**
 *  移除
 */
+ (void)hidden;
@end
