//
//  XYHttpTool.h
//  CoinLa
//
//  Created by admin  on 2017/12/19.
//  Copyright © 2017年 admin . All rights reserved.
//

#import <Foundation/Foundation.h>
@interface XYHttpTool : NSObject

/**
 发送网络请求

 @param url 请求地址
 @param params 请求参数
 @param success 成功回调
 @param failure 失败回调
 */
+(void)post:(NSString *)url params:(NSDictionary *)params success:(void (^)(id responseObject))success failure:(void (^)(id responseObject,NSInteger code))failure;
@end
