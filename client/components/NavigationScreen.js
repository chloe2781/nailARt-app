import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import Home from "../screens/Home";
import { AuthContext } from "../context/auth";
import HeaderTabs from './header/HeaderTabs';
import Account from "../screens/Account";
import Post from "../screens/Post";
import Links from "../screens/Links";
import ForgotPassword from "../screens/ForgotPassword";

const Stack = createNativeStackNavigator();

const NavigationScreen = () => {
    const [state, setState] = useContext(AuthContext);
    const authenticated = state && state.token !== "" && state.user !== null;

    return (
        <Stack.Navigator initialRouteName="Home">
            {authenticated ?
                (
                    <>
                        <Stack.Screen name="Home" component={Home} options={{ headerRight: () => <HeaderTabs /> }} />
                        <Stack.Screen name="Account" component={Account} />
                        <Stack.Screen name="Post" component={Post} />
                        <Stack.Screen name="Links" component={Links} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="SignIn" component={SignIn} />
                        <Stack.Screen name="SignUp" component={SignUp} />
                        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                    </>
                )}
        </Stack.Navigator >
    )
}

export default NavigationScreen;