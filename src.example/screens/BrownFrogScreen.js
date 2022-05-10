import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Dimensions,
  Text,
} from 'react-native';
import {useSharedValue, runOnJS} from 'react-native-reanimated';
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';

import {fonts} from '../themes/themes';
import {BrownFrog} from '../frame-processors/OpenCVFrameProcessor';
import OpenCV from '../NativeModules/OpenCV';

import {LabelPenyakit} from '../components/Label';

export function BrownFrogScreen() {
  const [hasPermission, setHasPermission] = useState(false);
  const [overlayRects, setOverlayRects] = useState([]);
  const [widthPicture, setWidthPicture] = useState(1);
  const [colorRGBs, setColorRGBs] = useState([]);

  const currentLabel = useSharedValue([[""]]);

  const devices = useCameraDevices();
  const device = devices.back;

  const widthScreen = Dimensions.get('window').width;

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();

    OpenCV.initNet(
      error => {
        console.log(error);
      },
      msg => {
        console.log('Success Init Net');
      },
    );

    var tempRGB = [];
    for (let index = 0; index < 5; index++) {
      tempRGB.push(randomColor());
    }
    setColorRGBs(tempRGB);

    currentLabel.value = [[""]];
  }, []);

  const frameProcessor = useFrameProcessor(
    frame => {
      'worklet';
      const result = BrownFrog(frame);
      result.penyakitArray = result.penyakitArray.filter(function (
        value,
        index,
        array,
      ) {
        return array.indexOf(value) === index;
      });
      result.penyakitArray = result.penyakitArray.filter(x => x !== 'daun');
      result.penyakitArray = result.penyakitArray.map(element => {
        return (
          element.charAt(0).toUpperCase() + element.substring(1).toLowerCase()
        );
      });
      currentLabel.value = [result.penyakitArray.join(', ')];
      runOnJS(setOverlayRects)(result.drawingArray);
      if (!isNaN(widthScreen/widthScreen) && widthPicture != 0) {
        runOnJS(setWidthPicture)(result.x_image);
      }
    },
    [currentLabel],
  );

  const ratioPictureDimesion = isNaN(widthPicture / widthScreen) ? 0 : (widthPicture / widthScreen);

  const renderOverlay = () => {
    return (
      <>
        {overlayRects.map(value => {
          return (
            <View
              style={{
                position: 'absolute',
                left: isNaN(value.left_top[0] / ratioPictureDimesion) ? 0 : (value.left_top[0] / ratioPictureDimesion),
                top: isNaN(value.left_top[1] / ratioPictureDimesion) ? 0 : (value.left_top[1] / ratioPictureDimesion),
              }}>
              <View
                style={{
                  position: 'absolute',
                  left: isNaN(-15 / ratioPictureDimesion) ? 0 : (-15 / ratioPictureDimesion),
                  top: isNaN(-45 / ratioPictureDimesion) ? 0 : (-45 / ratioPictureDimesion),
                }}>
                <Text
                  style={{
                    fontSize: fonts.size.font27,
                    justifyContent: 'center',
                    textAlign: 'center',
                    color: colorRGBs[value.class_id],
                  }}>
                  {value.text_label}
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 3,
                  borderColor: colorRGBs[value.class_id],
                  position: 'absolute',
                  left: 0,
                  top: isNaN(20 / ratioPictureDimesion) ? 0 : (20 / ratioPictureDimesion),
                  width: isNaN(value.rectangleWH[0] / ratioPictureDimesion) ? 0 : (value.rectangleWH[0] / ratioPictureDimesion),
                  height: isNaN((value.rectangleWH[1] + 20) / ratioPictureDimesion) ? 0 : ((value.rectangleWH[1] + 20) / ratioPictureDimesion),
                }}></View>
            </View>
          );
        })}
      </>
    );
  };

  return (
    <View style={styles.container}>
      {device != null && hasPermission ? (
        [
          <>
            <Camera
              style={styles.camera}
              device={device}
              isActive={true}
              frameProcessor={frameProcessor}
              frameProcessorFps={1}
            />
            <LabelPenyakit sharedValue={currentLabel} />
            {renderOverlay()}
          </>,
        ]
      ) : (
        <ActivityIndicator size="large" color="white" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
});

function randomColor() {
  var randomBetween = (min, max) =>
    min + Math.floor(Math.random() * (max - min + 1));
  var r = randomBetween(0, 255);
  var g = randomBetween(0, 255);
  var b = randomBetween(0, 255);
  return `rgb(${r},${g},${b})`;
}
