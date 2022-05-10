import React from 'react';
import { TextInput, StyleSheet, Dimensions } from 'react-native';
import Animated, { useAnimatedProps } from 'react-native-reanimated';

const AnimatedText = Animated.createAnimatedComponent(TextInput);
Animated.addWhitelistedNativeProps({ text: true });

export const LabelPenyakit = ({
  sharedValue, 
}: {
  sharedValue: Animated.SharedValue<string>;
}) => {
  var textProps = useAnimatedProps(() => ({ text: "" + sharedValue.value[0] }), [
    sharedValue,
  ]);
  
  return (
    <AnimatedText
      style={styles.text1}
      //@ts-expect-error native `text` prop isn't exposed in `TextInputProps`
      animatedProps={textProps}
      editable={false}
      multiline={true}
    />
  );
};

export const LabelNitrogenRGB = ({
  sharedValue, 
}: {
  sharedValue: Animated.SharedValue<string>;
}) => {
  const textProps = useAnimatedProps(() => ({ text: "RGB : " + sharedValue.value[2] }), [
    sharedValue.value,
  ]);

  return (
    <AnimatedText
      style={styles.text1}
      //@ts-expect-error native `text` prop isn't exposed in `TextInputProps`
      animatedProps={textProps}
      editable={false}
      multiline={true}
    />
  );
};

export const LabelNitrogenBWD = ({
  sharedValue, 
}: {
  sharedValue: Animated.SharedValue<string>;
}) => {
  const textProps = useAnimatedProps(() => ({ text: "Nilai BWD : " + sharedValue.value[0] }), [
    sharedValue.value,
  ]);

  return (
    <AnimatedText
      style={styles.text2}
      //@ts-expect-error native `text` prop isn't exposed in `TextInputProps`
      animatedProps={textProps}
      editable={false}
      multiline={true}
    />
  );
};

export const LabelNitrogenUREA = ({
  sharedValue, 
}: {
  sharedValue: Animated.SharedValue<string>;
}) => {
  const textProps = useAnimatedProps(() => ({ text: "Pupuk Urea : " + sharedValue.value[1] }), [
    sharedValue.value,
  ]);

  return (
    <AnimatedText
      style={styles.text3}
      //@ts-expect-error native `text` prop isn't exposed in `TextInputProps`
      animatedProps={textProps}
      editable={false}
      multiline={true}
    />
  );
};


const styles = StyleSheet.create({
  text1: {
    position: 'absolute',
    top: 26,
    padding: 4,
    marginHorizontal: 20,
    backgroundColor: '#000000CC',
    fontSize: 26,
    color: 'white',
    textAlign: 'center',
  },
  text2: {
    position: 'absolute',
    top: Dimensions.get('window').height - 150,
    padding: 4,
    marginHorizontal: 20,
    backgroundColor: '#000000CC',
    fontSize: 26,
    color: 'white',
    textAlign: 'center',
  },
  text3: {
    position: 'absolute',
    top: Dimensions.get('window').height - 100,
    padding: 4,
    marginHorizontal: 20,
    backgroundColor: '#000000CC',
    fontSize: 26,
    color: 'white',
    textAlign: 'center',
  }
});