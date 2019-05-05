//
//  DownloadView.m
//  GuessCoin
//
//  Created by mac on 2019/2/25.
//  Copyright © 2019 ERSX. All rights reserved.
//

#import "DownloadView.h"
#import "UIImageView+WebCache.h"
#import "MBProgressHUDUtil.h"
@implementation DownloadView{
    UIImageView * _bgView;
    NSString * _qrCodeUrl;
    UIImageView * _qrCodeImgView;
}

-(instancetype)initWithFrame:(CGRect)frame withQrCodeURL:(NSString *)URL{
    self = [super initWithFrame:frame];
    if (self) {
        _qrCodeUrl = URL;
        [self createUI];
    }
    return self;
}

-(void)createUI{
    _bgView = [[UIImageView alloc] initWithFrame:self.frame];
    _bgView.image = [UIImage imageNamed:@"girl.jpg"];
    [self addSubview:_bgView];
    
    _qrCodeImgView = [[UIImageView alloc] initWithFrame:CGRectMake(31, self.frame.size.height/2, 127, 127)];
    [_bgView addSubview:_qrCodeImgView];
    [_qrCodeImgView sd_setImageWithURL:[NSURL URLWithString:_qrCodeUrl] completed:^(UIImage * _Nullable image, NSError * _Nullable error, SDImageCacheType cacheType, NSURL * _Nullable imageURL) {
        if (!error) {
             [self savePhoto];
        }
    }];
}

-(void)savePhoto{
    CGSize s = self.bounds.size;
    // 下面方法，第一个参数表示区域大小。第二个参数表示是否是非透明的。如果需要显示半透明效果，需要传NO，否则传YES。第三个参数就是屏幕密度了
    UIGraphicsBeginImageContextWithOptions(s, NO, [UIScreen mainScreen].scale);
    [self.layer renderInContext:UIGraphicsGetCurrentContext()];
    UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    UIImageWriteToSavedPhotosAlbum(image,self,nil,nil);
    NSLog(@"保存成功");
    [MBProgressHUDUtil hudWithText:@"图片已保存，可直接转发"];
}
@end
