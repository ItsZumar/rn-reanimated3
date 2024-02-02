import React from 'react';
import {Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {RootStackParamList} from '../../App';
import {CITIES, CITIES_I} from '../../constants';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Animated from 'react-native-reanimated';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const Home: React.FC<Props> = ({navigation, route}) => {
  const renderItem = ({id, image, name}: CITIES_I) => (
    <TouchableOpacity
      style={styles.gridItem}
      key={id}
      onPress={() => navigation.navigate('CityDetail', {id})}>
      <Animated.Image
        sharedTransitionTag={`image-${id}`}
        source={{uri: image}}
        style={styles.cityImage}
      />
      <Animated.Text style={styles.cityName}>{name}</Animated.Text>
    </TouchableOpacity>
  );

  return (
    <>
      <Text
        style={{
          backgroundColor: '#0099FF',
          padding: 15,
          textAlign: 'center',
          color: '#ffffff',
          fontSize: 24,
          fontWeight: 'bold',
          letterSpacing: 2,
        }}>
        Cities Tour
      </Text>
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
    backgroundColor: '#ffffff',
  },
  gridItem: {
    flex: 1,
    margin: 15,
    alignItems: 'center',
  },
  cityImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  cityName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
});
