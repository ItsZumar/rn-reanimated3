import React, {useEffect} from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
const {width: windowWidth} = Dimensions.get('window');

const TAB_WIDTH = windowWidth / 4;
const TABS = ['Home', 'About', 'Search', 'Profile'];

export const BasicAnimations = () => {
  const offset = useSharedValue(-TAB_WIDTH);
  const defaultAnim = useSharedValue(170);
  const linear = useSharedValue(170);

  const rDefaultAnimStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: defaultAnim.value}],
    };
  });

  const rLinearStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: linear.value}],
    };
  });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateX: offset.value}],
  }));

  const handlePress = (tab: string) => {
    const newOffset = (() => {
      const multiplier = 1.5;
      switch (tab) {
        case 'Home':
          return -TAB_WIDTH * multiplier;
        case 'About':
          return -TAB_WIDTH * 0.5;
        case 'Search':
          return TAB_WIDTH * 0.5;
        case 'Profile':
          return TAB_WIDTH * multiplier;
        default:
          return -TAB_WIDTH * multiplier;
      }
    })();

    offset.value = withTiming(newOffset);
  };

  useEffect(() => {
    linear.value = withRepeat(
      withTiming(-linear.value, {
        duration: 2000,
        easing: Easing.linear,
      }),
      -1,
      true,
    );
    defaultAnim.value = withRepeat(
      withTiming(-defaultAnim.value, {
        duration: 2000,
      }),
      -1,
      true,
    );
  }, []);

  return (
    <View style={styles.container}>
      {/* header tab */}
      <View style={styles.tabs}>
        {TABS.map((tab, i) => (
          <Pressable
            key={tab}
            style={
              i !== TABS.length - 1 ? [styles.tab, styles.divider] : styles.tab
            }
            onPress={() => handlePress(tab)}>
            <Text style={styles.tabLabel}>{tab}</Text>
          </Pressable>
        ))}
      </View>
      {/* boxes */}
      <Animated.View style={[styles.animatedBorder, animatedStyles]} />
      <Animated.View style={[styles.box, rDefaultAnimStyle]}>
        <Text style={styles.text}>Default</Text>
      </Animated.View>
      <Animated.View style={[styles.box, rLinearStyle]}>
        <Text style={styles.text}>Linear</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  tabs: {
    flexDirection: 'row',
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: TAB_WIDTH,
  },
  tabLabel: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  divider: {
    borderRightWidth: 1,
    borderRightColor: '#DFDFDF',
  },
  animatedBorder: {
    height: 3,
    width: 65,
    backgroundColor: '#A705F8',
    borderRadius: 20,
  },
  box: {
    borderColor: '#A705F8',
    borderWidth: 1,
    width: 75,
    height: 70,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  text: {
    color: '#A705F8',
    fontWeight: '800',
  },
});
