import React from 'react';
import {StyleSheet} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useDerivedValue,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated';
import Page, {PAGE_WIDTH} from './page';

const titles = ["What's", 'up', 'mobile', 'devs?'];

const MAX_TRANSLATE_X = -PAGE_WIDTH * (titles.length - 1);

export const ScrollView = () => {
  const translateX = useSharedValue(0);

  const clampedTranslateX = useDerivedValue(() => {
    return Math.max(Math.min(translateX.value, 0), MAX_TRANSLATE_X);
  });

  const pan = Gesture.Pan()
    .onChange(event => {
      translateX.value += event.changeX;
    })
    .onFinalize(event => {
      translateX.value = withDecay({velocity: event.velocityX});
    });

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={pan}>
        <Animated.View style={{flex: 1, flexDirection: 'row'}}>
          {titles.map((title, index) => {
            return (
              <Page
                key={index.toString()}
                translateX={clampedTranslateX}
                index={index}
                title={title}
              />
            );
          })}
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
