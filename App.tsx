import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import TapOnCircle from './Components/tapOnCircle';
import DragBox from './Components/dragBox';
import Interpolate from './Components/Utilities/Interpolate';
import SquareWithinBoundry from './Components/PanGestureHandler/SquareWithinBoundry/squareWithinBoundry';
import MultipleSquares from './Components/PanGestureHandler/MultipleSquares/multipleSquares';

function App() {
  return (
    <>
      {/* <TapOnCircle /> */}
      {/* <DragBox /> */}
      {/* <Interpolate /> */}
      {/* <SquareWithinBoundry /> */}
      <MultipleSquares />
    </>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    height: '100%',
  },
});
