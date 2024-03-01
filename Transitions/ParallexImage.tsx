import {StyleSheet, View, Dimensions, Text} from 'react-native';
import React from 'react';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

const {width} = Dimensions.get('window');
const IMG_HEIGHT = 230;

const ParallexImage = () => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOfset = useScrollViewOffset(scrollRef);

  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollOfset.value,
        [-IMG_HEIGHT, 0, IMG_HEIGHT],
        [1, 1, 0],
        Extrapolation.CLAMP,
      ),
      transform: [
        {
          translateY: interpolate(
            scrollOfset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75],
            Extrapolation.CLAMP,
          ),
        },
        {
          scale: interpolate(
            scrollOfset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.Image
          source={{uri: 'https://source.unsplash.com/featured/?new-york-city'}}
          style={[styles.image, animatedImageStyle]}
        />
        <View style={{height: 2000, backgroundColor: '#fff'}}>
          <Text style={styles.text}>Parallex Image</Text>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default ParallexImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  image: {
    width: width,
    height: IMG_HEIGHT,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#000000',
  },
});
