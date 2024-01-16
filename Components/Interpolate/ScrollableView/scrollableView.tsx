import React from 'react';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Page from './page';
import {StyleSheet} from 'react-native';

const WORDS = ["What's", 'up', 'mobile', 'devs?'];

export const ScrollableView = () => {
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
  });

  return (
    <Animated.ScrollView
      onScroll={scrollHandler}
      pagingEnabled={true}
      scrollEventThrottle={16}
      horizontal
      style={styles.container}>
      {WORDS.map((title, index) => {
        return (
          <Page
            key={index.toString()}
            title={title}
            translateX={translateX}
            index={index}
          />
        );
      })}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
});
