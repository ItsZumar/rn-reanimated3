import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RootStackParamList} from '../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CITIES} from '../../constants';
import Animated from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = NativeStackScreenProps<RootStackParamList, 'CityDetail'>;

export const CityDetail: React.FC<Props> = ({navigation, route}) => {
  const {id} = route.params;
  const city = CITIES.find(c => c.id === id);

  return (
    <View style={styles.container}>
      {city && (
        <>
          <Animated.Image
            sharedTransitionTag={`image-${city.id}`}
            source={{uri: city.image}}
            style={styles.cityImage}
          />
          <Animated.Text
            // sharedTransitionTag={`title-${id}`}
            style={styles.cityName}>
            {city.name}
          </Animated.Text>
          <Text style={styles.heading}>Detail:</Text>

          <Text style={styles.cityDescription}>{city.description}</Text>
        </>
      )}

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.icon}>
        <Ionicons name="arrow-back" size={25} color={'#ffffff'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  cityImage: {
    width: '100%',
    height: 200,
    marginBottom: 30,
  },
  cityName: {
    fontSize: 20,
    marginBottom: 8,
    paddingHorizontal: 20,
    color: '#000000',
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 16,
    paddingHorizontal: 20,
    color: '#000000',
    fontWeight: 'bold',
  },
  cityDescription: {
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  icon: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#373737',
    padding: 8,
    borderRadius: 50,
  },
});
