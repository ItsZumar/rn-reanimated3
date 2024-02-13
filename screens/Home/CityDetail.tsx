import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {RootStackParamList} from '../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CITIES} from '../../constants';
import {ImageModal} from '../../Components';
import Animated, {FadeInLeft} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

type Props = NativeStackScreenProps<RootStackParamList, 'CityDetail'>;

export const CityDetail: React.FC<Props> = ({navigation, route}) => {
  const {id} = route.params;
  const [imageModal, setImageModal] = useState<boolean>(false);

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
            entering={FadeInLeft.duration(500).delay(400)}
            style={styles.cityName}>
            {city.name}
          </Animated.Text>
          <Animated.Text
            entering={FadeInLeft.duration(500).delay(600)}
            style={styles.heading}>
            Detail:
          </Animated.Text>

          <Animated.Text
            entering={FadeInLeft.duration(500).delay(800)}
            style={styles.cityDescription}>
            {city.description}
          </Animated.Text>
        </>
      )}

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.icon}>
        <Ionicons name="arrow-back" size={25} color={'#ffffff'} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setImageModal(prev => !prev)}
        style={styles.rightIcon}>
        <Entypo name="resize-full-screen" size={25} color={'#ffffff'} />
      </TouchableOpacity>

      <ImageModal
        image={city?.image}
        isVisible={imageModal}
        onClosePress={() => setImageModal(prev => !prev)}
      />
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
  rightIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#373737',
    padding: 8,
    borderRadius: 50,
  },
});
