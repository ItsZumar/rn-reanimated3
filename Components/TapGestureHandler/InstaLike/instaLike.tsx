import React, {useCallback, useRef} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const {height, width} = Dimensions.get('window');

const imgUri =
  'https://images.unsplash.com/photo-1705179910581-7f3465999f05?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export const InstaLike = () => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  const doubleTapRef = useRef();

  const rStyle = useAnimatedStyle(() => ({
    transform: [{scale: Math.max(scale.value, 0)}],
  }));

  const rTextStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const singleTap = Gesture.Tap()
    .maxDuration(250)
    .onStart(() => {
      opacity.value = withTiming(0, undefined, isFinished => {
        if (isFinished) {
          opacity.value = withDelay(500, withTiming(1));
        }
      });
    });

  const doubleTap = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(2)
    .onStart(() => {
      scale.value = withSpring(1, undefined, isFinished => {
        if (isFinished) {
          scale.value = withDelay(500, withSpring(0));
        }
      });
    });

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={Gesture.Exclusive(doubleTap, singleTap)}>
        <Animated.View>
          <Animated.Image source={{uri: imgUri}} style={[styles.img]} />
          <Animated.Image
            source={require('../../../assets/heart.png')}
            style={[styles.likeIcon, rStyle]}
          />
          <Animated.Text style={[styles.text, rTextStyle]}>
            Double Tab to Like ♡
          </Animated.Text>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: width * 0.9,
    height: height * 0.7,
    borderRadius: 10,
  },
  likeIcon: {
    width: 70,
    height: 70,
    position: 'absolute',
    top: '40%',
    left: '40%',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 30,
  },
});
