import React from 'react';
import {StyleSheet, View} from 'react-native';
import Alert from './components/Alert';
import StackNavigator from '../app/navegation/StackNavigator';

const AppRoot = () => {
  return (
    <View style={styles.container}>
      <Alert />
      <StackNavigator />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});
export default AppRoot;
