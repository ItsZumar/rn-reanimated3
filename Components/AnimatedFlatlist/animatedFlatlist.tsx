import {FlatList, StyleSheet, View, ViewToken} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import ListItem from './listItem';

const data = new Array(50).fill(0).map((_, index) => ({id: index}));

export const AnimatedFlatlist = () => {
  const viewableItems = useSharedValue<ViewToken[]>([]);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={({viewableItems: vItems}) => {
          viewableItems.value = vItems;
        }}
        renderItem={({item}) => {
          return <ListItem item={item} viewableItems={viewableItems} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
