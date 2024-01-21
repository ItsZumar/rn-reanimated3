import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ICON_SIZE = 20;
const BUTTON_WIDTH = 170;

const clamp = (value: number, min: number, max: number) => {
  'worklet';

  return Math.min(Math.max(value, min), max);
};

export const SlidingCounter = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const [count, setCount] = useState(0);
  const MAX_SLIDE_OFFSET = BUTTON_WIDTH * 0.3;

  // Wrapper Function
  const incrementCount = useCallback(() => {
    // external library function
    setCount(currentCount => currentCount + 1);
  }, []);

  const decrementCount = useCallback(() => {
    setCount(currentCount => currentCount - 1);
  }, []);

  const resetCount = useCallback(() => {
    setCount(0);
  }, []);

  const onGestureEvents = Gesture.Pan()
    .onBegin(() => {})
    .onChange(event => {
      translateX.value = clamp(
        translateX.value + event.changeX,
        -MAX_SLIDE_OFFSET,
        MAX_SLIDE_OFFSET,
      );
      translateY.value = clamp(
        translateY.value + event.changeY,
        0,
        MAX_SLIDE_OFFSET,
      );
    })
    .onEnd(() => {
      if (translateX.value === MAX_SLIDE_OFFSET) {
        runOnJS(incrementCount)();
      } else if (translateX.value === -MAX_SLIDE_OFFSET) {
        runOnJS(decrementCount)();
      } else if (translateY.value === MAX_SLIDE_OFFSET) {
        runOnJS(resetCount)();
      }
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  }, []);

  const rPlusMinusIconStyle = useAnimatedStyle(() => {
    const opacityX = interpolate(
      translateX.value,
      [-MAX_SLIDE_OFFSET, 0, MAX_SLIDE_OFFSET],
      [0.4, 1, 0.4],
      Extrapolation.CLAMP,
    );

    const opacityY = interpolate(
      translateY.value,
      [0, MAX_SLIDE_OFFSET],
      [1, 0],
      Extrapolation.CLAMP,
    );

    return {
      opacity: opacityX * opacityY,
    };
  }, []);

  const rCloseIconStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [0, MAX_SLIDE_OFFSET],
      [0, 0.8],
      Extrapolation.CLAMP,
    );
    return {
      opacity,
    };
  }, []);

  const rButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value * 0.1,
        },
        {
          translateY: translateY.value * 0.1,
        },
      ],
    };
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <Animated.View style={[styles.button, rButtonStyle]}>
        <Animated.View style={rPlusMinusIconStyle}>
          <AntDesign name="minus" size={ICON_SIZE} color={'#fff'} />
        </Animated.View>
        <Animated.View style={rCloseIconStyle}>
          <AntDesign name="close" size={ICON_SIZE} color={'#fff'} />
        </Animated.View>
        <Animated.View style={rPlusMinusIconStyle}>
          <AntDesign name="plus" size={ICON_SIZE} color={'#fff'} />
        </Animated.View>
        <View style={styles.circleContainer}>
          <GestureDetector gesture={onGestureEvents}>
            <Animated.View style={[styles.circle, rStyle]}>
              <Text style={styles.countText}>{count}</Text>
            </Animated.View>
          </GestureDetector>
        </View>
      </Animated.View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    fontSize: 23,
    fontWeight: '700',
    color: '#fff',
  },
  button: {
    width: BUTTON_WIDTH,
    height: 60,
    backgroundColor: '#111111',
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  circleContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 50,
    height: 50,
    backgroundColor: '#232323',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
