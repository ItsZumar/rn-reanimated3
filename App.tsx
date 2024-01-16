import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import TapOnCircle from './Components/tapOnCircle';
import DragBox from './Components/dragBox';
import Interpolate from './Components/Utilities/Interpolate';

function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      {/* <TapOnCircle /> */}
      {/* <DragBox /> */}
      <Interpolate />
    </GestureHandlerRootView>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});
