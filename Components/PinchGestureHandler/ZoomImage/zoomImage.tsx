import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const {height, width} = Dimensions.get('window');

export const ZoomImage = () => {
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const imgUri =
    'https://images.unsplash.com/photo-1705179910581-7f3465999f05?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  const pinchGesture = Gesture.Pinch()
    .onChange(event => {
      scale.value = event.scale;
      focalX.value = event.focalX;
      focalY.value = event.focalY;
    })
    .onEnd(() => {
      scale.value = withTiming(1);
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: focalX.value},
        {translateY: focalY.value},
        {translateX: -width / 2},
        {translateY: -height / 2},
        {scale: scale.value},
        {translateX: -focalX.value},
        {translateY: -focalY.value},
        {translateX: width / 2},
        {translateY: height / 2},
      ],
    };
  });

  const rFocalPointStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: focalX.value}, {translateY: focalY.value}],
    };
  });

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={pinchGesture}>
        <Animated.View>
          <Animated.Image source={{uri: imgUri}} style={[styles.img, rStyle]} />
          <Animated.View style={[styles.focalPoint, rFocalPointStyle]} />
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default ZoomImage;

const styles = StyleSheet.create({
  img: {
    width: width,
    height: height,
  },
  focalPoint: {
    ...StyleSheet.absoluteFillObject,
    width: 20,
    height: 20,
    backgroundColor: 'red',
    borderRadius: 50,
  },
});
