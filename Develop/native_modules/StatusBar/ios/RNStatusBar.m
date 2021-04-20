
#import "RNStatusBar.h"

@implementation RNStatusBar

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(getStatusBarHeight:(RCTPromiseResolveBlock)resolve
                rejecter:(RCTPromiseRejectBlock)reject)
{
    CGRect statusBarRect = [UIApplication sharedApplication].statusBarFrame;
    CGFloat height = statusBarRect.size.height;
    resolve(@(height));
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getStatusBarHeightSync)
{
    CGRect statusBarRect = [UIApplication sharedApplication].statusBarFrame;
    CGFloat height = statusBarRect.size.height;
    return @(height);
}

@end
