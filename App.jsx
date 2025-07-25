// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/components/Splashscreen';
import HomeScreen from './src/components/HomeScreen';
import Login from './src/components/Login';
import Signup from './src/components/Signup';
import Toast from 'react-native-toast-message';
import toastConfig from './src/components/toastConfig';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <>

    <NavigationContainer>
      <Stack.Navigator initialRouteName='splashScreen'>
        <Stack.Screen
          name="splashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="homeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="signup"
          component={Signup}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    <Toast config={toastConfig} />
    </>
  );
}

export default App;