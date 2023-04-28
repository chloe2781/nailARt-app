import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';
import { AuthProvider } from './context/auth';
import Home from './screens/Home';
import Navigation from './components/Navigation';
import Post from './screens/Post';
import SeeNails from './screens/SeeNails';

import { StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
// import { Camera } from 'expo-camera';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();//Ignore all log notifications

// SplashScreen.preventAutoHideAsync()

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <NavigationContainer>
    //   <AuthProvider>
    //     <Stack.Navigator initialRouteName="Post" screenOptions={{ headerShown: false }}>
    //       {/* <Stack.Screen name="SignIn" component={SignIn} />
    //       <Stack.Screen name="SignUp" component={SignUp} />
    //       <Stack.Screen name="Home" component={Home} /> */}
    //       <Stack.Screen name="SeeNails" component={SeeNails} />
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
