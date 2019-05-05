//
//  ViewController.m
//  GuessCoin
//
//  Created by mac on 2019/1/15.
//  Copyright © 2019 ERSX. All rights reserved.
//

#import "ViewController.h"
#import <WebKit/WebKit.h>
#import "DownLoad/DownloadView.h"
#import "Tools/KJCommonMethods.h"
#import "Tools/WHCFileManager.h"
#import "Tools/SSZipArchive/ZipArchive.h"
#import "XYHttpTool.h"
#import "MBProgressHUDUtil.h"
#import "AppDelegate.h"
/**
 获取屏幕宽度
 */
#define SCREEN_WIDTH [UIScreen mainScreen].bounds.size.width
/**
 获取屏幕高度
 */
#define SCREEN_HEIGHT [UIScreen mainScreen].bounds.size.height

//判断iphone4/4S
#define kiPhone4 ([UIScreen instancesRespondToSelector:@selector(currentMode)] ? CGSizeEqualToSize(CGSizeMake(640, 960), [[UIScreen mainScreen] currentMode].size) : NO)
//判断iphone5/5S
#define kiPhone5 ([UIScreen instancesRespondToSelector:@selector(currentMode)] ? CGSizeEqualToSize(CGSizeMake(640, 1136), [[UIScreen mainScreen] currentMode].size) : NO)
//判断iphone6
#define kiPhone6 ([UIScreen instancesRespondToSelector:@selector(currentMode)] ? CGSizeEqualToSize(CGSizeMake(750, 1334), [[UIScreen mainScreen] currentMode].size) : NO)
//判断iphone6+
#define kiPhone6Plus ([UIScreen instancesRespondToSelector:@selector(currentMode)] ? CGSizeEqualToSize(CGSizeMake(1242, 2208), [[UIScreen mainScreen] currentMode].size) : NO)
//判断iphoneX
#define kiPhoneX ([UIScreen instancesRespondToSelector:@selector(currentMode)] ? CGSizeEqualToSize(CGSizeMake(1125, 2436), [[UIScreen mainScreen] currentMode].size) : NO)



@interface ViewController ()<WKNavigationDelegate,WKUIDelegate,WKScriptMessageHandler>
@property(nonatomic, strong)WKWebView * webView;
@property(nonatomic, strong)UIImageView * startLogoImageView;
@property(nonatomic, strong)DownloadView * downloadView;
@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    //阻止锁屏
    [UIApplication sharedApplication].idleTimerDisabled = TRUE;
    [self addNoti];
    [self saveVersion];
    [self actionUpdate];
    [self checkUpdateAndGetNewZipFromServer];
    [self setNeedsStatusBarAppearanceUpdate];
    [self changeLandSpace:@"0"];
}
#pragma mark
#pragma mark  热更新部分
/**
 存入版本号
 */
-(void)saveVersion{
    //存入初始版本号
    NSString * version = [KJCommonMethods getValueForkey:@"version"];
    if (!version) {
        NSString *app_Version = [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleShortVersionString"];
        [KJCommonMethods saveValue:app_Version key:@"version"];
    }
    if ([KJCommonMethods getValueForkey:@"update_version"]) {
        [KJCommonMethods saveValue:[KJCommonMethods getValueForkey:@"update_version"] key:@"version"];
        [KJCommonMethods removeValueForkey:@"update_version"];
    }
}
/**
 判断是否有更新文件 有的话就移动到web文件夹并解压
 */
-(void)actionUpdate{
    NSString * updatePath = [NSString stringWithFormat:@"%@/project/update/bbpk-last.zip",[WHCFileManager documentsDir]];
    if ([WHCFileManager isExistsAtPath:updatePath]) {
        //存在更新 将更新文件解压到沙盒
        NSString * projectPath = [NSString stringWithFormat:@"%@/project/web",[WHCFileManager documentsDir]];
        if (![WHCFileManager isExistsAtPath:projectPath]) {
            [WHCFileManager createDirectoryAtPath:projectPath];
        }
        [SSZipArchive unzipFileAtPath:updatePath toDestination:projectPath];
        NSLog(@"document文件列表：%@",[WHCFileManager listFilesInDocumentDirectoryByDeep:YES]);
        [self loadSanBoxDocument];
        [WHCFileManager removeItemAtPath:updatePath];
    } else {
        //不存在更新文件 判断是否是第一次打开
        NSString * indexPath = [NSString stringWithFormat:@"%@/project/web/bbpk-last/index.html",[WHCFileManager documentsDir]];
        if([WHCFileManager isExistsAtPath:indexPath]){
            [self loadSanBoxDocument];
        } else {
            //第一次打开app 打开本地资源并且异步将压缩文件解压到沙盒
            [self loadLocalResource];
        }
    }
}
/**
  判断是否需要更新 并且 从服务器获取最新的zip包
 */
-(void)checkUpdateAndGetNewZipFromServer{
    NSString * version = [KJCommonMethods getValueForkey:@"version"];
    // get version and url from server
    //http://192.168.10.200:7001/uac/user/selectAppVersion
    //https://api.pk1955.com/uac/user/selectAppVersion
    [XYHttpTool post:@"https://api.pk123.app/uac/user/selectAppVersion" params:nil success:^(id responseObject) {
        NSDictionary * dataDic = [KJCommonMethods toDictionary:responseObject[@"data"]];
        NSString * serverVersion = dataDic[@"version"];
        NSString * downLoadUrl = dataDic[@"address"];
        //根据版本号来判断是否需要下载新的资源包
        if ([serverVersion floatValue] > [version floatValue]) {
            //需要更新
            NSLog(@"需要更新,开始下载资源···");
            [KJCommonMethods GCDOpenNewThreadAction:^{
                NSError* error = nil;
                NSData* data = [NSData dataWithContentsOfURL:[NSURL URLWithString:downLoadUrl] options:0 error:&error];
                if (!error) {
                    // 将下载好的zip放到更新文件夹里
                    NSString * updatePath = [NSString stringWithFormat:@"%@/project/update",[WHCFileManager documentsDir]];
                    if (![WHCFileManager isExistsAtPath:updatePath]) {
                        [WHCFileManager createDirectoryAtPath:updatePath];
                    }
                    //定义压缩包名字和路径
                    NSString * zipPath = [NSString stringWithFormat:@"%@/bbpk-last.zip",updatePath];
                    [data writeToFile:zipPath options:0 error:&error];
                    [KJCommonMethods saveValue:serverVersion key:@"update_version"];
                    NSLog(@"下载资源完成");
                } else {
                    NSLog(@"下载资源报错:%@",error);
                }
            }];
        } else {
            NSLog(@"不需要更新");
        }
        
    } failure:^(id responseObject, NSInteger code) {
        NSLog(@"获取版本号接口出错，code码:%ld",(long)code);
    }];
}
/**
//移动资源到沙盒
- (void)moveZipToSanBox{
    NSString * projectPath = [NSString stringWithFormat:@"%@/project",[WHCFileManager documentsDir]];
    [WHCFileManager createDirectoryAtPath:projectPath];
    NSLog(@"document文件列表：%@",[WHCFileManager listFilesInDocumentDirectoryByDeep:YES]);
    NSString *filePath = [[NSBundle mainBundle] pathForResource:@"WebProject" ofType:@"zip" inDirectory:@"Resource"];
    //将zip文件拷贝到沙盒
    [self copyMissingFile:filePath toPath:projectPath];
    //将zip文件解压到/web
    NSString* newZipPath = [NSString stringWithFormat:@"%@/WebProject.zip", projectPath];
    [SSZipArchive unzipFileAtPath:newZipPath toDestination:[NSString stringWithFormat:@"%@/web",projectPath]];
    NSLog(@"document文件列表：%@",[WHCFileManager listFilesInDocumentDirectoryByDeep:YES]);
}

//  将工程目录文件拷贝至沙盒
 
- (BOOL)copyMissingFile:(NSString *)sourcePath toPath:(NSString *)toPath
{
    BOOL retVal = YES; // If the file already exists, we'll return success…
    NSString * finalLocation = [toPath stringByAppendingPathComponent:[sourcePath lastPathComponent]];
    if (![[NSFileManager defaultManager] fileExistsAtPath:finalLocation])
    {
        retVal = [[NSFileManager defaultManager] copyItemAtPath:sourcePath toPath:finalLocation error:NULL];
    }
    return retVal;
}
**/
#pragma mark
#pragma mark Request
-(void)loadLocalResource{
    NSLog(@"加载默认资源");
    [self.view addSubview:self.webView];
    NSString *filePath = [[NSBundle mainBundle] pathForResource:@"index" ofType:@"html" inDirectory:@"Resource"];
    if (!filePath) {
        return;
    }
    NSURL *pathURL = [NSURL fileURLWithPath:filePath];
    if (@available(iOS 9.0, *)) {
        [self.webView  loadRequest:[NSURLRequest requestWithURL:pathURL]];
    }
}

//加载沙盒里面的资源
-(void)loadSanBoxDocument{
     NSLog(@"加载沙盒资源");
    [self.view addSubview:self.webView];
    NSString * projectPath = [NSString stringWithFormat:@"%@/project/web",[WHCFileManager documentsDir]];
    NSURL* baseUrl = [NSURL fileURLWithPath:projectPath isDirectory:YES];
    NSString* htmlPath = [NSString stringWithFormat:@"%@/bbpk-last/index.html", projectPath];
    if ([WHCFileManager isExistsAtPath:htmlPath]) {
        NSURL* htmlUrl = [NSURL fileURLWithPath:htmlPath];
        [self.webView  loadFileURL:htmlUrl allowingReadAccessToURL:baseUrl];
    }
}
#pragma mark
#pragma mark Action
/**
 打开微信
 */
-(void)openWeChat{
    [[UIApplication sharedApplication] openURL:[NSURL URLWithString:@"weixin://"] options:@{} completionHandler:^(BOOL success) {
        NSLog(@"已打开微信");
    }];
}

/**
 打开QQ
 */
-(void)openQQ{
    [[UIApplication sharedApplication] openURL:[NSURL URLWithString:@"mqq://"] options:@{} completionHandler:^(BOOL success) {
        NSLog(@"已打开QQ");
    }];
}

/**
 保存二维码图片

 @param qrURL 二维码图片地址
 */
-(void)saveQRImage:(NSString *)qrURL{
    self.downloadView = [[DownloadView alloc] initWithFrame:CGRectMake(0, 0, 375, 667) withQrCodeURL:qrURL];
}

/**
 加密token并发送到web
 */
-(void)md5TokenSendToWeb:(NSString *)token{
    NSString * md5Token = [KJCommonMethods MD5ForLower32Bate:[NSString stringWithFormat:@"BBPK-TIME%@",token]];
    NSString * jsonStr = [NSString stringWithFormat:@"setToken(\"%@\")",md5Token];
    [_webView evaluateJavaScript:jsonStr completionHandler:^(id jsresult, NSError * _Nullable error) {
        NSLog(@"发送加密过后的token成功");
    }];
}

/**
  验证由app打开
 */
-(void)checkINApp{
    NSString * jsonStr = [NSString stringWithFormat:@"setAppType(\"%@\")",@"1"];
    [_webView evaluateJavaScript:jsonStr completionHandler:^(id jsresult, NSError * _Nullable error) {
    }];
}

/**
 发送版本号到web
 */
-(void)sendVersionToWeb{
    NSString * version = [KJCommonMethods getValueForkey:@"version"];
    NSString * jsonStr = [NSString stringWithFormat:@"receiveAppVersion(\"%@\")",version];
    [_webView evaluateJavaScript:jsonStr completionHandler:^(id jsresult, NSError * _Nullable error) {
    }];
}

/**
 返回首页

 @param homeUrl 首页路径
 */
-(void)backHome:(NSString *)homeUrl{
    if (@available(iOS 9.0, *)) {
        [self.webView  loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:homeUrl]]];
    }
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.6 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        [self changeLandSpace:@"0"];
    });
}

/**
 想web发送app的转态

 @param boolStr 是否在前台状态
 */
-(void)activeApp:(NSString *)boolStr{
    if([boolStr isEqualToString:@"1"]){
        NSLog(@"App进入激活状态");
    } else {
         NSLog(@"App退到后台或锁屏");
    }
    NSString * jsonStr = [NSString stringWithFormat:@"setGameVisible(\"%@\")",boolStr];
    [_webView evaluateJavaScript:jsonStr completionHandler:^(id jsresult, NSError * _Nullable error) {
    }];
}

/**
 复制文本

 @param string 要复制的文本
 */
-(void)copyString:(NSString *)string{
    UIPasteboard *pasteboard = [UIPasteboard generalPasteboard];
    pasteboard.string = string;
    //将复制结果传回webView
    NSString * jsonStr = [NSString stringWithFormat:@"checkCopyResult(\"%@\")",@"1"];
    [_webView evaluateJavaScript:jsonStr completionHandler:^(id jsresult, NSError * _Nullable error) {
    }];
}

/**
 切换横竖屏

 @param landSpace 0 切换横屏  1 切换竖屏
 */
-(void)changeLandSpace:(NSString *)landSpace{
    AppDelegate *appdelegate=(AppDelegate *)[UIApplication sharedApplication].delegate;
    if ([landSpace isEqualToString:@"0"]) {
         _webView.scrollView.scrollEnabled = NO;

        AppDelegate *appdelegate=(AppDelegate *)[UIApplication sharedApplication].delegate;
        appdelegate.changeLandscape = YES;
        [appdelegate application:[UIApplication sharedApplication] supportedInterfaceOrientationsForWindow:self.view.window];
        //强制翻转屏幕，Home键在右边。
        [[UIDevice currentDevice] setValue:@(UIInterfaceOrientationLandscapeRight) forKey:@"orientation"];
        //刷新
        [UIViewController attemptRotationToDeviceOrientation];
        //改变webview坐标
        if (kiPhone4 || kiPhone5 || kiPhone6 || kiPhone6Plus) {
            _webView.frame =CGRectMake(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
        } else {
            _webView.frame = CGRectMake(-44, 0, SCREEN_WIDTH+44+44,SCREEN_HEIGHT+22 );
        }
    } else {
         _webView.scrollView.scrollEnabled = YES;
        
        AppDelegate *appdelegate=(AppDelegate *)[UIApplication sharedApplication].delegate;
        appdelegate.changeLandscape = NO;
        [appdelegate application:[UIApplication sharedApplication] supportedInterfaceOrientationsForWindow:self.view.window];
        //强制竖屏。
        [[UIDevice currentDevice] setValue:@(UIDeviceOrientationPortrait) forKey:@"orientation"];
        //刷新
        [UIViewController attemptRotationToDeviceOrientation];
        //改变webview坐标
        if (kiPhone4 || kiPhone5 || kiPhone6 || kiPhone6Plus) {
            _webView.frame =CGRectMake(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
        } else {
            _webView.frame = CGRectMake(-44, 0, SCREEN_WIDTH+44+44,SCREEN_HEIGHT+22 );
        }
    }
}

#pragma mark
#pragma mark - 通知监听
/**
 添加通知
 */
-(void)addNoti{
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(receiveIntoBackground) name:@"intoBackground" object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(receiveIntoApp) name:@"intoApp" object:nil];
}
//收到进入后台的通知
-(void)receiveIntoBackground{
    [self activeApp:@"0"];
}

//收到激活app的通知
-(void)receiveIntoApp{
     [self activeApp:@"1"];
}
#pragma mark
#pragma mark - wkWebView代理
/**
 alert监听
 */
- (void)webView:(WKWebView *)webView runJavaScriptAlertPanelWithMessage:(nonnull NSString *)message initiatedByFrame:(nonnull WKFrameInfo *)frame completionHandler:(nonnull void (^)(void))completionHandler{
    UIAlertController *alertController = [UIAlertController alertControllerWithTitle:@"" message:message?:@"" preferredStyle:UIAlertControllerStyleAlert];
    [alertController addAction:([UIAlertAction actionWithTitle:@"确认" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
        completionHandler();
    }])];
    [self presentViewController:alertController animated:YES completion:nil];
}

/**
 wkWeb加载不受信任的地址
 */
- (void)webView:(WKWebView *)webView didReceiveAuthenticationChallenge:(NSURLAuthenticationChallenge *)challenge completionHandler:(void (^)(NSURLSessionAuthChallengeDisposition, NSURLCredential * _Nullable))completionHandler {
    if ([challenge.protectionSpace.authenticationMethod isEqualToString:NSURLAuthenticationMethodServerTrust]) {
        NSURLCredential * card = [[NSURLCredential alloc] initWithTrust:challenge.protectionSpace.serverTrust];
        completionHandler(NSURLSessionAuthChallengeUseCredential,card);
    }
}


//在收到响应后，决定是否跳转
- (void)webView:(WKWebView *)webView decidePolicyForNavigationResponse:(WKNavigationResponse *)navigationResponse decisionHandler:(void (^)(WKNavigationResponsePolicy))decisionHandler{
    decisionHandler(WKNavigationResponsePolicyAllow);
}

//页面加载完成
- (void)webView:(WKWebView *)webView didFinishNavigation:(null_unspecified WKNavigation *)navigation{
    [self.startLogoImageView removeFromSuperview];
}

#pragma mark
#pragma mark JS调用原生方法
- (void)userContentController:(WKUserContentController *)userContentController didReceiveScriptMessage:(WKScriptMessage *)message {
//    NSLog(@"*********JS调用原生方法");
    // 判断是否是调用原生的
    if ([@"openApp" isEqualToString:message.name]) {
        // 判断message的内容，然后做相应的操作
        if ([@"openWechat" isEqualToString:message.body]) {
            [self openWeChat];
            NSLog(@"打开微信");
        } else if ([@"openQQ" isEqualToString:message.body]){
            [self openQQ];
            NSLog(@"打开微信");
        }
    } else if ([@"NativeMethod" isEqualToString:message.name]){
        // 判断message的内容，然后做相应的操作
        if ([message.body hasPrefix:@"saveQRImage"]) {
            //保存二维码
            [self saveQRImage:[message.body substringFromIndex:12]];
        } else if ([message.body hasPrefix:@"md5://"]){
            NSString * token = [message.body stringByReplacingOccurrencesOfString:@"md5://" withString:@""];
            [self md5TokenSendToWeb:token];
        } else if ([message.body hasPrefix:@"checkINApp"]){
            [self checkINApp];
        } else if ([message.body hasPrefix:@"getAppVersion"]){
            [self sendVersionToWeb];
        } else if ([message.body hasPrefix:@"backHome://"]){
            NSString * pathUrl = [message.body stringByReplacingOccurrencesOfString:@"backHome://" withString:@""];
            [self backHome:pathUrl];
        } else if ([message.body hasPrefix:@"copyString://"]){
            NSString * string = [message.body stringByReplacingOccurrencesOfString:@"copyString://" withString:@""];
            [self copyString:string];
        } else if ([message.body hasPrefix:@"changeLandspace://"]){
            NSString * string = [message.body stringByReplacingOccurrencesOfString:@"changeLandspace://" withString:@""];
            //延时切换横屏
            [self changeLandSpace:string];
        }
    }
}


#pragma mark
#pragma mark getter
-(WKWebView *)webView{
    if (!_webView) {
        // 创建配置
        WKWebViewConfiguration *config = [[WKWebViewConfiguration alloc] init];
        // 创建UserContentController（提供JavaScript向webView发送消息的方法）
        WKUserContentController* userContent = [[WKUserContentController alloc] init];
        // 添加消息处理，注意：self指代的对象需要遵守WKScriptMessageHandler协议，结束时需要移除
        [userContent addScriptMessageHandler:self name:@"openApp"];
        [userContent addScriptMessageHandler:self name:@"NativeMethod"];
        // 将UserConttentController设置到配置文件
        config.userContentController = userContent;
        
        if (kiPhone4 || kiPhone5 || kiPhone6 || kiPhone6Plus) {
            _webView = [[WKWebView alloc] initWithFrame:CGRectMake(0, 0, SCREEN_HEIGHT, SCREEN_WIDTH) configuration:config];
        } else {
            _webView = [[WKWebView alloc] initWithFrame:CGRectMake(0, -44, SCREEN_HEIGHT+22,SCREEN_WIDTH+44+44 ) configuration:config];
        }
        _webView.navigationDelegate = self;
        _webView.UIDelegate = self;
        [_webView setOpaque:NO];
        _webView.scrollView.bounces=NO;
        _webView.scrollView.scrollEnabled = NO;
        [_webView sizeToFit];
        _webView.autoresizesSubviews = YES;//自动调整大小
        _webView.backgroundColor = [UIColor whiteColor];
//        _startLogoImageView = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"bbpk"]];
//        [_webView addSubview:_startLogoImageView];
//        _startLogoImageView.frame = CGRectMake(0, 0, 344, 66);
//        _startLogoImageView.center = _webView.center;
    }
    return _webView;
}

#pragma mark dealloc
- (void)dealloc {
    [_webView.configuration.userContentController removeScriptMessageHandlerForName:@"openApp"];
    [_webView.configuration.userContentController removeScriptMessageHandlerForName:@"NativeMethod"];
}

#pragma mark  隐藏状态栏
- (BOOL)prefersStatusBarHidden{
    return YES;
}

#pragma mark 允许自动旋转
-(BOOL)shouldAutorotate{
    return YES;
}
@end
