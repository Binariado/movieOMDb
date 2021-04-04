import 'react-native-gesture-handler';
import * as React from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-paper';
import {enableScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ListMovie from '../screens/ListMovie';
import ViewMovie from '../screens/viewMovie';

enableScreens();
const Stack = createStackNavigator();

const StackNavigator = () => {
  const {detailUser} = useSelector((state: any) => state.user);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={ListMovie}
          options={{
            title: 'Welcome',
            headerRight: () => (
              <TouchableOpacity style={styles.btnAvatar}>
                <Avatar.Image
                  style={styles.avatar}
                  size={35}
                  source={detailUser.avatar}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen name="Moview" component={ViewMovie} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  btnAvatar: {
    paddingHorizontal: 10,
  },
  avatar: {
    backgroundColor: 'white',
    elevation: 1,
  },
});

export default StackNavigator;
