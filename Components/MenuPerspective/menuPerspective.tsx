import React, {useCallback} from 'react';
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const BACKGROUND_COLOR = '#1e1e23';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const THRESHOLD = SCREEN_WIDTH / 3;

export const MenuPerspective = () => {
  const translateX = useSharedValue(0);

  const panGestureEvent = Gesture.Pan()
    .onStart(() => {})
    .onChange(event => {
      translateX.value = Math.max(event.translationX, 0);
    })
    .onEnd(() => {
      if (translateX.value <= THRESHOLD) {
        translateX.value = withTiming(0);
      } else {
        translateX.value = withTiming(SCREEN_WIDTH / 2);
      }
    });

  const rStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [0, SCREEN_WIDTH / 2],
      [0, 3],
      Extrapolation.CLAMP,
    );

    const borderRadius = interpolate(
      translateX.value,
      [0, SCREEN_WIDTH / 2],
      [0, 15],
      Extrapolation.CLAMP,
    );

    return {
      borderRadius,
      transform: [
        {perspective: 100},
        {
          translateX: translateX.value,
        },
        {
          rotateY: `-${rotate}deg`,
        },
      ],
    };
  }, []);

  const onPress = useCallback(() => {
    if (translateX.value > 0) {
      translateX.value = withTiming(0);
    } else {
      translateX.value = withTiming(SCREEN_WIDTH / 2);
    }
  }, []);

  return (
    <GestureHandlerRootView
      style={{flex: 1, backgroundColor: BACKGROUND_COLOR}}>
      <StatusBar barStyle={'default'} />
      <View style={[styles.container, styles.safe]}>
        <GestureDetector gesture={panGestureEvent}>
          <Animated.View style={[{backgroundColor: 'white', flex: 1}, rStyle]}>
            <TouchableOpacity
              onPress={onPress}
              style={{margin: 15, position: 'absolute'}}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '700',
                  color: BACKGROUND_COLOR,
                }}>
                Open Menu
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  safe: {
    // marginTop: 30,
  },
});
