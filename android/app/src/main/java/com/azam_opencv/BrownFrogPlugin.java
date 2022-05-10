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

public class BrownFrogPlugin extends FrameProcessorPlugin {
    @Override
    public Object callback(ImageProxy image, Object[] params) {
        Bitmap bitmap = BitmapUtils.getBitmap(image);
        Mat tempMat = new Mat();
        Utils.bitmapToMat(bitmap, tempMat);

        Mat frame = new Mat();
        Imgproc.cvtColor(tempMat, frame, Imgproc.COLOR_BGR2RGB);
        Size frame_size = new Size(416, 416);
        Scalar mean = new Scalar(0, 0, 0);
        // Scalar mean = new Scalar(127.5);

        double[] rgb_center = frame.get(frame.cols()/2, frame.rows()/2);
        Mat blob = Dnn.blobFromImage(frame, 1.0 / 255.0, frame_size, mean, true, false);
        RNOpenCvLibraryModule.net.setInput(blob);

        List<Mat> result = new ArrayList<>();
        List<String> outBlobNames = RNOpenCvLibraryModule.net.getUnconnectedOutLayersNames();

        RNOpenCvLibraryModule.net.forward(result, outBlobNames);
        float confThreshold = 0.2f;

        WritableNativeArray reactArray = new WritableNativeArray();
        WritableNativeArray drawingArray = new WritableNativeArray();

        for (int i = 0; i < result.size(); ++i) {
            Mat level = result.get(i);
            for (int j = 0; j < level.rows(); ++j) {
                Mat row = level.row(j);
                Mat scores = row.colRange(5, level.cols());
                Core.MinMaxLocResult mm = Core.minMaxLoc(scores);
                float confidence = (float) mm.maxVal;
                Point classIdPoint = mm.maxLoc;
                if (confidence > confThreshold) {

                    int centerX = (int) (row.get(0, 0)[0] * frame.cols());
                    int centerY = (int) (row.get(0, 1)[0] * frame.rows());
                    int width = (int) (row.get(0, 2)[0] * frame.cols());
                    int height = (int) (row.get(0, 3)[0] * frame.rows());

                    int left = (int) (centerX - width * 0.5);
                    int top = (int) (centerY - height * 0.5);
                    int right = (int) (centerX + width * 0.5);
                    int bottom = (int) (centerY + height * 0.5);

                    Point left_top = new Point(left, top);
                    Point right_bottom = new Point(right, bottom);
                    Point label_left_top = new Point(left, top - 5);
                    DecimalFormat df = new DecimalFormat("#.##");

                    int class_id = (int) classIdPoint.x;
                    String label = RNOpenCvLibraryModule.classNames.get(class_id) + ": " + df.format(confidence);
                    Scalar color = RNOpenCvLibraryModule.colors.get(class_id);

                    Imgproc.rectangle(frame, left_top, right_bottom, color, 3, 2);
                    Imgproc.putText(frame, label, label_left_top, Imgproc.FONT_HERSHEY_SIMPLEX,
                            2,
                            new Scalar(0, 0, 0), 2);
                    Imgproc.putText(frame, label, label_left_top, Imgproc.FONT_HERSHEY_SIMPLEX,
                            2,
                            new Scalar(255, 0, 0), 2);

                    if(!RNOpenCvLibraryModule.classNames.get(class_id).equals("daun")){
                        WritableNativeArray left_topArray = new WritableNativeArray();
                        left_topArray.pushInt(left);
                        left_topArray.pushInt(top);

                        int spanX = (int) (right - left);
                        int spanY = (int) (bottom - top);
                        WritableNativeArray sizeRect = new WritableNativeArray();
                        sizeRect.pushInt(spanX);
                        sizeRect.pushInt(spanY);

                        WritableNativeMap tempMap = new WritableNativeMap(); 
                        tempMap.putArray("rectangleWH", sizeRect);
                        tempMap.putArray("left_top", left_topArray);
                        tempMap.putString("text_label", label);
                        tempMap.putInt("class_id", class_id);

                        drawingArray.pushMap(tempMap);
                        reactArray.pushString(RNOpenCvLibraryModule.classNames.get(class_id));
                    }
                }
            }
        }
        WritableNativeMap resultData = new WritableNativeMap(); 
        resultData.putString("rgb", Arrays.toString(rgb_center));
        resultData.putArray("penyakitArray", reactArray);
        resultData.putArray("drawingArray", drawingArray);
        resultData.putDouble("x_image", frame.cols());
        resultData.putDouble("y_image", frame.rows());
        return resultData;
    }

    private Scalar randomColor() {
        Random random = new Random();
        int r = random.nextInt(255);
        int g = random.nextInt(255);
        int b = random.nextInt(255);
        return new Scalar(r, g, b);
    }

    BrownFrogPlugin() {
        super("BrownFrog");
    }
}
