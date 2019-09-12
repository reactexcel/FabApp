package com.fabapp;

import android.app.Application;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import io.invertase.firebase.RNFirebasePackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import io.github.elyx0.reactnativedocumentpicker.DocumentPickerPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;

import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
      // packages.add(new MyReactNativePackage());
      // packages.add(new RNFirebasePackage());
      packages.add(new RNFirebaseMessagingPackage());
      packages.add(new RNFirebaseNotificationsPackage());
      return packages;
    }
  //    @Override    
  // public boolean canOverrideExistingModule() {        
  //   return true;    
  // }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
  // @Override    
  // public boolean canOverrideExistingModule() {        
  //   return true;    
  // }
}
