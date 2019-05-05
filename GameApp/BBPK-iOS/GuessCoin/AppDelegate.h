//
//  AppDelegate.h
//  GuessCoin
//
//  Created by mac on 2019/1/15.
//  Copyright © 2019 ERSX. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate>

@property (strong, nonatomic) UIWindow *window;

/**
 是否切换横屏
 */
@property (nonatomic, assign) BOOL changeLandscape;

@end

