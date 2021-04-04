/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import {Provider} from 'react-redux';
import React from 'react';
import AppRoot from './app/AppRoot';
import {store} from './store';
const App = () => {
  return (
    <Provider store={store}>
      <AppRoot />
    </Provider>
  );
};

export default App;
