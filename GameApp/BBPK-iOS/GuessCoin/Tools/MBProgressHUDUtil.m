//
//  MBProgressHUDUtil.m
//  GfitSpin
//
//  Created by 王振 DemoKing on 16/8/26.
//  Copyright © 2016年 DemoKing. All rights reserved.
//

#import "MBProgressHUDUtil.h"
#import "MBProgressHUD/MBProgressHUD.h"

static MBProgressHUD *_myHUD;
static NSTimer *_timer;
@implementation MBProgressHUDUtil
/**
 *  文字提示 显示时间为2秒
 */
+ (void)hudWithText:(NSString *)text {
    [MBProgressHUDUtil hidden];
    UIWindow *window = [UIApplication sharedApplication].delegate.window;
    _myHUD = [MBProgressHUD showHUDAddedTo:window animated:YES];
    _myHUD.userInteractionEnabled = NO;
    _myHUD.mode = MBProgressHUDModeText;
    _myHUD.detailsLabelText = text;
    _myHUD.margin = 10.f;
    _myHUD.yOffset = 50;
    _myHUD.removeFromSuperViewOnHide = YES;
    _myHUD.color = [UIColor blackColor];
    _myHUD.tintColor = [UIColor whiteColor];
    _myHUD.detailsLabelColor = [UIColor whiteColor];
    _myHUD.activityIndicatorColor = [UIColor whiteColor];
    _myHUD.cornerRadius = 17.0f;
    _myHUD.alpha = 0.6;
    [_myHUD hide:YES afterDelay:2];
}
+ (void)progressWithText:(NSString *)text block:(void(^)(void))block {
    [MBProgressHUDUtil hidden];
    UIWindow *window = [UIApplication sharedApplication].delegate.window;
    _myHUD = [[MBProgressHUD alloc] initWithView:window];
    [window addSubview:_myHUD];
    _myHUD.mode = MBProgressHUDModeAnnularDeterminate;
    _myHUD.labelText = text;
    _myHUD.mode = MBProgressHUDModeAnnularDeterminate;
    [_myHUD showAnimated:YES whileExecutingBlock:^{
        if (block) {
            block();
        }
    }];
}
/**
 *  请求提示
 *
 *  @param block 回调 设置进度
 */
+ (void)progressBlock:(void(^)(void))block {
    [MBProgressHUDUtil hidden];
    UIWindow *window = [UIApplication sharedApplication].delegate.window;
    _myHUD = [[MBProgressHUD alloc] initWithView:window];
    [window addSubview:_myHUD];
    _myHUD.mode = MBProgressHUDModeAnnularDeterminate;
    [_myHUD showAnimated:YES whileExecutingBlock:^{
        if (block) {
            block();
        }
    }];
}
/**
 *  请求提示
 */
+ (void)showProgress {
    [MBProgressHUDUtil hidden];
    UIWindow *window = [UIApplication sharedApplication].delegate.window;
    _myHUD = [[MBProgressHUD alloc] initWithView:window];
    [window addSubview:_myHUD];
    _myHUD.mode = MBProgressHUDModeIndeterminate;
    [_myHUD show:YES];
    [_timer invalidate];
    _timer = nil;
    _timer = [NSTimer scheduledTimerWithTimeInterval:10 target:self selector:@selector(hidden) userInfo:nil repeats:NO];
}
/**
 *  移除
 */
+ (void)hidden {
    [_timer invalidate];
    _timer = nil;
    [_myHUD hide:YES];
    [_myHUD removeFromSuperview];
    _myHUD = nil;
}
@end
