
package com.reactlibrarystatusbar;

import android.content.Context;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.uimanager.PixelUtil;

public class RNStatusBarModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;

  public RNStatusBarModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @ReactMethod
  public void getStatusBarHeight(final Promise promise) {
    float statusBarHeight = calcStatusBarHeight();
    promise.resolve(statusBarHeight);
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  public float getStatusBarHeightSync() {
    return calcStatusBarHeight();
  }

  private float calcStatusBarHeight() {
    Context context = getReactApplicationContext();
    float statusBarHeight = 0;
    final int resourceId = context.getResources().getIdentifier("status_bar_height", "dimen", "android");
    if (resourceId > 0) {
      statusBarHeight = PixelUtil.toDIPFromPixel(context.getResources().getDimensionPixelSize(resourceId));
    }
    return statusBarHeight;
  }


  @Override
  public String getName() {
    return "RNStatusBar";
  }
}