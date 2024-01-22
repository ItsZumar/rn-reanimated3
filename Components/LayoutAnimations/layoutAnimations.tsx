import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {FadeIn, FadeOut, Layout} from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';

const LIST_ITEM_COLOR = '#1798DE';

interface Item {
  id: number;
}

export const LayoutAnimations = () => {
  const initialMode = useRef<boolean>(true);

  useEffect(() => {
    initialMode.current = false;
  }, []);

  const [items, setItems] = useState<Item[]>(
    new Array(5).fill(0).map((_, index) => ({id: index})),
  );

  const onAdd = useCallback(() => {
    setItems(currentItems => {
      const nextItemId = (currentItems[currentItems.length - 1]?.id ?? 0) + 1;
      return [...currentItems, {id: nextItemId}];
    });
  }, []);

  const onDelete = useCallback((itemId: number) => {
    setItems(currentItems => {
      return currentItems.filter(item => item.id !== itemId);
    });
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.floatingButton} onPress={onAdd}>
        <AntDesign name="plus" size={30} color={'#fff'} />
      </TouchableOpacity>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{paddingVertical: 10}}>
        {items.map((item, index) => {
          return (
            <Animated.View
              key={item.id}
              entering={
                initialMode.current ? FadeIn.delay(100 * index) : FadeIn
              }
              exiting={FadeOut}
              layout={Layout.delay(100)}
              onTouchEnd={() => onDelete(item.id)}
              style={styles.listItem}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listItem: {
    height: 100,
    backgroundColor: LIST_ITEM_COLOR,
    width: '90%',
    marginVertical: 10,
    borderRadius: 20,
    alignSelf: 'center',
    elevation: 5,
    zIndex: 1,
  },
  floatingButton: {
    width: 80,
    aspectRatio: 1,
    backgroundColor: 'black',
    borderRadius: 40,
    position: 'absolute',
    bottom: 50,
    right: '5%',
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
