import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ListItem, ListItemWidth} from './ListItem';
import {useSharedValue} from 'react-native-reanimated';

const data = [
  require('../../assets/images/00.jpg'),
  require('../../assets/images/01.jpg'),
  require('../../assets/images/02.jpg'),
  require('../../assets/images/03.jpg'),
  require('../../assets/images/04.jpg'),
  require('../../assets/images/05.jpg'),
  require('../../assets/images/06.jpg'),
  require('../../assets/images/07.jpg'),
  require('../../assets/images/08.jpg'),
  require('../../assets/images/09.jpg'),
];

export const CircularCarousel = () => {
  const contentOffset = useSharedValue(0);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        scrollEventThrottle={16} // 60fps -> 16ms (1000ms / 60fps)
        onScroll={event => {
          contentOffset.value = event.nativeEvent.contentOffset.x;
        }}
        pagingEnabled
        snapToInterval={ListItemWidth}
        style={{
          position: 'absolute',
          bottom: 0,
          height: 300,
        }}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 1.5 * ListItemWidth,
        }}
        horizontal
        renderItem={({item, index}) => {
          return (
            <ListItem
              contentOffset={contentOffset}
              imageSrc={item}
              index={index}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
