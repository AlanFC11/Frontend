import 'react-native-gesture-handler';
import React from 'react';

import  { NavigationContainer }  from '@react-navigation/native';
import  { createStackNavigator }  from '@react-navigation/stack';
import LoginScreen from './components/Login';
import RegisterScreen from './components/Register';

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName = "Login">
          <Stack.Screen name = "Login" component={LoginScreen} options={{headerShown:false}} />
          <Stack.Screen name = "Register" component={RegisterScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}


