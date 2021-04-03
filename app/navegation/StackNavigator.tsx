import 'react-native-gesture-handler';
import * as React from 'react';
import {enableScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ListMovie from '../screens/ListMovie';
import ViewMovie from '../screens/viewMovie';

enableScreens();
const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={ListMovie}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen name="Moview" component={ViewMovie} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
