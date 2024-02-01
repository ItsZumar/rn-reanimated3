// Import required dependencies
import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CITIES, CITIES_I} from '../../constants';

type Props = NativeStackScreenProps<RootStackParamList, 'CityDetail'>;

export const CityDetail: React.FC<Props> = ({route}) => {
  const {id} = route.params;

  const loremText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`;

  const city = CITIES.find(c => c.id === id);

  return (
    <View style={styles.container}>
      {city && (
        <>
          <Image source={{uri: city.image}} style={styles.cityImage} />
          <Text style={styles.cityName}>{city.name}</Text>
          <Text style={styles.cityDescription}>{loremText}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  cityImage: {
    width: '100%',
    height: 200,
    marginBottom: 30,
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cityDescription: {
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
