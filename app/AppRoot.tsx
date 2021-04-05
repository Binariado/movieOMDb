import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';
import Alert from './components/Alert';
import NetInfo from './components/NetInfo';
import StackNavigator from '../app/navegation/StackNavigator';

const AppRoot = () => {
  const netInfo = useNetInfo();
  const {isConnected} = netInfo;

  return (
    <View style={styles.container}>
      {!isConnected && <NetInfo />}
      {isConnected && <Alert />}
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
