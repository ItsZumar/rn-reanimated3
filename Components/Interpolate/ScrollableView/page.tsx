import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface PageProps {
  title: string;
  index: number;
  translateX: SharedValue<number>;
}

const {height, width} = Dimensions.get('window');
const SIZE = width * 0.7;

const Page: React.FC<PageProps> = ({title, index, translateX}) => {
  const inputRange = [(-index - 1) * width, index * width, (index + 1) * width];

  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolation.CLAMP,
    );

    const borderRadius = interpolate(
      translateX.value,
      inputRange,
      [0, SIZE / 2, 0],
      Extrapolation.CLAMP,
    );
    return {
      borderRadius,
      transform: [{scale}],
    };
  });

  const rTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      inputRange,
      [height / 2, 0, -height / 2],
      Extrapolation.CLAMP,
    );

    const opacity = interpolate(
      translateX.value,
      inputRange,
      [-2, 1, -2],
      Extrapolation.CLAMP,
    );

    return {
      transform: [{translateY}],
      opacity,
    };
  });

  return (
    <View
      style={[
        styles.pageContainer,
        {backgroundColor: `rgba(0,0,255, 0.${index + 2})`},
      ]}>
      <Animated.View style={[styles.box, rStyle]} />
      <Animated.View style={[rTextStyle, {position: 'absolute'}]}>
        <Text style={styles.text}>{title}</Text>
      </Animated.View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  pageContainer: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: 'rgba(0,0,230,.9)',
  },
  text: {
    fontSize: 65,
    color: 'white',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});
