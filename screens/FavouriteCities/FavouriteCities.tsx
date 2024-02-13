import React from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CITIES, CITIES_I} from '../../constants';
import Animated from 'react-native-reanimated';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheet, CustomizeBottomSheet} from '../../Components';

const {height} = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'FavouriteCities'>;

export const FavouriteCities: React.FC<Props> = ({navigation, route}) => {
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
    <GestureHandlerRootView style={styles.container}>
      <>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.icon}>
            <Ionicons name="arrow-back" size={22} color={'#ffffff'} />
          </TouchableOpacity>

          <Text style={styles.headerText}>Favourite Cities</Text>
        </View>

        <FlatList
          data={CITIES.slice(0, 4)}
          numColumns={2}
          renderItem={({item}) => renderItem(item)}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.container}
        />
      </>

      {/* <CustomizeBottomSheet
        height={height - 810}
        children={
          <View>
            <Text>List</Text>
          </View>
        }
        closeBottomSheet={() => {}}
      /> */}
      <BottomSheet />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  icon: {
    backgroundColor: '#373737',
    padding: 5,
    borderRadius: 50,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#0099FF',
    padding: 15,
  },
  headerText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: 'bold',
    letterSpacing: 2,
    flexGrow: 1,
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
