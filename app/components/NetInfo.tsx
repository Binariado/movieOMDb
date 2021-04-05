import React from 'react';
import {StyleSheet} from 'react-native';
import {FAB} from 'react-native-paper';

const NetInfo = () => {
  return (
    <FAB
      style={styles.fab}
      icon="wifi-off"
      onPress={() => console.log('Pressed')}
    />
  );
};
const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#f0f0f2',
  },
});
export default NetInfo;
