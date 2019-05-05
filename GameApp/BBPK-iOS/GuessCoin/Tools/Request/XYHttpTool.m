//
//  XYHttpTool.m
//  CoinLa
//
//  Created by admin  on 2017/12/19.
//  Copyright © 2017年 admin . All rights reserved.
//

#import "XYHttpTool.h"
#import "AFNetworking.h"
#define TIME_OUT 8
@implementation XYHttpTool
+(void)post:(NSString *)url params:(NSDictionary *)params success:(void (^)(id responseObject))success failure:(void (^)(id responseObject,NSInteger code))failure{
    
    AFHTTPSessionManager *manger = [AFHTTPSessionManager manager];
    manger.responseSerializer = [AFHTTPResponseSerializer serializer]; // 响应
    manger.requestSerializer = [AFHTTPRequestSerializer serializer]; // 请求
    manger.responseSerializer.acceptableContentTypes = [NSSet setWithObjects:@"text/html",@"text/plain",@"text/json",@"application/json", @"text/javascript", nil];
    manger.requestSerializer.timeoutInterval = TIME_OUT;
    NSString *URL = [url stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    NSMutableDictionary * dic = [NSMutableDictionary dictionaryWithDictionary:params];
    [manger POST:URL parameters:dic progress:^(NSProgress * _Nonnull uploadProgress) {
    } success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseObject) {
        NSError *error = nil;
        NSDictionary *dict = [NSJSONSerialization JSONObjectWithData:responseObject options:NSJSONReadingMutableLeaves error:&error];
        NSNumber * code = dict[@"code"];
        if ([code integerValue] == 0) {
            if (success) {
                success(dict);
            }
        } else {
            if (failure) {
                failure(nil,code);
            }
        }
    } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {
        NSLog(@"%@",error);
        if (failure) {
            failure(nil,-1);
        }
    }];
}
@end
