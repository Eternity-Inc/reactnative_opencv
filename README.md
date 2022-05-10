# reactnative_opencv
# Tutorial for Installing

- Install Package `npm install @react-navigation/native @react-navigation/stack react-native-gesture-handler react-native-safe-area-context react-native-screens react-native-svg react-native-reanimated react-native-vision-camera`
- Open `AndroidManifest.xml`  add followng line in `<manifest>` :
    
    ```xml
    <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW"/>
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    ```
    
- Follow this tutorial [`https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation`](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation)
- Install OpenCv
    1. Download and extract latest OpenCV for Android (tested with OpenCV 4.5) from [https://opencv.org/releases/](https://opencv.org/releases/)
    2. Rename the "sdk" folder in the extracted folder (OpenCV-android-sdk) to `"opencv"`
    3. Open Android Studio and open `Android` folder of your projects dir
        
        `File -> Open -> select */NAME_OF_YOUR_PROJECT/android`
        
    4. File -> New -> Import module -> select the folder you renamed to `opencv`
    5. In `build.gradle(:opencv)` , change `compileSdkVersion` line in `build.gradle(YOUR_PROJECT_NAME)`
    6. File -> Project Structure -> Dependencies -> select app and press the "+" sign (located "underneath All dependencies") -> check the checkbox next to opencv -> press OK
    7. Open `build.gradle(Project: NAME_OF_YOUR_PROJECT**.app**)` add : 
        
        ```java
        compileOptions {
            sourceCompatibility JavaVersion.VERSION_1_8
            targetCompatibility JavaVersion.VERSION_1_8
        }
        
        packagingOptions {
             pickFirst 'lib/x86/libc++_shared.so'
             pickFirst 'lib/x86_64/libc++_shared.so'
             pickFirst 'lib/armeabi-v7a/libc++_shared.so'
             pickFirst 'lib/arm64-v8a/libc++_shared.so'
         }
        ```
        
        And `multiDexEnabled true`
        
    8. Open `build.gradle(:opencv)` and enable multidex option in default config
    9. File -> Syncronize Your Project with Gradle Files
- Copy Preset Folder
- Open `[MainApplication.java](http://MainApplication.java)` add
    
    ```java
    import com.facebook.react.bridge.JSIModulePackage; // <- add
    import com.swmansion.reanimated.ReanimatedJSIModulePackage; // <- add
    import com.reactlibrary.RNOpenCvLibraryPackage; // <- add
    import com.azam_opencv.OpenCVPluginPackage; // <- add
    ```
    
- in `getPackages()` add
    
    ```java
    packages.add(new RNOpenCvLibraryPackage()); // <- add
    packages.add(new OpenCVPluginPackage()); // <- add
    ```
    
- Configure `babel.config.js` like in the example
- See Implementation in `src.example` folder
- etc
