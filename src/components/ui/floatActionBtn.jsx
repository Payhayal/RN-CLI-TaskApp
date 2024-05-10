import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Add} from 'iconsax-react-native';

const FloatActionBtn = props => {
  return (
    <TouchableOpacity {...props} style={styles.container}>
      <Add size="32" color="#ffffff" />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2ccce4',
    width: 70,
    height: 70,
    borderRadius: 1000,
    position: 'absolute',
    bottom: 45,
    right: 20,
  },
});

export default FloatActionBtn;
