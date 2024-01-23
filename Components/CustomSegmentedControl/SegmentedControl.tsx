import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {Palette} from '..';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';

type SegmentedControlProps = {
  options: string[];
  selectedOption: string;
  onOptionPress?: (option: string) => void;
};

export const SegmentedControl = ({
  options,
  selectedOption,
  onOptionPress,
}: SegmentedControlProps) => {
  const {width: windowWidth} = useWindowDimensions();
  const internalPadding = 20;
  const segmentedControlWidth = windowWidth - 40;
  const itemWidth = (segmentedControlWidth - internalPadding) / options.length;

  const rStyle = useAnimatedStyle(() => {
    return {
      left: withTiming(
        itemWidth * options.indexOf(selectedOption) + internalPadding / 2,
      ),
    };
  }, [options, selectedOption, itemWidth]);

  return (
    <View
      style={[
        styles.container,
        {
          width: segmentedControlWidth,
          paddingHorizontal: internalPadding / 2,
        },
      ]}>
      <Animated.View
        style={[
          {
            width: itemWidth,
          },
          rStyle,
          styles.activeBox,
        ]}
      />
      {options.map(option => {
        return (
          <TouchableOpacity
            onPress={() => onOptionPress?.(option)}
            key={option}
            style={[styles.labelContainer, {width: itemWidth}]}>
            <Text style={styles.label}>{option}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '90%',
    backgroundColor: Palette.baseGray05,
    height: 60,
    borderRadius: 20,
  },
  activeBox: {
    position: 'absolute',
    height: '80%',
    top: '10%',
    backgroundColor: Palette.background,
    borderRadius: 10,
    elevation: 1,
  },
  labelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: Palette.baseGray08,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
