import {Dimensions, StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 100;

export const BottomSheet = () => {
  const translateY = useSharedValue(0);

  const scrollTo = useCallback((destination: number) => {
    'worklet';
    translateY.value = withSpring(destination, {damping: 50});
  }, []);

  const panGestureEvent = Gesture.Pan()
    .onBegin(() => {})
    .onChange(event => {
      translateY.value += event.changeY;
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
    })
    .onEnd(() => {
      if (translateY.value > -SCREEN_HEIGHT / 3) {
        scrollTo(-SCREEN_HEIGHT / 12);
      } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
        scrollTo(MAX_TRANSLATE_Y);
      }
    });

  const rStyle = useAnimatedStyle(() => {
    const borderRadius = withTiming(
      interpolate(
        translateY.value,
        [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
        [25, 5],
        Extrapolation.CLAMP,
      ),
    );

    return {
      borderRadius,
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    };
  }, []);

  useEffect(() => {
    scrollTo(-SCREEN_HEIGHT / 12);
  }, []);

  return (
    <GestureDetector gesture={panGestureEvent}>
      <Animated.View style={[styles.bottomSheetContainer, rStyle]}>
        <View style={styles.line} />
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: '#303030',
    position: 'absolute',
    top: SCREEN_HEIGHT,
    borderRadius: 30,
  },
  line: {
    width: 60,
    height: 3,
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 2,
  },
});
