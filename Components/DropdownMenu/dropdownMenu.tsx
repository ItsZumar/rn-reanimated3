import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Dropdown} from './Dropdown';

const options = [
  {label: 'Charts', iconName: 'barschart'},
  {label: 'Book', iconName: 'book'},
  {label: 'Calendar', iconName: 'calendar'},
  {label: 'Camera', iconName: 'camera'},
];

const header = {
  label: 'Header',
  iconName: 'ellipsis1',
};

export const DropdownMenu = () => {
  return (
    <View style={styles.container}>
      <Dropdown header={header} options={options} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
