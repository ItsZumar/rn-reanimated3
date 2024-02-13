import React from 'react';
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  SensorType,
  useAnimatedSensor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';

const IMAGE_OFFSET = 100;
const {height, width} = Dimensions.get('window');

interface ImageModalI {
  image: any;
  isVisible: boolean;
  onClosePress?: () => void;
}

export const ImageModal: React.FC<ImageModalI> = ({
  isVisible,
  onClosePress,
  image,
}) => {
  const sensor = useAnimatedSensor(SensorType.ROTATION, {interval: 1000});

  const rImageStyle = useAnimatedStyle(() => {
    const {yaw, pitch, roll} = sensor.sensor.value;
    console.log(yaw.toFixed(1), pitch.toFixed(1), roll.toFixed(1));
    return {
      top: -200,
      left: 0,
    };
  }, []);

  return (
    <Modal visible={isVisible} onDismiss={onClosePress}>
      <TouchableOpacity onPress={onClosePress} style={styles.icon}>
        <Ionicons name="close" size={25} color={'#ffffff'} />
      </TouchableOpacity>

      <Animated.Image
        source={{uri: image}}
        style={[styles.fullImage, rImageStyle]}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  fullImage: {
    width: width + 2 * IMAGE_OFFSET,
    height: height + 2 * IMAGE_OFFSET,
    position: 'absolute',
  },
  icon: {
    zIndex: 100,
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#373737',
    padding: 8,
    borderRadius: 50,
  },
});
