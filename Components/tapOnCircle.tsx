import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

function TapOnCircle() {
  const pressed = useSharedValue(false);
  const translateCircleX = useSharedValue(0);
  const translateCircleY = useSharedValue(0);

  const pan = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
    })
    .onChange(event => {
      translateCircleX.value = event.translationX;
      translateCircleY.value = event.translationY;
    })
    .onFinalize(event => {
      translateCircleX.value = withSpring(0);
      translateCircleY.value = withTiming(0, {duration: 1000});
      pressed.value = false;
    });

  const animatedStyles = useAnimatedStyle(() => ({
    backgroundColor: pressed.value ? '#FFE04B' : '#B58DF1',
    transform: [
      {translateX: translateCircleX.value},
      {translateY: translateCircleY.value},
      {scale: withTiming(pressed.value ? 1.5 : 1)},
    ],
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.circle, animatedStyles]} />
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

export default TapOnCircle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  circle: {
    height: 120,
    width: 120,
    borderRadius: 500,
  },
});
