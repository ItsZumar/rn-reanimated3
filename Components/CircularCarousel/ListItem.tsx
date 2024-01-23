import {Dimensions, ImageProps, Image} from 'react-native';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

type CircularCarouselListItemProps = {
  imageSrc: ImageProps['source'];
  index: number;
  contentOffset: SharedValue<number>;
};

const {width: windowWidth} = Dimensions.get('window');

export const ListItemWidth = windowWidth / 4;

const ListItem: React.FC<CircularCarouselListItemProps> = ({
  imageSrc,
  index,
  contentOffset,
}) => {
  const rStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 2) * ListItemWidth,
      (index - 1) * ListItemWidth,
      index * ListItemWidth,
      (index + 1) * ListItemWidth,
      (index + 2) * ListItemWidth,
    ];

    const translateYOutputRange = [
      0,
      -ListItemWidth / 3,
      -ListItemWidth / 2,
      -ListItemWidth / 3,
      0,
    ];

    const opacityOutputRange = [0.7, 0.9, 1, 0.9, 0.7];

    const scaleOutputRange = [0.7, 0.8, 1, 0.8, 0.7];

    const translateY = interpolate(
      contentOffset.value,
      inputRange,
      translateYOutputRange,
      Extrapolation.CLAMP,
    );

    const opacity = interpolate(
      contentOffset.value,
      inputRange,
      opacityOutputRange,
      Extrapolation.CLAMP,
    );

    const scale = interpolate(
      contentOffset.value,
      inputRange,
      scaleOutputRange,
      Extrapolation.CLAMP,
    );

    return {
      opacity,
      transform: [
        {
          translateY,
        },
        {
          scale,
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        {
          width: ListItemWidth,
          aspectRatio: 1,
          elevation: 5,
        },
        rStyle,
      ]}>
      <Image
        source={imageSrc}
        style={{
          margin: 3,
          height: ListItemWidth,
          width: ListItemWidth,
          borderRadius: 200,
          borderWidth: 2,
          borderColor: 'white',
        }}
      />
    </Animated.View>
  );
};

export {ListItem};
