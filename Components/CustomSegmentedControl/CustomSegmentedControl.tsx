import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {SegmentedControl} from './SegmentedControl';

export const Palette = {
  baseGray05: '#E5E2DC',
  baseGray08: '#30302e',
  background: '#F1EEE8',
};

const options = ['Light', 'Standard', 'Pro'];

export const CustomSegmentedControl = () => {
  const [selectedOption, setSelectedOption] = useState<string>('Standard');

  return (
    <View style={styles.container}>
      <SegmentedControl
        options={options}
        selectedOption={selectedOption}
        onOptionPress={setSelectedOption}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
