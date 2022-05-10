package com.azam_opencv;

import android.util.Log;
import com.facebook.react.bridge.WritableNativeArray; 
import com.facebook.react.bridge.WritableNativeMap;
import com.mrousavy.camera.frameprocessor.FrameProcessorPlugin;
import org.jetbrains.annotations.NotNull;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.view.SurfaceView;
import android.graphics.Matrix;
import android.graphics.Rect;
import android.graphics.YuvImage;
import android.graphics.ImageFormat;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.media.Image;
import android.content.res.AssetManager;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.camera.core.ImageProxy;

import android.Manifest;
import android.content.pm.PackageManager;

import org.opencv.core.CvType;
import org.opencv.core.Mat;
import org.opencv.core.Scalar;
import org.opencv.core.Size;
import org.opencv.core.MatOfPoint;
import org.opencv.core.Core;
import org.opencv.core.Point;
import org.opencv.core.MatOfByte;
import org.opencv.dnn.DetectionModel;
import org.opencv.dnn.Dnn;
import org.opencv.dnn.Net;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.android.Utils;
import org.opencv.imgproc.Imgproc;

import java.lang.ref.WeakReference;
import java.util.List;
import java.util.Arrays;
import java.util.ArrayList;
import java.util.Random;
import java.util.Base64;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.Files;
import java.nio.ByteBuffer;

import java.text.DecimalFormat;


import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.BufferedInputStream;
import java.io.OutputStream;
import java.io.IOException;

import com.reactlibrary.RNOpenCvLibraryModule;

public class NitrogenPlugin extends FrameProcessorPlugin {
    @Override
    public Object callback(ImageProxy image, Object[] params) {
        Bitmap bitmap = BitmapUtils.getBitmap(image);
        Mat tempMat = new Mat();
        Utils.bitmapToMat(bitmap, tempMat);

        Mat frame = new Mat();
        Imgproc.cvtColor(tempMat, frame, Imgproc.COLOR_BGR2RGB);

        double[] rgb_center = frame.get(frame.cols()/2, frame.rows()/2);
        double green_color = rgb_center[1];

        Imgproc.rectangle(frame, new Point((frame.cols()/2) - 2, (frame.rows()/2) - 2),  new Point((frame.cols()/2) + 2, (frame.rows()/2) + 2), new Scalar(255, 255, 255), 3, 2);

        WritableNativeMap resultData = new WritableNativeMap(); 
        // if(green_color > 165){
        //     resultData.putString("bwd", "1");
        //     resultData.putString("urea", "175-200");
        // } else if(green_color < 165 && green_color > 153){
        //     resultData.putString("bwd", "2");
        //     resultData.putString("urea", "175");
        // } else if(green_color < 153 && green_color > 140){
        //     resultData.putString("bwd", "3");
        //     resultData.putString("urea", "150");
        // } else if(green_color < 140 && green_color > 125){
        //     resultData.putString("bwd", "4");
        //     resultData.putString("urea", "125");
        // } else if(green_color < 125 && green_color > 110){
        //     resultData.putString("bwd", "5");
        //     resultData.putString("urea", "100");
        // } else if(green_color < 110 && green_color > 95){
        //     resultData.putString("bwd", "6");
        //     resultData.putString("urea", "75");
        // } else if(green_color < 95 && green_color > 85){
        //     resultData.putString("bwd", "7");
        //     resultData.putString("urea", "50");
        // } else if(green_color < 85){
        //     resultData.putString("bwd", "8");
        //     resultData.putString("urea", "0-50");
        // } else {
        //     resultData.putString("bwd", "");
        //     resultData.putString("urea", "");
        // }
        resultData.putDouble("green_color", green_color);
        resultData.putString("rgb", Arrays.toString(rgb_center));
        resultData.putString("imagebase64", getBase64String(frame));
        return resultData;
    }

    private String getBase64String(Mat mat) {
        MatOfByte matOfByte = new MatOfByte();
        Imgcodecs.imencode(".jpg", mat, matOfByte);
        byte[] byteArray = matOfByte.toArray();
        String base64String = Base64.getEncoder().encodeToString(byteArray);
        return base64String;
    }

    NitrogenPlugin() {
        super("Nitrogen");
    }
}
