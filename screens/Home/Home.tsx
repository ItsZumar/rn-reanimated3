import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {CITIES, CITIES_I} from '../../constants';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const Home: React.FC<Props> = ({navigation, route}) => {
  const renderItem = ({id, image, name}: CITIES_I) => (
    <TouchableOpacity
      style={styles.gridItem}
      key={id}
      onPress={() => navigation.navigate('CityDetail', {id})}>
      <Image source={{uri: image}} style={styles.cityImage} />
      <Text style={styles.cityName}>{name}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <FlatList
        data={CITIES}
        numColumns={2}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.container}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  gridItem: {
    flex: 1,
    margin: 8,
    alignItems: 'center',
  },
  cityImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  cityName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
