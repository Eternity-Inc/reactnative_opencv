import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Dimensions,
  Image,
} from 'react-native';
import {useSharedValue, runOnJS} from 'react-native-reanimated';
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';

import {fonts} from '../themes/themes';
import {Nitrogen} from '../frame-processors/OpenCVFrameProcessor';

import {
  LabelNitrogenBWD,
  LabelNitrogenUREA,
  LabelNitrogenRGB,
} from '../components/Label';

export function NitrogrenScreen() {
  const [hasPermission, setHasPermission] = useState(false);
  const [imagebase64, setImagebase64] = useState(false);
  const currentLabel = useSharedValue([[''], [''], ['']]);

  const devices = useCameraDevices();
  const device = devices.back;

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();

    currentLabel.value = [[''], [''], ['']];
  }, []);

  const frameProcessor = useFrameProcessor(
    frame => {
      'worklet';
      const result = Nitrogen(frame);
      
      var greenRGB = result.green_color;
      var returned_object = {};
      if (greenRGB < 165) {
        returned_object.bwd = '1';
        returned_object.urea = '175-200';
      } else if (greenRGB > 165 && greenRGB <= 190) {
        returned_object.bwd = '2';
        returned_object.urea = '175';
      } else if (greenRGB > 190 && greenRGB <= 200) {
        returned_object.bwd = '3';
        returned_object.urea = '150';
      } else if (greenRGB > 200 && greenRGB <= 210) {
        returned_object.bwd = '4';
        returned_object.urea = '125';
      } else if (greenRGB > 210 && greenRGB <= 220) {
        returned_object.bwd = '5';
        returned_object.urea = '100';
      } else if (greenRGB > 220 && greenRGB <= 230) {
        returned_object.bwd = '6';
        returned_object.urea = '75';
      } else if (greenRGB > 230 && greenRGB <= 240) {
        returned_object.bwd = '7';
        returned_object.urea = '50';
      } else if (greenRGB > 240 && greenRGB <= 255) {
        returned_object.bwd = '8';
        returned_object.urea = '0-50';
      } else {
        returned_object.bwd = '';
        returned_object.urea = '';
      }
      console.log(result.rgb);
      currentLabel.value = [returned_object.bwd, returned_object.urea, result.rgb];
    },
    [currentLabel],
  );



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
            <View
              style={{
                borderWidth: 3,
                borderColor: '#fff',
                position: 'absolute',
                left: (Dimensions.get('window').width - 10) / 2,
                top: (Dimensions.get('window').height - 60) / 2,
                width: 10,
                height: 10,
              }}></View>
            <LabelNitrogenBWD sharedValue={currentLabel} />
            <LabelNitrogenUREA sharedValue={currentLabel} />
            {/* <LabelNitrogenRGB sharedValue={currentLabel} /> */} {/* Show RGB */}
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
