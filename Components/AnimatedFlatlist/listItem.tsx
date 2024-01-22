import React from 'react';
import {StyleSheet, Text, ViewToken} from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

type ListItemProps = {
  viewableItems: SharedValue<ViewToken[]>;
  item: {
    id: number;
  };
};

const ListItem = ({viewableItems, item}: ListItemProps) => {
  const rStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      viewableItems.value
        .filter(item => item.isViewable)
        .find(viewableItem => viewableItem.item.id === item.id),
    );

    return {
      opacity: withTiming(isVisible ? 1 : 0),
      transform: [
        {
          scale: withTiming(isVisible ? 1 : 0.6),
        },
      ],
    };
  }, []);

  return (
    <Animated.View style={[styles.listStyle, rStyle]}>
      <Text style={{paddingHorizontal: 15, fontWeight: '700', fontSize: 18}}>
        List Item {item.id + 1}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  listStyle: {
    height: 80,
    width: '90%',
    backgroundColor: '#FFB6C1',
    marginTop: 20,
    alignSelf: 'center',
    borderRadius: 10,
    elevation: 2,
    justifyContent: 'center',
  },
});

export default ListItem;
