import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';
import { AuthProvider } from './context/auth';
import Home from './screens/Home';
import Navigation from './components/Navigation';

import { StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync()

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <NavigationContainer>
    //   <AuthProvider>
    //     <Stack.Navigator initialRouteName="SignIn">
    //       <Stack.Screen name="SignIn" component={SignIn} />
    //       <Stack.Screen name="SignUp" component={SignUp} />
    //       <Stack.Screen name="Home" component={Home} />
    //     </Stack.Navigator>
    //   </AuthProvider>
    // </NavigationContainer>
    <Navigation />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
