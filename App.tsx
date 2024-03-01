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
  CustomizeBottomSheet,
  BottomSheet,
} from './Components';
import {Home, CityDetail, FavouriteCities} from './screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import ParallexImage from './Transitions/ParallexImage';

export type RootStackParamList = {
  Home: undefined;
  CityDetail: {id: string};
  FavouriteCities: undefined;
  ParallexImage: undefined;
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
        {/* <CustomizeBottomSheet height={400} /> */}
        {/* <BottomSheet /> */}
      </>

      {/* SCREENS */}
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName="Home"
          screenOptions={{headerShown: true}}>
          {/* <RootStack.Screen name="Home" component={Home} />
          <RootStack.Screen name="CityDetail" component={CityDetail} />
          <RootStack.Screen
            name="FavouriteCities"
            component={FavouriteCities}
          /> */}
          <RootStack.Screen
            name="ParallexImage"
            component={ParallexImage}
            options={{title: ''}}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
