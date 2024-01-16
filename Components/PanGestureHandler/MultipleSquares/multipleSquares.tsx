import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const SIZE = 90;
const BORDER_BOX = SIZE * 3;

const MultipleSquares = () => {
  const translateBox1X = useSharedValue(0);
  const translateBox1Y = useSharedValue(0);
  //  Box2
  const translateBox2X = useSharedValue(0);
  const translateBox2Y = useSharedValue(0);

  const pan1 = Gesture.Pan()
    .onBegin(event => {})
    .onChange(event => {
      translateBox1X.value += event.changeX;
      translateBox1Y.value += event.changeY;
    })
    .onEnd(event => {
      const distance = Math.sqrt(
        translateBox1X.value ** 2 + translateBox1Y.value ** 2,
      );

      if (distance < BORDER_BOX + (SIZE * 4) / 2) {
        translateBox1X.value = withSpring(0);
        translateBox1Y.value = withSpring(0);
      }
    });

  const box1Style = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateBox1X.value},
        {translateY: translateBox1Y.value},
      ],
    };
  });

  const pan2 = Gesture.Pan()
    .onBegin(event => {})
    .onChange(event => {
      translateBox2X.value += event.changeX;
      translateBox2Y.value += event.changeY;
    })
    .onEnd(event => {
      const distance = Math.sqrt(
        translateBox2X.value ** 2 + translateBox2Y.value ** 2,
      );

      if (distance < BORDER_BOX + (SIZE * 4) / 2) {
        translateBox2X.value = withSpring(0);
        translateBox2Y.value = withSpring(0);
      }
    });

  const box2Style = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateBox2X.value},
        {translateY: translateBox2Y.value},
      ],
    };
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.rowBoxContainer}>
        <GestureDetector gesture={pan1}>
          <Animated.View style={[styles.box, box1Style]} />
        </GestureDetector>
        <GestureDetector gesture={pan2}>
          <Animated.View style={[styles.box, box2Style]} />
        </GestureDetector>
      </View>
      <View style={styles.row2BoxContainer}>
        <View style={styles.border}>
          <Text style={{fontSize: 18, zIndex: 1}}>Stick Here</Text>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default MultipleSquares;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  rowBoxContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row2BoxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  box: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'blue',
    borderRadius: 10,
    zIndex: 10,
  },
  border: {
    width: '100%',
    height: BORDER_BOX,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: 'rgba(55, 55, 55,.9)',
    borderTopWidth: 1.5,
    borderStyle: 'dashed',
    zIndex: 1,
  },
});
