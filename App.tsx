import React from 'react';
import {
  CircularProgressBar,
  ColorpickerScreen,
  DragBox,
  InstaLike,
  Interpolate,
  MultipleSquares,
  ScrollView,
  ScrollableView,
  SquareWithinBoundry,
  TapOnCircle,
  ToggleTheme,
  ZoomExp,
  ZoomImage,
  SwipeToDelete,
  RippleAnimation,
  MenuPerspective,
  SlidingCounter,
  LayoutAnimations,
  AnimatedFlatlist,
  DropdownMenu,
  CircularCarousel,
  SkeletonAnimation,
  CustomSegmentedControl,
  BasicAnimations,
  DragTrain,
} from './Components';
import {Home, CityDetail, FavouriteCities} from './screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  CityDetail: {id: string};
  FavouriteCities: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <>
      <>
        {/* COMPONENTS */}

        {/* <TapOnCircle /> */}
        {/* <DragBox /> */}
        {/* <Interpolate /> */}
        {/* <SquareWithinBoundry /> */}
        {/* <MultipleSquares /> */}
        {/* <ScrollableView /> */}
        {/* <ToggleTheme /> */}
        {/* <ZoomExp /> */}
        {/* <ZoomImage /> */}
        {/* <InstaLike /> */}
        {/* <ScrollView /> */}
        {/* not created yet */}
        {/* <ColorpickerScreen /> */}
        {/* <CircularProgressBar /> */}
        {/* <SwipeToDelete /> */}
        {/* <RippleAnimation /> */}
        {/* <MenuPerspective /> */}
        {/* <SlidingCounter /> */}
        {/* <LayoutAnimations /> */}
        {/* <AnimatedFlatlist /> */}
        {/* <DropdownMenu /> */}
        {/* <CircularCarousel /> */}
        {/* <SkeletonAnimation /> */}
        {/* <CustomSegmentedControl /> */}
        {/* <BasicAnimations /> */}
        {/* <DragTrain /> */}
      </>

      {/* SCREENS */}
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName="Home"
          screenOptions={{headerShown: false}}>
          <RootStack.Screen name="Home" component={Home} />
          <RootStack.Screen name="CityDetail" component={CityDetail} />
          <RootStack.Screen
            name="FavouriteCities"
            component={FavouriteCities}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
