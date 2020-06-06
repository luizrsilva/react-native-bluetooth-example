
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import DeviceDetails from './pages/DeviceDetails';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={
          {
            headerStyle: {
              backgroundColor: '#6B47B7',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center'
          }} >
        <Stack.Screen name="Home" component={Home} options={{ title: 'RN BLE Example' }} />
        <Stack.Screen name="Details" component={DeviceDetails} />
      </Stack.Navigator>
    </NavigationContainer>);
};




export default App; 