package com.reactlibrary;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.bridge.WritableMap;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.content.Context;
import android.content.res.AssetManager;
import android.util.Log;

import java.util.List;
import java.util.Arrays;
import java.util.ArrayList;
import java.util.Random;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.Files;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.BufferedInputStream;
import java.io.OutputStream;
import java.io.IOException;

//import javax.xml.bind.DatatypeConverter;

import java.text.DecimalFormat;

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

import java.util.Base64;

public class RNOpenCvLibraryModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    private Context context;

    public static Net net;
    public static List<String> classNames;
    public static List<Scalar> colors = new ArrayList<>();

    public RNOpenCvLibraryModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        this.context = reactContext.getApplicationContext();
    }

    @Override
    public String getName() {
        return "RNOpenCvLibrary";
    }

    @ReactMethod
    public void initNet(Callback errorCallback, Callback successCallback) {
        try {
            String modelConfiguration = getAssetsFile("yolov4-tiny-custom.cfg");
            String modelWeights = getAssetsFile("yolov4-tiny-custom_best.weights");
            String modelClasses = getAssetsFile("classes.txt");

            classNames = Files.readAllLines(Paths.get(modelClasses));
            for (int i = 0; i < classNames.size(); i++) {
                colors.add(randomColor());
            }

            net = Dnn.readNetFromDarknet(modelConfiguration, modelWeights);

            successCallback.invoke(true);
        } catch (Exception e) {
            errorCallback.invoke(e.getMessage());
        }
    }

    protected Context getContext() {
        return this.context;
    }

    private String getBase64String(Mat mat) {
        MatOfByte matOfByte = new MatOfByte();
        Imgcodecs.imencode(".jpg", mat, matOfByte);
        byte[] byteArray = matOfByte.toArray();
        String base64String = Base64.getEncoder().encodeToString(byteArray);
        return base64String;
    }

    private String getAssetsFile(String file) {
        AssetManager assetManager = this.getContext().getAssets();
        BufferedInputStream inputStream;
        try {
            // Read data from assets.
            inputStream = new BufferedInputStream(assetManager.open(file));
            byte[] data = new byte[inputStream.available()];
            inputStream.read(data);
            inputStream.close();
            // Create copy file in storage.
            File outFile = new File(context.getFilesDir(), file);
            FileOutputStream os = new FileOutputStream(outFile);
            os.write(data);
            os.close();
            // Return a path to file which may be read in common way.
            return outFile.getAbsolutePath();
        } catch (IOException ex) {
            Log.i("RNOpenCV", "Failed to upload a file");
        }
        return "";
    }

        private Scalar randomColor() {
        Random random = new Random();
        int r = random.nextInt(255);
        int g = random.nextInt(255);
        int b = random.nextInt(255);
        return new Scalar(r, g, b);
    }

}
