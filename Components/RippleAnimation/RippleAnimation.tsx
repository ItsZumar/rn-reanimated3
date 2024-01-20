import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Ripple from './Ripple';

export const RippleAnimation = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <Ripple
          style={styles.ripple}
          onTap={() => {
            console.log('tap');
          }}>
          <Text style={{fontSize: 25}}>Tap</Text>
        </Ripple>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ripple: {
    width: 200,
    height: 200,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    elevation: 2,
  },
});
