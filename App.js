import 'react-native-gesture-handler';
import React from 'react';

import  { NavigationContainer }  from '@react-navigation/native';
import  { createStackNavigator }  from '@react-navigation/stack';
import Intro1Screen from './components/intro/Intro1';

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName = "Menu">
          <Stack.Screen name = "Intro1" component={Intro1Screen} options={{headerShown:false}} />
          <Stack.Screen name = "Intro2" component={Intro2Screen} options={{headerShown:false}} />
          <Stack.Screen name = "Intro3" component={Intro3Screen} options={{headerShown:false}} />
          <Stack.Screen name = "Login" component={LoginScreen} options={{headerShown:false}} />
          <Stack.Screen name = "Register" component={RegisterScreen}/>
          <Stack.Screen name = "Menu" component={MenuScreen} options={{headerShown:false}} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}


